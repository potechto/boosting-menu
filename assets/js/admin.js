(function () {
  const Store = window.NovalyteStore;
  const Remote = window.NovalyteRemote;
  const AUTH = {
    username: 'Novalyte',
    password: 'Nova2026.lyte',
    pin: '4312'
  };

  const els = {
    loginView: document.getElementById('loginView'),
    dashboardView: document.getElementById('dashboardView'),
    loginForm: document.getElementById('loginForm'),
    loginUser: document.getElementById('loginUser'),
    loginPass: document.getElementById('loginPass'),
    loginPin: document.getElementById('loginPin'),
    loginAlert: document.getElementById('loginAlert'),
    logoutBtn: document.getElementById('logoutBtn'),
    adminMobileNavToggle: document.getElementById('adminMobileNavToggle'),
    adminSidebarNav: document.getElementById('adminSidebarNav'),
    statsGrid: document.getElementById('statsGrid'),
    investAmount: document.getElementById('investAmount'),
    addInvestAmount: document.getElementById('addInvestAmount'),
    addInvestNote: document.getElementById('addInvestNote'),
    financeEntryType: document.getElementById('financeEntryType'),
    financePerson: document.getElementById('financePerson'),
    teamMemberName: document.getElementById('teamMemberName'),
    teamPayMode: document.getElementById('teamPayMode'),
    teamPayAmount: document.getElementById('teamPayAmount'),
    teamPayFrequency: document.getElementById('teamPayFrequency'),
    addTeamMemberBtn: document.getElementById('addTeamMemberBtn'),
    teamMembersTable: document.getElementById('teamMembersTable'),
    investmentsTable: document.getElementById('investmentsTable'),
    investmentAnalyticsGrid: document.getElementById('investmentAnalyticsGrid'),
    investmentInsightsCard: document.getElementById('investmentInsightsCard'),
    saveInvestBtn: document.getElementById('saveInvestBtn'),
    addInvestBtn: document.getElementById('addInvestBtn'),
    adminServiceSearch: document.getElementById('adminServiceSearch'),
    adminPlatformFilter: document.getElementById('adminPlatformFilter'),
    adminArchiveFilter: document.getElementById('adminArchiveFilter'),
    servicesTable: document.getElementById('servicesTable'),
    addServiceBtn: document.getElementById('addServiceBtn'),
    addDigitalProductBtn: document.getElementById('addDigitalProductBtn'),
    adminDigitalProductSearch: document.getElementById('adminDigitalProductSearch'),
    adminDigitalProductFilter: document.getElementById('adminDigitalProductFilter'),
    adminDigitalProductStatusFilter: document.getElementById('adminDigitalProductStatusFilter'),
    digitalProductsTable: document.getElementById('digitalProductsTable'),
    digitalProductAdminModal: document.getElementById('digitalProductAdminModal'),
    digitalProductAdminForm: document.getElementById('digitalProductAdminForm'),
    digitalProductAdminModalTitle: document.getElementById('digitalProductAdminModalTitle'),
    digitalProductEditId: document.getElementById('digitalProductEditId'),
    digitalProductName: document.getElementById('digitalProductName'),
    digitalProductCategory: document.getElementById('digitalProductCategory'),
    digitalProductPrice: document.getElementById('digitalProductPrice'),
    digitalProductProviderPrice: document.getElementById('digitalProductProviderPrice'),
    digitalProductProfitPreview: document.getElementById('digitalProductProfitPreview'),
    digitalProductDuration: document.getElementById('digitalProductDuration'),
    digitalProductImage: document.getElementById('digitalProductImage'),
    digitalProductImageUpload: document.getElementById('digitalProductImageUpload'),
    digitalProductViewImageBtn: document.getElementById('digitalProductViewImageBtn'),
    digitalProductVisible: document.getElementById('digitalProductVisible'),
    digitalProductPreviewField: document.getElementById('digitalProductPreviewField'),
    digitalProductImagePreview: document.getElementById('digitalProductImagePreview'),
    digitalProductDescription: document.getElementById('digitalProductDescription'),
    digitalProductImageModal: document.getElementById('digitalProductImageModal'),
    digitalProductImageModalPreview: document.getElementById('digitalProductImageModalPreview'),
    adminConfirmModal: document.getElementById('adminConfirmModal'),
    adminConfirmTitle: document.getElementById('adminConfirmTitle'),
    adminConfirmMessage: document.getElementById('adminConfirmMessage'),
    adminConfirmOkBtn: document.getElementById('adminConfirmOkBtn'),
    adminConfirmCancelBtn: document.getElementById('adminConfirmCancelBtn'),
    adminConfirmCloseBtn: document.getElementById('adminConfirmCloseBtn'),
    exportBackupBtn: document.getElementById('exportBackupBtn'),
    importBackupInput: document.getElementById('importBackupInput'),
    exportOrdersCsvBtn: document.getElementById('exportOrdersCsvBtn'),
    resetDemoBtn: document.getElementById('resetDemoBtn'),
    cloudSyncStatus: document.getElementById('cloudSyncStatus'),
    orderSearch: document.getElementById('orderSearch'),
    orderStatusFilter: document.getElementById('orderStatusFilter'),
    paymentStatusFilter: document.getElementById('paymentStatusFilter'),
    ordersTable: document.getElementById('ordersTable'),
    ordersSummaryGrid: document.getElementById('ordersSummaryGrid'),
    serviceModal: document.getElementById('serviceModal'),
    serviceForm: document.getElementById('serviceForm'),
    serviceModalTitle: document.getElementById('serviceModalTitle'),
    serviceEditId: document.getElementById('serviceEditId'),
    serviceName: document.getElementById('serviceName'),
    serviceProviderId: document.getElementById('serviceProviderId'),
    servicePlatform: document.getElementById('servicePlatform'),
    serviceCategory: document.getElementById('serviceCategory'),
    serviceProviderRate: document.getElementById('serviceProviderRate'),
    serviceClientRate: document.getElementById('serviceClientRate'),
    serviceRateUnit: document.getElementById('serviceRateUnit'),
    serviceAvgTime: document.getElementById('serviceAvgTime'),
    serviceMin: document.getElementById('serviceMin'),
    serviceMax: document.getElementById('serviceMax'),
    serviceTag: document.getElementById('serviceTag'),
    serviceVisible: document.getElementById('serviceVisible'),
    serviceArchived: document.getElementById('serviceArchived'),
    serviceDescription: document.getElementById('serviceDescription'),
    serviceRevenuePreview: document.getElementById('serviceRevenuePreview'),
    orderModal: document.getElementById('orderModal'),
    orderForm: document.getElementById('orderForm'),
    orderModalEyebrow: document.getElementById('orderModalEyebrow'),
    orderModalTitle: document.getElementById('orderModalTitle'),
    orderEditId: document.getElementById('orderEditId'),
    orderItemType: document.getElementById('orderItemType'),
    orderItemLabel: document.getElementById('orderItemLabel'),
    orderItemSelect: document.getElementById('orderItemSelect'),
    orderClientName: document.getElementById('orderClientName'),
    orderClientContact: document.getElementById('orderClientContact'),
    orderQuantity: document.getElementById('orderQuantity'),
    orderStatus: document.getElementById('orderStatus'),
    orderPaymentStatus: document.getElementById('orderPaymentStatus'),
    orderTarget: document.getElementById('orderTarget'),
    orderTargetField: document.getElementById('orderTargetField'),
    orderCalcPreview: document.getElementById('orderCalcPreview'),
    orderNotes: document.getElementById('orderNotes'),
    orderSaveBtn: document.getElementById('orderSaveBtn'),
    voidModal: document.getElementById('voidModal'),
    voidOrderId: document.getElementById('voidOrderId'),
    voidReason: document.getElementById('voidReason'),
    confirmVoidBtn: document.getElementById('confirmVoidBtn'),
    orderDetailsModal: document.getElementById('orderDetailsModal'),
    orderDetailsBody: document.getElementById('orderDetailsBody')
  };

  let activePanel = 'dashboard';
  let servicePage = 1;
  let orderPage = 1;
  let digitalProductPage = 1;
  let pendingDigitalImageData = '';
  let cloudHydrationPromise = null;
  const adminNavHomeParent = els.adminSidebarNav ? els.adminSidebarNav.parentElement : null;
  const adminNavNextSibling = els.adminSidebarNav ? els.adminSidebarNav.nextSibling : null;
  const servicePageSize = 8;
  const orderPageSize = 10;
  const digitalProductPageSize = 8;

  const statusLabels = {
    active: 'Active',
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    cancelled: 'Cancelled',
    voided: 'Voided'
  };

  const paymentLabels = {
    paid: 'Paid',
    partial: 'Partial',
    unpaid: 'Unpaid'
  };

  // v5.3.23: persistent admin login across refresh/tabs. Only Logout clears it.
  const ADMIN_SESSION_KEY = (Store && Store.KEYS && Store.KEYS.session) || 'novalyte.adminSession.v1';
  const ADMIN_PERSIST_KEY = 'novalyte.adminSession.persist.v5322';
  const ADMIN_LEGACY_PERSIST_KEY = 'novalyte.adminSession.persist.v5321';
  const ADMIN_AUTH_KEY = 'novalyte.admin.auth.v5322';
  const ADMIN_COOKIE_KEY = 'novalyte_admin_session';
  const ADMIN_WINDOW_NAME_KEY = 'novalyte_admin_window_session_v5322';
  const ADMIN_CHANNEL_KEY = 'novalyte-admin-session-channel';
  const ADMIN_SESSION_VALUE = 'true';
  const ADMIN_COMPAT_SESSION_VALUES = new Set(['true', '1', 'yes', 'logged-in']);
  let adminSessionChannel = null;

  function safeLocalSet(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* storage can be disabled */ }
  }

  function safeLocalGet(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }

  function safeLocalRemove(key) {
    try { localStorage.removeItem(key); } catch (error) { /* storage can be disabled */ }
  }

  function safeSessionSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch (error) { /* storage can be disabled */ }
  }

  function safeSessionGet(key) {
    try { return sessionStorage.getItem(key); } catch (error) { return null; }
  }

  function safeSessionRemove(key) {
    try { sessionStorage.removeItem(key); } catch (error) { /* storage can be disabled */ }
  }

  function setAdminCookie(value) {
    try {
      if (value) {
        const maxAge = 60 * 60 * 24 * 30;
        document.cookie = `${ADMIN_COOKIE_KEY}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
      } else {
        document.cookie = `${ADMIN_COOKIE_KEY}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      }
    } catch (error) { /* cookies can be disabled */ }
  }

  function hasAdminCookie() {
    try {
      return document.cookie.split(';').some(part => part.trim() === `${ADMIN_COOKIE_KEY}=true`);
    } catch (error) {
      return false;
    }
  }

  function setAdminWindowSession(value) {
    try {
      if (value) {
        const current = String(window.name || '');
        window.name = current.includes(ADMIN_WINDOW_NAME_KEY) ? current : `${current}|${ADMIN_WINDOW_NAME_KEY}`;
      } else {
        window.name = String(window.name || '').replace(`|${ADMIN_WINDOW_NAME_KEY}`, '').replace(ADMIN_WINDOW_NAME_KEY, '');
      }
    } catch (error) { /* window name can be restricted */ }
  }

  function hasAdminWindowSession() {
    try { return String(window.name || '').includes(ADMIN_WINDOW_NAME_KEY); } catch (error) { return false; }
  }

  function setAdminHistorySession(value) {
    try {
      const nextState = { ...(history.state || {}) };
      if (value) nextState.novalyteAdminLoggedIn = true;
      else delete nextState.novalyteAdminLoggedIn;
      history.replaceState(nextState, document.title, window.location.href);
    } catch (error) { /* history state can be restricted */ }
  }

  function hasAdminHistorySession() {
    try { return Boolean(history.state && history.state.novalyteAdminLoggedIn); } catch (error) { return false; }
  }

  function isSessionValue(value) {
    return ADMIN_COMPAT_SESSION_VALUES.has(String(value || '').trim().toLowerCase());
  }

  function isLoggedIn() {
    return isSessionValue(safeLocalGet(ADMIN_SESSION_KEY)) ||
      isSessionValue(safeLocalGet(ADMIN_PERSIST_KEY)) ||
      isSessionValue(safeLocalGet(ADMIN_LEGACY_PERSIST_KEY)) ||
      isSessionValue(safeLocalGet(ADMIN_AUTH_KEY)) ||
      isSessionValue(safeSessionGet(ADMIN_SESSION_KEY)) ||
      isSessionValue(safeSessionGet(ADMIN_AUTH_KEY)) ||
      hasAdminCookie() ||
      hasAdminWindowSession() ||
      hasAdminHistorySession();
  }

  function broadcastAdminSession(value) {
    try {
      if (adminSessionChannel) adminSessionChannel.postMessage({ type: value ? 'admin-login' : 'admin-logout' });
    } catch (error) { /* BroadcastChannel can be unavailable */ }
  }

  function persistLoggedIn(options = {}) {
    safeLocalSet(ADMIN_SESSION_KEY, ADMIN_SESSION_VALUE);
    safeLocalSet(ADMIN_PERSIST_KEY, ADMIN_SESSION_VALUE);
    safeLocalSet(ADMIN_LEGACY_PERSIST_KEY, ADMIN_SESSION_VALUE);
    safeLocalSet(ADMIN_AUTH_KEY, ADMIN_SESSION_VALUE);
    safeSessionSet(ADMIN_SESSION_KEY, ADMIN_SESSION_VALUE);
    safeSessionSet(ADMIN_AUTH_KEY, ADMIN_SESSION_VALUE);
    setAdminCookie(true);
    setAdminWindowSession(true);
    setAdminHistorySession(true);
    if (!options.silent) broadcastAdminSession(true);
  }

  function clearLoggedIn(options = {}) {
    safeLocalRemove(ADMIN_SESSION_KEY);
    safeLocalRemove(ADMIN_PERSIST_KEY);
    safeLocalRemove(ADMIN_LEGACY_PERSIST_KEY);
    safeLocalRemove(ADMIN_AUTH_KEY);
    safeSessionRemove(ADMIN_SESSION_KEY);
    safeSessionRemove(ADMIN_AUTH_KEY);
    setAdminCookie(false);
    setAdminWindowSession(false);
    setAdminHistorySession(false);
    if (!options.silent) broadcastAdminSession(false);
  }

  function setLoggedIn(value) {
    if (value) persistLoggedIn();
    else clearLoggedIn();
  }

  function restorePersistentAdminSession() {
    if (!isLoggedIn()) return false;
    persistLoggedIn({ silent: true });
    return true;
  }

  function setupAdminSessionSync() {
    try {
      if ('BroadcastChannel' in window) {
        adminSessionChannel = new BroadcastChannel(ADMIN_CHANNEL_KEY);
        adminSessionChannel.onmessage = event => {
          if (!event.data || !event.data.type) return;
          if (event.data.type === 'admin-login') {
            persistLoggedIn({ silent: true });
            if (els.loginView && !els.loginView.classList.contains('hidden')) showDashboard();
          }
          if (event.data.type === 'admin-logout') {
            clearLoggedIn({ silent: true });
            showLogin();
          }
          if (event.data.type === 'admin-session-request' && isLoggedIn()) {
            broadcastAdminSession(true);
          }
        };
        adminSessionChannel.postMessage({ type: 'admin-session-request' });
      }
    } catch (error) { /* BroadcastChannel can be unavailable */ }

    window.addEventListener('storage', event => {
      if (![ADMIN_SESSION_KEY, ADMIN_PERSIST_KEY, ADMIN_AUTH_KEY, ADMIN_LEGACY_PERSIST_KEY].includes(event.key)) return;
      if (isLoggedIn()) showDashboard();
      else showLogin();
    });
  }

  function setAdminBodyMode(mode) {
    document.body.classList.toggle('admin-dashboard-mode', mode === 'dashboard');
    document.body.classList.toggle('admin-login-mode', mode !== 'dashboard');
    if (mode !== 'dashboard') document.body.classList.remove('admin-nav-open');
  }

  function panelFromHash() {
    const panel = String(window.location.hash || '').replace('#', '');
    return ['dashboard', 'services', 'digital-products', 'investments', 'orders'].includes(panel) ? panel : '';
  }

  function updateCloudSyncStatus(state = '', message = '') {
    if (!els.cloudSyncStatus) return;
    const configured = Boolean(Remote && Remote.isConfigured && Remote.isConfigured());
    const authenticated = Boolean(Remote && Remote.hasAdminSession && Remote.hasAdminSession());
    const mode = state || (configured ? (authenticated ? 'synced' : 'warning') : 'local');
    const text = message || (configured
      ? (authenticated ? 'Shared cloud sync ready' : 'Cloud login required')
      : 'Local browser mode');
    els.cloudSyncStatus.className = `sync-status-pill ${mode}`;
    els.cloudSyncStatus.textContent = text;
  }

  async function hydrateCloudAdminData(force = false) {
    if (!Remote || !Remote.isConfigured || !Remote.isConfigured()) {
      updateCloudSyncStatus('local', 'Local browser mode');
      return { ok: false, reason: 'not-configured' };
    }
    if (!Remote.hasAdminSession || !Remote.hasAdminSession()) {
      updateCloudSyncStatus('warning', 'Cloud login required');
      return { ok: false, reason: 'not-authenticated' };
    }
    if (cloudHydrationPromise && !force) return cloudHydrationPromise;
    updateCloudSyncStatus('syncing', 'Loading shared data...');
    cloudHydrationPromise = Remote.hydrateAdmin(Store)
      .then(result => {
        if (result && result.ok) {
          renderAll();
          if (Remote && Remote.startAdminSync) Remote.startAdminSync(Store, { intervalMs: 4000 });
          updateCloudSyncStatus('synced', 'Shared data is up to date');
        } else if (result) {
          updateCloudSyncStatus('error', result.message || 'Shared sync failed');
          Store.toast(result.message || 'Shared sync failed. Check the Supabase setup and admin profile.', 'error');
        }
        return result;
      })
      .catch(error => {
        updateCloudSyncStatus('error', 'Shared sync failed');
        Store.toast(`Shared sync failed: ${error.message}`, 'error');
        return { ok: false, reason: 'request-failed', message: error.message };
      })
      .finally(() => {
        cloudHydrationPromise = null;
      });
    return cloudHydrationPromise;
  }

  function showDashboard() {
    activePanel = panelFromHash() || activePanel || 'dashboard';
    setAdminBodyMode('dashboard');
    els.loginView.classList.add('hidden');
    els.dashboardView.classList.remove('hidden');
    renderAll();
    updateCloudSyncStatus();
    if (window.NovalyteShowAdminPanel) window.NovalyteShowAdminPanel(activePanel);
    hydrateCloudAdminData();
  }

  function showLogin() {
    if (Remote && Remote.stopAdminSync) Remote.stopAdminSync();
    closeAdminMobileNav();
    setAdminBodyMode('login');
    els.loginView.classList.remove('hidden');
    els.dashboardView.classList.add('hidden');
  }

  function sanitize(text) {
    return String(text ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function platformAsset(platform) {
    const key = String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const files = {
      facebook: 'facebook.png',
      instagram: 'instagram.png',
      tiktok: 'tiktok.png',
      youtube: 'youtube.png',
      telegram: 'telegram.png',
      twitter: 'twitter.png',
      x: 'twitter.png'
    };
    return files[key] || '';
  }

  function platformFallback(platform) {
    const key = String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const map = { facebook: 'f', instagram: 'ig', tiktok: 'tt', youtube: 'yt', telegram: 'tg', twitter: 'x', x: 'x' };
    return map[key] || String(platform || '?').trim().slice(0, 2).toLowerCase();
  }

  function platformIcon(platform) {
    const file = platformAsset(platform);
    const fallback = sanitize(platformFallback(platform));
    if (!file) return `<span class="platform-icon-fallback">${fallback}</span>`;
    return `<span class="platform-icon-wrap"><img class="platform-icon-img" src="assets/icons/social/${file}" alt="${sanitize(platform)} icon" loading="lazy" onerror="this.classList.add('is-missing'); this.nextElementSibling.classList.remove('hidden');"><span class="platform-icon-fallback hidden">${fallback}</span></span>`;
  }

  function platformBadge(platform) {
    const key = String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<span class="platform-pill platform-${key}">${platformIcon(platform)}<span>${sanitize(platform)}</span></span>`;
  }

  function ensurePagination(id, afterElement) {
    let el = document.getElementById(id);
    if (!el && afterElement) {
      el = document.createElement('div');
      el.id = id;
      el.className = 'pagination-bar admin-pagination';
      afterElement.insertAdjacentElement('afterend', el);
    }
    return el;
  }

  function setupAdminPanels() {
    const navLinks = [...document.querySelectorAll('.sidebar-nav a[href^="#"]')];
    function showPanel(panel) {
      activePanel = panel || 'dashboard';
      document.body.dataset.adminPanel = activePanel;
      const dashboard = document.getElementById('dashboard');
      const stats = document.getElementById('statsGrid');
      const services = document.getElementById('services');
      const digitalProductsAdmin = document.getElementById('digital-products');
      const investments = document.getElementById('investments');
      const orders = document.getElementById('orders');
      [dashboard, stats, services, digitalProductsAdmin, investments, orders].forEach(el => el && el.classList.add('hidden'));
      if (activePanel === 'dashboard') {
        dashboard && dashboard.classList.remove('hidden');
        stats && stats.classList.add('hidden'); // v6.0.16: analytics-only Dashboard
      }
      if (activePanel === 'services') services && services.classList.remove('hidden');
      if (activePanel === 'digital-products') digitalProductsAdmin && digitalProductsAdmin.classList.remove('hidden');
      if (activePanel === 'investments') investments && investments.classList.remove('hidden');
      if (activePanel === 'orders') orders && orders.classList.remove('hidden'); novalyteApplyStrictAdminPanel(activePanel);
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activePanel}`));
      const nextHash = `#${activePanel}`;
      if (window.location.hash !== nextHash) {
        try { history.replaceState(null, '', nextHash); } catch (error) { window.location.hash = nextHash; }
      }
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    navLinks.forEach(link => {
      link.addEventListener('click', event => {
        const target = link.getAttribute('href').replace('#', '');
        if (!['dashboard', 'services', 'digital-products', 'investments', 'orders'].includes(target)) return;
        event.preventDefault();
        showPanel(target);
      });
    });
    window.NovalyteShowAdminPanel = showPanel;
  }

  function platformOptions() {
    const services = Store.getServices();
    return [...new Set(services.map(item => item.platform).filter(Boolean))].sort();
  }

  function digitalProductImage(product) {
    const value = product.imageData || product.image || '';
    if (!value) return '';
    if (/^(data:|https?:|blob:)/i.test(value)) return value;
    return `assets/img/digital/${encodeURIComponent(value)}`;
  }

  function digitalProductCategories() {
    return [...new Set(Store.getDigitalProducts().map(item => item.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function fillAdminDigitalProductFilters() {
    if (!els.adminDigitalProductFilter) return;
    const current = els.adminDigitalProductFilter.value || 'all';
    els.adminDigitalProductFilter.innerHTML = '<option value="all">All categories</option>';
    digitalProductCategories().forEach(category => {
      const opt = document.createElement('option');
      opt.value = category;
      opt.textContent = category;
      els.adminDigitalProductFilter.append(opt);
    });
    if ([...els.adminDigitalProductFilter.options].some(opt => opt.value === current)) els.adminDigitalProductFilter.value = current;
  }

  function filteredDigitalProducts() {
    if (!els.adminDigitalProductSearch || !els.adminDigitalProductFilter) return Store.getDigitalProducts();
    const search = els.adminDigitalProductSearch.value.trim().toLowerCase();
    const category = els.adminDigitalProductFilter.value || 'all';
    const status = els.adminDigitalProductStatusFilter ? els.adminDigitalProductStatusFilter.value || 'shown' : 'shown';
    return Store.getDigitalProducts().filter(product => {
      const text = `${product.name} ${product.category} ${product.description} ${product.duration} ${product.image}`.toLowerCase();
      const hidden = product.visible === false;
      const disabled = product.disabled === true;
      const matchesSearch = !search || text.includes(search);
      const matchesCategory = category === 'all' || product.category === category;
      const matchesStatus = status === 'all' || (status === 'shown' && !hidden) || (status === 'disabled' && disabled) || (status === 'hidden' && hidden);
      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }

  function renderDigitalProductsPagination(total) {
    if (!els.digitalProductsTable) return;
    const wrapper = els.digitalProductsTable.closest('.table-wrap');
    const pager = ensurePagination('adminDigitalProductsPagination', wrapper);
    if (!pager) return;
    const pages = Math.max(1, Math.ceil(total / digitalProductPageSize));
    digitalProductPage = Math.min(digitalProductPage, pages);
    if (pages <= 1) {
      pager.innerHTML = '';
      return;
    }
    const start = (digitalProductPage - 1) * digitalProductPageSize + 1;
    const end = Math.min(total, digitalProductPage * digitalProductPageSize);
    pager.innerHTML = `
      <div class="page-summary">Showing ${Store.formatNumber(start)}-${Store.formatNumber(end)} of ${Store.formatNumber(total)} digital products</div>
      <div class="page-buttons">
        <button class="btn small" type="button" data-admin-digital-page="prev" ${digitalProductPage === 1 ? 'disabled' : ''}>Previous</button>
        <span class="page-chip">Page ${digitalProductPage} / ${pages}</span>
        <button class="btn small" type="button" data-admin-digital-page="next" ${digitalProductPage === pages ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }

  function renderDigitalProductsTable() {
    if (!els.digitalProductsTable) return;
    const products = filteredDigitalProducts();
    renderDigitalProductsPagination(products.length);
    if (!products.length) {
      els.digitalProductsTable.innerHTML = '<tr class="empty-table-row"><td colspan="6"><div class="empty-state">No digital products found.</div></td></tr>';
      return;
    }
    const start = (digitalProductPage - 1) * digitalProductPageSize;
    const paged = products.slice(start, start + digitalProductPageSize);
    els.digitalProductsTable.innerHTML = paged.map(product => {
      const statusText = product.visible === false ? 'Hidden' : product.disabled ? 'Disabled' : 'Visible';
      const statusClass = product.visible === false ? 'is-hidden' : product.disabled ? 'disabled' : 'visible';
      const toggleText = product.disabled ? 'Enable' : 'Disable';
      const toggleClass = product.disabled ? 'success' : 'danger';
      const toggleValue = product.disabled ? 'false' : 'true';
      return `
        <tr class="${[product.disabled ? 'is-admin-digital-disabled' : '', product.visible === false ? 'is-admin-digital-hidden' : ''].filter(Boolean).join(' ')}">
          <td data-label="Product">
            <div class="admin-product-cell">
              <img src="${sanitize(digitalProductImage(product))}" alt="${sanitize(product.name)}" loading="lazy">
              <div><strong>${sanitize(product.name)}</strong><br><span class="service-desc">${sanitize(product.description || 'No description')}</span></div>
            </div>
          </td>
          <td data-label="Category">${sanitize(product.category || 'Digital Product')}</td>
          <td data-label="Client / Cost"><strong>${Store.formatMoney(product.price)}</strong><br><span class="service-desc">Cost: ${Store.formatMoney(product.providerPrice || 0)}</span></td>
          <td data-label="Duration">${sanitize(product.duration || '1 Month Access')}</td>
          <td data-label="Status"><span class="status-pill ${statusClass}">${statusText}</span></td>
          <td data-label="Actions">
            <div class="actions-cell admin-digital-actions">
              <button class="btn small primary" type="button" data-create-digital-order="${sanitize(product.id)}" ${product.disabled || product.visible === false ? 'disabled' : ''}>Create Order</button>
              <button class="btn small" type="button" data-edit-digital-product="${sanitize(product.id)}">Edit</button>
              <button class="btn small ${toggleClass}" type="button" data-toggle-digital-product="${sanitize(product.id)}" data-toggle-value="${toggleValue}">${toggleText}</button>
              <button class="btn small danger ghost-danger" type="button" data-delete-digital-product="${sanitize(product.id)}">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function getDigitalProductById(id) {
    return Store.getDigitalProducts().find(product => product.id === id);
  }

  function getDigitalProductImageSrc() {
    const data = pendingDigitalImageData || (els.digitalProductImage ? els.digitalProductImage.value.trim() : '');
    return /^(data:|https?:|blob:)/i.test(data) ? data : data ? `assets/img/digital/${encodeURIComponent(data)}` : '';
  }

  function setDigitalProductPreviewVisible(visible) {
    if (!els.digitalProductPreviewField) return;
    els.digitalProductPreviewField.classList.toggle('hidden', !visible);
  }

  function updateDigitalProductPreview(showPreview = false) {
    const src = getDigitalProductImageSrc();
    if (els.digitalProductImagePreview) {
      els.digitalProductImagePreview.src = src;
      els.digitalProductImagePreview.alt = els.digitalProductName.value || 'Digital product preview';
    }
    if (els.digitalProductImageModalPreview) {
      els.digitalProductImageModalPreview.src = src;
      els.digitalProductImageModalPreview.alt = els.digitalProductName.value || 'Digital product preview';
    }
    if (els.digitalProductViewImageBtn) {
      els.digitalProductViewImageBtn.classList.toggle('hidden', !src);
      els.digitalProductViewImageBtn.textContent = 'View image';
    }
    setDigitalProductPreviewVisible(false);
    if (showPreview && src && els.digitalProductImageModal) openModal(els.digitalProductImageModal);
  }

  function updateDigitalProductProfitPreview() {
    if (!els.digitalProductProfitPreview) return;
    const client = Number(els.digitalProductPrice ? els.digitalProductPrice.value : 0) || 0;
    const provider = Number(els.digitalProductProviderPrice ? els.digitalProductProviderPrice.value : 0) || 0;
    const profit = client - provider;
    els.digitalProductProfitPreview.textContent = `Provider cost: ${Store.formatMoney(provider)} · Profit: ${Store.formatMoney(profit)}`;
  }

  function fillDigitalProductForm(product) {
    const isNew = !product;
    const data = product || {
      id: '', name: '', price: 0, providerPrice: 0, category: 'Digital Product', image: '', imageData: '', duration: '1 Month Access', description: '', visible: true
    };
    pendingDigitalImageData = data.imageData || '';
    els.digitalProductAdminModalTitle.textContent = isNew ? 'Add Digital Product' : 'Edit Digital Product';
    els.digitalProductEditId.value = data.id || '';
    els.digitalProductName.value = data.name || '';
    els.digitalProductCategory.value = data.category || '';
    els.digitalProductPrice.value = Number(data.price) || 0;
    if (els.digitalProductProviderPrice) els.digitalProductProviderPrice.value = Number(data.providerPrice) || 0;
    els.digitalProductDuration.value = data.duration || '';
    els.digitalProductImage.value = data.image || '';
    els.digitalProductVisible.checked = data.visible !== false;
    els.digitalProductDescription.value = data.description || '';
    if (els.digitalProductImageUpload) els.digitalProductImageUpload.value = '';
    updateDigitalProductPreview(false);
    updateDigitalProductProfitPreview();
    openModal(els.digitalProductAdminModal);
  }

  function saveDigitalProductFromForm(event) {
    event.preventDefault();
    const id = els.digitalProductEditId.value || Store.uid('dp');
    const products = Store.getDigitalProducts();
    const existingIndex = products.findIndex(product => product.id === id);
    const product = {
      id,
      name: els.digitalProductName.value.trim(),
      category: els.digitalProductCategory.value.trim(),
      price: Number(els.digitalProductPrice.value) || 0,
      providerPrice: Number(els.digitalProductProviderPrice ? els.digitalProductProviderPrice.value : 0) || 0,
      duration: els.digitalProductDuration.value.trim() || '1 Month Access',
      image: els.digitalProductImage.value.trim(),
      imageData: pendingDigitalImageData || '',
      visible: els.digitalProductVisible.checked,
      disabled: existingIndex >= 0 ? Boolean(products[existingIndex].disabled) : false,
      description: els.digitalProductDescription.value.trim()
    };
    if (!product.name || !product.category) {
      Store.toast('Complete required digital product details.', 'error');
      return;
    }
    if (!product.image && !product.imageData) {
      Store.toast('Add an image filename, URL, or uploaded image.', 'error');
      return;
    }
    if (existingIndex >= 0) products[existingIndex] = product;
    else products.unshift(product);
    Store.saveDigitalProducts(products);
    closeModal(els.digitalProductAdminModal);
    pendingDigitalImageData = '';
    fillAdminDigitalProductFilters();
    renderDigitalProductsTable();
    Store.toast('Digital product saved. Client Digital Products page will use the updated details.');
  }


  function dateText(value) {
    return value ? new Date(value).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }) : '-';
  }


// v6.0.15 requested-only: dashboard sales and revenue analytics
function renderDashboardAnalytics() {
  const chart = document.getElementById('dashboardSalesRevenueChart');
  const summary = document.getElementById('dashboardAnalyticsSummary');
  if (!chart || !summary) return;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const orders = Store.getOrders().filter(order => !['voided', 'cancelled'].includes(String(order.status || '').toLowerCase()) && String(order.itemType || 'service') !== 'digital-product');
  const validDates = orders
    .map(order => new Date(order.createdAt))
    .filter(date => !Number.isNaN(date.getTime()));
  const chartYear = validDates.length
    ? Math.max(...validDates.map(date => date.getFullYear()))
    : new Date().getFullYear();

  const monthlySales = Array(12).fill(0);
  const monthlyRevenue = Array(12).fill(0);
  const monthlyActivity = Array(12).fill(0);

  orders.forEach(order => {
    const date = new Date(order.createdAt);
    if (Number.isNaN(date.getTime()) || date.getFullYear() !== chartYear) return;
    const monthIndex = date.getMonth();
    monthlySales[monthIndex] += Number(order.clientCharge) || 0;
    monthlyRevenue[monthIndex] += Number(order.revenue) || 0;
    monthlyActivity[monthIndex] += 1;
  });

  const activeMonths = monthlyActivity
    .map((count, index) => count > 0 ? index : -1)
    .filter(index => index >= 0);

  const findPoint = (values, mode) => {
    if (!activeMonths.length) return { index: 0, value: 0 };
    const index = activeMonths.reduce((best, current) => {
      if (mode === 'max') return values[current] > values[best] ? current : best;
      return values[current] < values[best] ? current : best;
    }, activeMonths[0]);
    return { index, value: values[index] };
  };

  const highestSales = findPoint(monthlySales, 'max');
  const lowestSales = findPoint(monthlySales, 'min');
  const highestRevenue = findPoint(monthlyRevenue, 'max');
  const lowestRevenue = findPoint(monthlyRevenue, 'min');

  const totalProviderCost = orders.reduce((sum, order) => sum + (Number(order.providerCharge) || 0), 0);
  const totalRevenue = monthlyRevenue.reduce((sum, value) => sum + value, 0);
  const roi = totalProviderCost > 0 ? (totalRevenue / totalProviderCost) * 100 : 0;

  const width = 1000;
  const height = 330;
  const left = 72;
  const right = 28;
  const top = 32;
  const bottom = 50;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const scaleMax = Math.max(1, ...monthlySales, ...monthlyRevenue);
  const x = index => left + (plotWidth / 11) * index;
  const y = value => top + plotHeight * (1 - (value / scaleMax));
  const pathFor = values => values
    .map((value, index) => `${index === 0 ? 'M' : 'L'} ${x(index).toFixed(2)} ${y(value).toFixed(2)}`)
    .join(' ');
  const areaFor = values => `${pathFor(values)} L ${x(11).toFixed(2)} ${(top + plotHeight).toFixed(2)} L ${x(0).toFixed(2)} ${(top + plotHeight).toFixed(2)} Z`;

  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    const yPosition = top + plotHeight * ratio;
    const value = scaleMax * (1 - ratio);
    return `<line class="dashboard-chart-gridline" x1="${left}" y1="${yPosition.toFixed(2)}" x2="${width - right}" y2="${yPosition.toFixed(2)}"></line><text class="dashboard-chart-y-label" x="${left - 12}" y="${(yPosition + 4).toFixed(2)}" text-anchor="end">${Store.formatMoney(value)}</text>`;
  }).join('');

  const monthLabels = monthNames.map((month, index) => `<text class="dashboard-chart-month-label" x="${x(index).toFixed(2)}" y="${height - 17}" text-anchor="middle">${month}</text>`).join('');

  const pointsFor = (values, className) => values.map((value, index) => `<circle class="dashboard-chart-point ${className}" cx="${x(index).toFixed(2)}" cy="${y(value).toFixed(2)}" r="4"><title>${monthNames[index]} ${chartYear}: ${Store.formatMoney(value)}</title></circle>`).join('');

  chart.innerHTML = `
    <div class="dashboard-chart-year">${chartYear}</div>
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="novalyteSalesArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff5d6c" stop-opacity="0.24"></stop>
          <stop offset="100%" stop-color="#ff5d6c" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient id="novalyteRevenueArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#67d8ff" stop-opacity="0.25"></stop>
          <stop offset="100%" stop-color="#67d8ff" stop-opacity="0"></stop>
        </linearGradient>
        <filter id="novalyteSalesGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
          <feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
        </filter>
        <filter id="novalyteRevenueGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
          <feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
        </filter>
      </defs>
      ${gridLines}
      <path class="dashboard-chart-area sales" d="${areaFor(monthlySales)}"></path>
      <path class="dashboard-chart-area revenue" d="${areaFor(monthlyRevenue)}"></path>
      <path class="dashboard-chart-line sales" d="${pathFor(monthlySales)}"></path>
      <path class="dashboard-chart-line revenue" d="${pathFor(monthlyRevenue)}"></path>
      ${pointsFor(monthlySales, 'sales')}
      ${pointsFor(monthlyRevenue, 'revenue')}
      ${monthLabels}
    </svg>
    ${activeMonths.length ? '' : '<div class="dashboard-chart-empty">No order activity recorded for this year yet.</div>'}
  `;

  const summaryItems = [
    { label: 'Highest sales', point: highestSales, tone: 'sales' },
    { label: 'Lowest sales', point: lowestSales, tone: 'sales' },
    { label: 'Highest revenue', point: highestRevenue, tone: 'revenue' },
    { label: 'Lowest revenue', point: lowestRevenue, tone: 'revenue' }
  ];

  summary.innerHTML = summaryItems.map(item => `
    <article class="dashboard-analytics-summary-card ${item.tone}">
      <span>${item.label}</span>
      <strong>${Store.formatMoney(item.point.value)}</strong>
      <small>${monthNames[item.point.index]} ${chartYear}</small>
    </article>
  `).join('') + `
    <article class="dashboard-analytics-summary-card roi">
      <span>Service ROI</span>
      <strong>${roi.toFixed(1)}%</strong>
      <small>Revenue versus provider cost</small>
    </article>
  `;
}
// end v6.0.15 dashboard analytics
function renderStats() {
    const totals = Store.getTotals();
    const fundClass = totals.availableFund < 0 ? 'bad' : totals.availableFund < Math.max(totals.invest * 0.25, 1) ? 'warn' : 'good';
    const stats = [
      { label: 'TOTAL INVEST', value: Store.formatMoney(totals.invest), className: '' },
      { label: 'TOTAL ORDERS / PROVIDER CHARGES', value: Store.formatMoney(totals.providerCharges), className: '' },
      { label: 'TOTAL CLIENT SALES', value: Store.formatMoney(totals.clientSales), className: '' },
      { label: 'TOTAL REVENUE', value: Store.formatMoney(totals.revenue), className: 'good' },
      { label: 'AVAILABLE FUND ESTIMATE', value: Store.formatMoney(totals.availableFund), className: fundClass },
      { label: 'PAID SALES', value: Store.formatMoney(totals.paidSales), className: 'good' },
      { label: 'RECEIVABLES', value: Store.formatMoney(totals.receivables), className: totals.receivables ? 'warn' : '' },
      { label: 'ACTIVE RECORDS', value: Store.formatNumber(totals.activeCount), className: '' },
      { label: 'COMPLETED', value: Store.formatNumber(totals.completedCount), className: 'good' },
      { label: 'PROCESSING', value: Store.formatNumber(totals.processingCount), className: '' },
      { label: 'VOIDED', value: Store.formatNumber(totals.voidedCount), className: totals.voidedCount ? 'warn' : '' },
      { label: 'ALL RECORDS', value: Store.formatNumber(totals.allCount), className: '' }
    ];

    els.statsGrid.innerHTML = stats.map(item => `
      <article class="stat-card ${item.className}">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </article>
    `).join('');
    renderDashboardAnalytics(); els.investAmount.value = totals.invest || '';
  }

  function financeTypeLabel(type) {
    const labels = {
      'capital-in': 'Add Funds / Reload',
      'owner-payout': 'Owner Payout',
      'payroll-payout': 'Team Payroll Payout',
      expense: 'Other Expense'
    };
    return labels[type] || 'Finance Entry';
  }

  function financeAmountClass(type) {
    return type === 'capital-in' ? 'good' : type === 'owner-payout' || type === 'payroll-payout' ? 'warn' : 'bad';
  }

  function renderInvestmentAnalytics() {
    if (!els.investmentAnalyticsGrid) return;
    const totals = Store.getFinanceTotals ? Store.getFinanceTotals() : Store.getTotals();
    const entries = Store.getFinanceEntries ? Store.getFinanceEntries() : Store.getInvestments();
    const roi = totals.capitalIn > 0 ? (totals.retainedProfit / totals.capitalIn) * 100 : 0;
    const availableClass = totals.availableCapital < 0 ? 'bad' : totals.availableCapital < Math.max(totals.capitalIn * 0.25, 1) ? 'warn' : 'good';
    const metrics = [
      { label: 'Total capital', value: Store.formatMoney(totals.capitalIn), note: `${Store.formatNumber(Store.getInvestments().length)} capital reload logs`, className: '' },
      { label: 'Used for provider orders', value: Store.formatMoney(totals.providerCharges), note: 'Based on non-voided order records', className: '' },
      { label: 'Available capital', value: Store.formatMoney(totals.availableCapital), note: 'Capital minus provider charges', className: availableClass },
      { label: 'Gross revenue', value: Store.formatMoney(totals.revenue), note: 'Client sales minus provider costs', className: totals.revenue > 0 ? 'good' : '' },
      { label: 'Owner payouts', value: Store.formatMoney(totals.ownerPayout || 0), note: 'Self payout logs', className: totals.ownerPayout ? 'warn' : '' },
      { label: 'Team payroll paid', value: Store.formatMoney(totals.payrollPayout || 0), note: `${Store.formatNumber(totals.teamCount || 0)} team rules saved`, className: totals.payrollPayout ? 'warn' : '' },
      { label: 'Net retained', value: Store.formatMoney(totals.retainedProfit || 0), note: `${roi.toFixed(1)}% retained return vs capital`, className: totals.retainedProfit < 0 ? 'bad' : totals.retainedProfit > 0 ? 'good' : '' },
      { label: 'Cash wallet estimate', value: Store.formatMoney(totals.paidWallet || 0), note: 'Paid sales minus costs and payouts', className: totals.paidWallet < 0 ? 'bad' : totals.paidWallet > 0 ? 'good' : '' },
      { label: 'Paid sales', value: Store.formatMoney(totals.paidSales), note: `${Store.formatNumber(totals.paidCount)} fully paid records`, className: 'good' },
      { label: 'Receivables', value: Store.formatMoney(totals.receivables), note: `${Store.formatNumber(totals.unpaidCount + totals.partialCount)} unpaid/partial records`, className: totals.receivables ? 'warn' : '' }
    ];
    els.investmentAnalyticsGrid.innerHTML = metrics.map(item => `
      <article class="investment-analytics-card ${item.className}">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <small>${item.note}</small>
      </article>
    `).join('');
    if (els.investmentInsightsCard) {
      // v5.3.8: Finance Insight card is intentionally removed from the admin UI.
      els.investmentInsightsCard.innerHTML = '';
      els.investmentInsightsCard.classList.add('hidden');
    }
  }

  function renderInvestments() {
    const entries = Store.getFinanceEntries ? Store.getFinanceEntries() : Store.getInvestments().map(entry => ({ ...entry, type: 'capital-in', person: 'Novalyte Capital', source: 'investment', sourceId: entry.id }));
    if (!els.investmentsTable) return;
    if (!entries.length) {
      els.investmentsTable.innerHTML = '<tr class="empty-table-row"><td colspan="6"><div class="empty-state">No finance logs yet.</div></td></tr>';
      return;
    }

    els.investmentsTable.innerHTML = entries.map(entry => `
      <tr>
        <td data-label="Date">${sanitize(dateText(entry.createdAt))}</td>
        <td data-label="Type"><span class="status-pill ${financeAmountClass(entry.type)}">${sanitize(financeTypeLabel(entry.type))}</span></td>
        <td data-label="Person">${sanitize(entry.person || (entry.type === 'owner-payout' ? 'Self' : '-'))}</td>
        <td data-label="Amount"><strong>${Store.formatMoney(entry.amount)}</strong></td>
        <td data-label="Note">${sanitize(entry.note || 'No note')}</td>
        <td data-label="Action"><button class="btn small danger" type="button" data-remove-finance-entry="${sanitize(entry.id)}" data-finance-source="${sanitize(entry.source || 'finance')}" data-source-id="${sanitize(entry.sourceId || '')}">Remove</button></td>
      </tr>
    `).join('');
  }

  function renderTeamMembers() {
    if (!els.teamMembersTable || !Store.getTeamMembers) return;
    const members = Store.getTeamMembers();
    const totals = Store.getFinanceTotals ? Store.getFinanceTotals() : Store.getTotals();
    if (!members.length) {
      els.teamMembersTable.innerHTML = '<tr class="empty-table-row"><td colspan="4"><div class="empty-state">No team payroll rules yet.</div></td></tr>';
      return;
    }
    els.teamMembersTable.innerHTML = members.map(member => {
      const estimated = member.mode === 'percent' ? (totals.revenue * ((Number(member.amount) || 0) / 100)) : Number(member.amount) || 0;
      const rule = member.mode === 'percent'
        ? `${Number(member.amount) || 0}% ${member.frequency}`
        : `${Store.formatMoney(member.amount)} ${member.frequency}`;
      return `
        <tr>
          <td data-label="Person"><strong>${sanitize(member.name)}</strong></td>
          <td data-label="Rule">${sanitize(rule)}</td>
          <td data-label="Est. Share">${Store.formatMoney(estimated)}</td>
          <td data-label="Action"><button class="btn small danger" type="button" data-remove-team-member="${sanitize(member.id)}">Remove</button></td>
        </tr>
      `;
    }).join('');
  }

  function fillAdminFilters() {
    const current = els.adminPlatformFilter.value || 'all';
    els.adminPlatformFilter.innerHTML = '<option value="all">All platforms</option>';
    platformOptions().forEach(platform => {
      const opt = document.createElement('option');
      opt.value = platform;
      opt.textContent = platform;
      els.adminPlatformFilter.append(opt);
    });
    if ([...els.adminPlatformFilter.options].some(opt => opt.value === current)) {
      els.adminPlatformFilter.value = current;
    }
  }

  function filteredServices() {
    const search = els.adminServiceSearch.value.trim().toLowerCase();
    const platform = els.adminPlatformFilter.value || 'all';
    const archive = els.adminArchiveFilter.value || 'active';

    return Store.getServices().filter(service => {
      const archived = service.archived === true;
      const text = `${service.name} ${service.platform} ${service.category} ${service.providerId} ${service.description} ${service.tag}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesPlatform = platform === 'all' || service.platform === platform;
      const hidden = service.visible === false;
      const matchesArchive = archive === 'all' || (archive === 'active' && !hidden) || (archive === 'archived' && archived);
      return matchesSearch && matchesPlatform && matchesArchive;
    });
  }

  function renderAdminServicesPagination(total) {
    const wrapper = els.servicesTable.closest('.table-wrap');
    const pager = ensurePagination('adminServicesPagination', wrapper);
    if (!pager) return;
    const pages = Math.max(1, Math.ceil(total / servicePageSize));
    servicePage = Math.min(servicePage, pages);
    if (pages <= 1) {
      pager.innerHTML = '';
      return;
    }
    const start = (servicePage - 1) * servicePageSize + 1;
    const end = Math.min(total, servicePage * servicePageSize);
    pager.innerHTML = `
      <div class="page-summary">Page ${servicePage} of ${pages} • Showing services ${Store.formatNumber(start)}-${Store.formatNumber(end)} of ${Store.formatNumber(total)}</div>
      <div class="page-buttons">
        <button class="btn small" type="button" data-admin-service-page="prev" ${servicePage === 1 ? 'disabled' : ''}>Previous</button>
        <span class="page-chip">Page ${servicePage} / ${pages}</span>
        <button class="btn small" type="button" data-admin-service-page="next" ${servicePage === pages ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }

  function renderServicesTable() {
    const services = filteredServices();
    renderAdminServicesPagination(services.length);
    if (!services.length) {
      els.servicesTable.innerHTML = '<tr class="empty-table-row"><td colspan="10"><div class="empty-state">No service found.</div></td></tr>';
      return;
    }

    const start = (servicePage - 1) * servicePageSize;
    const paged = services.slice(start, start + servicePageSize);
    els.servicesTable.innerHTML = paged.map(service => {
      const revenue = (Number(service.clientRate) || 0) - (Number(service.providerRate) || 0);
      const statusText = service.archived ? 'Disabled' : service.visible === false ? 'Hidden' : 'Visible';
      const statusClass = service.archived ? 'disabled' : service.visible === false ? 'is-hidden' : 'visible';
      const archiveAction = service.archived
        ? `<button class="btn small success" type="button" data-archive-service="${service.id}" data-archive-value="false">Enable</button>`
        : `<button class="btn small danger" type="button" data-archive-service="${service.id}" data-archive-value="true">Disable</button>`;

      const rowClass = [service.archived ? 'is-admin-service-disabled' : '', service.visible === false ? 'is-admin-service-hidden' : ''].filter(Boolean).join(' ');
      return `
        <tr class="${rowClass}">
          <td data-label="Recommend" class="recommend-cell"><label class="recommend-toggle" title="${service.archived ? 'Enable service to change Recommended' : 'Show in Recommended'}"><input type="checkbox" data-recommend-service="${service.id}" ${service.recommended === true ? 'checked' : ''} ${service.archived ? 'disabled aria-disabled="true"' : ''}><span aria-hidden="true"></span></label></td>
          <td data-label="Service">
            <strong>${sanitize(service.name)}</strong><br>
            <span class="service-desc">${sanitize(service.category)} · ${sanitize(service.avgTime || 'Varies')}</span>
          </td>
          <td data-label="Provider ID"><span class="id-chip">${sanitize(service.providerId)}</span></td>
          <td data-label="Platform">${platformBadge(service.platform)}</td>
<td data-label="ETA" class="service-eta-cell">${sanitize(service.avgTime || 'Not enough data')}</td>
<td data-label="Provider Rate">${Store.formatMoney(service.providerRate)} / ${Store.formatNumber(service.rateUnit)}</td>
          <td data-label="Client Rate"><strong>${Store.formatMoney(service.clientRate)}</strong> / ${Store.formatNumber(service.rateUnit)}</td>
          <td data-label="Revenue/unit"><strong>${Store.formatMoney(revenue)}</strong></td>
          <td data-label="Status"><span class="status-pill ${statusClass}">${statusText}</span></td>
          <td data-label="Actions">
            <div class="actions-cell">
              <button class="btn small primary" type="button" data-create-order="${service.id}" ${service.archived ? 'disabled' : ''}>Create Order</button>
              <button class="btn small" type="button" data-edit-service="${service.id}">Edit</button>
              ${archiveAction}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function filteredOrders() {
    const search = els.orderSearch.value.trim().toLowerCase();
    const status = els.orderStatusFilter.value;
    const payment = els.paymentStatusFilter.value;

    const orderTimestamp = order => {
      const timestamp = new Date(order?.createdAt || 0).getTime();
      return Number.isFinite(timestamp) ? timestamp : 0;
    };

    return Store.getOrders().filter(order => {
      const text = `${order.clientName} ${order.clientContact} ${order.serviceName} ${order.providerId} ${order.platform} ${order.target} ${order.notes} ${order.voidReason}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesStatus = status === 'all' || order.status === status;
      const matchesPayment = payment === 'all' || order.paymentStatus === payment;
      return matchesSearch && matchesStatus && matchesPayment;
    }).sort((a, b) => {
      const aVoided = String(a.status || '').toLowerCase() === 'voided';
      const bVoided = String(b.status || '').toLowerCase() === 'voided';

      if (aVoided !== bVoided) return aVoided ? 1 : -1;
      return orderTimestamp(b) - orderTimestamp(a);
    });
  }

  function renderOrderSummary() {
    if (!els.ordersSummaryGrid) return;
    const totals = Store.getTotals();
    const filtered = filteredOrders();
    const closedCount = (totals.cancelledCount || 0) + (totals.voidedCount || 0);
    const cards = [
      { label: 'FILTERED RECORDS', value: Store.formatNumber(filtered.length), className: '' },
      { label: 'COMPLETED ORDERS', value: Store.formatNumber(totals.completedCount), className: 'good' },
      { label: 'PROCESSING / PENDING', value: Store.formatNumber((totals.processingCount || 0) + (totals.pendingCount || 0)), className: '' },
      { label: 'CANCELLED / VOIDED', value: Store.formatNumber(closedCount), className: closedCount ? 'warn' : '' },
      { label: 'CLIENT SALES', value: Store.formatMoney(totals.clientSales), className: '' },
      { label: 'PROVIDER COST', value: Store.formatMoney(totals.providerCharges), className: '' },
      { label: 'REVENUE', value: Store.formatMoney(totals.revenue), className: 'good' },
      { label: 'RECEIVABLES', value: Store.formatMoney(totals.receivables), className: totals.receivables ? 'warn' : '' }
    ];
    els.ordersSummaryGrid.innerHTML = cards.map(item => `
      <article class="stat-card ${item.className}">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </article>
    `).join('');
  }

  function renderAdminOrdersPagination(total) {
    const wrapper = els.ordersTable.closest('.table-wrap');
    const pager = ensurePagination('adminOrdersPagination', wrapper);
    if (!pager) return;
    const pages = Math.max(1, Math.ceil(total / orderPageSize));
    orderPage = Math.min(orderPage, pages);
    if (pages <= 1) {
      pager.innerHTML = '';
      return;
    }
    const start = (orderPage - 1) * orderPageSize + 1;
    const end = Math.min(total, orderPage * orderPageSize);
    pager.innerHTML = `
      <div class="page-summary">Showing ${Store.formatNumber(start)}-${Store.formatNumber(end)} of ${Store.formatNumber(total)} orders</div>
      <div class="page-buttons">
        <button class="btn small" type="button" data-admin-order-page="prev" ${orderPage === 1 ? 'disabled' : ''}>Previous</button>
        <span class="page-chip">Page ${orderPage} / ${pages}</span>
        <button class="btn small" type="button" data-admin-order-page="next" ${orderPage === pages ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }

  function orderStatusOptions(currentStatus) {
    return ['active', 'pending', 'processing', 'completed'].map(value =>
      `<option value="${value}" ${currentStatus === value ? 'selected' : ''}>${statusLabels[value]}</option>`
    ).join('');
  }

  function renderOrdersTable() {
    const orders = filteredOrders();
    renderAdminOrdersPagination(orders.length);

    if (!orders.length) {
        els.ordersTable.innerHTML = '<tr class="empty-table-row"><td colspan="10"><div class="empty-state">No orders yet.</div></td></tr>';
        return;
    }

    const start = (orderPage - 1) * orderPageSize;
    const paged = orders.slice(start, start + orderPageSize);
    const ordersWrap = document.querySelector('#orders .orders-table-wrap');
    if (ordersWrap) ordersWrap.scrollLeft = 0;

    els.ordersTable.innerHTML = paged.map(order => {
        const status = order.status || 'active';
        const payment = order.paymentStatus || 'paid';
        const isClosed = ['voided', 'cancelled'].includes(status);
        const createdAt = order.createdAt ? new Date(order.createdAt) : null;
        const validDate = createdAt && !Number.isNaN(createdAt.getTime());
        const dateLine = validDate
            ? createdAt.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
            : '-';
        const timeLine = validDate
            ? createdAt.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' })
            : '';
        const safeId = sanitize(order.id || '');
        const orderType = order.orderType === 'digital-product' ? 'Digital product' : 'Boosting service';
        const statusControl = isClosed
            ? `<span class="order-status-pill ${sanitize(status)}">${sanitize(statusLabels[status] || status)}</span>`
            : `<select class="order-status-select" data-order-status-select="${safeId}" aria-label="Order status">${orderStatusOptions(status)}</select>`;
        const voidAction = status === 'voided'
            ? `<button type="button" class="order-action-btn undo" data-undo-void="${safeId}">Undo Void</button>`
            : `<button type="button" class="order-action-btn void" data-void-order="${safeId}">Void</button>`;

        return `
            <tr class="order-row ${isClosed ? 'is-closed' : ''} ${status === 'voided' ? 'is-voided' : ''}">
                <td data-label="Date" class="order-date-cell">
                    <span class="order-date-line">${sanitize(dateLine)}</span>
                    <span class="order-time-line">${sanitize(timeLine)}</span>
                </td>
                <td data-label="Client">
                    <strong>${sanitize(order.clientName || 'No client ref')}</strong>
                    <span class="order-cell-subtext">${sanitize(order.clientContact || 'No contact')}</span>
                </td>
                <td data-label="Service">
                    <strong>${sanitize(order.serviceName || 'Novalyte order')}</strong>
                    <span class="order-cell-subtext">${sanitize(order.providerId || order.itemId || '')} Â· ${sanitize(order.platform || orderType)}</span>
                </td>
                <td data-label="Qty">${Store.formatNumber(order.quantity)}</td>
                <td data-label="Provider">${Store.formatMoney(order.providerCharge)}</td>
                <td data-label="Client"><strong>${Store.formatMoney(order.clientCharge)}</strong></td>
                <td data-label="Revenue"><strong>${Store.formatMoney(order.revenue)}</strong></td>
                <td data-label="Status">${statusControl}</td>
                <td data-label="Payment"><span class="payment-pill ${sanitize(payment)}">${sanitize(paymentLabels[payment] || payment)}</span></td>
                <td data-label="Actions" class="orders-actions-cell">
                    <div class="orders-actions-wrap">
                        <button type="button" class="order-action-btn" data-view-order="${safeId}">View</button>
                        <button type="button" class="order-action-btn" data-edit-order="${safeId}" ${isClosed ? 'disabled' : ''}>Edit</button>
                        ${voidAction}
                    </div>
                </td>
            </tr>`;
    }).join('');
}
function renderAll() {
    Store.getServices();
    fillAdminFilters();
    fillAdminDigitalProductFilters();
    renderStats();
    renderInvestmentAnalytics();
    renderInvestments();
    renderTeamMembers();
    renderServicesTable();
    renderDigitalProductsTable();
    renderOrderSummary();
    renderOrdersTable();
  }

  function openModal(modal) {
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    if (!document.querySelector('.modal-backdrop.open')) document.body.classList.remove('modal-open');
  }

  let activeConfirmResolve = null;

  function closeAdminConfirmModal(value = false) {
    if (!els.adminConfirmModal) return;
    closeModal(els.adminConfirmModal);
    if (activeConfirmResolve) {
      const resolve = activeConfirmResolve;
      activeConfirmResolve = null;
      resolve(Boolean(value));
    }
  }

  // v5.3.10 modal cleanup: browser confirmation dialogs are replaced by the in-site modal.
  function adminConfirm(message, options = {}) {
    if (!els.adminConfirmModal || !els.adminConfirmMessage || !els.adminConfirmOkBtn || !els.adminConfirmCancelBtn) {
      if (Store && Store.toast) Store.toast(message, 'info');
      return Promise.resolve(false);
    }
    if (activeConfirmResolve) closeAdminConfirmModal(false);
    if (els.adminConfirmTitle) els.adminConfirmTitle.textContent = options.title || 'Please confirm';
    els.adminConfirmMessage.textContent = message;
    els.adminConfirmOkBtn.textContent = options.okText || 'OK';
    els.adminConfirmCancelBtn.textContent = options.cancelText || 'Cancel';
    openModal(els.adminConfirmModal);
    els.adminConfirmOkBtn.focus({ preventScroll: true });
    return new Promise(resolve => {
      activeConfirmResolve = resolve;
    });
  }

  function getServiceById(id) {
    return Store.getServices().find(service => service.id === id);
  }

  function getOrderById(id) {
    return Store.getOrders().find(order => order.id === id);
  }

  function fillServiceForm(service) {
    const isNew = !service;
    const data = service || {
      id: '', providerId: '', platform: '', category: '', name: '', description: '', providerRate: 0,
      clientRate: 0, rateUnit: 1000, min: 100, max: 10000, avgTime: '', tag: '', recommended: false, visible: true, archived: false
    };

    els.serviceModalTitle.textContent = isNew ? 'Add Service' : 'Edit Service';
    els.serviceEditId.value = data.id;
    els.serviceName.value = data.name || '';
    els.serviceProviderId.value = data.providerId || '';
    els.servicePlatform.value = data.platform || '';
    els.serviceCategory.value = data.category || '';
    els.serviceProviderRate.value = data.providerRate || 0;
    els.serviceClientRate.value = data.clientRate || 0;
    els.serviceRateUnit.value = data.rateUnit || 1000;
    els.serviceAvgTime.value = data.avgTime || '';
    els.serviceMin.value = data.min || 0;
    els.serviceMax.value = data.max || 0;
    els.serviceTag.value = data.tag || '';
    els.serviceVisible.checked = data.visible !== false;
    els.serviceArchived.checked = data.archived === true;
    els.serviceDescription.value = data.description || '';
    updateServiceRevenuePreview();
    openModal(els.serviceModal);
  }

  function updateServiceRevenuePreview() {
    const providerRate = Number(els.serviceProviderRate.value) || 0;
    const clientRate = Number(els.serviceClientRate.value) || 0;
    const unit = Number(els.serviceRateUnit.value) || 1000;
    const revenue = clientRate - providerRate;
    const margin = clientRate > 0 ? (revenue / clientRate) * 100 : 0;
    els.serviceRevenuePreview.innerHTML = `Revenue preview: <strong>${Store.formatMoney(revenue)}</strong> per ${Store.formatNumber(unit)} quantity · Margin: <strong>${margin.toFixed(1)}%</strong>`;
  }

  function saveServiceFromForm(event) {
    event.preventDefault();
    const id = els.serviceEditId.value || Store.uid('svc');
    const services = Store.getServices();
    const existingIndex = services.findIndex(service => service.id === id);
    const service = {
      id,
      name: els.serviceName.value.trim(),
      providerId: els.serviceProviderId.value.trim(),
      platform: els.servicePlatform.value.trim(),
      category: els.serviceCategory.value.trim(),
      providerRate: Number(els.serviceProviderRate.value) || 0,
      clientRate: Number(els.serviceClientRate.value) || 0,
      rateUnit: Number(els.serviceRateUnit.value) || 1000,
      avgTime: els.serviceAvgTime.value.trim(),
      min: Number(els.serviceMin.value) || 0,
      max: Number(els.serviceMax.value) || 0,
      tag: els.serviceTag.value.trim(),
      recommended: existingIndex >= 0 ? services[existingIndex].recommended === true : false,
      visible: els.serviceArchived.checked ? true : els.serviceVisible.checked,
      archived: els.serviceArchived.checked,
      description: els.serviceDescription.value.trim()
    };

    if (!service.name || !service.providerId || !service.platform || !service.category) {
      Store.toast('Complete required service details.', 'error');
      return;
    }

    if (existingIndex >= 0) services[existingIndex] = service;
    else services.unshift(service);

    Store.saveServices(services);
    closeModal(els.serviceModal);
    Store.toast('Service saved. Client page will use the updated visible price.');
    renderAll();
  }

  function archiveService(serviceId, archived) {
    const services = Store.getServices();
    const service = services.find(item => item.id === serviceId);
    if (!service) return;
    service.archived = archived;
    if (archived) service.visible = true;
    Store.saveServices(services);
    Store.toast(archived ? 'Service disabled. The row stays here and the button changed to Enable.' : 'Service enabled and orderable again.');
    renderAll();
  }

  function toggleDigitalProduct(productId, disabled) {
    const products = Store.getDigitalProducts();
    const product = products.find(item => item.id === productId);
    if (!product) return;
    product.disabled = disabled;
    if (disabled) product.visible = true;
    Store.saveDigitalProducts(products);
    Store.toast(disabled ? 'Digital product disabled. The row stays here and the button changed to Enable.' : 'Digital product enabled and available again.');
    fillAdminDigitalProductFilters();
    renderDigitalProductsTable();
  }

  function deleteDigitalProduct(productId) {
    const product = getDigitalProductById(productId);
    if (!product) return;
    Store.deleteDigitalProduct(productId);
    Store.toast(`${product.name} deleted from Digital Products.`);
    fillAdminDigitalProductFilters();
    renderDigitalProductsTable();
  }

  function normalizedOrderType(value) {
    return value === 'digital-product' ? 'digital-product' : 'service';
  }

  function orderItemId(order) {
    return order.itemId || order.serviceId || order.productId || '';
  }

  function orderItemFromRecord(type, id) {
    if (normalizedOrderType(type) === 'digital-product') return getDigitalProductById(id);
    return getServiceById(id);
  }

  function orderItemData(type, item) {
    if (!item) return null;
    if (normalizedOrderType(type) === 'digital-product') {
      return {
        id: item.id,
        name: item.name,
        providerId: item.id,
        platform: item.category || 'Digital Product',
        category: 'Digital Product',
        providerRate: Number(item.providerPrice) || 0,
        clientRate: Number(item.price) || 0,
        rateUnit: 1
      };
    }
    return {
      id: item.id,
      name: item.name,
      providerId: item.providerId,
      platform: item.platform,
      category: item.category,
      providerRate: Number(item.providerRate) || 0,
      clientRate: Number(item.clientRate) || 0,
      rateUnit: Number(item.rateUnit) || 1000
    };
  }

  function orderItemsForType(type) {
    if (normalizedOrderType(type) === 'digital-product') {
      return Store.getDigitalProducts().slice().sort((a, b) => String(a.name).localeCompare(String(b.name)));
    }
    return Store.getServices().slice().sort((a, b) => `${a.platform} ${a.name}`.localeCompare(`${b.platform} ${b.name}`));
  }

  function fillOrderItemOptions(type, selectedId = '') {
    const normalizedType = normalizedOrderType(type);
    const items = orderItemsForType(normalizedType);
    if (!els.orderItemSelect) return;
    els.orderItemSelect.innerHTML = items.map(item => {
      const itemId = item.id;
      const displayId = normalizedType === 'digital-product' ? '' : item.providerId;
      const statusNote = normalizedType === 'digital-product'
        ? (item.disabled ? ' (Disabled)' : item.visible === false ? ' (Hidden)' : '')
        : (item.archived ? ' (Disabled)' : item.visible === false ? ' (Hidden)' : '');
      const optionLabel = normalizedType === 'digital-product'
        ? `${item.name}${statusNote}`
        : `${displayId} | ${item.name}${statusNote}`;
      return `<option value="${sanitize(itemId)}" ${itemId === selectedId ? 'selected' : ''}>${sanitize(optionLabel)}</option>`;
    }).join('');
    if (!els.orderItemSelect.value && items[0]) els.orderItemSelect.value = items[0].id;
  }

  function fillOrderForm(item, type = 'service', existingOrder = null) {
    const normalizedType = normalizedOrderType(type);
    const selectedId = item ? item.id : orderItemId(existingOrder || {});
    if (els.orderEditId) els.orderEditId.value = existingOrder ? existingOrder.id : '';
    if (els.orderItemType) els.orderItemType.value = normalizedType;
    if (els.orderItemLabel) els.orderItemLabel.textContent = normalizedType === 'digital-product' ? 'Digital Product' : 'Service Type';
    if (els.orderModalEyebrow) els.orderModalEyebrow.textContent = existingOrder ? 'Edit order' : 'Create order';
    if (els.orderModalTitle) els.orderModalTitle.textContent = existingOrder
      ? `Edit ${normalizedType === 'digital-product' ? 'Digital Product' : 'Service'} Order`
      : `Create ${normalizedType === 'digital-product' ? 'Digital Product' : 'Service'} Order`;
    if (els.orderSaveBtn) els.orderSaveBtn.textContent = existingOrder ? 'Update Order' : 'Save Order';

    fillOrderItemOptions(normalizedType, selectedId);
    els.orderClientName.value = existingOrder ? (existingOrder.clientName || '') : '';
    els.orderClientContact.value = existingOrder ? (existingOrder.clientContact || '') : '';
    els.orderQuantity.value = existingOrder ? (Number(existingOrder.quantity) || 1) : (normalizedType === 'digital-product' ? 1 : (Number(item && item.rateUnit) || 1000));
    els.orderStatus.value = existingOrder ? (existingOrder.status || 'active') : 'active';
    els.orderPaymentStatus.value = existingOrder ? (existingOrder.paymentStatus || 'paid') : 'paid';
    els.orderTarget.value = existingOrder ? (existingOrder.target || '') : '';
    els.orderNotes.value = existingOrder ? (existingOrder.notes || existingOrder.deliveryDetails || '') : '';
    if (els.orderTargetField) els.orderTargetField.classList.toggle('hidden', normalizedType === 'digital-product');
    updateOrderCalcPreview();
    openModal(els.orderModal);
  }

  function fillOrderEditForm(order) {
    if (!order) return;
    const type = normalizedOrderType(order.orderType || (order.productId ? 'digital-product' : 'service'));
    const item = orderItemFromRecord(type, orderItemId(order));
    fillOrderForm(item, type, order);
  }

  function selectedOrderItem() {
    const type = normalizedOrderType(els.orderItemType ? els.orderItemType.value : 'service');
    const item = orderItemFromRecord(type, els.orderItemSelect ? els.orderItemSelect.value : '');
    return { type, raw: item, data: orderItemData(type, item) };
  }

  function selectedOrderCalculation() {
    const selected = selectedOrderItem();
    if (!selected.data) return { selected, calc: null };
    const existing = els.orderEditId && els.orderEditId.value ? getOrderById(els.orderEditId.value) : null;
    const sameSnapshot = existing && normalizedOrderType(existing.orderType) === selected.type && orderItemId(existing) === selected.data.id;
    const rateSource = sameSnapshot ? {
      rateUnit: Number(existing.rateUnit) || selected.data.rateUnit,
      providerRate: Number(existing.providerRate) || 0,
      clientRate: Number(existing.clientRate) || 0
    } : selected.data;
    return { selected, existing, calc: Store.calcForService(rateSource, els.orderQuantity.value) };
  }

  function updateOrderCalcPreview() {
    const result = selectedOrderCalculation();
    if (!result.selected.data || !result.calc) {
      els.orderCalcPreview.textContent = 'No selected service or digital product.';
      return;
    }
    const calc = result.calc;
    els.orderCalcPreview.innerHTML = `
      <div class="preview-card"><span>Provider Charge</span><strong>${Store.formatMoney(calc.providerCharge)}</strong></div>
      <div class="preview-card"><span>Client Charge</span><strong>${Store.formatMoney(calc.clientCharge)}</strong></div>
      <div class="preview-card good"><span>Revenue</span><strong>${Store.formatMoney(calc.revenue)}</strong></div>
    `;
  }

  function saveOrder(event) {
    event.preventDefault();
    const result = selectedOrderCalculation();
    const selected = result.selected;
    const calc = result.calc;
    if (!selected.data || !calc) {
      Store.toast('Selected service or digital product was not found.', 'error');
      return;
    }
    if (!els.orderClientName.value.trim()) {
      Store.toast('Enter the exact client name or reference.', 'error');
      return;
    }
    if (calc.quantity <= 0) {
      Store.toast('Enter valid quantity.', 'error');
      return;
    }

    const orders = Store.getOrders();
    const editId = els.orderEditId ? els.orderEditId.value : '';
    const existingIndex = editId ? orders.findIndex(item => item.id === editId) : -1;
    const existing = existingIndex >= 0 ? orders[existingIndex] : null;
    const order = {
      ...(existing || {}),
      id: existing ? existing.id : Store.uid('order'),
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: els.orderStatus.value || 'active',
      paymentStatus: els.orderPaymentStatus.value || 'paid',
      orderType: selected.type,
      itemId: selected.data.id,
      serviceId: selected.type === 'service' ? selected.data.id : '',
      productId: selected.type === 'digital-product' ? selected.data.id : '',
      serviceName: selected.data.name,
      providerId: selected.data.providerId,
      platform: selected.data.platform,
      category: selected.data.category,
      quantity: calc.quantity,
      rateUnit: calc.unit,
      providerRate: calc.providerRate,
      clientRate: calc.clientRate,
      providerCharge: calc.providerCharge,
      clientCharge: calc.clientCharge,
      revenue: calc.revenue,
      clientName: els.orderClientName.value.trim(),
      clientContact: els.orderClientContact.value.trim(),
      target: selected.type === 'service' ? els.orderTarget.value.trim() : '',
      notes: els.orderNotes.value.trim(),
      deliveryDetails: selected.type === 'digital-product' ? els.orderNotes.value.trim() : '',
      voidReason: existing ? (existing.voidReason || '') : '',
      voidedAt: existing ? (existing.voidedAt || null) : null
    };

    if (existingIndex >= 0) orders[existingIndex] = order;
    else orders.unshift(order);
    Store.saveOrders(orders);
    closeModal(els.orderModal);
    Store.toast(existing ? 'Order updated. Shared status and totals were refreshed.' : 'Order saved. Totals updated using the price snapshot.');
    renderAll();
    if (window.NovalyteShowAdminPanel) window.NovalyteShowAdminPanel('orders');
    document.getElementById('orders').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateOrderStatus(orderId, status, extra = {}) {
    const orders = Store.getOrders();
    const order = orders.find(item => item.id === orderId);
    if (!order) return;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    Object.assign(order, extra);
    if (status === 'voided') order.voidedAt = new Date().toISOString();
    if (status !== 'voided') {
      order.voidedAt = null;
      order.voidReason = '';
    }
    Store.saveOrders(orders);
    const message = status === 'voided'
      ? 'Order voided and removed from totals.'
      : status === 'active'
        ? 'Order status changed to Active.'
        : `Order status changed to ${statusLabels[status] || status}.`;
    Store.toast(message);
    renderAll();
  }

  function openVoidModal(orderId) {
    els.voidOrderId.value = orderId;
    els.voidReason.value = '';
    openModal(els.voidModal);
  }

  function viewOrder(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;
    const isProduct = order.orderType === 'digital-product';
    const itemId = order.itemId || order.providerId || (isProduct ? order.productId : order.serviceId) || '-';
    const rows = [
      ['Date', dateText(order.createdAt)],
      ['Order Type', isProduct ? 'Digital Product' : 'Boosting Service'],
      ['Status', statusLabels[order.status] || order.status],
      ['Payment', paymentLabels[order.paymentStatus] || order.paymentStatus],
      ['Client', order.clientName || 'No client ref'],
      ['Contact', order.clientContact || 'No contact'],
      ['Service / Product', order.serviceName || 'Unnamed item'],
      ['Item ID', itemId],
      ['Platform / Category', order.platform || (isProduct ? 'Digital Product' : '-')],
      ['Quantity', Store.formatNumber(order.quantity)],
      ['Provider Rate', `${Store.formatMoney(order.providerRate)} / ${Store.formatNumber(order.rateUnit || 1)}`],
      ['Client Rate', `${Store.formatMoney(order.clientRate)} / ${Store.formatNumber(order.rateUnit || 1)}`],
      ['Provider Charge', Store.formatMoney(order.providerCharge)],
      ['Client Charge', Store.formatMoney(order.clientCharge)],
      ['Revenue', Store.formatMoney(order.revenue)],
      ['Target', isProduct ? 'Not required' : (order.target || 'No target')],
      ['Notes / Delivery Details', order.deliveryDetails || order.notes || 'No notes'],
      ['Void Reason', order.voidReason || 'Not voided']
    ];
    els.orderDetailsBody.innerHTML = rows.map(([label, value]) => `
      <div class="detail-row"><span>${sanitize(label)}</span><strong>${sanitize(value)}</strong></div>
    `).join('');
    openModal(els.orderDetailsModal);
  }

  function exportOrdersCsv() {
    const orders = Store.getOrders();
    const header = ['Date', 'Order Type', 'Status', 'Payment Status', 'Client', 'Contact', 'Service / Product', 'Item ID', 'Platform / Category', 'Quantity', 'Rate Unit', 'Provider Rate', 'Client Rate', 'Provider Charge', 'Client Charge', 'Revenue', 'Target', 'Notes / Delivery Details', 'Void Reason'];
    const rows = orders.map(order => [
      order.createdAt,
      order.orderType || 'service',
      order.status,
      order.paymentStatus || 'paid',
      order.clientName || '',
      order.clientContact || '',
      order.serviceName || '',
      order.itemId || order.providerId || order.productId || order.serviceId || '',
      order.platform || '',
      order.quantity,
      order.rateUnit,
      order.providerRate,
      order.clientRate,
      order.providerCharge,
      order.clientCharge,
      order.revenue,
      order.target || '',
      order.deliveryDetails || order.notes || '',
      order.voidReason || ''
    ]);
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    Store.downloadFile(`novalyte-orders-${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv');
  }


  function setupBrandLogos() {
    document.querySelectorAll('.brand-logo-img').forEach(img => {
      const frame = img.closest('.brand-logo-frame');
      if (!frame) return;
      const markLoaded = () => {
        if (img.naturalWidth > 0) {
          frame.classList.add('has-logo');
          frame.classList.remove('logo-missing');
        } else {
          frame.classList.add('logo-missing');
        }
      };
      const markMissing = () => {
        frame.classList.add('logo-missing');
        frame.classList.remove('has-logo');
      };
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markMissing, { once: true });
      if (img.complete) markLoaded();
    });
  }

  function restoreAdminNavHome() {
    if (!els.adminSidebarNav || !adminNavHomeParent) return;
    els.adminSidebarNav.classList.remove('admin-floating-nav');
    if (adminNavNextSibling && adminNavNextSibling.parentNode === adminNavHomeParent) {
      adminNavHomeParent.insertBefore(els.adminSidebarNav, adminNavNextSibling);
    } else {
      adminNavHomeParent.appendChild(els.adminSidebarNav);
    }
  }

  function floatAdminNavToViewport() {
    if (!els.adminSidebarNav || !els.adminMobileNavToggle || !window.matchMedia('(max-width: 820px)').matches) return;
    const rect = els.adminMobileNavToggle.getBoundingClientRect();
    document.documentElement.style.setProperty('--admin-nav-top', `${Math.max(62, rect.bottom + 8)}px`);
    els.adminSidebarNav.classList.add('admin-floating-nav');
    document.body.appendChild(els.adminSidebarNav);
  }

  function closeAdminMobileNav() {
    document.body.classList.remove('admin-nav-open');
    restoreAdminNavHome();
    if (els.adminMobileNavToggle) els.adminMobileNavToggle.setAttribute('aria-expanded', 'false');
  }

  function setupAutoScrollbars() {
    // v5.1: no dynamic scrollbar toggling. Mobile browsers were shifting/wiggling
    // when scroll classes were added and removed during touch scrolling.
    document.documentElement.classList.remove('is-scrolling-global');
    document.body.classList.remove('is-scrolling');
  }

  function bindEvents() {
    if (els.adminMobileNavToggle) {
      els.adminMobileNavToggle.addEventListener('click', () => {
        const willOpen = !document.body.classList.contains('admin-nav-open');
        if (willOpen) {
          floatAdminNavToViewport();
          document.body.classList.add('admin-nav-open');
        } else {
          closeAdminMobileNav();
        }
        els.adminMobileNavToggle.setAttribute('aria-expanded', String(willOpen));
      });
    }
    document.querySelectorAll('.sidebar-nav a, .sidebar-nav button').forEach(item => {
      item.addEventListener('click', closeAdminMobileNav);
    });
    document.addEventListener('click', event => {
      if (!document.body.classList.contains('admin-nav-open')) return;
      if (event.target.closest('#adminSidebarNav') || event.target.closest('#adminMobileNavToggle')) return;
      closeAdminMobileNav();
    });
    window.addEventListener('resize', () => {
      if (!window.matchMedia('(max-width: 820px)').matches) closeAdminMobileNav();
    });

    const credentialToggle = document.querySelector('[data-toggle-login-credentials]');
    if (credentialToggle) {
      credentialToggle.addEventListener('click', () => {
        const pass = document.getElementById('loginPass');
        const pin = document.getElementById('loginPin');
        if (!pass || !pin) return;
        const show = pass.type === 'password' || pin.type === 'password';
        pass.type = show ? 'text' : 'password';
        pin.type = show ? 'text' : 'password';
        credentialToggle.classList.toggle('active', show);
        credentialToggle.setAttribute('aria-label', show ? 'Hide password and PIN' : 'Show password and PIN');
      });
    }

    els.loginForm.addEventListener('submit', async event => {
      event.preventDefault();
      const username = els.loginUser.value.trim();
      const password = els.loginPass.value;
      const pinOk = els.loginPin.value === AUTH.pin;
      const cloudEnabled = Boolean(Remote && Remote.isConfigured && Remote.isConfigured());
      let ok = false;
      let cloudMessage = '';

      const submitBtn = els.loginForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = cloudEnabled ? 'Connecting...' : 'Checking...';
      }

      try {
        if (cloudEnabled) {
          if (!pinOk) {
            cloudMessage = 'Wrong security PIN.';
          } else {
            const result = await Remote.login(username, password);
            ok = Boolean(result && result.ok);
            cloudMessage = result && result.message ? result.message : 'Cloud email or password is incorrect.';
          }
        } else {
          ok = username === AUTH.username && password === AUTH.password && pinOk;
        }

        if (!ok) {
          els.loginAlert.textContent = cloudEnabled ? cloudMessage : 'Wrong username, password, or PIN. Please check the admin credentials.';
          els.loginAlert.classList.remove('hidden');
          Store.toast('Login failed.', 'error');
          return;
        }
        els.loginAlert.classList.add('hidden');
        setLoggedIn(true);
        Store.toast(cloudEnabled ? 'Welcome, admin. Shared sync is connecting.' : 'Welcome, admin.');
        showDashboard();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enter Dashboard';
        }
      }
    });

    els.logoutBtn.addEventListener('click', async () => {
      setLoggedIn(false);
      if (Remote && Remote.logout) await Remote.logout();
      Store.toast('Logged out.');
      showLogin();
    });

    if (els.addInvestBtn) els.addInvestBtn.addEventListener('click', () => {
      const amount = Number(els.addInvestAmount.value) || 0;
      const type = els.financeEntryType ? els.financeEntryType.value : 'capital-in';
      const person = els.financePerson ? els.financePerson.value : '';
      if (amount <= 0) {
        Store.toast('Enter a valid finance amount.', 'error');
        return;
      }
      if (type === 'capital-in') Store.addInvestment(amount, els.addInvestNote.value);
      else if (Store.addFinanceEntry) Store.addFinanceEntry(type, amount, person, els.addInvestNote.value);
      els.addInvestAmount.value = '';
      els.addInvestNote.value = '';
      if (els.financePerson) els.financePerson.value = '';
      Store.toast('Finance log added.');
      renderAll();
    });

    if (els.saveInvestBtn) els.saveInvestBtn.addEventListener('click', async () => {
      const confirmed = await adminConfirm('Override total capital? This replaces the capital reload log with one correction entry.');
      if (!confirmed) return;
      Store.setInvest(els.investAmount.value || 0, 'Manual capital correction / override');
      Store.toast('Total capital overridden.');
      renderAll();
    });

    if (els.investmentsTable) els.investmentsTable.addEventListener('click', async event => {
      const btn = event.target.closest('[data-remove-finance-entry]');
      if (!btn) return;
      const confirmed = await adminConfirm('Remove this finance log?');
      if (!confirmed) return;
      if (btn.dataset.financeSource === 'investment') Store.removeInvestment(btn.dataset.sourceId);
      else if (Store.removeFinanceEntry) Store.removeFinanceEntry(btn.dataset.removeFinanceEntry);
      Store.toast('Finance log removed.');
      renderAll();
    });

    if (els.addTeamMemberBtn) els.addTeamMemberBtn.addEventListener('click', () => {
      if (!Store.addTeamMember) return;
      const member = Store.addTeamMember(
        els.teamMemberName.value,
        els.teamPayMode.value,
        els.teamPayAmount.value,
        els.teamPayFrequency.value
      );
      if (!member) {
        Store.toast('Complete team member name and pay amount.', 'error');
        return;
      }
      els.teamMemberName.value = '';
      els.teamPayAmount.value = '';
      Store.toast('Team payroll rule added.');
      renderAll();
    });

    if (els.teamMembersTable) els.teamMembersTable.addEventListener('click', async event => {
      const btn = event.target.closest('[data-remove-team-member]');
      if (!btn || !Store.removeTeamMember) return;
      const confirmed = await adminConfirm('Remove this team payroll rule?');
      if (!confirmed) return;
      Store.removeTeamMember(btn.dataset.removeTeamMember);
      Store.toast('Team payroll rule removed.');
      renderAll();
    });

    [els.adminServiceSearch, els.adminPlatformFilter, els.adminArchiveFilter].forEach(el => el.addEventListener('input', () => {
      servicePage = 1;
      renderServicesTable();
    }));
    if (els.adminDigitalProductSearch && els.adminDigitalProductFilter) {
      [els.adminDigitalProductSearch, els.adminDigitalProductFilter, els.adminDigitalProductStatusFilter].filter(Boolean).forEach(el => el.addEventListener('input', () => {
        digitalProductPage = 1;
        renderDigitalProductsTable();
      }));
    }

    [els.orderSearch, els.orderStatusFilter, els.paymentStatusFilter].forEach(el => el.addEventListener('input', () => {
      orderPage = 1;
      renderOrderSummary();
      renderOrdersTable();
    }));

    document.addEventListener('click', event => {
      const servicePager = event.target.closest('[data-admin-service-page]');
      if (servicePager) {
        const total = filteredServices().length;
        const pages = Math.max(1, Math.ceil(total / servicePageSize));
        if (servicePager.dataset.adminServicePage === 'prev') servicePage = Math.max(1, servicePage - 1);
        if (servicePager.dataset.adminServicePage === 'next') servicePage = Math.min(pages, servicePage + 1);
        renderServicesTable();
      }
      const digitalPager = event.target.closest('[data-admin-digital-page]');
      if (digitalPager) {
        const total = filteredDigitalProducts().length;
        const pages = Math.max(1, Math.ceil(total / digitalProductPageSize));
        if (digitalPager.dataset.adminDigitalPage === 'prev') digitalProductPage = Math.max(1, digitalProductPage - 1);
        if (digitalPager.dataset.adminDigitalPage === 'next') digitalProductPage = Math.min(pages, digitalProductPage + 1);
        renderDigitalProductsTable();
      }
      const orderPager = event.target.closest('[data-admin-order-page]');
      if (orderPager) {
        const total = filteredOrders().length;
        const pages = Math.max(1, Math.ceil(total / orderPageSize));
        if (orderPager.dataset.adminOrderPage === 'prev') orderPage = Math.max(1, orderPage - 1);
        if (orderPager.dataset.adminOrderPage === 'next') orderPage = Math.min(pages, orderPage + 1);
        renderOrdersTable();
      }
    });

    if (els.addDigitalProductBtn) els.addDigitalProductBtn.addEventListener('click', () => fillDigitalProductForm(null));
    if (els.digitalProductsTable) {
      els.digitalProductsTable.addEventListener('click', async event => {
        const createOrderBtn = event.target.closest('[data-create-digital-order]');
        const editBtn = event.target.closest('[data-edit-digital-product]');
        const toggleBtn = event.target.closest('[data-toggle-digital-product]');
        const deleteBtn = event.target.closest('[data-delete-digital-product]');
        if (createOrderBtn) {
          const product = getDigitalProductById(createOrderBtn.dataset.createDigitalOrder);
          if (product) fillOrderForm(product, 'digital-product');
          return;
        }
      if (editBtn) {
          const product = getDigitalProductById(editBtn.dataset.editDigitalProduct);
          if (product) fillDigitalProductForm(product);
        }
        if (toggleBtn) {
          const disabled = toggleBtn.dataset.toggleValue === 'true';
          const confirmed = await adminConfirm(disabled ? 'Disable this digital product? It will stay visible but checkout will be blocked.' : 'Enable this digital product and allow checkout again?');
          if (confirmed) toggleDigitalProduct(toggleBtn.dataset.toggleDigitalProduct, disabled);
        }
        if (deleteBtn) {
          const product = getDigitalProductById(deleteBtn.dataset.deleteDigitalProduct);
          const confirmed = product && await adminConfirm(`Delete ${product.name}? This removes it from Digital Products until you reset or add it again.`);
          if (confirmed) deleteDigitalProduct(deleteBtn.dataset.deleteDigitalProduct);
        }
      });
    }
    if (els.digitalProductImage) els.digitalProductImage.addEventListener('input', () => {
      pendingDigitalImageData = '';
      updateDigitalProductPreview(false);
    });
    if (els.digitalProductName) els.digitalProductName.addEventListener('input', () => updateDigitalProductPreview(false));
    if (els.digitalProductViewImageBtn) {
      els.digitalProductViewImageBtn.addEventListener('click', () => {
        updateDigitalProductPreview(true);
      });
    }
    if (els.digitalProductPrice) els.digitalProductPrice.addEventListener('input', updateDigitalProductProfitPreview);
    if (els.digitalProductProviderPrice) els.digitalProductProviderPrice.addEventListener('input', updateDigitalProductProfitPreview);
    if (els.digitalProductImageUpload) {
      els.digitalProductImageUpload.addEventListener('change', event => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          pendingDigitalImageData = String(reader.result || '');
          updateDigitalProductPreview(false);
        };
        reader.readAsDataURL(file);
      });
    }
    if (els.digitalProductAdminForm) els.digitalProductAdminForm.addEventListener('submit', saveDigitalProductFromForm);

    els.addServiceBtn.addEventListener('click', () => fillServiceForm(null));
    els.servicesTable.addEventListener('click', async event => {
      const editBtn = event.target.closest('[data-edit-service]');
      const orderBtn = event.target.closest('[data-create-order]');
      const archiveBtn = event.target.closest('[data-archive-service]');
      const recommendInput = event.target.closest('[data-recommend-service]');
      if (recommendInput) {
        const services = Store.getServices();
        const service = services.find(item => item.id === recommendInput.dataset.recommendService);
        if (service) {
          if (service.archived) {
            recommendInput.checked = service.recommended === true;
            Store.toast('Enable this service before changing its Recommended setting.', 'error');
            return;
          }
          service.recommended = recommendInput.checked;
          Store.saveServices(services);
          Store.toast(service.recommended ? 'Service added to Recommended.' : 'Service removed from Recommended.');
        }
      }
      if (editBtn) {
        const service = getServiceById(editBtn.dataset.editService);
        if (service) fillServiceForm(service);
      }
      if (orderBtn) {
        const service = getServiceById(orderBtn.dataset.createOrder);
        if (service) fillOrderForm(service, 'service');
      }
      if (archiveBtn) {
        const archived = archiveBtn.dataset.archiveValue === 'true';
        const confirmed = await adminConfirm(archived ? 'Disable this service? It will stay visible but unorderable for clients.' : 'Enable this service and make it orderable again?');
        if (confirmed) archiveService(archiveBtn.dataset.archiveService, archived);
      }
    });

    els.ordersTable.addEventListener('click', event => {
      const voidBtn = event.target.closest('[data-void-order]');
      const undoBtn = event.target.closest('[data-undo-void]');
      const viewBtn = event.target.closest('[data-view-order]');
      const editBtn = event.target.closest('[data-edit-order]');
      if (viewBtn) viewOrder(viewBtn.dataset.viewOrder);
      if (editBtn) fillOrderEditForm(getOrderById(editBtn.dataset.editOrder));
      if (voidBtn) openVoidModal(voidBtn.dataset.voidOrder);
      if (undoBtn) updateOrderStatus(undoBtn.dataset.undoVoid, 'active');
    });
    els.ordersTable.addEventListener('change', event => {
      const statusSelect = event.target.closest('[data-order-status-select]');
      if (!statusSelect) return;
      updateOrderStatus(statusSelect.dataset.orderStatusSelect, statusSelect.value);
    });

    els.confirmVoidBtn.addEventListener('click', () => {
      const orderId = els.voidOrderId.value;
      const reason = els.voidReason.value.trim();
      updateOrderStatus(orderId, 'voided', { voidReason: reason });
      closeModal(els.voidModal);
    });

    if (els.adminConfirmOkBtn) els.adminConfirmOkBtn.addEventListener('click', () => closeAdminConfirmModal(true));
    if (els.adminConfirmCancelBtn) els.adminConfirmCancelBtn.addEventListener('click', () => closeAdminConfirmModal(false));
    if (els.adminConfirmCloseBtn) els.adminConfirmCloseBtn.addEventListener('click', () => closeAdminConfirmModal(false));

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(document.getElementById(btn.dataset.closeModal)));
    });


    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      if (els.adminConfirmModal && els.adminConfirmModal.classList.contains('open')) {
        closeAdminConfirmModal(false);
        return;
      }
      document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
    });

    [els.serviceProviderRate, els.serviceClientRate, els.serviceRateUnit].forEach(el => {
      el.addEventListener('input', updateServiceRevenuePreview);
    });
    els.serviceForm.addEventListener('submit', saveServiceFromForm);

    [els.orderItemSelect, els.orderQuantity, els.orderStatus, els.orderPaymentStatus].filter(Boolean).forEach(el => el.addEventListener('input', updateOrderCalcPreview));
    if (els.orderItemSelect) els.orderItemSelect.addEventListener('change', updateOrderCalcPreview);
    els.orderForm.addEventListener('submit', saveOrder);

    if (els.exportBackupBtn) els.exportBackupBtn.addEventListener('click', Store.exportBackup);
    if (els.importBackupInput) els.importBackupInput.addEventListener('change', async event => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        Store.importBackup(data);
        Store.toast('Backup imported.');
        renderAll();
      } catch (error) {
        Store.toast('Invalid backup file.', 'error');
      }
      event.target.value = '';
    });

    els.exportOrdersCsvBtn.addEventListener('click', exportOrdersCsv);
    els.resetDemoBtn.addEventListener('click', async () => {
      const confirmed = await adminConfirm('Reset services to demo data and clear all orders/investments?');
      if (!confirmed) return;
      Store.resetServices();
      Store.resetDigitalProducts();
      Store.saveOrders([]);
      Store.saveInvestments([]);
      if (Store.saveFinanceEntries) Store.saveFinanceEntries([]);
      if (Store.saveTeamMembers) Store.saveTeamMembers([]);
      Store.toast('Demo data reset.');
      renderAll();
    });

    window.addEventListener('novalyte:remote-status', event => {
      const detail = event.detail || {};
      updateCloudSyncStatus(detail.state || '', detail.message || '');
    });
    window.addEventListener('novalyte:remote-updated', () => {
      renderAll();
      updateCloudSyncStatus('synced', 'Shared data is up to date');
    });
  }

  async function init() {
    document.body.classList.add('v60-mobile-build');
    setupBrandLogos();
    setupAutoScrollbars();
    Store.getServices();
    Store.getDigitalProducts();
    Store.getInvestments();
    setupAdminPanels();
    bindEvents();
    setupAdminSessionSync();
    activePanel = panelFromHash() || activePanel || 'dashboard';

    const localSession = restorePersistentAdminSession();
    const cloudEnabled = Boolean(Remote && Remote.isConfigured && Remote.isConfigured());
    if (!localSession) {
      showLogin();
      return;
    }
    if (cloudEnabled) {
      const cloudSession = Remote.ensureSession ? await Remote.ensureSession() : null;
      if (!cloudSession) {
        clearLoggedIn({ silent: true });
        showLogin();
        if (els.loginAlert) {
          els.loginAlert.textContent = 'Your shared admin session expired. Please sign in again.';
          els.loginAlert.classList.remove('hidden');
        }
        return;
      }
    }
    showDashboard();
  }

  document.addEventListener('DOMContentLoaded', init);
