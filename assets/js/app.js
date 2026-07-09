(function () {
  const Store = window.NovalyteStore;
  const MESSENGER_URL = 'https://www.facebook.com/messages/t/1240324299157071';
  const CLIENT_STATE_KEY = 'novalyte-client-view-state-v2';
  // v5.3.17: star rating stays, one-time feedback lock is restored after releasing the legacy current feedback.
  const state = { servicePage: 1, perPage: 10, view: 'home', activeDigitalProductId: null };

  const els = {
    homeSection: document.getElementById('home'),
    homeNavBtn: document.getElementById('homeNavBtn'),
    mobileNavToggle: document.getElementById('mobileNavToggle'),
    primaryNav: document.getElementById('primaryNav'),
    whatWeDoNavBtn: document.getElementById('whatWeDoNavBtn'),
    aboutNavBtn: document.getElementById('aboutNavBtn'),
    whatWeDoSection: document.getElementById('what-we-do'),
    aboutSection: document.getElementById('about-novalyte'),
    reviewCards: document.getElementById('reviewCards'),
    reviewForm: document.getElementById('reviewForm'),
    reviewText: document.getElementById('reviewText'),
    reviewCharCount: document.getElementById('reviewCharCount'),
    reviewRatingControl: document.getElementById('reviewRatingControl'),
    reviewRatingValue: document.getElementById('reviewRatingValue'),
    reviewRatingText: document.getElementById('reviewRatingText'),
    submitReviewBtn: document.getElementById('submitReviewBtn'),
    reviewFormNotice: document.getElementById('reviewFormNotice'),
    homeVisibleServices: document.getElementById('homeVisibleServices'),
    homeDigitalProducts: document.getElementById('homeDigitalProducts'),
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
    categoryIcon: document.getElementById('categoryIcon'),
    selectedServiceSummary: document.getElementById('selectedServiceSummary'),
    orderMessage: document.getElementById('orderMessage'),
    copyOrderBtn: document.getElementById('copyOrderBtn'),
    proceedOrderBtn: document.getElementById('proceedOrderBtn'),
    orderPanel: document.getElementById('order-panel'),
    servicesSection: document.getElementById('services'),
    digitalProductsSection: document.getElementById('digital-products'),
    digitalProductsNavBtn: document.getElementById('digitalProductsNavBtn'),
    servicesNavBtn: document.getElementById('servicesNavBtn'),
    homeBrand: document.getElementById('homeBrand'),
    serviceSearch: document.getElementById('serviceSearch'),
    platformFilter: document.getElementById('platformFilter'),
    categoryFilter: document.getElementById('categoryFilter'),
    clearFilters: document.getElementById('clearFilters'),
    servicesGrid: document.getElementById('servicesGrid'),
    servicePagination: document.getElementById('servicePagination'),
    mobileServiceCards: document.getElementById('mobileServiceCards'),
    emptyServices: document.getElementById('emptyServices'),
    digitalProductSearch: document.getElementById('digitalProductSearch'),
    digitalProductFilter: document.getElementById('digitalProductFilter'),
    clearDigitalProductFilters: document.getElementById('clearDigitalProductFilters'),
    digitalProductsGrid: document.getElementById('digitalProductsGrid'),
    emptyDigitalProducts: document.getElementById('emptyDigitalProducts'),
    digitalProductModal: document.getElementById('digitalProductModal'),
    digitalProductModalClose: document.getElementById('digitalProductModalClose'),
    digitalProductModalCheckout: document.getElementById('digitalProductModalCheckout'),
    digitalProductModalTitle: document.getElementById('digitalProductModalTitle'),
    digitalProductModalCategory: document.getElementById('digitalProductModalCategory'),
    digitalProductModalImage: document.getElementById('digitalProductModalImage'),
    digitalProductModalPrice: document.getElementById('digitalProductModalPrice'),
    digitalProductModalDescription: document.getElementById('digitalProductModalDescription')
  };

  const primaryNavHomeParent = els.primaryNav ? els.primaryNav.parentElement : null;
  const primaryNavNextSibling = els.primaryNav ? els.primaryNav.nextSibling : null;

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
    const map = { facebook: 'f', instagram: 'ig', tiktok: 'tt', youtube: 'yt', telegram: 'tg', twitter: 'x', x: 'x' };
    return map[platformKey(platform)] || String(platform || '?').trim().slice(0, 2).toLowerCase();
  }

  function platformIcon(platform) {
    const file = platformAsset(platform);
    const fallback = sanitize(platformFallback(platform));
    if (!file) return `<span class="platform-icon-fallback">${fallback}</span>`;
    return `<span class="platform-icon-wrap"><img class="platform-icon-img" src="assets/icons/social/${file}" alt="${sanitize(platform)} icon" loading="lazy" onerror="this.classList.add('is-missing'); this.nextElementSibling.classList.remove('hidden');"><span class="platform-icon-fallback hidden">${fallback}</span></span>`;
  }

  function readClientState() {
    try {
      return JSON.parse(localStorage.getItem(CLIENT_STATE_KEY) || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function saveClientState() {
    try {
      localStorage.setItem(CLIENT_STATE_KEY, JSON.stringify({
        view: state.view,
        servicePage: state.servicePage,
        serviceSearch: els.serviceSearch ? els.serviceSearch.value : '',
        platformFilter: els.platformFilter ? els.platformFilter.value : 'all',
        categoryFilter: els.categoryFilter ? els.categoryFilter.value : 'all',
        digitalProductSearch: els.digitalProductSearch ? els.digitalProductSearch.value : '',
        digitalProductFilter: els.digitalProductFilter ? els.digitalProductFilter.value : 'all',
        calcSearch: els.calcSearch ? els.calcSearch.value : '',
        calcCategory: els.calcCategory ? els.calcCategory.value : '',
        calcService: els.calcService ? els.calcService.value : '',
        calcLink: els.calcLink ? els.calcLink.value : '',
        calcQuantity: els.calcQuantity ? els.calcQuantity.value : ''
      }));
    } catch (error) {}
  }

  function viewFromHash() {
    if (window.location.hash === '#what-we-do') return 'what-we-do';
    if (window.location.hash === '#about-novalyte') return 'about';
    if (window.location.hash === '#services') return 'services';
    if (window.location.hash === '#digital-products') return 'digital-products';
    if (window.location.hash === '#calculator' || window.location.hash === '#order-panel') return 'order';
    if (window.location.hash === '#home' || !window.location.hash) return 'home';
    return '';
  }

  function hashForView(view) {
    if (view === 'services') return '#services';
    if (view === 'digital-products') return '#digital-products';
    if (view === 'order') return '#calculator';
    if (view === 'what-we-do') return '#what-we-do';
    if (view === 'about') return '#about-novalyte';
    return '#home';
  }


  // v5.3.23: keep public service table and mobile cards mutually exclusive.
  // Desktop/laptop shows only the table. Phones show only the mobile cards.
  function isServiceMobileCardsMode() {
    try {
      return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
    } catch (error) {
      return false;
    }
  }

  function handleServiceOrderClick(event) {
    const btn = event.target.closest('[data-use-service]');
    if (!btn || btn.disabled) return;
    const service = visibleServices().find(item => item.id === btn.dataset.useService);
    if (!service || isServiceDisabled(service)) return;
    if (els.calcCategory) els.calcCategory.value = service.platform;
    if (els.calcSearch) els.calcSearch.value = `ID ${service.providerId} - ${service.name}`;
    hideSearchSuggestions();
    fillCalculatorServices(false);
    if (els.calcService) els.calcService.value = service.id;
    renderCalculator();
    showClientView('order');
    saveClientState();
  }

  function updateViewHash(view) {
    const nextHash = hashForView(view);
    if (window.location.hash !== nextHash) history.replaceState(null, '', nextHash);
  }

  function restoreClientState(saved) {
    if (!saved || typeof saved !== 'object') return;
    if (els.serviceSearch && saved.serviceSearch) els.serviceSearch.value = saved.serviceSearch;
    if (els.platformFilter && saved.platformFilter && [...els.platformFilter.options].some(opt => opt.value === saved.platformFilter)) els.platformFilter.value = saved.platformFilter;
    if (els.categoryFilter && saved.categoryFilter && [...els.categoryFilter.options].some(opt => opt.value === saved.categoryFilter)) els.categoryFilter.value = saved.categoryFilter;
    if (els.digitalProductSearch && saved.digitalProductSearch) els.digitalProductSearch.value = saved.digitalProductSearch;
    if (els.digitalProductFilter && saved.digitalProductFilter && [...els.digitalProductFilter.options].some(opt => opt.value === saved.digitalProductFilter)) els.digitalProductFilter.value = saved.digitalProductFilter;
    if (els.calcSearch && saved.calcSearch) els.calcSearch.value = saved.calcSearch;
    if (els.calcCategory && saved.calcCategory && [...els.calcCategory.options].some(opt => opt.value === saved.calcCategory)) els.calcCategory.value = saved.calcCategory;
    fillCalculatorServices(false);
    if (els.calcService && saved.calcService && [...els.calcService.options].some(opt => opt.value === saved.calcService)) els.calcService.value = saved.calcService;
    if (els.calcLink && saved.calcLink) els.calcLink.value = saved.calcLink;
    if (els.calcQuantity && saved.calcQuantity) els.calcQuantity.value = saved.calcQuantity;
    if (Number.isFinite(Number(saved.servicePage))) state.servicePage = Math.max(1, Number(saved.servicePage));
  }

  function visibleServices() {
    return Store.getServices().filter(service => service.visible !== false);
  }

  function orderableServices() {
    return visibleServices().filter(service => service.archived !== true);
  }

  function isServiceDisabled(service) {
    return service && service.archived === true;
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

    refreshMobileSelectMenus();

    els.calcCategory.innerHTML = '';
    platforms.forEach(platform => els.calcCategory.append(option(platform, groupLabel(platform))));

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
          <small>${sanitize(service.platform)} • ${sanitize(service.category)} • ${Store.formatMoney(service.clientRate)} / ${Store.formatNumber(service.rateUnit)}${isServiceDisabled(service) ? ' • Disabled' : ''}</small>
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
    saveClientState();
  }

  function serviceOptionLabel(service) {
    const availability = isServiceDisabled(service) ? ' - Disabled' : '';
    const rawName = String(service.name || 'Service').replace(/\s+/g, ' ').trim();
    const shortName = rawName.length > 74 ? `${rawName.slice(0, 71)}...` : rawName;
    return `ID ${service.providerId} - ${shortName} (${Store.formatMoney(service.clientRate)} / ${Store.formatNumber(service.rateUnit)})${availability}`;
  }

  function fillCalculatorServices(keepSelected = true) {
    const filtered = calculatorCandidates();
    const previous = els.calcService.value;

    els.calcService.innerHTML = '';
    filtered.forEach(service => {
      const opt = option(service.id, serviceOptionLabel(service));
      if (isServiceDisabled(service)) opt.disabled = true;
      els.calcService.append(opt);
    });

    if (keepSelected && filtered.some(service => service.id === previous)) {
      els.calcService.value = previous;
    } else {
      const firstOrderable = filtered.find(service => !isServiceDisabled(service));
      if (firstOrderable) els.calcService.value = firstOrderable.id;
    }

    refreshMobileSelectMenus();
    updateCategoryIcon();
    renderCalculator();
  }

  function compactQuantity(value) {
    const number = Number(value) || 0;
    const abs = Math.abs(number);
    const trim = output => String(output).replace(/\.0$/, '').replace(/(\.\d*[1-9])0$/, '$1');
    if (abs >= 1000000000) return `${trim((number / 1000000000).toFixed(abs >= 10000000000 ? 0 : 1))}B`;
    if (abs >= 1000000) return `${trim((number / 1000000).toFixed(abs >= 10000000 ? 0 : 1))}M`;
    return Store.formatNumber(number);
  }

  function compactServiceRange(service) {
    return `${compactQuantity(service.min)}-${compactQuantity(service.max)}`;
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
    if (isServiceDisabled(service)) return { ok: false, message: 'This service is temporarily disabled and cannot be ordered right now.' };
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

  function renderSelectedSummary(service) {
    if (!els.selectedServiceSummary) return;
    if (!service) {
      els.selectedServiceSummary.innerHTML = '<span class="summary-placeholder">Select a service to preview ID, rate, min/max, and ETA.</span>';
      return;
    }

    const items = [
      { label: 'ID', value: service.providerId },
      { label: 'Rate', value: `${Store.formatMoney(service.clientRate)} / ${Store.formatNumber(service.rateUnit)}` },
      { label: 'Min-Max', value: compactServiceRange(service) },
      { label: 'ETA', value: service.avgTime || 'Varies' }
    ];

    els.selectedServiceSummary.innerHTML = `
      <div class="selected-summary-title">${sanitize(service.platform)} • ${sanitize(service.category)}</div>
      <div class="selected-summary-name">${sanitize(service.name)}</div>
      <div class="selected-summary-chips">
        ${items.map(item => `<span><strong>${sanitize(item.label)}:</strong> ${sanitize(item.value)}</span>`).join('')}
      </div>
    `;
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
      renderSelectedSummary(null);
      return;
    }

    const calc = Store.calcForService(service, els.calcQuantity.value);
    const validation = validationFor(service, calc);

    els.clientTotal.textContent = Store.formatMoney(calc.clientCharge);
    els.quantityHint.textContent = `Min-Max: ${compactServiceRange(service)}`;
    els.chargeHint.textContent = `${Store.formatMoney(service.clientRate)} per ${Store.formatNumber(service.rateUnit)} • Service ID ${service.providerId}`;
    els.calcNotice.textContent = validation.message;
    els.calcNotice.classList.toggle('warning-notice', !validation.ok);
    els.orderMessage.textContent = buildInquiryMessage(service, calc);
    els.proceedOrderBtn.disabled = !validation.ok;
    renderSelectedSummary(service);
  }



  async function writeClipboardText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {}
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.append(textarea);
    textarea.focus();
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    textarea.remove();
    return copied;
  }

  function digitalProducts() {
    return Store.getDigitalProducts().filter(product => product.visible !== false);
  }

  function digitalProductImage(product) {
    const value = product.imageData || product.image || '';
    if (!value) return '';
    if (/^(data:|https?:|blob:)/i.test(value)) return value;
    return `assets/img/digital/${encodeURIComponent(value)}`;
  }

  function digitalProductMessage(product) {
    return `Hello Novalyte, I want to order this digital product.\n\nProduct: ${product.name}\nPrice: ${Store.formatMoney(product.price)}\nCategory: ${product.category || 'Digital Product'}\nDelivery: Email/account details\nAccess: ${product.duration || '1 Month Access'}\n\nPlease confirm availability and payment instructions. Thank you!`;
  }

  async function copyDigitalProductMessage(product) {
    const message = digitalProductMessage(product);
    const copied = await writeClipboardText(message);
    Store.toast(copied ? 'Digital product message copied. Redirecting to Messenger.' : 'Clipboard copy failed. Messenger will still open.', copied ? 'success' : 'warning');
    return copied;
  }

  async function checkoutDigitalProduct(product) {
    if (!product) return;
    if (product.disabled) {
      Store.toast('This digital product is temporarily unavailable.', 'warning');
      return;
    }
    await copyDigitalProductMessage(product);
    window.open(MESSENGER_URL, '_blank', 'noopener');
  }

  function openDigitalProductModal(product) {
    if (!product || !els.digitalProductModal) return;
    state.activeDigitalProductId = product.id;
    els.digitalProductModalTitle.textContent = product.name;
    els.digitalProductModalCategory.textContent = product.category || 'Digital Product';
    els.digitalProductModalPrice.textContent = Store.formatMoney(product.price);
    els.digitalProductModalDescription.textContent = product.disabled ? `${product.description || 'Message Novalyte for complete details.'} This product is temporarily unavailable.` : product.description || 'Message Novalyte for complete details.';
    if (els.digitalProductModalCheckout) {
      els.digitalProductModalCheckout.disabled = Boolean(product.disabled);
      els.digitalProductModalCheckout.textContent = product.disabled ? 'Unavailable' : 'Checkout';
    }
    els.digitalProductModalImage.src = digitalProductImage(product);
    els.digitalProductModalImage.alt = product.name;
    els.digitalProductModal.classList.add('open');
    els.digitalProductModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeDigitalProductModal() {
    if (!els.digitalProductModal) return;
    els.digitalProductModal.classList.remove('open');
    els.digitalProductModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    state.activeDigitalProductId = null;
  }

  function activeDigitalProduct() {
    return digitalProducts().find(product => product.id === state.activeDigitalProductId);
  }

  function digitalProductCategories() {
    return [...new Set(digitalProducts().map(product => product.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function fillDigitalProductFilters() {
    if (!els.digitalProductFilter) return;
    const current = els.digitalProductFilter.value || 'all';
    els.digitalProductFilter.innerHTML = '';
    els.digitalProductFilter.append(option('all', 'All digital products'));
    digitalProductCategories().forEach(category => els.digitalProductFilter.append(option(category, category)));
    if ([...els.digitalProductFilter.options].some(opt => opt.value === current)) els.digitalProductFilter.value = current;
    refreshMobileSelectMenus();
  }

  function renderHomeMetrics() {
    if (els.homeVisibleServices) els.homeVisibleServices.textContent = Store.formatNumber(visibleServices().length);
    if (els.homeDigitalProducts) els.homeDigitalProducts.textContent = Store.formatNumber(digitalProducts().filter(product => product.visible !== false).length);
  }

  function filteredDigitalProducts() {
    const search = els.digitalProductSearch ? els.digitalProductSearch.value.trim().toLowerCase() : '';
    const category = els.digitalProductFilter ? els.digitalProductFilter.value : 'all';
    return digitalProducts().filter(product => {
      const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  function renderDigitalProducts() {
    if (!els.digitalProductsGrid) return;
    const products = filteredDigitalProducts();
    els.emptyDigitalProducts.classList.toggle('hidden', products.length > 0);
    els.digitalProductsGrid.classList.toggle('has-one-item', products.length === 1);
    els.digitalProductsGrid.innerHTML = products.map(product => `
      <article class="digital-product-card${product.disabled ? ' is-digital-product-disabled' : ''}">
        <div class="digital-product-media">
          <img src="${sanitize(digitalProductImage(product))}" alt="${sanitize(product.name)}" loading="lazy" onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden');">
          <div class="digital-product-fallback hidden">${sanitize(product.name.slice(0, 2).toUpperCase())}</div>
        </div>
        <div class="digital-product-body">
          <span class="digital-product-category">${sanitize(product.category || 'Digital Product')}</span>
          <h3>${sanitize(product.name)}</h3>
          <strong class="digital-product-price">${Store.formatMoney(product.price)}</strong>
          ${product.disabled ? '<span class="digital-product-unavailable">Temporarily unavailable</span>' : ''}
          <div class="digital-product-actions">
            <button class="btn digital-description-btn" type="button" data-digital-description="${sanitize(product.id)}">Description</button>
            <button class="btn primary digital-checkout-btn" type="button" data-digital-product="${sanitize(product.id)}" ${product.disabled ? 'disabled' : ''}>${product.disabled ? 'Unavailable' : 'Checkout'}</button>
          </div>
        </div>
      </article>
    `).join('');
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
    const hasServices = services.length > 0;
    const useMobileCards = isServiceMobileCardsMode();
    els.servicesGrid.innerHTML = '';
    if (els.mobileServiceCards) els.mobileServiceCards.innerHTML = '';
    els.emptyServices.classList.toggle('hidden', hasServices);
    const serviceTableWrap = document.querySelector('.public-services-table');
    if (serviceTableWrap) serviceTableWrap.classList.toggle('hidden', !hasServices || useMobileCards);
    if (els.mobileServiceCards) els.mobileServiceCards.classList.toggle('hidden', !hasServices || !useMobileCards);
    renderPagination(services.length);

    const start = (state.servicePage - 1) * state.perPage;
    const paged = services.slice(start, start + state.perPage);
    paged.forEach(service => {
      const disabled = isServiceDisabled(service);
      const row = document.createElement('tr');
      row.className = `public-service-row${disabled ? ' is-service-disabled' : ''}`;
      row.innerHTML = `
        <td data-label="Platform"><span class="platform-pill ${platformClass(service.platform)}"><span class="platform-icon">${platformIcon(service.platform)}</span>${sanitize(service.platform)}</span></td>
        <td data-label="ID"><span class="id-chip">${sanitize(service.providerId)}</span></td>
        <td data-label="Service"><div class="service-name-cell"><strong>${sanitize(service.name)}</strong><span>${sanitize(service.description || service.tag || service.category || 'Available service')}</span></div></td>
        <td data-label="Rate"><strong>${Store.formatMoney(service.clientRate)}</strong><span class="rate-unit"> / ${Store.formatNumber(service.rateUnit)}</span></td>
        <td data-label="Min / Max"><span class="range-chip">${compactServiceRange(service)}</span></td>
        <td data-label="ETA">${sanitize(service.avgTime || 'Varies')}</td>
        <td data-label="Action"><button class="btn primary small" type="button" data-use-service="${service.id}" ${disabled ? 'disabled' : ''}>${disabled ? 'Disabled' : 'Order Now'}</button></td>
      `;
      els.servicesGrid.append(row);
    });

    if (els.mobileServiceCards && useMobileCards) {
      els.mobileServiceCards.innerHTML = paged.map(service => {
        const disabled = isServiceDisabled(service);
        return `
          <article class="mobile-service-card${disabled ? ' is-service-disabled' : ''}">
            <div class="mobile-service-card-head">
              <span class="platform-pill ${platformClass(service.platform)}"><span class="platform-icon">${platformIcon(service.platform)}</span>${sanitize(service.platform)}</span>
              <span class="id-chip">ID ${sanitize(service.providerId)}</span>
            </div>
            <h3>${sanitize(service.name)}</h3>
            <p>${sanitize(service.description || service.tag || service.category || 'Available service')}</p>
            <div class="mobile-service-details">
              <span><small>Rate</small><strong>${Store.formatMoney(service.clientRate)} / ${Store.formatNumber(service.rateUnit)}</strong></span>
              <span class="min-max-detail"><small>Min-Max</small><strong>${compactServiceRange(service)}</strong></span>
              <span><small>ETA</small><strong>${sanitize(service.avgTime || 'Varies')}</strong></span>
            </div>
            <button class="btn primary small" type="button" data-use-service="${service.id}" ${disabled ? 'disabled' : ''}>${disabled ? 'Disabled' : 'Order Now'}</button>
          </article>
        `;
      }).join('');
    }
  }


  const UNIVERSAL_CLIENT_REVIEW_ID = 'Pnovalyte001';
  const UNIVERSAL_CLIENT_REVIEW_MESSAGE = 'They responded quickly and processed my order fast, even for an international client like me.';

  const DEFAULT_PUBLIC_REVIEWS = [
    {
      id: UNIVERSAL_CLIENT_REVIEW_ID,
      message: UNIVERSAL_CLIENT_REVIEW_MESSAGE,
      rating: 5,
      createdAt: '2026-07-07T09:00:00.000Z',
      isSeed: true
    },
    {
      id: 'phnova-00A1',
      message: 'Legit to, fast transaction plus nililinaw mabuti bago i process',
      rating: 5,
      createdAt: '2026-07-01T09:00:00.000Z',
      isSeed: true
    },
    {
      id: 'phnova-00A2',
      message: 'Try nyo, hindi masasayang efforts nyo, realiable and friendly',
      rating: 5,
      createdAt: '2026-07-02T10:30:00.000Z',
      isSeed: true
    },
    {
      id: 'phnova-00A3',
      message: 'my new favortie boosting company/agency, sulit ang bayad XD',
      rating: 5,
      createdAt: '2026-07-03T12:15:00.000Z',
      isSeed: true
    },
    {
      id: 'phnova-00A4',
      message: 'Legit nganiii ito',
      rating: 5,
      createdAt: '2026-07-04T15:45:00.000Z',
      isSeed: true
    }
  ];

  function clampReviewRating(value, fallback = 5) {
    const numeric = Number(value);
    const base = Number.isFinite(numeric) ? numeric : fallback;
    return Math.max(0.5, Math.min(5, Math.round(base * 2) / 2));
  }

  let selectedReviewRating = 0; // v5.3.18: no auto-filled rating; stars fill only after user selects.

  function formatReviewRating(value) {
    return clampReviewRating(value).toFixed(1).replace(/\.0$/, '.0');
  }

  function renderReviewStars(rating = 5) {
    const value = clampReviewRating(rating, 5);
    return Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(1, value - index));
      const percent = fill >= 1 ? 100 : fill >= 0.5 ? 50 : 0;
      return `<span class="review-star" aria-hidden="true" style="--star-fill:${percent}%">★</span>`;
    }).join('');
  }

  function updateReviewRatingInput(previewValue = selectedReviewRating) {
    // v5.3.18: feedback rating starts blank. Stars only fill on hover/tap/click selection.
    const numericPreview = Number(previewValue);
    const rating = Number.isFinite(numericPreview) && numericPreview > 0 ? clampReviewRating(numericPreview, 0.5) : 0;
    const committedRating = Number(selectedReviewRating) > 0 ? clampReviewRating(selectedReviewRating, 0.5) : 0;
    if (els.reviewRatingControl) {
      els.reviewRatingControl.dataset.rating = String(rating);
      els.reviewRatingControl.setAttribute('aria-valuenow', String(rating));
      els.reviewRatingControl.setAttribute('aria-valuetext', rating > 0 ? `${formatReviewRating(rating)} out of 5 stars` : 'No rating selected');
      els.reviewRatingControl.querySelectorAll('.review-rating-star').forEach(star => {
        const starValue = Number(star.dataset.star) || 0;
        const fill = rating > 0 ? Math.max(0, Math.min(1, rating - (starValue - 1))) : 0;
        const percent = fill >= 1 ? 100 : fill >= 0.5 ? 50 : 0;
        star.style.setProperty('--star-fill', `${percent}%`);
        star.classList.toggle('is-filled', percent > 0);
      });
    }
    if (els.reviewRatingValue) els.reviewRatingValue.value = committedRating > 0 ? String(committedRating) : '';
    if (els.reviewRatingText) els.reviewRatingText.textContent = committedRating > 0 ? `${formatReviewRating(committedRating)}/5 stars` : 'Tap a star to rate';
  }

  function ratingFromPointerEvent(event, star) {
    const starValue = Number(star && star.dataset ? star.dataset.star : 5) || 5;
    const rect = star.getBoundingClientRect();
    const isLeftHalf = event.clientX - rect.left <= rect.width / 2;
    return clampReviewRating(starValue - (isLeftHalf ? 0.5 : 0), 5);
  }

  function setReviewRating(value) {
    selectedReviewRating = clampReviewRating(value, 5);
    updateReviewRatingInput(selectedReviewRating);
  }

  function bindReviewRatingInput() {
    if (!els.reviewRatingControl) return;
    updateReviewRatingInput(selectedReviewRating);

    els.reviewRatingControl.addEventListener('click', event => {
      const star = event.target.closest('.review-rating-star');
      if (!star) return;
      setReviewRating(ratingFromPointerEvent(event, star));
    });

    els.reviewRatingControl.addEventListener('mousemove', event => {
      const star = event.target.closest('.review-rating-star');
      if (!star) return;
      updateReviewRatingInput(ratingFromPointerEvent(event, star));
    });

    els.reviewRatingControl.addEventListener('mouseleave', () => updateReviewRatingInput(selectedReviewRating));

    els.reviewRatingControl.addEventListener('keydown', event => {
      const key = event.key;
      if (['ArrowLeft', 'ArrowDown'].includes(key)) {
        event.preventDefault();
        setReviewRating(selectedReviewRating > 0 ? selectedReviewRating - 0.5 : 0.5);
      } else if (['ArrowRight', 'ArrowUp'].includes(key)) {
        event.preventDefault();
        setReviewRating(selectedReviewRating > 0 ? selectedReviewRating + 0.5 : 0.5);
      } else if (/^[1-5]$/.test(key)) {
        event.preventDefault();
        setReviewRating(Number(key));
      } else if (key === 'Home') {
        event.preventDefault();
        setReviewRating(0.5);
      } else if (key === 'End') {
        event.preventDefault();
        setReviewRating(5);
      }
    });
  }

  function formatReviewDate(dateValue) {
    const date = new Date(dateValue || Date.now());
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function normalizePublicReview(review) {
    const id = String(review && review.id ? review.id : '').toLowerCase();
    const message = String(review && review.message ? review.message : '').trim().toLowerCase();
    const isOldPublicTest = /^test\s*001$/i.test(String(review && review.message ? review.message : '').trim());
    if (id === UNIVERSAL_CLIENT_REVIEW_ID.toLowerCase() || isOldPublicTest) {
      return {
        ...review,
        id: UNIVERSAL_CLIENT_REVIEW_ID,
        token: '',
        displayName: '',
        message: UNIVERSAL_CLIENT_REVIEW_MESSAGE,
        rating: Number(review && review.rating) || 5,
        createdAt: review && review.createdAt ? review.createdAt : '2026-07-07T09:00:00.000Z',
        releasedLegacy: true
      };
    }
    return review;
  }


  function forceLocalReviewMigration() {
    try {
      const key = Store && Store.KEYS && Store.KEYS.reviews ? Store.KEYS.reviews : 'novalyte.reviews.v1';
      const raw = localStorage.getItem(key);
      const reviews = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(reviews) ? reviews : [];
      let changed = false;
      const seen = new Set();
      const migrated = [];

      list.forEach(review => {
        const message = String(review && review.message ? review.message : '').trim();
        const id = String(review && review.id ? review.id : '').trim();
        const isTarget = id.toLowerCase() === UNIVERSAL_CLIENT_REVIEW_ID.toLowerCase() || /^test\s*001$/i.test(message);
        const next = isTarget ? {
          ...review,
          id: UNIVERSAL_CLIENT_REVIEW_ID,
          token: '',
          displayName: '',
          message: UNIVERSAL_CLIENT_REVIEW_MESSAGE,
          rating: 5,
          createdAt: review && review.createdAt ? review.createdAt : '2026-07-07T09:00:00.000Z',
          isSeed: true,
          releasedLegacy: true
        } : review;
        const keyId = String(next && next.id ? next.id : '').toLowerCase();
        if (keyId && seen.has(keyId)) {
          changed = true;
          return;
        }
        if (keyId) seen.add(keyId);
        if (isTarget && (id !== UNIVERSAL_CLIENT_REVIEW_ID || message !== UNIVERSAL_CLIENT_REVIEW_MESSAGE)) changed = true;
        migrated.push(next);
      });

      if (!seen.has(UNIVERSAL_CLIENT_REVIEW_ID.toLowerCase())) {
        migrated.unshift({
          id: UNIVERSAL_CLIENT_REVIEW_ID,
          token: '',
          displayName: '',
          message: UNIVERSAL_CLIENT_REVIEW_MESSAGE,
          rating: 5,
          createdAt: '2026-07-07T09:00:00.000Z',
          updatedAt: '',
          isSeed: true
        });
        changed = true;
      }

      if (changed) localStorage.setItem(key, JSON.stringify(migrated));
    } catch (error) {}
  }

  function normalizeAndPersistPublicReviews() {
    forceLocalReviewMigration();
    if (!Store || !Store.getReviews || !Store.saveReviews) return;
    try {
      const existing = Store.getReviews();
      const normalized = [];
      const seenIds = new Set();
      let changed = false;

      existing.forEach(review => {
        const next = normalizePublicReview(review);
        const key = String(next.id || '').toLowerCase();
        if (key === UNIVERSAL_CLIENT_REVIEW_ID.toLowerCase() && seenIds.has(key)) {
          changed = true;
          return;
        }
        if (key) seenIds.add(key);
        if (String(review.id || '') !== String(next.id || '') || String(review.message || '') !== String(next.message || '') || Number(review.rating || 5) !== Number(next.rating || 5)) {
          changed = true;
        }
        normalized.push(next);
      });

      if (!seenIds.has(UNIVERSAL_CLIENT_REVIEW_ID.toLowerCase())) {
        normalized.unshift({
          id: UNIVERSAL_CLIENT_REVIEW_ID,
          message: UNIVERSAL_CLIENT_REVIEW_MESSAGE,
          rating: 5,
          createdAt: '2026-07-07T09:00:00.000Z',
          token: '',
          displayName: '',
          updatedAt: '',
          isSeed: true
        });
        changed = true;
      }

      if (changed) Store.saveReviews(normalized);
    } catch (error) {}
  }

  function combinedPublicReviews() {
    const savedReviews = Store.getReviews ? Store.getReviews().map(normalizePublicReview) : [];
    const realIds = new Set(savedReviews.map(review => String(review.id || '').toLowerCase()));
    const seedReviews = DEFAULT_PUBLIC_REVIEWS.filter(review => !realIds.has(String(review.id || '').toLowerCase()));
    return [...savedReviews, ...seedReviews];
  }

  function renderReviews() {
    if (!els.reviewCards) return;
    const reviews = combinedPublicReviews();
    const current = Store.getCurrentClientReview ? Store.getCurrentClientReview() : null;

    els.reviewCards.innerHTML = reviews.map(review => `
      <article class="review-card">
        <div class="review-card-head">
          <div class="review-stars" aria-label="${formatReviewRating(review.rating || 5)} star feedback">${renderReviewStars(review.rating || 5)}</div>
          <span class="review-id">${sanitize(review.id)}</span>
        </div>
        <p>${sanitize(review.message)}</p>
        <div class="review-card-foot">
          <strong>Client feedback</strong>
          <small>${sanitize(formatReviewDate(review.createdAt))}</small>
        </div>
      </article>
    `).join('');

    if (els.reviewForm) {
      els.reviewForm.classList.toggle('hidden', Boolean(current));
    }
    if (els.reviewText && !current) {
      els.reviewText.value = els.reviewText.value.slice(0, 1000);
    }
    if (els.submitReviewBtn) {
      els.submitReviewBtn.textContent = 'Submit Feedback';
      els.submitReviewBtn.disabled = Boolean(current);
    }
    updateReviewRatingInput(selectedReviewRating);
    updateReviewCharCount();
  }

  function updateReviewCharCount() {
    if (!els.reviewText || !els.reviewCharCount) return;
    if (els.reviewText.value.length > 1000) {
      els.reviewText.value = els.reviewText.value.slice(0, 1000);
    }
    els.reviewCharCount.textContent = String(els.reviewText.value.length);
  }

  function submitClientReview(event) {
    event.preventDefault();
    if (!Store.addReview) return;
    if (Store.getCurrentClientReview && Store.getCurrentClientReview()) {
      Store.toast('You already submitted feedback on this browser.', 'warning');
      renderReviews();
      return;
    }
    if (!(Number(selectedReviewRating) > 0)) {
      Store.toast('Please select a star rating before submitting feedback.', 'warning');
      updateReviewRatingInput(0);
      return;
    }
    const result = Store.addReview('', els.reviewText ? els.reviewText.value : '', selectedReviewRating);
    if (!result.ok) {
      const messages = {
        empty: 'Please write feedback before submitting.',
        locked: 'You already submitted feedback on this browser.',
        'exists-editable': 'You already submitted feedback on this browser.'
      };
      Store.toast(messages[result.reason] || 'Feedback was not saved.', result.reason === 'empty' ? 'error' : 'warning');
      renderReviews();
      return;
    }
    if (els.reviewText) els.reviewText.value = '';
    selectedReviewRating = 0;
    updateReviewRatingInput(0);
    Store.toast('Feedback submitted. Thank you.');
    renderReviews();
  }

  function showClientView(view, shouldScroll = true) {
    const showHome = !view || view === 'home';
    const showServices = view === 'services';
    const showDigitalProducts = view === 'digital-products';
    const showOrder = view === 'order';
    const showWhatWeDo = view === 'what-we-do';
    const showAbout = view === 'about';
    state.view = showServices ? 'services' : showDigitalProducts ? 'digital-products' : showOrder ? 'order' : showWhatWeDo ? 'what-we-do' : showAbout ? 'about' : 'home';
    if (els.homeSection) els.homeSection.classList.toggle('hidden', !showHome);
    if (els.orderPanel) els.orderPanel.classList.toggle('hidden', !showOrder);
    if (els.servicesSection) els.servicesSection.classList.toggle('hidden', !showServices);
    if (els.digitalProductsSection) els.digitalProductsSection.classList.toggle('hidden', !showDigitalProducts);
    if (els.whatWeDoSection) els.whatWeDoSection.classList.toggle('hidden', !showWhatWeDo);
    if (els.aboutSection) els.aboutSection.classList.toggle('hidden', !showAbout);
    if (els.homeNavBtn) els.homeNavBtn.classList.toggle('active', showHome);
    if (els.servicesNavBtn) els.servicesNavBtn.classList.toggle('active', showServices);
    if (els.digitalProductsNavBtn) els.digitalProductsNavBtn.classList.toggle('active', showDigitalProducts);
    if (els.whatWeDoNavBtn) els.whatWeDoNavBtn.classList.toggle('active', showWhatWeDo);
    if (els.aboutNavBtn) els.aboutNavBtn.classList.toggle('active', showAbout);
    updateViewHash(state.view);
    saveClientState();
    renderHomeMetrics();
    normalizeAndPersistPublicReviews();
    renderReviews();
    if (shouldScroll) window.scrollTo({ top: 0, behavior: 'auto' });
  }

  async function copyInquiryMessage() {
    const copied = await writeClipboardText(els.orderMessage.textContent);
    Store.toast(copied ? 'Order details copied. Paste it in Messenger.' : 'Copy failed. Please select and copy manually.', copied ? 'success' : 'error');
    return copied;
  }

  function setupAutoScrollbars() {
    // v5.0: keep scrollbars stable to avoid page wiggle/layout shift while scrolling.
    document.documentElement.classList.remove('is-scrolling-global');
    document.body.classList.remove('is-scrolling');
  }


  function mobileSelectLabel(select) {
    if (!select) return '';
    const opt = select.options[select.selectedIndex];
    return opt ? opt.textContent : 'Select';
  }

  function refreshMobileSelectMenu(select) {
    if (!select || !select.classList.contains('mobile-enhanced-select')) return;
    let proxy = select.nextElementSibling;
    if (!proxy || !proxy.classList || !proxy.classList.contains('mobile-select-proxy')) {
      proxy = document.createElement('div');
      proxy.className = 'mobile-select-proxy';
      proxy.innerHTML = '<button class="mobile-select-btn" type="button" aria-expanded="false"><span></span><i aria-hidden="true"></i></button><div class="mobile-select-list hidden" role="listbox"></div>';
      select.insertAdjacentElement('afterend', proxy);
    }
    const btn = proxy.querySelector('.mobile-select-btn');
    const label = btn ? btn.querySelector('span') : null;
    const list = proxy.querySelector('.mobile-select-list');
    if (label) label.textContent = mobileSelectLabel(select);
    if (!list) return;
    list.innerHTML = Array.from(select.options).map(optionItem => `
      <button class="mobile-select-option${optionItem.value === select.value ? ' active' : ''}" type="button" data-mobile-select-value="${sanitize(optionItem.value)}" ${optionItem.disabled ? 'disabled' : ''}>${sanitize(optionItem.textContent)}</button>
    `).join('');
  }

  function refreshMobileSelectMenus() {
    document.querySelectorAll('select.mobile-enhanced-select').forEach(refreshMobileSelectMenu);
  }

  function closeMobileSelectMenus(except) {
    document.querySelectorAll('.mobile-select-proxy').forEach(proxy => {
      if (except && proxy === except) return;
      proxy.classList.remove('open');
      const btn = proxy.querySelector('.mobile-select-btn');
      const list = proxy.querySelector('.mobile-select-list');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (list) list.classList.add('hidden');
    });
  }

  function setupMobileSelectMenus() {
    refreshMobileSelectMenus();
    document.addEventListener('click', event => {
      const proxy = event.target.closest('.mobile-select-proxy');
      if (!proxy) {
        closeMobileSelectMenus();
        return;
      }
      const select = proxy.previousElementSibling;
      if (!select || !select.matches('select.mobile-enhanced-select')) return;
      const btn = event.target.closest('.mobile-select-btn');
      const optionBtn = event.target.closest('[data-mobile-select-value]');
      if (btn) {
        const willOpen = !proxy.classList.contains('open');
        closeMobileSelectMenus(proxy);
        proxy.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
        const list = proxy.querySelector('.mobile-select-list');
        if (list) list.classList.toggle('hidden', !willOpen);
        return;
      }
      if (optionBtn) {
        select.value = optionBtn.dataset.mobileSelectValue;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        refreshMobileSelectMenu(select);
        closeMobileSelectMenus();
      }
    });
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

  function restorePrimaryNavHome() {
    if (!els.primaryNav || !primaryNavHomeParent || els.primaryNav.parentElement === primaryNavHomeParent) return;
    primaryNavHomeParent.insertBefore(els.primaryNav, primaryNavNextSibling);
    els.primaryNav.classList.remove('client-floating-nav');
  }

  function floatPrimaryNavToViewport() {
    if (!els.primaryNav) return;
    if (!window.matchMedia('(max-width: 820px)').matches) {
      restorePrimaryNavHome();
      return;
    }
    if (els.primaryNav.parentElement !== document.body) {
      document.body.appendChild(els.primaryNav);
    }
    els.primaryNav.classList.add('client-floating-nav');
  }

  function updateClientNavViewportPosition() {
    if (!els.mobileNavToggle || !window.matchMedia('(max-width: 820px)').matches) return;
    const rect = els.mobileNavToggle.getBoundingClientRect();
    const fallbackTop = 66;
    const rawTop = Number.isFinite(rect.bottom) ? rect.bottom + 8 : fallbackTop;
    const top = Math.max(58, Math.min(rawTop, window.innerHeight - 68));
    document.documentElement.style.setProperty('--client-nav-top', `${top}px`);
  }

  function closeMobileNav() {
    document.body.classList.remove('client-nav-open');
    if (els.mobileNavToggle) els.mobileNavToggle.setAttribute('aria-expanded', 'false');
    restorePrimaryNavHome();
  }

  function toggleMobileNav() {
    const willOpen = !document.body.classList.contains('client-nav-open');
    if (willOpen) {
      floatPrimaryNavToViewport();
      updateClientNavViewportPosition();
    }
    document.body.classList.toggle('client-nav-open', willOpen);
    if (els.mobileNavToggle) els.mobileNavToggle.setAttribute('aria-expanded', String(willOpen));
    if (!willOpen) restorePrimaryNavHome();
  }

  function bindEvents() {
    if (els.mobileNavToggle) {
      els.mobileNavToggle.addEventListener('click', toggleMobileNav);
    }

    [els.serviceSearch, els.platformFilter, els.categoryFilter].forEach(el => el.addEventListener('input', () => {
      resetServicePage();
      renderServices();
      saveClientState();
    }));

    if (els.digitalProductSearch) els.digitalProductSearch.addEventListener('input', () => { renderDigitalProducts(); saveClientState(); });
    if (els.digitalProductFilter) els.digitalProductFilter.addEventListener('input', () => { renderDigitalProducts(); saveClientState(); });
    if (els.clearDigitalProductFilters) {
      els.clearDigitalProductFilters.addEventListener('click', () => {
        els.digitalProductSearch.value = '';
        els.digitalProductFilter.value = 'all';
        renderDigitalProducts();
        saveClientState();
      });
    }

    if (els.digitalProductsGrid) {
      els.digitalProductsGrid.addEventListener('click', async event => {
        const descBtn = event.target.closest('[data-digital-description]');
        if (descBtn) {
          const product = digitalProducts().find(item => item.id === descBtn.dataset.digitalDescription);
          openDigitalProductModal(product);
          return;
        }
        const btn = event.target.closest('[data-digital-product]');
        if (!btn) return;
        const product = digitalProducts().find(item => item.id === btn.dataset.digitalProduct);
        await checkoutDigitalProduct(product);
      });
    }

    if (els.digitalProductModalClose) els.digitalProductModalClose.addEventListener('click', closeDigitalProductModal);
    if (els.digitalProductModalCheckout) {
      els.digitalProductModalCheckout.addEventListener('click', async () => {
        await checkoutDigitalProduct(activeDigitalProduct());
        closeDigitalProductModal();
      });
    }
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeDigitalProductModal(); closeMobileSelectMenus(); }
    });

    els.clearFilters.addEventListener('click', () => {
      els.serviceSearch.value = '';
      els.platformFilter.value = 'all';
      els.categoryFilter.value = 'all';
      resetServicePage();
      renderServices();
      saveClientState();
    });

    els.calcCategory.addEventListener('change', () => {
      fillCalculatorServices(false);
      renderSearchSuggestions();
      saveClientState();
    });
    els.calcSearch.addEventListener('input', () => { renderSearchSuggestions(); saveClientState(); });
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
    [els.calcService, els.calcQuantity, els.calcLink].forEach(el => el.addEventListener('input', () => { renderCalculator(); saveClientState(); }));

    els.servicesGrid.addEventListener('click', handleServiceOrderClick);
    if (els.mobileServiceCards) els.mobileServiceCards.addEventListener('click', handleServiceOrderClick);

    try {
      const serviceCardsQuery = window.matchMedia('(max-width: 820px)');
      const refreshServiceLayout = () => renderServices();
      if (serviceCardsQuery.addEventListener) serviceCardsQuery.addEventListener('change', refreshServiceLayout);
      else if (serviceCardsQuery.addListener) serviceCardsQuery.addListener(refreshServiceLayout);
    } catch (error) {}

    els.servicePagination.addEventListener('click', event => {
      const btn = event.target.closest('[data-service-page]');
      if (!btn) return;
      const total = filteredServices().length;
      const pages = Math.max(1, Math.ceil(total / state.perPage));
      if (btn.dataset.servicePage === 'prev') state.servicePage = Math.max(1, state.servicePage - 1);
      if (btn.dataset.servicePage === 'next') state.servicePage = Math.min(pages, state.servicePage + 1);
      renderServices();
      saveClientState();
      document.getElementById('services').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (els.homeNavBtn) {
      els.homeNavBtn.addEventListener('click', event => {
        event.preventDefault();
        closeMobileNav();
        showClientView('home');
      });
    }

    document.querySelectorAll('[data-client-view]').forEach(btn => {
      btn.addEventListener('click', () => { closeMobileNav(); showClientView(btn.dataset.clientView); });
    });

    if (els.reviewText) els.reviewText.addEventListener('input', updateReviewCharCount);
    bindReviewRatingInput();
    if (els.reviewForm) els.reviewForm.addEventListener('submit', submitClientReview);


    if (els.whatWeDoNavBtn) {
      els.whatWeDoNavBtn.addEventListener('click', event => {
        event.preventDefault();
        closeMobileNav();
        showClientView('what-we-do');
      });
    }

    if (els.aboutNavBtn) {
      els.aboutNavBtn.addEventListener('click', event => {
        event.preventDefault();
        closeMobileNav();
        showClientView('about');
      });
    }

    if (els.servicesNavBtn) {
      els.servicesNavBtn.addEventListener('click', event => {
        event.preventDefault();
        closeMobileNav();
        showClientView('services');
      });
    }

    if (els.digitalProductsNavBtn) {
      els.digitalProductsNavBtn.addEventListener('click', event => {
        event.preventDefault();
        closeMobileNav();
        showClientView('digital-products');
      });
    }

    if (els.homeBrand) {
      els.homeBrand.addEventListener('click', event => {
        event.preventDefault();
        closeMobileNav();
        showClientView('home');
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
    document.body.classList.add('v53-mobile-build');
    setupBrandLogos();
    setupMobileSelectMenus();
    setupAutoScrollbars();
    Store.getServices();
    forceLocalReviewMigration();
    if (Store.releaseCurrentReviewForOneNewSubmission) Store.releaseCurrentReviewForOneNewSubmission();
    const saved = readClientState();
    fillFilters();
    fillDigitalProductFilters();
    fillCalculatorServices(false);
    restoreClientState(saved);
    renderCalculator();
    renderServices();
    renderDigitalProducts();
    renderHomeMetrics();
    normalizeAndPersistPublicReviews();
    renderReviews();
    bindEvents();
    const initialHash = window.location.hash;
    showClientView(viewFromHash() || saved.view || 'home', false);
    window.addEventListener('hashchange', () => {
      showClientView(viewFromHash() || 'home', false);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
