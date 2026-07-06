(function () {
  const Store = window.NovalyteStore;
  const MESSENGER_URL = 'https://www.facebook.com/messages/t/707867809081709';
  const state = { servicePage: 1, perPage: 9 };

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
    proceedOrderBtn: document.getElementById('proceedOrderBtn'),
    serviceSearch: document.getElementById('serviceSearch'),
    platformFilter: document.getElementById('platformFilter'),
    categoryFilter: document.getElementById('categoryFilter'),
    clearFilters: document.getElementById('clearFilters'),
    servicesGrid: document.getElementById('servicesGrid'),
    servicePagination: document.getElementById('servicePagination'),
    emptyServices: document.getElementById('emptyServices')
  };

  function sanitize(text) {
    return String(text ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function platformClass(platform) {
    return `platform-${String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  function platformIcon(platform) {
    const key = String(platform || '').toLowerCase();
    const icons = {
      facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v5h4v-5h3.2l.8-4h-4V9c0-.7.3-1 1-1Z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z"/></svg>',
      tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h3c.3 2 1.5 3.4 4 3.8v3.5c-1.6 0-3-.5-4-1.3v6.2c0 3.4-2.3 5.8-5.8 5.8A5.2 5.2 0 0 1 6 15.8c0-3 2.2-5.1 5.7-5.2v3.7c-1.2.1-1.9.7-1.9 1.6 0 1 .7 1.7 1.7 1.7 1.3 0 2.1-.8 2.1-2.3V3Z"/></svg>',
      youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 7.3c-.2-1-1-1.8-2-2C17.2 5 12 5 12 5s-5.2 0-7 .3c-1 .2-1.8 1-2 2C2.7 9.1 2.7 12 2.7 12s0 2.9.3 4.7c.2 1 1 1.8 2 2 1.8.3 7 .3 7 .3s5.2 0 7-.3c1-.2 1.8-1 2-2 .3-1.8.3-4.7.3-4.7s0-2.9-.3-4.7ZM10 15.2V8.8l5.5 3.2L10 15.2Z"/></svg>',
      telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4 3.6 10.8c-1.2.5-1.2 1.1-.2 1.4l4.5 1.4 1.7 5.3c.2.6.3.8.7.8.3 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.9.5 1.5.3 1.7-.8L22.8 5.4c.3-1.2-.4-1.7-1.8-1.4Zm-11.8 9 8.8-5.6c.4-.2.8-.1.5.2l-7.5 6.8-.3 3.1-1.5-4.5Z"/></svg>'
    };
    return icons[key] || '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v4h4v2h-4v4h-2v-4H7v-2h4V7h2Z"/></svg>';
  }

  function visibleServices() {
    return Store.getServices().filter(service => service.visible !== false && service.archived !== true);
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

    if (filtered.some(service => service.id === previous)) els.calcService.value = previous;
    renderCalculator();
  }

  function selectedCalcService() {
    return visibleServices().find(service => service.id === els.calcService.value);
  }

  function buildInquiryMessage(service, calc) {
    const target = els.calcLink.value.trim();
    return `Hello Novalyte, I want to order this boosting service.\n\nPlatform: ${service.platform}\nService ID: ${service.providerId}\nService Type: ${service.name}\nQuantity: ${Store.formatNumber(calc.quantity)}\nTarget Link/Username: ${target || 'Not provided'}\nEstimated Total Payment: ${Store.formatMoney(calc.clientCharge)}\n\nPlease confirm availability and payment instructions. Thank you!`;
  }

  function validationFor(service, calc) {
    const target = els.calcLink.value.trim();
    const min = Number(service.min) || 0;
    const max = Number(service.max) || 0;
    if (!calc.quantity || calc.quantity <= 0) return { ok: false, message: 'Enter a valid quantity.' };
    if (min && calc.quantity < min) return { ok: false, message: `Quantity is below minimum (${Store.formatNumber(min)}).` };
    if (max && calc.quantity > max) return { ok: false, message: `Quantity is above maximum (${Store.formatNumber(max)}).` };
    if (!target) return { ok: false, message: 'Paste the target link or username before proceeding.' };
    return { ok: true, message: 'Ready to order. Proceed will copy the message and open Messenger.' };
  }

  function renderCalculator() {
    const service = selectedCalcService();
    if (!service) {
      els.clientTotal.textContent = Store.formatMoney(0);
      els.calcMeta.innerHTML = '';
      els.calcNotice.textContent = 'No service selected.';
      els.orderMessage.textContent = 'Select a service first.';
      if (els.proceedOrderBtn) els.proceedOrderBtn.disabled = true;
      return;
    }

    const calc = Store.calcForService(service, els.calcQuantity.value);
    const validation = validationFor(service, calc);

    els.clientTotal.textContent = Store.formatMoney(calc.clientCharge);
    els.calcMeta.innerHTML = `
      <span>Rate: <strong>${Store.formatMoney(service.clientRate)}</strong> / ${Store.formatNumber(service.rateUnit)}</span>
      <span>Min/Max: <strong>${Store.formatNumber(service.min)}-${Store.formatNumber(service.max)}</strong></span>
      <span>Average: <strong>${sanitize(service.avgTime || 'Varies')}</strong></span>
      <span>ID: <strong>${sanitize(service.providerId)}</strong></span>
    `;
    els.calcNotice.textContent = `${service.name}: ${service.description || 'No description yet.'} ${validation.ok ? '' : validation.message}`.trim();
    els.calcNotice.classList.toggle('warning-notice', !validation.ok);
    els.orderMessage.textContent = buildInquiryMessage(service, calc);
    if (els.proceedOrderBtn) els.proceedOrderBtn.disabled = !validation.ok;
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

  function resetServicePage() {
    state.servicePage = 1;
  }

  function renderPagination(total) {
    if (!els.servicePagination) return;
    const pages = Math.max(1, Math.ceil(total / state.perPage));
    state.servicePage = Math.min(state.servicePage, pages);
    if (pages <= 1) {
      els.servicePagination.innerHTML = '';
      return;
    }
    const start = (state.servicePage - 1) * state.perPage + 1;
    const end = Math.min(total, state.servicePage * state.perPage);
    els.servicePagination.innerHTML = `
      <div class="page-summary">Showing ${Store.formatNumber(start)}-${Store.formatNumber(end)} of ${Store.formatNumber(total)} services</div>
      <div class="page-buttons">
        <button class="btn small" type="button" data-service-page="prev" ${state.servicePage === 1 ? 'disabled' : ''}>Previous</button>
        <span class="page-chip">Page ${state.servicePage} / ${pages}</span>
        <button class="btn small" type="button" data-service-page="next" ${state.servicePage === pages ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }

  function renderServices() {
    const services = filteredServices();
    els.servicesGrid.innerHTML = '';
    els.emptyServices.classList.toggle('hidden', services.length > 0);
    renderPagination(services.length);

    const start = (state.servicePage - 1) * state.perPage;
    const paged = services.slice(start, start + state.perPage);
    paged.forEach(service => {
      const row = document.createElement('tr');
      row.className = 'public-service-row';
      row.innerHTML = `
        <td data-label="Platform">
          <span class="platform-pill ${platformClass(service.platform)}"><span class="platform-icon">${platformIcon(service.platform)}</span>${sanitize(service.platform)}</span>
        </td>
        <td data-label="ID"><span class="id-chip">${sanitize(service.providerId)}</span></td>
        <td data-label="Service">
          <div class="service-name-cell">
            <strong>${sanitize(service.name)}</strong>
            <span>${sanitize(service.description || service.tag || service.category || 'Available service')}</span>
          </div>
        </td>
        <td data-label="Rate"><strong>${Store.formatMoney(service.clientRate)}</strong><span class="rate-unit"> / ${Store.formatNumber(service.rateUnit)}</span></td>
        <td data-label="Min / Max"><span class="range-chip">${Store.formatNumber(service.min)} - ${Store.formatNumber(service.max)}</span></td>
        <td data-label="ETA">${sanitize(service.avgTime || 'Varies')}</td>
        <td data-label="Action"><button class="btn primary small" type="button" data-use-service="${service.id}">Calculate</button></td>
      `;
      els.servicesGrid.append(row);
    });
  }

  async function copyInquiryMessage() {
    try {
      await navigator.clipboard.writeText(els.orderMessage.textContent);
      Store.toast('Order message copied. Paste it in Messenger.');
      return true;
    } catch (error) {
      Store.toast('Copy failed. Please select and copy manually.', 'error');
      return false;
    }
  }

  function bindEvents() {
    [els.serviceSearch, els.platformFilter, els.categoryFilter].forEach(el => el.addEventListener('input', () => {
      resetServicePage();
      renderServices();
    }));
    els.clearFilters.addEventListener('click', () => {
      els.serviceSearch.value = '';
      els.platformFilter.value = 'all';
      els.categoryFilter.value = 'all';
      resetServicePage();
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

    if (els.servicePagination) {
      els.servicePagination.addEventListener('click', event => {
        const btn = event.target.closest('[data-service-page]');
        if (!btn) return;
        const total = filteredServices().length;
        const pages = Math.max(1, Math.ceil(total / state.perPage));
        if (btn.dataset.servicePage === 'prev') state.servicePage = Math.max(1, state.servicePage - 1);
        if (btn.dataset.servicePage === 'next') state.servicePage = Math.min(pages, state.servicePage + 1);
        renderServices();
        document.getElementById('services').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    els.copyOrderBtn.addEventListener('click', copyInquiryMessage);

    if (els.proceedOrderBtn) {
      els.proceedOrderBtn.addEventListener('click', async () => {
        const service = selectedCalcService();
        if (!service) return;
        const calc = Store.calcForService(service, els.calcQuantity.value);
        const validation = validationFor(service, calc);
        if (!validation.ok) {
          Store.toast(validation.message, 'warning');
          renderCalculator();
          return;
        }
        await copyInquiryMessage();
        window.open(MESSENGER_URL, '_blank', 'noopener');
      });
    }
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
