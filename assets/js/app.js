(function () {
  const Store = window.NovalyteStore;
  const MESSENGER_URL = 'https://www.facebook.com/messages/t/1240324299157071';
  const state = { servicePage: 1, perPage: 10, view: 'order' };

  const els = {
    visibleServiceCount: document.getElementById('visibleServiceCount'),
    platformCount: document.getElementById('platformCount'),
    calcSearch: document.getElementById('calcSearch'),
    calcSearchSuggestions: document.getElementById('calcSearchSuggestions'),
    calcCategory: document.getElementById('calcCategory'),
    calcService: document.getElementById('calcService'),
    calcQuantity: document.getElementById('calcQuantity'),
    calcLink: document.getElementById('calcLink'),
    calcNotice: document.getElementById('calcNotice'),
    clientTotal: document.getElementById('clientTotal'),
    chargeHint: document.getElementById('chargeHint'),
    quantityHint: document.getElementById('quantityHint'),
    averageTimeField: document.getElementById('averageTimeField'),
    categoryIcon: document.getElementById('categoryIcon'),
    selectedServiceId: document.getElementById('selectedServiceId'),
    serviceDashboard: document.getElementById('serviceDashboard'),
    orderMessage: document.getElementById('orderMessage'),
    copyOrderBtn: document.getElementById('copyOrderBtn'),
    proceedOrderBtn: document.getElementById('proceedOrderBtn'),
    orderPanel: document.getElementById('order-panel'),
    servicesSection: document.getElementById('services'),
    viewToggleBtn: document.getElementById('viewToggleBtn'),
    homeBrand: document.getElementById('homeBrand'),
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

  function platformKey(platform) {
    return String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  }

  function platformClass(platform) {
    return `platform-${String(platform || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  function platformAsset(platform) {
    const files = {
      facebook: 'facebook.png',
      instagram: 'instagram.png',
      tiktok: 'tiktok.png',
      youtube: 'youtube.png',
      telegram: 'telegram.png',
      twitter: 'twitter.png',
      x: 'twitter.png'
    };
    return files[platformKey(platform)] || '';
  }

  function platformFallback(platform) {
    const map = { facebook: 'f', instagram: '◎', tiktok: '♪', youtube: '▶', telegram: '✈', twitter: '𝕏', x: '𝕏' };
    return map[platformKey(platform)] || '•';
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

  function groupLabel(platform) {
    const name = String(platform || 'Services').toUpperCase();
    if (platformKey(platform) === 'facebook') return 'FACEBOOK SERVICES PH | MANUAL';
    return `${name} SERVICES | MANUAL`;
  }

  function searchableText(service) {
    return `${service.name} ${service.platform} ${service.category} ${service.providerId} ${service.description} ${service.tag}`.toLowerCase();
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

    els.calcCategory.innerHTML = '';
    platforms.forEach(platform => els.calcCategory.append(option(platform, groupLabel(platform))));

    if (els.visibleServiceCount) els.visibleServiceCount.textContent = Store.formatNumber(services.length);
    if (els.platformCount) els.platformCount.textContent = Store.formatNumber(platforms.length);
  }

  function calculatorCandidates() {
    const services = visibleServices();
    const platform = els.calcCategory.value;
    return services.filter(service => !platform || service.platform === platform);
  }

  function suggestionCandidates(query) {
    const term = String(query || '').trim().toLowerCase();
    if (!term) return [];
    return visibleServices()
      .map(service => {
        const id = String(service.providerId || '').toLowerCase();
        const text = searchableText(service);
        let score = 99;
        if (id === term) score = 0;
        else if (id.startsWith(term)) score = 1;
        else if (id.includes(term)) score = 2;
        else if (text.includes(term)) score = 3;
        return { service, score };
      })
      .filter(item => item.score < 99)
      .sort((a, b) => a.score - b.score || String(a.service.providerId).localeCompare(String(b.service.providerId), undefined, { numeric: true }))
      .slice(0, 8)
      .map(item => item.service);
  }

  function hideSearchSuggestions() {
    if (!els.calcSearchSuggestions) return;
    els.calcSearchSuggestions.classList.add('hidden');
    els.calcSearchSuggestions.innerHTML = '';
    if (els.calcSearch) els.calcSearch.setAttribute('aria-expanded', 'false');
  }

  function renderSearchSuggestions() {
    if (!els.calcSearchSuggestions) return;
    const term = els.calcSearch.value.trim();
    if (!term) {
      hideSearchSuggestions();
      return;
    }

    const matches = suggestionCandidates(term);
    els.calcSearchSuggestions.classList.remove('hidden');
    els.calcSearch.setAttribute('aria-expanded', 'true');

    if (!matches.length) {
      els.calcSearchSuggestions.innerHTML = '<div class="service-suggestion-empty">No matching service ID yet.</div>';
      return;
    }

    els.calcSearchSuggestions.innerHTML = matches.map(service => `
      <button class="service-suggestion" type="button" role="option" data-suggest-service="${sanitize(service.id)}">
        <span class="suggestion-id">ID ${sanitize(service.providerId)}</span>
        <span class="suggestion-copy">
          <strong>${sanitize(service.name)}</strong>
          <small>${sanitize(service.platform)} • ${sanitize(service.category)} • ${Store.formatMoney(service.clientRate)} / ${Store.formatNumber(service.rateUnit)}</small>
        </span>
      </button>
    `).join('');
  }

  function selectSuggestedService(service) {
    if (!service) return;
    els.calcCategory.value = service.platform;
    fillCalculatorServices(false);
    els.calcService.value = service.id;
    els.calcSearch.value = `ID ${service.providerId} - ${service.name}`;
    hideSearchSuggestions();
    renderCalculator();
  }

  function serviceOptionLabel(service) {
    return `${service.providerId} | ${service.name} - ${Store.formatMoney(service.clientRate)} per ${Store.formatNumber(service.rateUnit)}`;
  }

  function fillCalculatorServices(keepSelected = true) {
    const filtered = calculatorCandidates();
    const previous = els.calcService.value;

    els.calcService.innerHTML = '';
    filtered.forEach(service => els.calcService.append(option(service.id, serviceOptionLabel(service))));

    if (keepSelected && filtered.some(service => service.id === previous)) {
      els.calcService.value = previous;
    }

    updateCategoryIcon();
    renderCalculator();
  }

  function selectedCalcService() {
    return visibleServices().find(service => service.id === els.calcService.value);
  }

  function buildInquiryMessage(service, calc) {
    const target = els.calcLink.value.trim();
    return `Hello Novalyte, I want to order this boosting service.\n\nPlatform: ${service.platform}\nService ID: ${service.providerId}\nService Type: ${service.name}\nQuantity: ${Store.formatNumber(calc.quantity)}\nTarget Link/Username: ${target || 'Not provided'}\nTotal Payment: ${Store.formatMoney(calc.clientCharge)}\nAverage Time: ${service.avgTime || 'Varies'}\n\nPlease confirm availability and payment instructions. Thank you!`;
  }

  function validationFor(service, calc) {
    const target = els.calcLink.value.trim();
    const min = Number(service.min) || 0;
    const max = Number(service.max) || 0;
    if (!service) return { ok: false, message: 'Select a service first.' };
    if (!calc.quantity || calc.quantity <= 0) return { ok: false, message: 'Enter a valid quantity.' };
    if (min && calc.quantity < min) return { ok: false, message: `Minimum order is ${Store.formatNumber(min)}.` };
    if (max && calc.quantity > max) return { ok: false, message: `Maximum order is ${Store.formatNumber(max)}.` };
    if (!target) return { ok: false, message: 'Paste the target link or username before proceeding.' };
    return { ok: true, message: 'Ready. Proceed Order will copy the details and open Messenger.' };
  }

  function updateCategoryIcon() {
    const platform = els.calcCategory.value;
    if (!els.categoryIcon) return;
    els.categoryIcon.innerHTML = platformIcon(platform);
  }

  function renderDashboard(service) {
    if (!service) {
      els.serviceDashboard.innerHTML = '<div class="status-line"><span>✓</span> Select a service to view details.</div>';
      els.averageTimeField.textContent = 'Select a service';
      els.selectedServiceId.textContent = 'ID';
      return;
    }

    const notes = [
      { label: 'Status', value: 'Available for inquiry' },
      { label: 'Service ID', value: service.providerId },
      { label: 'Min order', value: Store.formatNumber(service.min) },
      { label: 'Max order', value: Store.formatNumber(service.max) }
    ];

    els.selectedServiceId.textContent = `ID-${service.providerId}`;
    els.averageTimeField.textContent = service.avgTime || 'Varies';
    els.serviceDashboard.innerHTML = notes.map(item => `
      <div class="status-line"><span>✓</span><strong>${sanitize(item.label)}:</strong> ${sanitize(item.value)}</div>
    `).join('');

  }

  function renderCalculator() {
    const service = selectedCalcService();
    if (!service) {
      els.clientTotal.textContent = Store.formatMoney(0);
      els.quantityHint.textContent = 'No service matched your search/category.';
      els.chargeHint.textContent = 'Your total will update automatically.';
      els.calcNotice.textContent = 'No service selected.';
      els.orderMessage.textContent = 'Select a service first.';
      els.proceedOrderBtn.disabled = true;
      renderDashboard(null);
      return;
    }

    const calc = Store.calcForService(service, els.calcQuantity.value);
    const validation = validationFor(service, calc);

    els.clientTotal.textContent = Store.formatMoney(calc.clientCharge);
    els.quantityHint.textContent = `Min: ${Store.formatNumber(service.min)} - Max: ${Store.formatNumber(service.max)}`;
    els.chargeHint.textContent = `${Store.formatMoney(service.clientRate)} per ${Store.formatNumber(service.rateUnit)} • Service ID ${service.providerId}`;
    els.calcNotice.textContent = validation.message;
    els.calcNotice.classList.toggle('warning-notice', !validation.ok);
    els.orderMessage.textContent = buildInquiryMessage(service, calc);
    els.proceedOrderBtn.disabled = !validation.ok;
    renderDashboard(service);
  }

  function filteredServices() {
    const search = els.serviceSearch.value.trim().toLowerCase();
    const platform = els.platformFilter.value;
    const category = els.categoryFilter.value;

    return visibleServices().filter(service => {
      const matchesSearch = !search || searchableText(service).includes(search);
      const matchesPlatform = platform === 'all' || service.platform === platform;
      const matchesCategory = category === 'all' || service.category === category;
      return matchesSearch && matchesPlatform && matchesCategory;
    });
  }

  function resetServicePage() {
    state.servicePage = 1;
  }

  function renderPagination(total) {
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
        <td data-label="Platform"><span class="platform-pill ${platformClass(service.platform)}"><span class="platform-icon">${platformIcon(service.platform)}</span>${sanitize(service.platform)}</span></td>
        <td data-label="ID"><span class="id-chip">${sanitize(service.providerId)}</span></td>
        <td data-label="Service"><div class="service-name-cell"><strong>${sanitize(service.name)}</strong><span>${sanitize(service.description || service.tag || service.category || 'Available service')}</span></div></td>
        <td data-label="Rate"><strong>${Store.formatMoney(service.clientRate)}</strong><span class="rate-unit"> / ${Store.formatNumber(service.rateUnit)}</span></td>
        <td data-label="Min / Max"><span class="range-chip">${Store.formatNumber(service.min)} - ${Store.formatNumber(service.max)}</span></td>
        <td data-label="ETA">${sanitize(service.avgTime || 'Varies')}</td>
        <td data-label="Action"><button class="btn primary small" type="button" data-use-service="${service.id}">Order Now</button></td>
      `;
      els.servicesGrid.append(row);
    });
  }

  function showClientView(view, shouldScroll = true) {
    const showServices = view === 'services';
    state.view = showServices ? 'services' : 'order';
    if (els.orderPanel) els.orderPanel.classList.toggle('hidden', showServices);
    if (els.servicesSection) els.servicesSection.classList.toggle('hidden', !showServices);
    if (els.viewToggleBtn) {
      els.viewToggleBtn.textContent = showServices ? 'Order Panel' : 'Services';
      els.viewToggleBtn.href = showServices ? '#order-panel' : '#services';
      els.viewToggleBtn.setAttribute('aria-label', showServices ? 'Go to order panel' : 'View available services');
    }
    const target = showServices ? els.servicesSection : els.orderPanel;
    if (shouldScroll && target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function copyInquiryMessage() {
    try {
      await navigator.clipboard.writeText(els.orderMessage.textContent);
      Store.toast('Order details copied. Paste it in Messenger.', 'success');
      return true;
    } catch (error) {
      Store.toast('Copy failed. Please select and copy manually.', 'error');
      return false;
    }
  }

  function setupAutoScrollbars() {
    const scrollTargets = new Set([document.documentElement, document.body]);
    document.querySelectorAll('.table-wrap, .client-message, .message-preview-panel .client-message, .modal-body, .provider-calculator-card, .admin-main, .panel-scroll, [data-auto-scrollbar]').forEach(el => scrollTargets.add(el));

    scrollTargets.forEach(el => {
      let timer = null;
      const markScrolling = () => {
        el.classList.add('is-scrolling');
        document.documentElement.classList.add('is-scrolling-global');
        clearTimeout(timer);
        timer = setTimeout(() => {
          el.classList.remove('is-scrolling');
          document.documentElement.classList.remove('is-scrolling-global');
        }, 850);
      };
      el.addEventListener('scroll', markScrolling, { passive: true });
      el.addEventListener('wheel', markScrolling, { passive: true });
      el.addEventListener('touchmove', markScrolling, { passive: true });
    });
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

    els.calcCategory.addEventListener('change', () => {
      fillCalculatorServices(false);
      renderSearchSuggestions();
    });
    els.calcSearch.addEventListener('input', renderSearchSuggestions);
    els.calcSearch.addEventListener('focus', renderSearchSuggestions);
    els.calcSearch.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        hideSearchSuggestions();
        return;
      }
      if (event.key !== 'Enter') return;
      const first = els.calcSearchSuggestions ? els.calcSearchSuggestions.querySelector('[data-suggest-service]') : null;
      if (!first) return;
      event.preventDefault();
      selectSuggestedService(visibleServices().find(item => item.id === first.dataset.suggestService));
    });
    if (els.calcSearchSuggestions) {
      els.calcSearchSuggestions.addEventListener('click', event => {
        const btn = event.target.closest('[data-suggest-service]');
        if (!btn) return;
        selectSuggestedService(visibleServices().find(item => item.id === btn.dataset.suggestService));
      });
    }
    document.addEventListener('click', event => {
      if (event.target.closest('.provider-search-group')) return;
      hideSearchSuggestions();
    });
    [els.calcService, els.calcQuantity, els.calcLink].forEach(el => el.addEventListener('input', renderCalculator));

    els.servicesGrid.addEventListener('click', event => {
      const btn = event.target.closest('[data-use-service]');
      if (!btn) return;
      const service = visibleServices().find(item => item.id === btn.dataset.useService);
      if (!service) return;
      els.calcCategory.value = service.platform;
      els.calcSearch.value = `ID ${service.providerId} - ${service.name}`;
      hideSearchSuggestions();
      fillCalculatorServices(false);
      els.calcService.value = service.id;
      renderCalculator();
      showClientView('order');
    });

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

    if (els.viewToggleBtn) {
      els.viewToggleBtn.addEventListener('click', event => {
        event.preventDefault();
        showClientView(state.view === 'services' ? 'order' : 'services');
      });
    }

    if (els.homeBrand) {
      els.homeBrand.addEventListener('click', event => {
        event.preventDefault();
        showClientView('order');
      });
    }

    els.copyOrderBtn.addEventListener('click', copyInquiryMessage);

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

  function init() {
    setupAutoScrollbars();
    Store.getServices();
    fillFilters();
    fillCalculatorServices(false);
    renderServices();
    bindEvents();
    showClientView(window.location.hash === '#services' ? 'services' : 'order', false);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
