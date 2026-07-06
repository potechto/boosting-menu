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
    loginAlert: document.getElementById('loginAlert'),
    logoutBtn: document.getElementById('logoutBtn'),
    statsGrid: document.getElementById('statsGrid'),
    investAmount: document.getElementById('investAmount'),
    addInvestAmount: document.getElementById('addInvestAmount'),
    addInvestNote: document.getElementById('addInvestNote'),
    investmentsTable: document.getElementById('investmentsTable'),
    saveInvestBtn: document.getElementById('saveInvestBtn'),
    addInvestBtn: document.getElementById('addInvestBtn'),
    adminServiceSearch: document.getElementById('adminServiceSearch'),
    adminPlatformFilter: document.getElementById('adminPlatformFilter'),
    adminArchiveFilter: document.getElementById('adminArchiveFilter'),
    servicesTable: document.getElementById('servicesTable'),
    addServiceBtn: document.getElementById('addServiceBtn'),
    exportBackupBtn: document.getElementById('exportBackupBtn'),
    importBackupInput: document.getElementById('importBackupInput'),
    exportOrdersCsvBtn: document.getElementById('exportOrdersCsvBtn'),
    resetDemoBtn: document.getElementById('resetDemoBtn'),
    orderSearch: document.getElementById('orderSearch'),
    orderStatusFilter: document.getElementById('orderStatusFilter'),
    paymentStatusFilter: document.getElementById('paymentStatusFilter'),
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
    serviceArchived: document.getElementById('serviceArchived'),
    serviceDescription: document.getElementById('serviceDescription'),
    serviceRevenuePreview: document.getElementById('serviceRevenuePreview'),
    orderModal: document.getElementById('orderModal'),
    orderForm: document.getElementById('orderForm'),
    orderServiceId: document.getElementById('orderServiceId'),
    orderServiceName: document.getElementById('orderServiceName'),
    orderClientName: document.getElementById('orderClientName'),
    orderClientContact: document.getElementById('orderClientContact'),
    orderQuantity: document.getElementById('orderQuantity'),
    orderStatus: document.getElementById('orderStatus'),
    orderPaymentStatus: document.getElementById('orderPaymentStatus'),
    orderTarget: document.getElementById('orderTarget'),
    orderCalcPreview: document.getElementById('orderCalcPreview'),
    orderNotes: document.getElementById('orderNotes'),
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
  const servicePageSize = 8;
  const orderPageSize = 10;

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
    if (window.NovalyteShowAdminPanel) window.NovalyteShowAdminPanel(activePanel || 'dashboard');
  }

  function showLogin() {
    els.loginView.classList.remove('hidden');
    els.dashboardView.classList.add('hidden');
  }

  function sanitize(text) {
    return String(text ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function platformIcon(platform) {
    const map = { Facebook: 'f', Instagram: '◎', TikTok: '♪', YouTube: '▶', Telegram: '✈' };
    return map[platform] || '•';
  }

  function platformBadge(platform) {
    const key = String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<span class="platform-pill platform-${key}"><span class="platform-mini-icon">${sanitize(platformIcon(platform))}</span>${sanitize(platform)}</span>`;
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
      const dashboard = document.getElementById('dashboard');
      const stats = document.getElementById('statsGrid');
      const services = document.getElementById('services');
      const investments = document.getElementById('investments');
      const orders = document.getElementById('orders');
      [dashboard, stats, services, investments, orders].forEach(el => el && el.classList.add('hidden'));
      if (activePanel === 'dashboard') {
        dashboard && dashboard.classList.remove('hidden');
        stats && stats.classList.remove('hidden');
      }
      if (activePanel === 'services') services && services.classList.remove('hidden');
      if (activePanel === 'investments') investments && investments.classList.remove('hidden');
      if (activePanel === 'orders') orders && orders.classList.remove('hidden');
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activePanel}`));
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    navLinks.forEach(link => {
      link.addEventListener('click', event => {
        const target = link.getAttribute('href').replace('#', '');
        if (!['dashboard', 'services', 'investments', 'orders'].includes(target)) return;
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

  function dateText(value) {
    return value ? new Date(value).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }) : '-';
  }

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
    els.investAmount.value = totals.invest || '';
  }

  function renderInvestments() {
    const entries = Store.getInvestments();
    if (!entries.length) {
      els.investmentsTable.innerHTML = '<tr><td colspan="4"><div class="empty-state">No investment entries yet.</div></td></tr>';
      return;
    }

    els.investmentsTable.innerHTML = entries.map(entry => `
      <tr>
        <td>${sanitize(dateText(entry.createdAt))}</td>
        <td><strong>${Store.formatMoney(entry.amount)}</strong></td>
        <td>${sanitize(entry.note || 'No note')}</td>
        <td><button class="btn small danger" type="button" data-remove-investment="${entry.id}">Remove</button></td>
      </tr>
    `).join('');
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
      const matchesArchive = archive === 'all' || (archive === 'active' && !archived) || (archive === 'archived' && archived);
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
      <div class="page-summary">Showing ${Store.formatNumber(start)}-${Store.formatNumber(end)} of ${Store.formatNumber(total)} services</div>
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
      els.servicesTable.innerHTML = '<tr><td colspan="8"><div class="empty-state">No service found.</div></td></tr>';
      return;
    }

    const start = (servicePage - 1) * servicePageSize;
    const paged = services.slice(start, start + servicePageSize);
    els.servicesTable.innerHTML = paged.map(service => {
      const revenue = (Number(service.clientRate) || 0) - (Number(service.providerRate) || 0);
      const statusText = service.archived ? 'Archived' : service.visible === false ? 'Hidden' : 'Visible';
      const statusClass = service.archived ? 'archived' : service.visible === false ? 'is-hidden' : 'visible';
      const archiveAction = service.archived
        ? `<button class="btn small success" type="button" data-archive-service="${service.id}" data-archive-value="false">Restore</button>`
        : `<button class="btn small danger" type="button" data-archive-service="${service.id}" data-archive-value="true">Archive</button>`;

      return `
        <tr>
          <td data-label="Service">
            <strong>${sanitize(service.name)}</strong><br>
            <span class="service-desc">${sanitize(service.category)} · ${sanitize(service.avgTime || 'Varies')}</span>
          </td>
          <td data-label="Provider ID"><span class="id-chip">${sanitize(service.providerId)}</span></td>
          <td data-label="Platform">${platformBadge(service.platform)}</td>
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

    return Store.getOrders().filter(order => {
      const text = `${order.clientName} ${order.clientContact} ${order.serviceName} ${order.providerId} ${order.platform} ${order.target} ${order.notes} ${order.voidReason}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesStatus = status === 'all' || order.status === status;
      const matchesPayment = payment === 'all' || order.paymentStatus === payment;
      return matchesSearch && matchesStatus && matchesPayment;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

  function renderOrdersTable() {
    const orders = filteredOrders();
    renderAdminOrdersPagination(orders.length);
    if (!orders.length) {
      els.ordersTable.innerHTML = '<tr><td colspan="10"><div class="empty-state">No orders yet.</div></td></tr>';
      return;
    }

    const start = (orderPage - 1) * orderPageSize;
    const paged = orders.slice(start, start + orderPageSize);
    els.ordersTable.innerHTML = paged.map(order => {
      const status = order.status || 'active';
      const payment = order.paymentStatus || 'paid';
      const actionButton = status === 'voided'
        ? `<button class="btn small success" type="button" data-undo-void="${order.id}">Undo Void</button>`
        : `<button class="btn small warning" type="button" data-void-order="${order.id}">Void</button>`;
      return `
        <tr>
          <td data-label="Date">${sanitize(dateText(order.createdAt))}</td>
          <td data-label="Client">
            <strong>${sanitize(order.clientName || 'No client ref')}</strong><br>
            <span class="service-desc">${sanitize(order.clientContact || 'No contact')}</span>
          </td>
          <td data-label="Service">
            <strong>${sanitize(order.serviceName)}</strong><br>
            <span class="service-desc">${sanitize(order.providerId)} · ${sanitize(order.platform)}</span>
          </td>
          <td data-label="Qty">${Store.formatNumber(order.quantity)}</td>
          <td data-label="Provider">${Store.formatMoney(order.providerCharge)}</td>
          <td data-label="Client"><strong>${Store.formatMoney(order.clientCharge)}</strong></td>
          <td data-label="Revenue"><strong>${Store.formatMoney(order.revenue)}</strong></td>
          <td data-label="Status"><span class="status-pill ${status}">${statusLabels[status] || status}</span></td>
          <td data-label="Payment"><span class="status-pill payment-${payment}">${paymentLabels[payment] || payment}</span></td>
          <td data-label="Actions"><div class="actions-cell">
            <button class="btn small" type="button" data-view-order="${order.id}">View</button>
            ${actionButton}
          </div></td>
        </tr>
      `;
    }).join('');
  }

  function renderAll() {
    Store.getServices();
    fillAdminFilters();
    renderStats();
    renderInvestments();
    renderServicesTable();
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
      clientRate: 0, rateUnit: 1000, min: 100, max: 10000, avgTime: '', tag: '', visible: true, archived: false
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
      visible: els.serviceVisible.checked,
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
    if (archived) service.visible = false;
    Store.saveServices(services);
    Store.toast(archived ? 'Service archived and hidden from clients.' : 'Service restored. Review visibility before sharing.');
    renderAll();
  }

  function fillOrderForm(service) {
    els.orderServiceId.value = service.id;
    els.orderServiceName.value = `${service.name} (${service.providerId})`;
    els.orderClientName.value = '';
    els.orderClientContact.value = '';
    els.orderQuantity.value = service.rateUnit || 1000;
    els.orderStatus.value = 'active';
    els.orderPaymentStatus.value = 'paid';
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
      <div class="preview-card"><span>Provider Charge</span><strong>${Store.formatMoney(calc.providerCharge)}</strong></div>
      <div class="preview-card"><span>Client Charge</span><strong>${Store.formatMoney(calc.clientCharge)}</strong></div>
      <div class="preview-card good"><span>Revenue</span><strong>${Store.formatMoney(calc.revenue)}</strong></div>
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
      status: els.orderStatus.value || 'active',
      paymentStatus: els.orderPaymentStatus.value || 'paid',
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
      clientContact: els.orderClientContact.value.trim(),
      target: els.orderTarget.value.trim(),
      notes: els.orderNotes.value.trim(),
      voidReason: '',
      voidedAt: null
    };

    const orders = Store.getOrders();
    orders.unshift(order);
    Store.saveOrders(orders);
    closeModal(els.orderModal);
    Store.toast('Order saved. Totals updated using the price snapshot.');
    renderAll();
    document.getElementById('orders').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateOrderStatus(orderId, status, extra = {}) {
    const orders = Store.getOrders();
    const order = orders.find(item => item.id === orderId);
    if (!order) return;
    order.status = status;
    Object.assign(order, extra);
    if (status === 'voided') order.voidedAt = new Date().toISOString();
    if (status !== 'voided') {
      order.voidedAt = null;
      order.voidReason = '';
    }
    Store.saveOrders(orders);
    Store.toast(status === 'voided' ? 'Order voided and removed from totals.' : 'Void undone. Order counted again.');
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
    const rows = [
      ['Date', dateText(order.createdAt)],
      ['Status', statusLabels[order.status] || order.status],
      ['Payment', paymentLabels[order.paymentStatus] || order.paymentStatus],
      ['Client', order.clientName || 'No client ref'],
      ['Contact', order.clientContact || 'No contact'],
      ['Service', `${order.serviceName} (${order.providerId})`],
      ['Platform', order.platform],
      ['Quantity', Store.formatNumber(order.quantity)],
      ['Provider Rate', `${Store.formatMoney(order.providerRate)} / ${Store.formatNumber(order.rateUnit)}`],
      ['Client Rate', `${Store.formatMoney(order.clientRate)} / ${Store.formatNumber(order.rateUnit)}`],
      ['Provider Charge', Store.formatMoney(order.providerCharge)],
      ['Client Charge', Store.formatMoney(order.clientCharge)],
      ['Revenue', Store.formatMoney(order.revenue)],
      ['Target', order.target || 'No target'],
      ['Notes', order.notes || 'No notes'],
      ['Void Reason', order.voidReason || 'Not voided']
    ];
    els.orderDetailsBody.innerHTML = rows.map(([label, value]) => `
      <div class="detail-row"><span>${sanitize(label)}</span><strong>${sanitize(value)}</strong></div>
    `).join('');
    openModal(els.orderDetailsModal);
  }

  function exportOrdersCsv() {
    const orders = Store.getOrders();
    const header = ['Date', 'Status', 'Payment Status', 'Client', 'Contact', 'Service', 'Provider ID', 'Platform', 'Quantity', 'Rate Unit', 'Provider Rate', 'Client Rate', 'Provider Charge', 'Client Charge', 'Revenue', 'Target', 'Notes', 'Void Reason'];
    const rows = orders.map(order => [
      order.createdAt,
      order.status,
      order.paymentStatus || 'paid',
      order.clientName || '',
      order.clientContact || '',
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
      order.notes || '',
      order.voidReason || ''
    ]);
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    Store.downloadFile(`novalyte-orders-${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv');
  }

  function bindEvents() {
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

    els.loginForm.addEventListener('submit', event => {
      event.preventDefault();
      const ok = els.loginUser.value.trim() === AUTH.username && els.loginPass.value === AUTH.password && els.loginPin.value === AUTH.pin;
      if (!ok) {
        els.loginAlert.textContent = 'Wrong username, password, or PIN. Please check the admin credentials.';
        els.loginAlert.classList.remove('hidden');
        Store.toast('Login failed.', 'error');
        return;
      }
      els.loginAlert.classList.add('hidden');
      setLoggedIn(true);
      Store.toast('Welcome, admin.');
      showDashboard();
    });

    els.logoutBtn.addEventListener('click', () => {
      setLoggedIn(false);
      Store.toast('Logged out.');
      showLogin();
    });

    els.addInvestBtn.addEventListener('click', () => {
      const add = Number(els.addInvestAmount.value) || 0;
      if (add <= 0) {
        Store.toast('Enter a valid investment amount.', 'error');
        return;
      }
      Store.addInvestment(add, els.addInvestNote.value);
      els.addInvestAmount.value = '';
      els.addInvestNote.value = '';
      Store.toast('Investment added.');
      renderAll();
    });

    els.saveInvestBtn.addEventListener('click', () => {
      const confirmed = confirm('Override total invest? This will replace the investment log with one correction entry.');
      if (!confirmed) return;
      Store.setInvest(els.investAmount.value || 0, 'Manual correction / override');
      Store.toast('Total invest overridden.');
      renderAll();
    });

    els.investmentsTable.addEventListener('click', event => {
      const btn = event.target.closest('[data-remove-investment]');
      if (!btn) return;
      const confirmed = confirm('Remove this investment entry?');
      if (!confirmed) return;
      Store.removeInvestment(btn.dataset.removeInvestment);
      Store.toast('Investment entry removed.');
      renderAll();
    });

    [els.adminServiceSearch, els.adminPlatformFilter, els.adminArchiveFilter].forEach(el => el.addEventListener('input', () => {
      servicePage = 1;
      renderServicesTable();
    }));
    [els.orderSearch, els.orderStatusFilter, els.paymentStatusFilter].forEach(el => el.addEventListener('input', () => {
      orderPage = 1;
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
      const orderPager = event.target.closest('[data-admin-order-page]');
      if (orderPager) {
        const total = filteredOrders().length;
        const pages = Math.max(1, Math.ceil(total / orderPageSize));
        if (orderPager.dataset.adminOrderPage === 'prev') orderPage = Math.max(1, orderPage - 1);
        if (orderPager.dataset.adminOrderPage === 'next') orderPage = Math.min(pages, orderPage + 1);
        renderOrdersTable();
      }
    });

    els.addServiceBtn.addEventListener('click', () => fillServiceForm(null));
    els.servicesTable.addEventListener('click', event => {
      const editBtn = event.target.closest('[data-edit-service]');
      const orderBtn = event.target.closest('[data-create-order]');
      const archiveBtn = event.target.closest('[data-archive-service]');
      if (editBtn) {
        const service = getServiceById(editBtn.dataset.editService);
        if (service) fillServiceForm(service);
      }
      if (orderBtn) {
        const service = getServiceById(orderBtn.dataset.createOrder);
        if (service) fillOrderForm(service);
      }
      if (archiveBtn) {
        const archived = archiveBtn.dataset.archiveValue === 'true';
        const confirmed = confirm(archived ? 'Archive this service and hide it from clients?' : 'Restore this archived service?');
        if (confirmed) archiveService(archiveBtn.dataset.archiveService, archived);
      }
    });

    els.ordersTable.addEventListener('click', event => {
      const voidBtn = event.target.closest('[data-void-order]');
      const undoBtn = event.target.closest('[data-undo-void]');
      const viewBtn = event.target.closest('[data-view-order]');
      if (viewBtn) viewOrder(viewBtn.dataset.viewOrder);
      if (voidBtn) openVoidModal(voidBtn.dataset.voidOrder);
      if (undoBtn) updateOrderStatus(undoBtn.dataset.undoVoid, 'active');
    });

    els.confirmVoidBtn.addEventListener('click', () => {
      const orderId = els.voidOrderId.value;
      const reason = els.voidReason.value.trim();
      updateOrderStatus(orderId, 'voided', { voidReason: reason });
      closeModal(els.voidModal);
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(document.getElementById(btn.dataset.closeModal)));
    });

    [els.serviceModal, els.orderModal, els.voidModal, els.orderDetailsModal].forEach(modal => {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal(modal);
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.modal-backdrop.open').forEach(closeModal);
    });

    [els.serviceProviderRate, els.serviceClientRate, els.serviceRateUnit].forEach(el => {
      el.addEventListener('input', updateServiceRevenuePreview);
    });
    els.serviceForm.addEventListener('submit', saveServiceFromForm);

    [els.orderQuantity, els.orderStatus, els.orderPaymentStatus].forEach(el => el.addEventListener('input', updateOrderCalcPreview));
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
      const confirmed = confirm('Reset services to demo data and clear all orders/investments?');
      if (!confirmed) return;
      Store.resetServices();
      Store.saveOrders([]);
      Store.saveInvestments([]);
      Store.toast('Demo data reset.');
      renderAll();
    });
  }

  function init() {
    Store.getServices();
    Store.getInvestments();
    setupAdminPanels();
    bindEvents();
    if (isLoggedIn()) showDashboard();
    else showLogin();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
