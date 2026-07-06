(function () {
  const Store = window.NovalyteStore;
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
    showPassword: document.getElementById('showPassword'),
    logoutBtn: document.getElementById('logoutBtn'),
    statsGrid: document.getElementById('statsGrid'),
    investAmount: document.getElementById('investAmount'),
    addInvestAmount: document.getElementById('addInvestAmount'),
    saveInvestBtn: document.getElementById('saveInvestBtn'),
    addInvestBtn: document.getElementById('addInvestBtn'),
    adminServiceSearch: document.getElementById('adminServiceSearch'),
    adminPlatformFilter: document.getElementById('adminPlatformFilter'),
    servicesTable: document.getElementById('servicesTable'),
    addServiceBtn: document.getElementById('addServiceBtn'),
    exportBackupBtn: document.getElementById('exportBackupBtn'),
    importBackupInput: document.getElementById('importBackupInput'),
    exportOrdersCsvBtn: document.getElementById('exportOrdersCsvBtn'),
    resetDemoBtn: document.getElementById('resetDemoBtn'),
    orderSearch: document.getElementById('orderSearch'),
    orderStatusFilter: document.getElementById('orderStatusFilter'),
    ordersTable: document.getElementById('ordersTable'),
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
    serviceDescription: document.getElementById('serviceDescription'),
    serviceRevenuePreview: document.getElementById('serviceRevenuePreview'),
    orderModal: document.getElementById('orderModal'),
    orderForm: document.getElementById('orderForm'),
    orderServiceId: document.getElementById('orderServiceId'),
    orderServiceName: document.getElementById('orderServiceName'),
    orderClientName: document.getElementById('orderClientName'),
    orderQuantity: document.getElementById('orderQuantity'),
    orderTarget: document.getElementById('orderTarget'),
    orderCalcPreview: document.getElementById('orderCalcPreview'),
    orderNotes: document.getElementById('orderNotes')
  };

  function isLoggedIn() {
    return sessionStorage.getItem(Store.KEYS.session) === 'true';
  }

  function setLoggedIn(value) {
    if (value) sessionStorage.setItem(Store.KEYS.session, 'true');
    else sessionStorage.removeItem(Store.KEYS.session);
  }

  function showDashboard() {
    els.loginView.classList.add('hidden');
    els.dashboardView.classList.remove('hidden');
    renderAll();
  }

  function showLogin() {
    els.loginView.classList.remove('hidden');
    els.dashboardView.classList.add('hidden');
  }

  function sanitize(text) {
    return String(text ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }

  function platformOptions() {
    const services = Store.getServices();
    return [...new Set(services.map(item => item.platform).filter(Boolean))].sort();
  }

  function renderStats() {
    const totals = Store.getTotals();
    const fundClass = totals.availableFund < 0 ? 'bad' : totals.availableFund < totals.invest * 0.25 ? 'warn' : 'good';
    const stats = [
      { label: 'TOTAL INVEST', value: Store.formatMoney(totals.invest), className: '' },
      { label: 'TOTAL ORDERS / PROVIDER CHARGES', value: Store.formatMoney(totals.providerCharges), className: '' },
      { label: 'TOTAL CLIENT SALES', value: Store.formatMoney(totals.clientSales), className: '' },
      { label: 'TOTAL REVENUE', value: Store.formatMoney(totals.revenue), className: 'good' },
      { label: 'AVAILABLE FUND ESTIMATE', value: Store.formatMoney(totals.availableFund), className: fundClass },
      { label: 'ACTIVE ORDERS', value: Store.formatNumber(totals.activeCount), className: '' },
      { label: 'VOIDED ORDERS', value: Store.formatNumber(totals.voidedCount), className: totals.voidedCount ? 'warn' : '' },
      { label: 'ALL ORDER RECORDS', value: Store.formatNumber(totals.allCount), className: '' }
    ];

    els.statsGrid.innerHTML = stats.map(item => `
      <article class="stat-card ${item.className}">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </article>
    `).join('');
    els.investAmount.value = totals.invest || '';
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

    return Store.getServices().filter(service => {
      const text = `${service.name} ${service.platform} ${service.category} ${service.providerId} ${service.description} ${service.tag}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesPlatform = platform === 'all' || service.platform === platform;
      return matchesSearch && matchesPlatform;
    });
  }

  function renderServicesTable() {
    const services = filteredServices();
    if (!services.length) {
      els.servicesTable.innerHTML = '<tr><td colspan="8"><div class="empty-state">No service found.</div></td></tr>';
      return;
    }

    els.servicesTable.innerHTML = services.map(service => {
      const revenue = (Number(service.clientRate) || 0) - (Number(service.providerRate) || 0);
      return `
        <tr>
          <td>
            <strong>${sanitize(service.name)}</strong><br>
            <span class="service-desc">${sanitize(service.category)} · ${sanitize(service.avgTime || 'Varies')}</span>
          </td>
          <td><span class="id-chip">${sanitize(service.providerId)}</span></td>
          <td>${sanitize(service.platform)}</td>
          <td>${Store.formatMoney(service.providerRate)} / ${Store.formatNumber(service.rateUnit)}</td>
          <td><strong>${Store.formatMoney(service.clientRate)}</strong> / ${Store.formatNumber(service.rateUnit)}</td>
          <td><strong>${Store.formatMoney(revenue)}</strong></td>
          <td><span class="status-pill ${service.visible === false ? 'is-hidden' : 'visible'}">${service.visible === false ? 'Hidden' : 'Visible'}</span></td>
          <td>
            <div class="actions-cell">
              <button class="btn small primary" type="button" data-create-order="${service.id}">Create Order</button>
              <button class="btn small" type="button" data-edit-service="${service.id}">Edit</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function filteredOrders() {
    const search = els.orderSearch.value.trim().toLowerCase();
    const status = els.orderStatusFilter.value;

    return Store.getOrders().filter(order => {
      const text = `${order.clientName} ${order.serviceName} ${order.providerId} ${order.platform} ${order.target} ${order.notes}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesStatus = status === 'all' || order.status === status;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderOrdersTable() {
    const orders = filteredOrders();
    if (!orders.length) {
      els.ordersTable.innerHTML = '<tr><td colspan="9"><div class="empty-state">No orders yet.</div></td></tr>';
      return;
    }

    els.ordersTable.innerHTML = orders.map(order => {
      const date = order.createdAt ? new Date(order.createdAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }) : '-';
      const status = order.status === 'voided' ? 'voided' : 'active';
      const actionButton = status === 'voided'
        ? `<button class="btn small success" type="button" data-undo-void="${order.id}">Undo Void</button>`
        : `<button class="btn small warning" type="button" data-void-order="${order.id}">Void</button>`;
      return `
        <tr>
          <td>${sanitize(date)}</td>
          <td>${sanitize(order.clientName || 'No client ref')}</td>
          <td>
            <strong>${sanitize(order.serviceName)}</strong><br>
            <span class="service-desc">${sanitize(order.providerId)} · ${sanitize(order.platform)}</span>
          </td>
          <td>${Store.formatNumber(order.quantity)}</td>
          <td>${Store.formatMoney(order.providerCharge)}</td>
          <td><strong>${Store.formatMoney(order.clientCharge)}</strong></td>
          <td><strong>${Store.formatMoney(order.revenue)}</strong></td>
          <td><span class="status-pill ${status}">${status === 'voided' ? 'Voided' : 'Active'}</span></td>
          <td><div class="actions-cell">${actionButton}</div></td>
        </tr>
      `;
    }).join('');
  }

  function renderAll() {
    Store.getServices();
    fillAdminFilters();
    renderStats();
    renderServicesTable();
    renderOrdersTable();
  }

  function openModal(modal) {
    modal.classList.add('open');
  }

  function closeModal(modal) {
    modal.classList.remove('open');
  }

  function getServiceById(id) {
    return Store.getServices().find(service => service.id === id);
  }

  function fillServiceForm(service) {
    const isNew = !service;
    const data = service || {
      id: '', providerId: '', platform: '', category: '', name: '', description: '', providerRate: 0,
      clientRate: 0, rateUnit: 1000, min: 100, max: 10000, avgTime: '', tag: '', visible: true
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
    els.serviceDescription.value = data.description || '';
    updateServiceRevenuePreview();
    openModal(els.serviceModal);
  }

  function updateServiceRevenuePreview() {
    const providerRate = Number(els.serviceProviderRate.value) || 0;
    const clientRate = Number(els.serviceClientRate.value) || 0;
    const unit = Number(els.serviceRateUnit.value) || 1000;
    const revenue = clientRate - providerRate;
    els.serviceRevenuePreview.textContent = `Revenue preview: ${Store.formatMoney(revenue)} per ${Store.formatNumber(unit)} order quantity`;
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
      visible: els.serviceVisible.checked,
      description: els.serviceDescription.value.trim()
    };

    if (existingIndex >= 0) services[existingIndex] = service;
    else services.unshift(service);

    Store.saveServices(services);
    closeModal(els.serviceModal);
    Store.toast('Service saved.');
    renderAll();
  }

  function fillOrderForm(service) {
    els.orderServiceId.value = service.id;
    els.orderServiceName.value = `${service.name} (${service.providerId})`;
    els.orderClientName.value = '';
    els.orderQuantity.value = service.rateUnit || 1000;
    els.orderTarget.value = '';
    els.orderNotes.value = '';
    updateOrderCalcPreview();
    openModal(els.orderModal);
  }

  function selectedOrderService() {
    return getServiceById(els.orderServiceId.value);
  }

  function updateOrderCalcPreview() {
    const service = selectedOrderService();
    if (!service) {
      els.orderCalcPreview.textContent = 'No selected service.';
      return;
    }

    const calc = Store.calcForService(service, els.orderQuantity.value);
    els.orderCalcPreview.innerHTML = `
      Provider Charge: <strong>${Store.formatMoney(calc.providerCharge)}</strong> ·
      Client Charge: <strong>${Store.formatMoney(calc.clientCharge)}</strong> ·
      Revenue: <strong>${Store.formatMoney(calc.revenue)}</strong>
    `;
  }

  function saveOrder(event) {
    event.preventDefault();
    const service = selectedOrderService();
    if (!service) {
      Store.toast('Service not found.', 'error');
      return;
    }

    const calc = Store.calcForService(service, els.orderQuantity.value);
    if (calc.quantity <= 0) {
      Store.toast('Enter valid quantity.', 'error');
      return;
    }

    const order = {
      id: Store.uid('order'),
      createdAt: new Date().toISOString(),
      status: 'active',
      serviceId: service.id,
      serviceName: service.name,
      providerId: service.providerId,
      platform: service.platform,
      category: service.category,
      quantity: calc.quantity,
      rateUnit: calc.unit,
      providerRate: calc.providerRate,
      clientRate: calc.clientRate,
      providerCharge: calc.providerCharge,
      clientCharge: calc.clientCharge,
      revenue: calc.revenue,
      clientName: els.orderClientName.value.trim(),
      target: els.orderTarget.value.trim(),
      notes: els.orderNotes.value.trim(),
      voidedAt: null
    };

    const orders = Store.getOrders();
    orders.unshift(order);
    Store.saveOrders(orders);
    closeModal(els.orderModal);
    Store.toast('Order saved and totals updated.');
    renderAll();
    document.getElementById('orders').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateOrderStatus(orderId, status) {
    const orders = Store.getOrders();
    const order = orders.find(item => item.id === orderId);
    if (!order) return;
    order.status = status;
    order.voidedAt = status === 'voided' ? new Date().toISOString() : null;
    Store.saveOrders(orders);
    Store.toast(status === 'voided' ? 'Order voided and removed from totals.' : 'Void undone. Order counted again.');
    renderAll();
  }

  function exportOrdersCsv() {
    const orders = Store.getOrders();
    const header = ['Date', 'Status', 'Client', 'Service', 'Provider ID', 'Platform', 'Quantity', 'Rate Unit', 'Provider Rate', 'Client Rate', 'Provider Charge', 'Client Charge', 'Revenue', 'Target', 'Notes'];
    const rows = orders.map(order => [
      order.createdAt,
      order.status,
      order.clientName || '',
      order.serviceName,
      order.providerId,
      order.platform,
      order.quantity,
      order.rateUnit,
      order.providerRate,
      order.clientRate,
      order.providerCharge,
      order.clientCharge,
      order.revenue,
      order.target || '',
      order.notes || ''
    ]);
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    Store.downloadFile(`novalyte-orders-${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv');
  }

  function bindEvents() {
    els.loginForm.addEventListener('submit', event => {
      event.preventDefault();
      const ok = els.loginUser.value.trim() === AUTH.username && els.loginPass.value === AUTH.password && els.loginPin.value === AUTH.pin;
      if (!ok) {
        Store.toast('Wrong username, password, or PIN.', 'error');
        return;
      }
      setLoggedIn(true);
      Store.toast('Welcome, admin.');
      showDashboard();
    });

    els.showPassword.addEventListener('change', () => {
      const type = els.showPassword.checked ? 'text' : 'password';
      els.loginPass.type = type;
      els.loginPin.type = type;
    });

    els.logoutBtn.addEventListener('click', () => {
      setLoggedIn(false);
      Store.toast('Logged out.');
      showLogin();
    });

    els.saveInvestBtn.addEventListener('click', () => {
      Store.setInvest(els.investAmount.value || 0);
      Store.toast('Total invest saved.');
      renderStats();
    });

    els.addInvestBtn.addEventListener('click', () => {
      const add = Number(els.addInvestAmount.value) || 0;
      const current = Store.getInvest();
      Store.setInvest(current + add);
      els.addInvestAmount.value = '';
      Store.toast('Investment added.');
      renderStats();
    });

    [els.adminServiceSearch, els.adminPlatformFilter].forEach(el => el.addEventListener('input', renderServicesTable));
    [els.orderSearch, els.orderStatusFilter].forEach(el => el.addEventListener('input', renderOrdersTable));

    els.addServiceBtn.addEventListener('click', () => fillServiceForm(null));
    els.servicesTable.addEventListener('click', event => {
      const editBtn = event.target.closest('[data-edit-service]');
      const orderBtn = event.target.closest('[data-create-order]');
      if (editBtn) {
        const service = getServiceById(editBtn.dataset.editService);
        if (service) fillServiceForm(service);
      }
      if (orderBtn) {
        const service = getServiceById(orderBtn.dataset.createOrder);
        if (service) fillOrderForm(service);
      }
    });

    els.ordersTable.addEventListener('click', event => {
      const voidBtn = event.target.closest('[data-void-order]');
      const undoBtn = event.target.closest('[data-undo-void]');
      if (voidBtn) updateOrderStatus(voidBtn.dataset.voidOrder, 'voided');
      if (undoBtn) updateOrderStatus(undoBtn.dataset.undoVoid, 'active');
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(document.getElementById(btn.dataset.closeModal)));
    });

    [els.serviceModal, els.orderModal].forEach(modal => {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal(modal);
      });
    });

    [els.serviceProviderRate, els.serviceClientRate, els.serviceRateUnit].forEach(el => {
      el.addEventListener('input', updateServiceRevenuePreview);
    });
    els.serviceForm.addEventListener('submit', saveServiceFromForm);

    els.orderQuantity.addEventListener('input', updateOrderCalcPreview);
    els.orderForm.addEventListener('submit', saveOrder);

    els.exportBackupBtn.addEventListener('click', Store.exportBackup);
    els.importBackupInput.addEventListener('change', async event => {
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
    els.resetDemoBtn.addEventListener('click', () => {
      const confirmed = confirm('Reset services to demo data and clear all orders/investment?');
      if (!confirmed) return;
      Store.resetServices();
      Store.saveOrders([]);
      Store.setInvest(0);
      Store.toast('Demo data reset.');
      renderAll();
    });
  }

  function init() {
    Store.getServices();
    bindEvents();
    if (isLoggedIn()) showDashboard();
    else showLogin();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
