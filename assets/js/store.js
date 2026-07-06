(function () {
  const KEYS = {
    services: 'novalyte.services.v1',
    orders: 'novalyte.orders.v1',
    invest: 'novalyte.totalInvest.v1',
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

  function getServices() {
    let services = readJson(KEYS.services, null);
    if (!Array.isArray(services) || services.length === 0) {
      services = clone(window.NOVALYTE_SEED_SERVICES || []);
      writeJson(KEYS.services, services);
    }
    return services;
  }

  function saveServices(services) {
    writeJson(KEYS.services, services);
  }

  function resetServices() {
    const services = clone(window.NOVALYTE_SEED_SERVICES || []);
    saveServices(services);
    return services;
  }

  function getOrders() {
    const orders = readJson(KEYS.orders, []);
    return Array.isArray(orders) ? orders : [];
  }

  function saveOrders(orders) {
    writeJson(KEYS.orders, orders);
  }

  function getInvest() {
    const value = Number(localStorage.getItem(KEYS.invest));
    return Number.isFinite(value) ? value : 0;
  }

  function setInvest(amount) {
    const value = Number(amount);
    localStorage.setItem(KEYS.invest, Number.isFinite(value) ? String(value) : '0');
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

  function activeOrders() {
    return getOrders().filter(order => order.status !== 'voided');
  }

  function getTotals() {
    const orders = getOrders();
    const active = orders.filter(order => order.status !== 'voided');
    const voided = orders.filter(order => order.status === 'voided');
    const providerCharges = active.reduce((sum, order) => sum + (Number(order.providerCharge) || 0), 0);
    const clientSales = active.reduce((sum, order) => sum + (Number(order.clientCharge) || 0), 0);
    const revenue = active.reduce((sum, order) => sum + (Number(order.revenue) || 0), 0);
    const invest = getInvest();

    return {
      invest,
      providerCharges,
      clientSales,
      revenue,
      availableFund: invest - providerCharges,
      activeCount: active.length,
      voidedCount: voided.length,
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
      invest: getInvest()
    };
    downloadFile(`novalyte-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2));
  }

  function importBackup(data) {
    if (Array.isArray(data.services)) saveServices(data.services);
    if (Array.isArray(data.orders)) saveOrders(data.orders);
    if (typeof data.invest !== 'undefined') setInvest(data.invest);
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
    }, 2800);
  }

  window.NovalyteStore = {
    KEYS,
    uid,
    getServices,
    saveServices,
    resetServices,
    getOrders,
    saveOrders,
    getInvest,
    setInvest,
    calcForService,
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
