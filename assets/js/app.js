(function () {
  const Store = window.NovalyteStore;
  const els = {
    visibleServiceCount: document.getElementById('visibleServiceCount'),
    platformCount: document.getElementById('platformCount'),
    calcPlatform: document.getElementById('calcPlatform'),
    calcService: document.getElementById('calcService'),
    calcQuantity: document.getElementById('calcQuantity'),
    calcLink: document.getElementById('calcLink'),
    calcNotice: document.getElementById('calcNotice'),
    clientTotal: document.getElementById('clientTotal'),
    calcMeta: document.getElementById('calcMeta'),
    orderMessage: document.getElementById('orderMessage'),
    copyOrderBtn: document.getElementById('copyOrderBtn'),
    serviceSearch: document.getElementById('serviceSearch'),
    platformFilter: document.getElementById('platformFilter'),
    categoryFilter: document.getElementById('categoryFilter'),
    clearFilters: document.getElementById('clearFilters'),
    servicesGrid: document.getElementById('servicesGrid'),
    emptyServices: document.getElementById('emptyServices')
  };

  function platformClass(platform) {
    return `platform-${String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  function visibleServices() {
    return Store.getServices().filter(service => service.visible !== false);
  }

  function unique(list, key) {
    return [...new Set(list.map(item => item[key]).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  }

  function option(value, label) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    return opt;
  }

  function fillFilters() {
    const services = visibleServices();
    const platforms = unique(services, 'platform');
    const categories = unique(services, 'category');

    els.platformFilter.innerHTML = '';
    els.platformFilter.append(option('all', 'All platforms'));
    platforms.forEach(platform => els.platformFilter.append(option(platform, platform)));

    els.categoryFilter.innerHTML = '';
    els.categoryFilter.append(option('all', 'All categories'));
    categories.forEach(category => els.categoryFilter.append(option(category, category)));

    els.calcPlatform.innerHTML = '';
    platforms.forEach(platform => els.calcPlatform.append(option(platform, platform)));

    els.visibleServiceCount.textContent = Store.formatNumber(services.length);
    els.platformCount.textContent = Store.formatNumber(platforms.length);
  }

  function fillCalculatorServices() {
    const services = visibleServices();
    const platform = els.calcPlatform.value;
    const filtered = services.filter(service => !platform || service.platform === platform);
    const previous = els.calcService.value;

    els.calcService.innerHTML = '';
    filtered.forEach(service => els.calcService.append(option(service.id, `${service.name} (${service.providerId})`)));

    if (filtered.some(service => service.id === previous)) {
      els.calcService.value = previous;
    }

    renderCalculator();
  }

  function selectedCalcService() {
    return visibleServices().find(service => service.id === els.calcService.value);
  }

  function buildInquiryMessage(service, calc) {
    const target = els.calcLink.value.trim();
    const targetLine = target ? `Target: ${target}\n` : '';
    return `Hello Novalyte, I want to avail this service:\n\nService ID: ${service.providerId}\nService Type: ${service.name}\nPlatform: ${service.platform}\nQuantity: ${Store.formatNumber(calc.quantity)}\nEstimated Charge: ${Store.formatMoney(calc.clientCharge)}\n${targetLine}\nPlease confirm availability. Thank you!`;
  }

  function renderCalculator() {
    const service = selectedCalcService();
    if (!service) {
      els.clientTotal.textContent = Store.formatMoney(0);
      els.calcMeta.innerHTML = '';
      els.calcNotice.textContent = 'No service selected.';
      els.orderMessage.textContent = 'Select a service first.';
      return;
    }

    const calc = Store.calcForService(service, els.calcQuantity.value);
    const min = Number(service.min) || 0;
    const max = Number(service.max) || 0;
    let warning = '';
    if (calc.quantity && min && calc.quantity < min) warning = ` Quantity is below minimum (${Store.formatNumber(min)}).`;
    if (calc.quantity && max && calc.quantity > max) warning = ` Quantity is above maximum (${Store.formatNumber(max)}).`;

    els.clientTotal.textContent = Store.formatMoney(calc.clientCharge);
    els.calcMeta.innerHTML = `
      <span>Rate: <strong>${Store.formatMoney(service.clientRate)}</strong> / ${Store.formatNumber(service.rateUnit)}</span>
      <span>Min/Max: <strong>${Store.formatNumber(service.min)}-${Store.formatNumber(service.max)}</strong></span>
      <span>Average: <strong>${service.avgTime || 'Varies'}</strong></span>
      <span>ID: <strong>${service.providerId}</strong></span>
    `;
    els.calcNotice.textContent = `${service.name}: ${service.description || 'No description yet.'}${warning}`;
    els.orderMessage.textContent = buildInquiryMessage(service, calc);
  }

  function filteredServices() {
    const search = els.serviceSearch.value.trim().toLowerCase();
    const platform = els.platformFilter.value;
    const category = els.categoryFilter.value;

    return visibleServices().filter(service => {
      const text = `${service.name} ${service.platform} ${service.category} ${service.providerId} ${service.description} ${service.tag}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesPlatform = platform === 'all' || service.platform === platform;
      const matchesCategory = category === 'all' || service.category === category;
      return matchesSearch && matchesPlatform && matchesCategory;
    });
  }

  function renderServices() {
    const services = filteredServices();
    els.servicesGrid.innerHTML = '';
    els.emptyServices.classList.toggle('hidden', services.length > 0);

    services.forEach(service => {
      const card = document.createElement('article');
      card.className = 'card service-card';
      card.innerHTML = `
        <div class="card-top">
          <span class="platform-pill ${platformClass(service.platform)}"><span class="platform-dot"></span>${service.platform}</span>
          <span class="id-chip">${service.providerId}</span>
        </div>
        <div>
          <span class="tag">${service.tag || service.category}</span>
          <h3>${service.name}</h3>
        </div>
        <p class="service-desc">${service.description || 'No description yet.'}</p>
        <div class="mini-meta">
          <span>Category: <strong>${service.category}</strong></span>
          <span>ETA: <strong>${service.avgTime || 'Varies'}</strong></span>
          <span>Min: <strong>${Store.formatNumber(service.min)}</strong></span>
          <span>Max: <strong>${Store.formatNumber(service.max)}</strong></span>
        </div>
        <div class="price-row">
          <span>Client Rate</span>
          <strong>${Store.formatMoney(service.clientRate)} / ${Store.formatNumber(service.rateUnit)}</strong>
        </div>
        <button class="btn primary small" type="button" data-use-service="${service.id}">Calculate this</button>
      `;
      els.servicesGrid.append(card);
    });
  }

  function bindEvents() {
    [els.serviceSearch, els.platformFilter, els.categoryFilter].forEach(el => el.addEventListener('input', renderServices));
    els.clearFilters.addEventListener('click', () => {
      els.serviceSearch.value = '';
      els.platformFilter.value = 'all';
      els.categoryFilter.value = 'all';
      renderServices();
    });

    els.calcPlatform.addEventListener('change', fillCalculatorServices);
    [els.calcService, els.calcQuantity, els.calcLink].forEach(el => el.addEventListener('input', renderCalculator));

    els.servicesGrid.addEventListener('click', event => {
      const btn = event.target.closest('[data-use-service]');
      if (!btn) return;
      const service = visibleServices().find(item => item.id === btn.dataset.useService);
      if (!service) return;
      els.calcPlatform.value = service.platform;
      fillCalculatorServices();
      els.calcService.value = service.id;
      renderCalculator();
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    els.copyOrderBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(els.orderMessage.textContent);
        Store.toast('Order inquiry copied.');
      } catch (error) {
        Store.toast('Copy failed. Please select and copy manually.', 'error');
      }
    });
  }

  function init() {
    Store.getServices();
    fillFilters();
    fillCalculatorServices();
    renderServices();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
