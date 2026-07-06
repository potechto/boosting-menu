(function () {
  const KEYS = {
    services: 'novalyte.services.v1',
    orders: 'novalyte.orders.v1',
    invest: 'novalyte.totalInvest.v1',
    investments: 'novalyte.investments.v1',
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

  function getServices() {
    let services = readJson(KEYS.services, null);
    if (!Array.isArray(services) || services.length === 0) {
      services = clone(window.NOVALYTE_SEED_SERVICES || []).map(normalizeService);
      writeJson(KEYS.services, services);
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
      orders: getOrders(),
      invest: getInvest(),
      investments: getInvestments()
    };
    downloadFile(`novalyte-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2));
  }

  function importBackup(data) {
    if (Array.isArray(data.services)) saveServices(data.services);
    if (Array.isArray(data.orders)) saveOrders(data.orders);
    if (Array.isArray(data.investments)) saveInvestments(data.investments);
    else if (typeof data.invest !== 'undefined') setInvest(data.invest, 'Imported total invest');
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
    getOrders,
    saveOrders,
    getInvestments,
    saveInvestments,
    addInvestment,
    removeInvestment,
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
