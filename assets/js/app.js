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
    const map = { facebook: 'f', instagram: '◎', tiktok: '♪', youtube: '▶', telegram: '✈', twitter: '𝕏', x: '𝕏' };
    return map[key] || '•';
  }

  function platformIcon(platform) {
    const file = platformAsset(platform);
    const fallback = sanitize(platformFallback(platform));
    if (!file) return `<span class="platform-icon-fallback">${fallback}</span>`;
    return `<span class="platform-icon-wrap"><img class="platform-icon-img" src="assets/icons/social/${file}" alt="${sanitize(platform)} icon" loading="lazy" onerror="this.classList.add('is-missing'); this.nextElementSibling.classList.remove('hidden');"><span class="platform-icon-fallback hidden">${fallback}</span></span>`;
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