/* v6.0.21 mobile admin panel isolation */
  function enforceAdminPanelIsolation(panel = activePanel || panelFromHash() || 'dashboard') {
    const ids = ['dashboard', 'services', 'digital-products', 'investments', 'orders'];
    document.body.dataset.adminPanel = panel;
    ids.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      section.classList.toggle('hidden', id !== panel);
      section.hidden = id !== panel;
      section.setAttribute('aria-hidden', id === panel ? 'false' : 'true');
    });
    const stats = document.getElementById('statsGrid');
    if (stats) {
      stats.classList.add('hidden');
      stats.hidden = true;
      stats.setAttribute('aria-hidden', 'true');
    }
  }

  window.addEventListener('resize', () => enforceAdminPanelIsolation());
  window.addEventListener('orientationchange', () => enforceAdminPanelIsolation());
  window.addEventListener('pageshow', () => enforceAdminPanelIsolation(panelFromHash() || 'dashboard'));
  window.addEventListener('hashchange', () => enforceAdminPanelIsolation(panelFromHash() || 'dashboard'));
/* end v6.0.21 mobile admin panel isolation */
})();

/* v6.0.17 requested-only: prevent the legacy Dashboard cards
   from being restored by later render or navigation functions. */
function novalyteHideLegacyDashboardStats() {
    const legacyStats = document.getElementById('statsGrid');

    if (!legacyStats) {
        return;
    }

    legacyStats.classList.add('hidden', 'dashboard-stats-hook');
    legacyStats.hidden = true;
    legacyStats.setAttribute('aria-hidden', 'true');
    legacyStats.style.setProperty('display', 'none', 'important');
    legacyStats.style.setProperty('visibility', 'hidden', 'important');
    legacyStats.style.setProperty('height', '0', 'important');
    legacyStats.style.setProperty('margin', '0', 'important');
    legacyStats.style.setProperty('padding', '0', 'important');
}

