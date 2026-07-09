(function () {
  const KEYS = {
    services: 'novalyte.services.v4',
    digitalProducts: 'novalyte.digitalProducts.v1',
    deletedDigitalProductIds: 'novalyte.deletedDigitalProductIds.v1',
    orders: 'novalyte.orders.v1',
    invest: 'novalyte.totalInvest.v1',
    investments: 'novalyte.investments.v1',
    financeEntries: 'novalyte.financeEntries.v1',
    teamMembers: 'novalyte.teamMembers.v1',
    reviews: 'novalyte.reviews.v1',
    clientReviewToken: 'novalyte.clientReviewToken.v1',
    legacyReviewRelease: 'novalyte.legacyReviewRelease.v5317',
    session: 'novalyte.adminSession.v1'
  };

  const peso = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function uid(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn(`Failed to read ${key}`, error);
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeRating(value, fallback = 5) {
    const numeric = Number(value);
    const base = Number.isFinite(numeric) ? numeric : fallback;
    return Math.max(0.5, Math.min(5, Math.round(base * 2) / 2));
  }

  function normalizeService(service) {
    return {
      archived: false,
      visible: true,
      rateUnit: 1000,
      min: 0,
      max: 0,
      avgTime: '',
      tag: '',
      description: '',
      ...service
    };
  }

  function mergeSeedServices(services) {
    const deprecatedServiceIds = new Set(['svc_telegram_members_sample', 'svc_youtube_views_sample']);
    const rawServices = Array.isArray(services) ? services.map(normalizeService) : [];
    const normalized = rawServices.filter(service => {
      const shouldKeep = !deprecatedServiceIds.has(service.id) && service.providerId !== 'TG-5001' && service.providerId !== 'YT-4001';
      return shouldKeep;
    });
    const seeds = clone(window.NOVALYTE_SEED_SERVICES || []).map(normalizeService);
    const existingIds = new Set(normalized.map(service => service.id));
    let changed = rawServices.length !== normalized.length;

    seeds.forEach(seed => {
      if (!existingIds.has(seed.id)) {
        normalized.push(seed);
        existingIds.add(seed.id);
        changed = true;
        return;
      }

      const index = normalized.findIndex(service => service.id === seed.id);
      if (index < 0) return;

      if (['telegram', 'youtube'].includes(String(seed.platform || '').toLowerCase()) && normalized[index].visible === false) {
        normalized[index].visible = true;
        changed = true;
      }
    });

    if (changed) writeJson(KEYS.services, normalized);
    return normalized;
  }

  function getServices() {
    let services = readJson(KEYS.services, null);
    if (!Array.isArray(services) || services.length === 0) {
      services = clone(window.NOVALYTE_SEED_SERVICES || []).map(normalizeService);
      writeJson(KEYS.services, services);
    } else {
      services = mergeSeedServices(services);
    }
    return services.map(normalizeService);
  }

  function saveServices(services) {
    writeJson(KEYS.services, services.map(normalizeService));
  }

  function resetServices() {
    const services = clone(window.NOVALYTE_SEED_SERVICES || []).map(normalizeService);
    saveServices(services);
    return services;
  }

  function normalizeDigitalProduct(product) {
    return {
      id: '',
      name: '',
      price: 0,
      providerPrice: 0,
      category: 'Digital Product',
      image: '',
      imageData: '',
      duration: '1 Month Access',
      description: '',
      visible: true,
      disabled: false,
      ...product
    };
  }

  function mergeSeedDigitalProducts(products) {
    const normalized = Array.isArray(products) ? products.map(normalizeDigitalProduct) : [];
    const deletedIds = new Set(readJson(KEYS.deletedDigitalProductIds, []));
    const seeds = clone(window.NOVALYTE_DIGITAL_PRODUCTS || []).map(normalizeDigitalProduct).filter(product => !deletedIds.has(product.id));
    const existingIds = new Set(normalized.map(product => product.id));
    let changed = false;

    seeds.forEach(seed => {
      if (!existingIds.has(seed.id)) {
        normalized.push(seed);
        existingIds.add(seed.id);
        changed = true;
      }
    });

    if (changed) writeJson(KEYS.digitalProducts, normalized);
    return normalized;
  }

  function getDigitalProducts() {
    let products = readJson(KEYS.digitalProducts, null);
    if (!Array.isArray(products) || products.length === 0) {
      products = clone(window.NOVALYTE_DIGITAL_PRODUCTS || []).map(normalizeDigitalProduct);
      writeJson(KEYS.digitalProducts, products);
    } else {
      products = mergeSeedDigitalProducts(products);
    }
    return products.map(normalizeDigitalProduct);
  }

  function saveDigitalProducts(products) {
    writeJson(KEYS.digitalProducts, Array.isArray(products) ? products.map(normalizeDigitalProduct) : []);
  }

  function getDeletedDigitalProductIds() {
    const deletedIds = readJson(KEYS.deletedDigitalProductIds, []);
    return Array.isArray(deletedIds) ? deletedIds : [];
  }

  function saveDeletedDigitalProductIds(ids) {
    writeJson(KEYS.deletedDigitalProductIds, Array.isArray(ids) ? [...new Set(ids)] : []);
  }

  function deleteDigitalProduct(productId) {
    const products = getDigitalProducts().filter(product => product.id !== productId);
    const seedIds = new Set((window.NOVALYTE_DIGITAL_PRODUCTS || []).map(product => product.id));
    if (seedIds.has(productId)) {
      saveDeletedDigitalProductIds([...getDeletedDigitalProductIds(), productId]);
    }
    saveDigitalProducts(products);
    return products;
  }

  function resetDigitalProducts() {
    saveDeletedDigitalProductIds([]);
    const products = clone(window.NOVALYTE_DIGITAL_PRODUCTS || []).map(normalizeDigitalProduct);
    saveDigitalProducts(products);
    return products;
  }


  function normalizeOrder(order) {
    const status = order.status || 'active';
    const paymentStatus = order.paymentStatus || 'paid';
    return {
      clientContact: '',
      target: '',
      notes: '',
      voidReason: '',
      cancelledReason: '',
      paymentStatus,
      status,
      ...order
    };
  }

  function getOrders() {
    const orders = readJson(KEYS.orders, []);
    return Array.isArray(orders) ? orders.map(normalizeOrder) : [];
  }

  function saveOrders(orders) {
    writeJson(KEYS.orders, orders.map(normalizeOrder));
  }

  function getInvestments() {
    let entries = readJson(KEYS.investments, null);
    if (Array.isArray(entries)) return entries;

    const legacyInvest = Number(localStorage.getItem(KEYS.invest));
    if (Number.isFinite(legacyInvest) && legacyInvest > 0) {
      entries = [{
        id: uid('invest'),
        createdAt: new Date().toISOString(),
        amount: legacyInvest,
        note: 'Migrated total invest from v1.0'
      }];
      writeJson(KEYS.investments, entries);
      return entries;
    }

    entries = [];
    writeJson(KEYS.investments, entries);
    return entries;
  }

  function saveInvestments(entries) {
    writeJson(KEYS.investments, entries);
    const total = entries.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    localStorage.setItem(KEYS.invest, String(total));
  }

  function addInvestment(amount, note = '') {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return null;
    const entry = {
      id: uid('invest'),
      createdAt: new Date().toISOString(),
      amount: value,
      note: String(note || '').trim()
    };
    const entries = getInvestments();
    entries.unshift(entry);
    saveInvestments(entries);
    return entry;
  }

  function removeInvestment(id) {
    const entries = getInvestments().filter(item => item.id !== id);
    saveInvestments(entries);
  }

  function getInvest() {
    const total = getInvestments().reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    if (total > 0) return total;
    const legacy = Number(localStorage.getItem(KEYS.invest));
    return Number.isFinite(legacy) ? legacy : 0;
  }

  function setInvest(amount, note = 'Manual total set') {
    const value = Number(amount);
    const entries = Number.isFinite(value) && value > 0
      ? [{ id: uid('invest'), createdAt: new Date().toISOString(), amount: value, note }]
      : [];
    saveInvestments(entries);
  }

  function normalizeFinanceEntry(entry) {
    return {
      id: '',
      createdAt: new Date().toISOString(),
      type: 'capital-in',
      amount: 0,
      person: '',
      note: '',
      source: 'finance',
      ...entry
    };
  }

  function getFinanceEntries() {
    const manual = readJson(KEYS.financeEntries, []);
    const finance = Array.isArray(manual) ? manual.map(normalizeFinanceEntry) : [];
    const capital = getInvestments().map(entry => normalizeFinanceEntry({
      id: `capital_${entry.id}`,
      sourceId: entry.id,
      source: 'investment',
      createdAt: entry.createdAt,
      type: 'capital-in',
      amount: Number(entry.amount) || 0,
      person: 'Novalyte Capital',
      note: entry.note || ''
    }));
    return [...capital, ...finance].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function saveFinanceEntries(entries) {
    writeJson(KEYS.financeEntries, Array.isArray(entries) ? entries.map(normalizeFinanceEntry) : []);
  }

  function addFinanceEntry(type, amount, person = '', note = '') {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return null;
    const entry = normalizeFinanceEntry({
      id: uid('finance'),
      createdAt: new Date().toISOString(),
      type: type || 'expense',
      amount: value,
      person: String(person || '').trim(),
      note: String(note || '').trim()
    });
    const entries = readJson(KEYS.financeEntries, []);
    const list = Array.isArray(entries) ? entries.map(normalizeFinanceEntry) : [];
    list.unshift(entry);
    saveFinanceEntries(list);
    return entry;
  }

  function removeFinanceEntry(id) {
    const entries = readJson(KEYS.financeEntries, []);
    const list = Array.isArray(entries) ? entries.map(normalizeFinanceEntry).filter(item => item.id !== id) : [];
    saveFinanceEntries(list);
  }

  function normalizeTeamMember(member) {
    return {
      id: '',
      name: '',
      mode: 'fixed',
      amount: 0,
      frequency: 'weekly',
      createdAt: new Date().toISOString(),
      ...member
    };
  }

  function getTeamMembers() {
    const members = readJson(KEYS.teamMembers, []);
    return Array.isArray(members) ? members.map(normalizeTeamMember) : [];
  }

  function saveTeamMembers(members) {
    writeJson(KEYS.teamMembers, Array.isArray(members) ? members.map(normalizeTeamMember) : []);
  }

  function addTeamMember(name, mode, amount, frequency) {
    const value = Number(amount);
    if (!String(name || '').trim() || !Number.isFinite(value) || value <= 0) return null;
    const member = normalizeTeamMember({
      id: uid('team'),
      name: String(name || '').trim(),
      mode: mode === 'percent' ? 'percent' : 'fixed',
      amount: value,
      frequency: frequency === 'monthly' ? 'monthly' : 'weekly',
      createdAt: new Date().toISOString()
    });
    const members = getTeamMembers();
    members.unshift(member);
    saveTeamMembers(members);
    return member;
  }

  function removeTeamMember(id) {
    saveTeamMembers(getTeamMembers().filter(member => member.id !== id));
  }

  function getFinanceTotals() {
    const base = getTotals();
    const entries = getFinanceEntries();
    const ownerPayout = entries.filter(item => item.type === 'owner-payout').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const payrollPayout = entries.filter(item => item.type === 'payroll-payout').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const expenses = entries.filter(item => item.type === 'expense').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const capitalIn = base.invest;
    const paidWallet = base.paidSales - base.providerCharges - ownerPayout - payrollPayout - expenses;
    const retainedProfit = base.revenue - ownerPayout - payrollPayout - expenses;
    return {
      ...base,
      capitalIn,
      ownerPayout,
      payrollPayout,
      expenses,
      paidWallet,
      retainedProfit,
      availableCapital: capitalIn - base.providerCharges,
      financeEntryCount: entries.length,
      teamCount: getTeamMembers().length
    };
  }

  function calcForService(service, quantity) {
    const qty = Math.max(0, Number(quantity) || 0);
    const unit = Math.max(1, Number(service.rateUnit) || 1000);
    const providerRate = Number(service.providerRate) || 0;
    const clientRate = Number(service.clientRate) || 0;
    const providerCharge = (qty / unit) * providerRate;
    const clientCharge = (qty / unit) * clientRate;
    const revenue = clientCharge - providerCharge;

    return {
      quantity: qty,
      unit,
      providerRate,
      clientRate,
      providerCharge,
      clientCharge,
      revenue
    };
  }

  function isCountedOrder(order) {
    return !['voided', 'cancelled'].includes(order.status);
  }

  function activeOrders() {
    return getOrders().filter(isCountedOrder);
  }

  function getTotals() {
    const orders = getOrders();
    const active = orders.filter(isCountedOrder);
    const voided = orders.filter(order => order.status === 'voided');
    const cancelled = orders.filter(order => order.status === 'cancelled');
    const completed = active.filter(order => order.status === 'completed');
    const pending = active.filter(order => ['active', 'pending'].includes(order.status));
    const processing = active.filter(order => order.status === 'processing');
    const paid = active.filter(order => order.paymentStatus === 'paid');
    const unpaid = active.filter(order => order.paymentStatus === 'unpaid');
    const partial = active.filter(order => order.paymentStatus === 'partial');
    const providerCharges = active.reduce((sum, order) => sum + (Number(order.providerCharge) || 0), 0);
    const clientSales = active.reduce((sum, order) => sum + (Number(order.clientCharge) || 0), 0);
    const revenue = active.reduce((sum, order) => sum + (Number(order.revenue) || 0), 0);
    const paidSales = paid.reduce((sum, order) => sum + (Number(order.clientCharge) || 0), 0);
    const receivables = unpaid.reduce((sum, order) => sum + (Number(order.clientCharge) || 0), 0) + partial.reduce((sum, order) => sum + (Number(order.clientCharge) || 0), 0);
    const invest = getInvest();

    return {
      invest,
      providerCharges,
      clientSales,
      revenue,
      paidSales,
      receivables,
      availableFund: invest - providerCharges,
      activeCount: active.length,
      pendingCount: pending.length,
      processingCount: processing.length,
      completedCount: completed.length,
      voidedCount: voided.length,
      cancelledCount: cancelled.length,
      paidCount: paid.length,
      unpaidCount: unpaid.length,
      partialCount: partial.length,
      allCount: orders.length
    };
  }


  const PUBLIC_REVIEW_ID = 'Pnovalyte001';
  const PUBLIC_REVIEW_MESSAGE = 'They responded quickly and processed my order fast, even for an international client like me.';
  const PUBLIC_REVIEW_DATE = '2026-07-07T09:00:00.000Z';

  function isPublicReviewAlias(review) {
    const id = String(review && review.id ? review.id : '').trim().toLowerCase();
    const message = String(review && review.message ? review.message : '').trim().toLowerCase();
    return id === PUBLIC_REVIEW_ID.toLowerCase() || /^test\s*001$/i.test(message);
  }

  function normalizeReview(review) {
    const normalized = {
      id: '',
      token: '',
      displayName: '',
      message: '',
      rating: 5,
      createdAt: new Date().toISOString(),
      updatedAt: '',
      ...review
    };
    normalized.rating = normalizeRating(normalized.rating, 5);

    if (isPublicReviewAlias(normalized)) {
      return {
        ...normalized,
        id: PUBLIC_REVIEW_ID,
        token: '',
        displayName: '',
        message: PUBLIC_REVIEW_MESSAGE,
        rating: 5,
        createdAt: normalized.createdAt || PUBLIC_REVIEW_DATE,
        isSeed: true,
        releasedLegacy: true
      };
    }

    return normalized;
  }

  function normalizeReviewList(reviews, ensurePublicReview = false) {
    const source = Array.isArray(reviews) ? reviews : [];
    const normalized = [];
    const seenIds = new Set();

    source.map(normalizeReview).forEach(review => {
      if (!review.id || !review.message) return;
      const key = String(review.id || '').toLowerCase();
      if (key && seenIds.has(key)) return;
      if (key) seenIds.add(key);
      normalized.push(review);
    });

    if (ensurePublicReview && !seenIds.has(PUBLIC_REVIEW_ID.toLowerCase())) {
      normalized.unshift(normalizeReview({
        id: PUBLIC_REVIEW_ID,
        token: '',
        displayName: '',
        message: PUBLIC_REVIEW_MESSAGE,
        rating: 5,
        createdAt: PUBLIC_REVIEW_DATE,
        updatedAt: '',
        isSeed: true
      }));
    }

    return normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getReviews() {
    const rawReviews = readJson(KEYS.reviews, []);
    const reviews = normalizeReviewList(rawReviews, true);
    try {
      if (JSON.stringify(rawReviews || []) !== JSON.stringify(reviews)) writeJson(KEYS.reviews, reviews);
    } catch (error) {}
    return reviews;
  }

  function saveReviews(reviews) {
    writeJson(KEYS.reviews, normalizeReviewList(reviews, true));
  }

  function ensureClientReviewToken() {
    let token = localStorage.getItem(KEYS.clientReviewToken);
    if (!token) {
      token = uid('client_review');
      localStorage.setItem(KEYS.clientReviewToken, token);
    }
    return token;
  }

  function getClientReviewToken() {
    return localStorage.getItem(KEYS.clientReviewToken) || '';
  }

  function getCurrentClientReview() {
    const token = getClientReviewToken();
    if (!token) return null;
    return getReviews().find(review => review.token === token) || null;
  }

  function canEditReview(review) {
    if (!review || !review.createdAt) return false;
    return Date.now() - new Date(review.createdAt).getTime() <= 30 * 60 * 1000;
  }

  function nextReviewId(reviews) {
    const max = reviews.reduce((highest, review) => {
      const id = String(review.id || '');
      const phnovaMatch = id.match(/^phnova-00A(\d+)$/i);
      const legacyMatch = id.match(/^Pnovalyte(\d+)$/i);
      if (phnovaMatch) return Math.max(highest, Number(phnovaMatch[1]) || 0);
      if (legacyMatch) return Math.max(highest, Number(legacyMatch[1]) || 0);
      return highest;
    }, 4);
    return `phnova-00A${max + 1}`;
  }

  function isFinalClientReview(review) {
    return String(review && review.clientFeedbackLock ? review.clientFeedbackLock : '') === 'final_v5317';
  }

  function releaseCurrentReviewForOneNewSubmission() {
    // v5.3.17: release only legacy/current feedback so it becomes normal Client feedback.
    // New feedback submitted after this patch is tagged final_v5317 and stays one-time locked after refresh.
    try {
      const token = getClientReviewToken();
      if (!token) return false;

      const current = getReviews().find(review => review.token === token) || null;
      if (!current) {
        localStorage.removeItem(KEYS.clientReviewToken);
        return false;
      }

      if (isFinalClientReview(current)) return false;

      let changed = false;
      const reviews = getReviews().map(review => {
        if (review.token !== token) return review;
        changed = true;
        const next = {
          ...review,
          token: '',
          displayName: '',
          source: 'client_feedback',
          releasedLegacy: true,
          releasedAt: new Date().toISOString()
        };
        return normalizeReview(next);
      });

      if (changed) {
        saveReviews(reviews);
        localStorage.removeItem(KEYS.clientReviewToken);
        localStorage.setItem(KEYS.legacyReviewRelease, 'done');
      }
      return changed;
    } catch (error) {
      return false;
    }
  }

  function addReview(displayName, message, rating = 5) {
    // v5.3.17: feedback remains one submission per browser after the one-time legacy release.
    const text = String(message || '').trim().slice(0, 1000);
    if (!text) return { ok: false, reason: 'empty' };
    const existing = getCurrentClientReview();
    if (existing) return { ok: false, reason: canEditReview(existing) ? 'exists-editable' : 'locked', review: existing };
    const reviews = getReviews();
    const review = normalizeReview({
      id: nextReviewId(reviews),
      token: ensureClientReviewToken(),
      displayName: '',
      message: text,
      rating: normalizeRating(rating, 5),
      createdAt: new Date().toISOString(),
      updatedAt: '',
      source: 'client_feedback',
      clientFeedbackLock: 'final_v5317'
    });
    reviews.unshift(review);
    saveReviews(reviews);
    return { ok: true, review };
  }

  function updateReview(displayName, message, rating = 5) {
    const existing = getCurrentClientReview();
    if (existing) return { ok: false, reason: 'locked', review: existing };
    return addReview('', message, rating);
  }

  function formatMoney(value) {
    return peso.format(Number(value) || 0);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat('en-PH').format(Number(value) || 0);
  }

  function downloadFile(filename, text, type = 'application/json') {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function exportBackup() {
    const data = {
      exportedAt: new Date().toISOString(),
      services: getServices(),
      digitalProducts: getDigitalProducts(),
      deletedDigitalProductIds: getDeletedDigitalProductIds(),
      orders: getOrders(),
      invest: getInvest(),
      investments: getInvestments(),
      financeEntries: getFinanceEntries().filter(entry => entry.source !== 'investment'),
      teamMembers: getTeamMembers(),
      reviews: getReviews()
    };
    downloadFile(`novalyte-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2));
  }

  function importBackup(data) {
    if (Array.isArray(data.services)) saveServices(data.services);
    if (Array.isArray(data.digitalProducts)) saveDigitalProducts(data.digitalProducts);
    if (Array.isArray(data.deletedDigitalProductIds)) saveDeletedDigitalProductIds(data.deletedDigitalProductIds);
    if (Array.isArray(data.orders)) saveOrders(data.orders);
    if (Array.isArray(data.investments)) saveInvestments(data.investments);
    else if (typeof data.invest !== 'undefined') setInvest(data.invest, 'Imported total invest');
    if (Array.isArray(data.financeEntries)) saveFinanceEntries(data.financeEntries);
    if (Array.isArray(data.teamMembers)) saveTeamMembers(data.teamMembers);
    if (Array.isArray(data.reviews)) saveReviews(data.reviews);
  }

  function toast(message, type = 'success') {
    let box = document.querySelector('.toast-stack');
    if (!box) {
      box = document.createElement('div');
      box.className = 'toast-stack';
      document.body.appendChild(box);
    }

    const item = document.createElement('div');
    item.className = `toast ${type}`;
    item.textContent = message;
    box.appendChild(item);
    requestAnimationFrame(() => item.classList.add('show'));
    setTimeout(() => {
      item.classList.remove('show');
      setTimeout(() => item.remove(), 250);
    }, 3200);
  }

  window.NovalyteStore = {
    KEYS,
    uid,
    getServices,
    saveServices,
    resetServices,
    getDigitalProducts,
    saveDigitalProducts,
    getDeletedDigitalProductIds,
    saveDeletedDigitalProductIds,
    deleteDigitalProduct,
    resetDigitalProducts,
    getOrders,
    saveOrders,
    getInvestments,
    saveInvestments,
    addInvestment,
    removeInvestment,
    getFinanceEntries,
    saveFinanceEntries,
    addFinanceEntry,
    removeFinanceEntry,
    getTeamMembers,
    saveTeamMembers,
    addTeamMember,
    removeTeamMember,
    getReviews,
    saveReviews,
    getCurrentClientReview,
    releaseCurrentReviewForOneNewSubmission,
    canEditReview,
    addReview,
    updateReview,
    getFinanceTotals,
    getInvest,
    setInvest,
    calcForService,
    isCountedOrder,
    activeOrders,
    getTotals,
    formatMoney,
    formatNumber,
    downloadFile,
    exportBackup,
    importBackup,
    toast
  };
})();

// v5.3.17: restored one-submit lock after one-time legacy feedback release.
