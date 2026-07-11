(function () {
  const SESSION_KEY = 'novalyte.cloudSession.v1';
  const PUBLIC_DATASETS = [
    { remote: 'public_services', local: 'services' },
    { remote: 'public_digital_products', local: 'digital_products' }
  ];
  const ADMIN_DATASETS = ['services', 'digital_products', 'orders', 'investments', 'finance_entries', 'team_members', 'reviews'];
  const queues = new Map();

  function config() {
    return window.NOVALYTE_CLOUD_CONFIG || {};
  }

  function cleanUrl(value) {
    return String(value || '').trim().replace(/\/+$/, '');
  }

  function isConfigured() {
    const cfg = config();
    return cfg.enabled === true && /^https:\/\//i.test(cleanUrl(cfg.supabaseUrl)) && String(cfg.anonKey || '').trim().length > 20;
  }

  function readSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveSession(session) {
    try {
      if (!session) localStorage.removeItem(SESSION_KEY);
      else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      // Storage can be blocked. The current page session still continues.
    }
  }

  function sessionExpiresAt(session) {
    if (!session) return 0;
    if (Number(session.expires_at)) return Number(session.expires_at) * 1000;
    if (Number(session.expires_in) && session.created_at) return Number(session.created_at) + Number(session.expires_in) * 1000;
    return 0;
  }

  function hasAdminSession() {
    const session = readSession();
    return Boolean(session && session.access_token && session.refresh_token);
  }

  function baseHeaders(token = '') {
    const cfg = config();
    const headers = {
      apikey: String(cfg.anonKey || '').trim(),
      'Content-Type': 'application/json'
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  async function parseResponse(response) {
    const text = await response.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch (error) { data = text; }
    }
    if (!response.ok) {
      const message = data && typeof data === 'object'
        ? (data.message || data.error_description || data.error || data.hint || `Request failed (${response.status})`)
        : (String(data || '') || `Request failed (${response.status})`);
      throw new Error(message);
    }
    return data;
  }

  async function refreshSession() {
    const current = readSession();
    if (!current || !current.refresh_token || !isConfigured()) return null;
    const cfg = config();
    const response = await fetch(`${cleanUrl(cfg.supabaseUrl)}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ refresh_token: current.refresh_token })
    });
    const next = await parseResponse(response);
    const stored = { ...next, created_at: Date.now() };
    saveSession(stored);
    return stored;
  }

  async function ensureSession() {
    const current = readSession();
    if (!current || !current.access_token) return null;
    const expiresAt = sessionExpiresAt(current);
    if (!expiresAt || expiresAt - Date.now() > 60_000) return current;
    try {
      return await refreshSession();
    } catch (error) {
      saveSession(null);
      return null;
    }
  }

  function resolveAdminEmail(identifier) {
    const value = String(identifier || '').trim();
    if (value.includes('@')) return value;
    return String(config().adminEmail || '').trim();
  }

  async function login(identifier, password) {
    if (!isConfigured()) return { ok: false, reason: 'not-configured' };
    const email = resolveAdminEmail(identifier);
    if (!email || !String(password || '')) return { ok: false, reason: 'missing-credentials' };
    try {
      const cfg = config();
      const response = await fetch(`${cleanUrl(cfg.supabaseUrl)}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: baseHeaders(),
        body: JSON.stringify({ email, password: String(password) })
      });
      const data = await parseResponse(response);
      const session = { ...data, created_at: Date.now() };
      saveSession(session);
      return { ok: true, session };
    } catch (error) {
      return { ok: false, reason: 'auth-failed', message: error.message };
    }
  }

  async function logout() {
    const session = await ensureSession();
    if (session && isConfigured()) {
      try {
        const cfg = config();
        await fetch(`${cleanUrl(cfg.supabaseUrl)}/auth/v1/logout`, {
          method: 'POST',
          headers: baseHeaders(session.access_token)
        });
      } catch (error) {
        // Local logout must still proceed even if the remote request fails.
      }
    }
    saveSession(null);
  }

  async function fetchDataset(dataset, admin = false) {
    if (!isConfigured()) return null;
    const cfg = config();
    let token = '';
    if (admin) {
      const session = await ensureSession();
      if (!session) throw new Error('Cloud admin session is unavailable. Please log in again.');
      token = session.access_token;
    }
    const query = new URLSearchParams({ select: 'payload,updated_at', key: `eq.${dataset}`, limit: '1' });
    const response = await fetch(`${cleanUrl(cfg.supabaseUrl)}/rest/v1/novalyte_shared_state?${query.toString()}`, {
      headers: baseHeaders(token)
    });
    const rows = await parseResponse(response);
    return Array.isArray(rows) && rows[0] ? rows[0].payload : null;
  }

  async function saveDataset(dataset, payload) {
    if (!isConfigured()) return { ok: false, reason: 'not-configured' };
    const session = await ensureSession();
    if (!session) return { ok: false, reason: 'not-authenticated' };
    try {
      const cfg = config();
      const response = await fetch(`${cleanUrl(cfg.supabaseUrl)}/rest/v1/novalyte_shared_state?on_conflict=key`, {
        method: 'POST',
        headers: {
          ...baseHeaders(session.access_token),
          Prefer: 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify([{ key: dataset, payload, updated_at: new Date().toISOString() }])
      });
      await parseResponse(response);
      dispatchStatus({ state: 'synced', dataset, message: `${dataset.replaceAll('_', ' ')} synced` });
      return { ok: true };
    } catch (error) {
      dispatchStatus({ state: 'error', dataset, message: error.message });
      return { ok: false, reason: 'request-failed', message: error.message };
    }
  }

  function queueSave(dataset, payload) {
    if (!isConfigured() || !hasAdminSession()) return Promise.resolve({ ok: false, reason: 'inactive' });
    const previous = queues.get(dataset) || Promise.resolve();
    const next = previous.catch(() => {}).then(() => saveDataset(dataset, payload));
    const tracked = next.finally(() => {
      if (queues.get(dataset) === tracked) queues.delete(dataset);
    });
    queues.set(dataset, tracked);
    dispatchStatus({ state: 'syncing', dataset, message: `Syncing ${dataset.replaceAll('_', ' ')}...` });
    return tracked;
  }

  function dispatchStatus(detail) {
    window.dispatchEvent(new CustomEvent('novalyte:remote-status', { detail }));
  }

  function dispatchUpdated(datasets) {
    window.dispatchEvent(new CustomEvent('novalyte:remote-updated', { detail: { datasets } }));
  }

  async function hydratePublic(Store) {
    if (!isConfigured() || !Store || !Store.applyRemoteDataset) return { ok: false, reason: 'not-configured', datasets: [] };
    const updated = [];
    for (const dataset of PUBLIC_DATASETS) {
      try {
        const payload = await fetchDataset(dataset.remote, false);
        if (Array.isArray(payload)) {
          Store.applyRemoteDataset(dataset.local, payload);
          updated.push(dataset.local);
        }
      } catch (error) {
        dispatchStatus({ state: 'error', dataset: dataset.remote, message: error.message });
      }
    }
    if (updated.length) dispatchUpdated(updated);
    return { ok: true, datasets: updated };
  }

  async function hydrateAdmin(Store) {
    if (!isConfigured() || !Store || !Store.applyRemoteDataset) return { ok: false, reason: 'not-configured', datasets: [] };
    const session = await ensureSession();
    if (!session) return { ok: false, reason: 'not-authenticated', datasets: [] };
    const updated = [];
    const missing = [];
    const failures = [];
    dispatchStatus({ state: 'syncing', dataset: 'all', message: 'Loading shared admin data...' });
    for (const dataset of ADMIN_DATASETS) {
      try {
        const payload = await fetchDataset(dataset, true);
        if (Array.isArray(payload)) {
          Store.applyRemoteDataset(dataset, payload);
          updated.push(dataset);
        } else {
          missing.push(dataset);
        }
      } catch (error) {
        failures.push(`${dataset}: ${error.message}`);
        dispatchStatus({ state: 'error', dataset, message: error.message });
      }
    }

    const localPayload = {
      services: Store.getServices ? Store.getServices() : [],
      digital_products: Store.getDigitalProducts ? Store.getDigitalProducts() : [],
      orders: Store.getOrders ? Store.getOrders() : [],
      investments: Store.getInvestments ? Store.getInvestments() : [],
      finance_entries: Store.getFinanceEntries ? Store.getFinanceEntries().filter(item => item.source !== 'investment') : [],
      team_members: Store.getTeamMembers ? Store.getTeamMembers() : [],
      reviews: Store.getReviews ? Store.getReviews() : []
    };
    for (const dataset of missing) {
      const result = await saveDataset(dataset, localPayload[dataset] || []);
      if (!result || !result.ok) failures.push(`${dataset}: ${result && result.message ? result.message : 'could not initialize'}`);
    }
    const publicServices = Store.publicServicePayload ? Store.publicServicePayload(localPayload.services) : localPayload.services;
    const publicProducts = Store.publicDigitalProductPayload ? Store.publicDigitalProductPayload(localPayload.digital_products) : localPayload.digital_products;
    const publicServicesResult = await saveDataset('public_services', publicServices);
    const publicProductsResult = await saveDataset('public_digital_products', publicProducts);
    if (!publicServicesResult || !publicServicesResult.ok) failures.push(`public_services: ${publicServicesResult && publicServicesResult.message ? publicServicesResult.message : 'could not sync'}`);
    if (!publicProductsResult || !publicProductsResult.ok) failures.push(`public_digital_products: ${publicProductsResult && publicProductsResult.message ? publicProductsResult.message : 'could not sync'}`);
    if (updated.length) dispatchUpdated(updated);
    if (failures.length) {
      const message = failures[0];
      dispatchStatus({ state: 'error', dataset: 'all', message });
      return { ok: false, reason: 'sync-failed', message, datasets: updated, initialized: missing };
    }
    dispatchStatus({ state: 'synced', dataset: 'all', message: 'Shared data is up to date.' });
    return { ok: true, datasets: updated, initialized: missing };
  }

  function normalizeLookupRow(row) {
    return {
      id: row.order_id || row.id || '',
      clientName: row.client_name || row.clientName || '',
      serviceName: row.service_name || row.serviceName || '',
      clientCharge: Number(row.client_charge ?? row.clientCharge ?? 0) || 0,
      status: row.status || 'pending',
      createdAt: row.created_at || row.createdAt || '',
      orderType: row.order_type || row.orderType || 'service'
    };
  }

  function localLookup(clientRef, Store) {
    const needle = String(clientRef || '').trim().toLocaleLowerCase();
    if (!needle || !Store || !Store.getOrders) return [];
    return Store.getOrders()
      .filter(order => String(order.clientName || '').trim().toLocaleLowerCase() === needle)
      .filter(order => !['voided', 'cancelled'].includes(order.status))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(order => normalizeLookupRow(order));
  }

  async function lookupOrders(clientRef, Store) {
    const value = String(clientRef || '').trim();
    if (!value) return { ok: false, reason: 'empty', orders: [] };
    if (!isConfigured()) return { ok: true, mode: 'local', orders: localLookup(value, Store) };
    try {
      const cfg = config();
      const response = await fetch(`${cleanUrl(cfg.supabaseUrl)}/rest/v1/rpc/novalyte_lookup_orders`, {
        method: 'POST',
        headers: baseHeaders(),
        body: JSON.stringify({ p_client_ref: value })
      });
      const rows = await parseResponse(response);
      return { ok: true, mode: 'cloud', orders: Array.isArray(rows) ? rows.map(normalizeLookupRow) : [] };
    } catch (error) {
      dispatchStatus({ state: 'error', dataset: 'orders', message: error.message });
      return { ok: false, reason: 'request-failed', message: error.message, orders: [] };
    }
  }

  window.NovalyteRemote = {
    isConfigured,
    hasAdminSession,
    login,
    logout,
    ensureSession,
    fetchDataset,
    saveDataset,
    queueSave,
    hydratePublic,
    hydrateAdmin,
    lookupOrders
  };
})();