function novalyteWatchLegacyDashboardStats() {
    novalyteHideLegacyDashboardStats();

    const legacyStats = document.getElementById('statsGrid');

    if (!legacyStats || legacyStats.dataset.hideObserverReady === 'true') {
        return;
    }

    legacyStats.dataset.hideObserverReady = 'true';

    const observer = new MutationObserver(() => {
        if (
            legacyStats.style.getPropertyValue('display') !== 'none' ||
            !legacyStats.classList.contains('hidden') ||
            legacyStats.hidden !== true
        ) {
            novalyteHideLegacyDashboardStats();
        }
    });

    observer.observe(legacyStats, {
        attributes: true,
        attributeFilter: ['class', 'style', 'hidden', 'aria-hidden']
    });
}

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        novalyteWatchLegacyDashboardStats,
        { once: true }
    );
}
else {
    novalyteWatchLegacyDashboardStats();
}

window.addEventListener('hashchange', () => {
    queueMicrotask(novalyteHideLegacyDashboardStats);
});
/* end v6.0.17 requested-only */
/* v6.0.24 strict admin panel isolation */
function novalyteApplyStrictAdminPanel(panel = activePanel || panelFromHash() || 'dashboard') {
    const allowed = ['dashboard', 'services', 'digital-products', 'investments', 'orders'];
    const selected = allowed.includes(panel) ? panel : 'dashboard';
    activePanel = selected;
    document.body.dataset.adminPanel = selected;

    allowed.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        const active = id === selected;
        section.hidden = !active;
        section.classList.toggle('hidden', !active);
        section.setAttribute('aria-hidden', active ? 'false' : 'true');
        section.style.setProperty('display', active ? '' : 'none', active ? '' : 'important');
        if (active) section.style.removeProperty('display');
    });

    const stats = document.getElementById('statsGrid');
    if (stats) {
        stats.hidden = true;
        stats.classList.add('hidden');
        stats.setAttribute('aria-hidden', 'true');
        stats.style.setProperty('display', 'none', 'important');
    }
}

window.addEventListener('resize', () => novalyteApplyStrictAdminPanel());
window.addEventListener('orientationchange', () => novalyteApplyStrictAdminPanel());
window.addEventListener('pageshow', () => novalyteApplyStrictAdminPanel(panelFromHash() || 'dashboard'));
window.addEventListener('hashchange', () => novalyteApplyStrictAdminPanel(panelFromHash() || 'dashboard'));
/* end v6.0.24 strict admin panel isolation */
