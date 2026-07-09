// app.js - Eventra Application Logic
// Router - All screen renderers - All interactivity

'use strict';

// """ State """"""""""""""""""""""""""""""""""""""""""""""""""
const State = {
 currentRoute: 'home',
 setupStep: 1,
 form: {
 type: 'Engagement', date: '2026-12-18', city: 'Mumbai',
 guests: 150, budget: 800000, functions: 1,
 services: ['Venue','Catering','Decoration','Photography','Makeup'],
 priorities: ['Food Quality','Photography','Guest Experience'],
 style: 'Elegant & Minimal'
 },
 activeQuoteTab: 'photography',
 activeVendorTab: 'Photography',
 activeQTab: 'Photography',
 simulated: false,
  chartInstance: null,
};

function navigateTo(route) {
 document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
 const target = document.getElementById('screen-' + route);
 if (target) { target.classList.add('active'); State.currentRoute = route; }

 document.querySelectorAll('.nav-item').forEach(a => {
 a.classList.toggle('active', a.dataset.route === route);
 });
 document.querySelectorAll('.bottom-nav-item').forEach(b => {
 b.classList.toggle('active', b.dataset.route === route);
 });

 window.location.hash = route;
 window.scrollTo(0, 0);
 onRouteEnter(route);
 lucide.createIcons();
}

function startPlanning(eventType) {
 State.form.type = eventType;
 const sel = document.getElementById('f-type');
 if (sel) sel.value = eventType.includes('Wedding') ? 'Wedding'
 : eventType.includes('Engagement') ? 'Engagement'
 : eventType.includes('Birthday') ? 'Birthday'
 : eventType.includes('Corporate') ? 'Corporate'
 : eventType.includes('Anniversary') ? 'Anniversary'
 : eventType.includes('Social') ? 'Social'
 : sel.value;
 updateItineraryOptions();
 updateSetupProgress(1);
 navigateTo('setup');
}

function onRouteEnter(route) {
 if (route === 'home') renderHome();
 if (route === 'setup') updateSetupProgress(1);
 if (route === 'discovery') renderDiscovery();
 if (route === 'directory') renderDirectory('all');
 if (route === 'feasibility') renderFeasibility();
 if (route === 'quotes') renderQuotes(State.activeQuoteTab);
 if (route === 'vendors') renderVendors(State.activeVendorTab);
 if (route === 'hidden-costs')renderHiddenCosts();
 if (route === 'dashboard') renderDashboard();
 if (route === 'simulator') renderSimulator();
 if (route === 'tradeoff') renderTradeoff();
 if (route === 'questions') renderQuestions(State.activeQTab);
}

window.addEventListener('hashchange', () => {
 const hash = window.location.hash.replace('#','') || 'home';
 navigateTo(hash);
});

// """ HOME / LANDING """""""""""""""""""""""""""""""""""""""""
function renderHome() {
 // Testimonials
 const tg = document.getElementById('testimonials-grid');
 if (tg) tg.innerHTML = EVENTRA.testimonials.map(t => `
 <div class="testimonial-card">
 <div class="testimonial-quote">"${t.quote}"</div>
 <div class="testimonial-footer">
 <div class="testimonial-avatar">${t.avatar}</div>
 <div>
 <div class="testimonial-name">${t.name}</div>
 <div class="testimonial-role">${t.role}</div>
 </div>
 </div>
 </div>
 `).join('');
}

// """ DISCOVERY """"""""""""""""""""""""""""""""""""""""""""""
function renderDiscovery() {
 const grid = document.getElementById('pp-grid');
 if (!grid) return;
 grid.innerHTML = EVENTRA.painPoints.map(pp => `
 <div class="pp-card pp-${pp.priority}">
 <div class="pp-card-icon"><i data-lucide="${pp.icon}"></i></div>
 <div style="min-width:0">
 <div class="pp-card-id">${pp.id} - ${priorityLabel(pp.priority)}</div>
 <div class="pp-card-title">${pp.title}</div>
 <div class="pp-card-desc">${pp.description}</div>
 </div>
 </div>
 `).join('');

 const mgGrid = document.getElementById('market-gap-grid');
 if (mgGrid) mgGrid.innerHTML = EVENTRA.marketGaps.map(gap => `
 <div class="card card-hover">
 <div class="badge badge-red mb-3">${gap.status}</div>
 <div class="card-title">${gap.title}</div>
 <p class="text-sm text-secondary">${gap.description}</p>
 </div>
 `).join('');

 const mg = document.getElementById('metrics-grid');
 if (mg) mg.innerHTML = EVENTRA.metrics.supporting.map((m,i) => `
 <div class="flex items-center gap-2 py-1">
 <div style="width:20px;height:20px;border-radius:50%;background:var(--primary-lt);color:var(--primary);font-size:.65rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</div>
 <span class="text-sm">${m}</span>
 </div>
 `).join('');
}

function priorityLabel(p) {
 return { must:'Must Solve', should:'Should Solve', supporting:'Supporting', future:'Future V2', emotional:'Emotional Driver' }[p] || p;
}

function parseIntegerInput(value, fallback) {
 const cleaned = String(value ?? '').replace(/[^\d]/g, '');
 const parsed = parseInt(cleaned, 10);
 return Number.isFinite(parsed) ? parsed : fallback;
}

function parseBudgetInput(value, fallback = 800000) {
 const raw = String(value ?? '').trim().toLowerCase();
 if (!raw) return fallback;
 const numeric = parseFloat(raw.replace(/,/g, '').replace(/[^\d.]/g, ''));
 if (!Number.isFinite(numeric)) return fallback;
 if (raw.includes('lakh') || raw.includes('lac')) return Math.round(numeric * 100000);
 if (raw.includes('cr') || raw.includes('crore')) return Math.round(numeric * 10000000);
 if (numeric > 0 && numeric < 1000) return Math.round(numeric * 100000);
 return Math.round(numeric);
}

function syncFormFromInputs() {
 const type = document.getElementById('f-type')?.value || State.form.type || 'Engagement';
 const date = document.getElementById('f-date')?.value || State.form.date || '2026-12-18';
 const city = document.getElementById('f-city')?.value || State.form.city || 'Mumbai';
 const guests = parseIntegerInput(document.getElementById('f-guests')?.value, State.form.guests || 150);
 const budget = parseBudgetInput(document.getElementById('f-budget')?.value, State.form.budget || 800000);
 const itinerarySelect = document.getElementById('f-functions');
 const customItinerary = document.getElementById('f-itinerary-custom')?.value?.trim() || '';
 const selectedItinerary = itinerarySelect?.selectedOptions?.[0]?.textContent || State.form.itinerary || 'Reception Only';
 const itinerary = itinerarySelect?.value === 'custom' && customItinerary ? customItinerary : selectedItinerary;
 const functions = itinerarySelect?.value === 'custom'
 ? inferItineraryCount(customItinerary, State.form.functions || 1)
 : parseIntegerInput(itinerarySelect?.value, State.form.functions || 1);
 const style = document.getElementById('f-style')?.value || State.form.style || 'Elegant & Minimal';
 const services = [...document.querySelectorAll('#services-pills .pill.active')].map(p => p.dataset.service).filter(Boolean);
 const priorities = [...document.querySelectorAll('#priority-pills .pill.active')].map(p => p.dataset.priority).filter(Boolean);
 State.form = { type, date, city, guests, budget, functions, itinerary, style, services, priorities };
 return State.form;
}

function inferItineraryCount(text, fallback = 1) {
 if (!text) return fallback;
 const parts = text.split(/\s*(?:\+|,|\/|&|\band\b)\s*/i).map(p => p.trim()).filter(Boolean);
 return Math.max(1, Math.min(8, parts.length || fallback));
}

function itineraryConfig(type) {
 const configs = {
 Wedding: {
 label: 'Wedding Itinerary',
 hint: 'Choose the closest wedding flow so vendor and budget estimates scale correctly.',
 options: [
 ['1', 'Reception Only'],
 ['2', 'Haldi + Wedding'],
 ['3', 'Haldi + Mehendi + Wedding'],
 ['4', 'Haldi + Mehendi + Sangeet + Wedding'],
 ['custom', 'Custom']
 ]
 },
 Engagement: {
 label: 'Engagement Itinerary',
 hint: 'Choose the closest engagement flow for food, decor, photography, and venue planning.',
 options: [
 ['1', 'Engagement Only'],
 ['2', 'Engagement + Dinner'],
 ['3', 'Engagement + Mehendi + Dinner'],
 ['custom', 'Custom']
 ]
 },
 Birthday: {
 label: 'Birthday Itinerary',
 hint: 'Choose the closest birthday flow so entertainment, food, and decor estimates fit the event.',
 options: [
 ['1', 'Birthday Party Only'],
 ['2', 'Cake Cutting + Dinner'],
 ['3', 'Games + Cake Cutting + Dinner'],
 ['4', 'Theme Party + Games + Dinner'],
 ['custom', 'Custom']
 ]
 },
 Corporate: {
 label: 'Corporate Itinerary',
 hint: 'Choose the closest corporate flow for venue, AV, catering, and logistics estimates.',
 options: [
 ['1', 'Conference Only'],
 ['2', 'Conference + Networking'],
 ['3', 'Conference + Lunch + Networking'],
 ['4', 'Conference + Dinner + Entertainment'],
 ['custom', 'Custom']
 ]
 },
 Anniversary: {
 label: 'Anniversary Itinerary',
 hint: 'Choose the closest anniversary flow for food, decor, and entertainment planning.',
 options: [
 ['1', 'Dinner Only'],
 ['2', 'Ceremony + Dinner'],
 ['3', 'Ceremony + Entertainment + Dinner'],
 ['custom', 'Custom']
 ]
 },
 Social: {
 label: 'Event Itinerary',
 hint: 'Choose the closest event flow so vendor and budget estimates scale correctly.',
 options: [
 ['1', 'Main Event Only'],
 ['2', 'Main Event + Meal'],
 ['3', 'Welcome + Main Event + Meal'],
 ['custom', 'Custom']
 ]
 }
 };
 return configs[type] || configs.Social;
}

function updateItineraryOptions() {
 const type = document.getElementById('f-type')?.value || State.form.type || 'Engagement';
 const select = document.getElementById('f-functions');
 const label = document.getElementById('itinerary-label');
 const hint = select?.parentElement?.querySelector('.form-hint');
 if (!select) return;
 const config = itineraryConfig(type);
 if (label) label.textContent = config.label;
 select.innerHTML = config.options.map(([value, text]) => `<option value="${value}">${text}</option>`).join('');
 if (hint) hint.textContent = config.hint;
 toggleCustomItinerary();
}

function toggleCustomItinerary() {
 const select = document.getElementById('f-functions');
 const custom = document.getElementById('f-itinerary-custom');
 if (!custom || !select) return;
 const isCustom = select.value === 'custom';
 custom.classList.toggle('hidden', !isCustom);
 if (isCustom) custom.focus();
}

function buildBudgetPlan() {
 const form = syncFormFromInputs();
 const selected = new Set(form.services.length ? form.services : ['Venue','Catering','Decoration','Photography','Makeup']);
 const cityMultiplier = { Mumbai:1.15, Delhi:1.1, Bangalore:1.05, Hyderabad:0.95, Chennai:0.95, Pune:0.9, Other:0.85 }[form.city] || 1;
 const typeMultiplier = form.type.includes('Wedding') ? 1.25
 : form.type.includes('Birthday') ? 0.65
 : form.type.includes('Corporate') ? 0.85
 : form.type.includes('Anniversary') ? 0.75
 : form.type.includes('Social') ? 0.75
 : 1;
 const functionMultiplier = 1 + Math.max(0, form.functions - 1) * 0.18;
 const guests = Math.max(10, form.guests || 150);
 const budget = Math.max(10000, form.budget || 0);
 const scale = cityMultiplier * typeMultiplier * functionMultiplier;
 const market = {
 Venue: Math.round((160000 + guests * 350) * scale),
 Catering: Math.round(guests * 950 * cityMultiplier * typeMultiplier * functionMultiplier),
 Decoration: Math.round(65000 * scale),
 Photography: Math.round(70000 * cityMultiplier * (form.type.includes('Birthday') ? 0.75 : 1) * Math.min(1.25, functionMultiplier)),
 Makeup: Math.round(30000 * cityMultiplier * (form.type.includes('Corporate') ? 0.35 : 1)),
 Entertainment: Math.round(30000 * cityMultiplier * (form.type.includes('Corporate') ? 1.15 : 1)),
 Logistics: Math.round((25000 + guests * 100) * cityMultiplier * Math.min(1.25, functionMultiplier))
 };
 const weights = { Venue:30, Catering:25, Decoration:10, Photography:10, Makeup:5, Entertainment:5, Logistics:5 };
 const activeCategories = Object.keys(weights).filter(name => name === 'Logistics' || selected.has(name));
 const activeWeight = activeCategories.reduce((sum, name) => sum + weights[name], 0);
 const allocatable = Math.round(budget * 0.9);
 const categories = activeCategories.map(name => {
 const allocation = Math.round(allocatable * (weights[name] / activeWeight));
 const recommended = market[name];
 const ratio = recommended / Math.max(1, allocation);
 const risk = ratio > 1.18 ? 'High' : ratio > 0.98 ? 'Medium' : 'Low';
 const explanation = `${name} realistic target for ${guests} guests in ${form.city}: ${formatINRFull(recommended)}. Your working allocation is ${formatINRFull(allocation)}.`;
 return { name, icon: categoryIcon(name), recommended, allocation, percent: Math.round(recommended / budget * 100), risk, explanation };
 });
 const contingency = Math.round(budget * 0.1);
 categories.push({ name:'Contingency', icon:'shield', recommended:contingency, allocation:contingency, percent:10, risk:'Locked', explanation:'Keep this reserve locked until all vendor quotes are confirmed.' });
 const directCost = categories.reduce((sum, c) => sum + c.recommended, 0);
 const hiddenReserve = Math.round(directCost * 0.07);
 const estimatedMinCost = directCost + hiddenReserve;
 const gap = budget - estimatedMinCost;
 const ratio = budget / Math.max(1, estimatedMinCost);
 const scorePercent = Math.max(1, Math.min(100, Math.round(ratio * 100)));
 const score = ratio >= 1.05 ? 'Realistic' : ratio >= 0.9 ? 'Stretch' : 'Unrealistic';
 return {
 ...form,
 score,
 scorePercent,
 budget,
 estimatedMinCost,
 gap,
 contingency,
 hiddenReserve,
 categories,
 insight: buildDynamicInsight(form, score, gap, categories, hiddenReserve)
 };
}

function categoryIcon(name) {
 return { Venue:'building-2', Catering:'utensils', Decoration:'sparkles', Photography:'camera', Makeup:'wand-2', Entertainment:'music', Logistics:'truck', Contingency:'shield' }[name] || 'circle-dollar-sign';
}

function buildDynamicInsight(form, score, gap, categories, hiddenReserve) {
 const highRisk = categories.filter(c => c.risk === 'High').map(c => c.name);
 const priorityText = form.priorities?.length ? ` Protect ${form.priorities.join(', ')} while negotiating.` : '';
 if (score === 'Realistic') {
 return `Your ${formatINRFull(form.budget)} budget for a ${form.type} (${form.itinerary}) with ${form.guests} guests in ${form.city} is realistic for the selected services. Keep ${formatINRFull(hiddenReserve)} aside for GST, transport, overtime, and service charges.${priorityText}`;
 }
 if (score === 'Stretch') {
 return `Your ${formatINRFull(form.budget)} budget for a ${form.type} (${form.itinerary}) with ${form.guests} guests in ${form.city} can work, but it is tight. Watch ${highRisk.join(', ') || 'vendor add-ons'} first and keep ${formatINRFull(hiddenReserve)} for hidden charges.${priorityText}`;
 }
 return `Your ${formatINRFull(form.budget)} budget is short by about ${formatINRFull(Math.abs(gap))} for a ${form.type} (${form.itinerary}) with ${form.guests} guests in ${form.city}. Reduce guest count, simplify high-risk categories, or raise the budget before booking vendors.`;
}

function calculateVendorTrueCost(vendor, guests = State.form.guests || 150) {
 const baseCost = vendor.startingPrice * (vendor.priceUnit === 'per plate' ? guests : 1);
 const gst = baseCost * 0.18;
 const hiddenCost = vendor.type === 'Farmhouse' ? 45000 : (vendor.type === 'Hotel' ? baseCost * 0.10 : 0);
 return Math.round(baseCost + gst + hiddenCost);
}

function targetForVendor(vendor, plan) {
 const category = vendor.type === 'Hotel' || vendor.type === 'Farmhouse' ? 'Venue'
 : vendor.type === 'Decorator' ? 'Decoration'
 : vendor.type === 'Photographer' ? 'Photography'
 : vendor.type;
 return plan.categories.find(c => c.name === category)?.recommended || Math.round(plan.budget * 0.15);
}

function vendorFit(vendor, plan) {
 const trueCost = calculateVendorTrueCost(vendor, plan.guests);
 const target = targetForVendor(vendor, plan);
 const ratio = trueCost / Math.max(1, target);
 const ratingScore = Number(vendor.rating || 0) * 8;
 const budgetScore = ratio <= 1 ? 55 : Math.max(0, 55 - Math.round((ratio - 1) * 70));
 const score = Math.max(1, Math.min(100, Math.round(budgetScore + ratingScore)));
 const label = ratio <= 0.95 ? 'Good fit for your budget'
 : ratio <= 1.1 ? 'Possible fit - negotiate extras'
 : 'Over target - compare carefully';
 const color = ratio <= 0.95 ? 'green' : ratio <= 1.1 ? 'amber' : 'red';
 return { trueCost, target, score, label, color };
}

// """ VENDOR DIRECTORY """""""""""""""""""""""""""""""""""""""
let currentDirectoryTab = 'all';

function selectDirectoryTab(type, el) {
 currentDirectoryTab = type;
 document.querySelectorAll('#directory-tabs .tab').forEach(t => t.classList.remove('active'));
 el.classList.add('active');
 renderDirectory(type);
}

function renderDirectory(filterType = currentDirectoryTab) {
 const el = document.getElementById('directory-content');
 if (!el) return;
 const plan = buildBudgetPlan();
 const selectedCity = String(plan.city || '').toLowerCase();
 const vendors = EVENTRA.vendorProfiles
 .filter(v => filterType === 'all' || v.type === filterType)
 .filter(v => selectedCity === 'other' || String(v.location || '').toLowerCase().includes(selectedCity))
 .map(v => ({ ...v, fit: vendorFit(v, plan) }))
 .sort((a, b) => b.fit.score - a.fit.score);
 if (!vendors.length) {
 el.innerHTML = emptyState(`No verified ${filterType === 'all' ? 'vendors' : filterType.toLowerCase() + ' vendors'} found for ${plan.city} yet. Change the city to Mumbai to view the current verified sample vendors, or use the budget plan without vendor suggestions.`);
 return;
 }

 const iconByType = {
 Hotel: 'hotel',
 Farmhouse: 'trees',
 Photographer: 'camera',
 Decorator: 'flower-2'
 };
 const gradientTiles = ['tile-peach', 'tile-blue', 'tile-pink', 'tile-green', 'tile-violet', 'tile-amber'];
 const hiddenWarningByType = {
 Hotel: '+10% service charge not shown on listing',
 Farmhouse: 'Generator, security and cleanup billed separately',
 Photographer: 'Album and travel billed separately',
 Decorator: 'Teardown and floral wastage charged extra'
 };

 el.innerHTML = vendors.map((v, index) => {
 const trueCost = v.fit.trueCost;
 const icon = iconByType[v.type] || 'store';
 const tile = gradientTiles[index % gradientTiles.length];
 const locationLine = v.type === 'Photographer' || v.type === 'Decorator'
 ? `${v.type === 'Decorator' ? 'Decor' : v.type} - ${v.location}`
 : v.location;
 const hiddenWarning = hiddenWarningByType[v.type] || 'GST and event add-ons added at billing';

 return `
 <button class="vendor-card card-hover" onclick="navigateTo('quotes')">
 <div class="vendor-card-top">
 <span class="vendor-logo-tile ${tile}"><i data-lucide="${icon}"></i></span>
 <div class="vendor-title-block">
 <h3>${v.name}</h3>
 <div class="vendor-location"><i data-lucide="map-pin"></i> ${locationLine}</div>
 </div>
 <div class="vendor-rating">* ${v.rating}</div>
 </div>
 <div class="badge badge-${v.fit.color}" style="width:max-content">${v.fit.label}</div>
 <p class="vendor-description">${v.description}</p>
 <div class="vendor-price-row">
 <div>
 <div class="vendor-price">${formatINRFull(trueCost)}</div>
 <div class="vendor-price-caption">all-in for ${plan.guests} guests - target ${formatINRFull(v.fit.target)}</div>
 </div>
 </div>
 <div class="vendor-risk"><i data-lucide="triangle-alert"></i> ${hiddenWarning}</div>
 </button>
 `;
 }).join('');
 lucide.createIcons();
}
//  FEASIBILITY """"""""""""""""""""""""""""""""""""""""""""
function renderFeasibility() {
 const plan = buildBudgetPlan();
 const cats = plan.categories;
 const headerText = document.querySelector('#screen-feasibility .page-header p');
 if (headerText) headerText.textContent = `Is your ${formatINRFull(plan.budget)} budget realistic for a ${plan.type} in ${plan.city} with ${plan.guests} guests?`;
 const ring = document.getElementById('feas-ring');
 if (ring) {
 const circumference = 408.41;
 ring.style.strokeDashoffset = String(circumference - (circumference * plan.scorePercent / 100));
 ring.setAttribute('stroke', plan.score === 'Realistic' ? '#10B981' : plan.score === 'Stretch' ? '#F59E0B' : '#EF4444');
 }
 const ringLabel = document.querySelector('#screen-feasibility .feasibility-ring-label');
 if (ringLabel) {
 ringLabel.textContent = plan.score;
 ringLabel.style.color = plan.score === 'Realistic' ? 'var(--green)' : plan.score === 'Stretch' ? 'var(--amber)' : 'var(--red)';
 }
 const ringSub = document.querySelector('#screen-feasibility .feasibility-ring-sub');
 if (ringSub) ringSub.textContent = `Feasibility Score - ${plan.scorePercent}%`;
 const insight = document.querySelector('#screen-feasibility .ai-box-text');
 if (insight) insight.textContent = plan.insight;
 const catEl = document.getElementById('feas-categories');
 if (!catEl) return;
 catEl.innerHTML = cats.map(c => {
 const pct = c.percent;
 const riskBadge = c.risk === 'Locked'
 ? `<span class="badge badge-grey">Locked</span>`
 : c.risk === 'High'
 ? `<span class="badge badge-red">High Risk</span>`
 : c.risk === 'Low'
 ? `<span class="badge badge-green">Low Risk</span>`
 : `<span class="badge badge-amber">Medium Risk</span>`;
 const barColor = c.risk === 'Locked' ? 'var(--border-2)' : c.risk === 'High' ? 'var(--red)' : c.risk === 'Low' ? 'var(--green)' : 'var(--amber)';
 return `
 <div class="category-row">
 <div class="category-icon"><i data-lucide="${c.icon}"></i></div>
 <div class="category-name">${c.name}</div>
 <div class="category-bar-wrap">
 <div class="category-bar-bg">
 <div class="category-bar-fill" style="width:${Math.min(100, pct)}%;background:${barColor}"></div>
 </div>
 </div>
 <div class="category-amount">${formatINRFull(c.recommended)}</div>
 <div class="category-pct">${pct}%</div>
 <div>${riskBadge}</div>
 </div>
 `;
 }).join('');

 const summaryRows = document.querySelectorAll('#screen-feasibility .card.mb-4[style*="primary-lt"] .font-bold');
 if (summaryRows[0]) summaryRows[0].textContent = formatINRFull(plan.budget);
 if (summaryRows[1]) summaryRows[1].textContent = formatINRFull(plan.estimatedMinCost);
 if (summaryRows[2]) {
 summaryRows[2].textContent = plan.gap >= 0 ? `${formatINRFull(plan.gap)} under budget` : `-${formatINRFull(Math.abs(plan.gap))}`;
 summaryRows[2].style.color = plan.gap >= 0 ? 'var(--green)' : 'var(--red)';
 }
 if (summaryRows[3]) summaryRows[3].textContent = formatINRFull(plan.contingency);
 const progress = document.querySelector('#screen-feasibility .progress-wrap .progress-bar');
 if (progress) {
 progress.style.width = `${Math.min(100, Math.round(plan.estimatedMinCost / plan.budget * 100))}%`;
 progress.className = `progress-bar ${plan.score === 'Realistic' ? 'progress-green' : plan.score === 'Stretch' ? 'progress-amber' : 'progress-red'}`;
 }
 const summaryScale = document.querySelectorAll('#screen-feasibility .flex.justify-between.mt-1 .text-xs');
 if (summaryScale[1]) summaryScale[1].textContent = formatINRFull(plan.budget);
 const meaningTitle = document.querySelector('#screen-feasibility .card-amber .font-semibold');
 if (meaningTitle) meaningTitle.textContent = `What "${plan.score}" means`;
 const meaningText = document.querySelector('#screen-feasibility .card-amber p');
 if (meaningText) {
 meaningText.textContent = plan.score === 'Realistic'
 ? 'Your plan has room to choose dependable vendors. Keep contingency locked and confirm GST, transport, overtime, and service charges in writing.'
 : plan.score === 'Stretch'
 ? 'Your plan can work, but one premium vendor or hidden charge can push it over budget. Shortlist vendors that fit the category targets before paying advances.'
 : 'Your plan is likely over budget. Simplify high-risk categories, reduce guest count, or increase budget before booking vendors.';
 }

 const bm = document.getElementById('feas-benchmarks');
 if (bm) {
 const title = bm.closest('.card')?.querySelector('h4');
 if (title) title.textContent = `Market Benchmarks - ${plan.city}`;
 const ranges = cats.filter(c => c.name !== 'Contingency').map(c => ({
 name: c.name,
 range: `${formatINRFull(Math.round(c.recommended * 0.9))}-${formatINRFull(Math.round(c.recommended * 1.25))}`,
 budget: formatINRFull(c.allocation)
 }));
 bm.innerHTML = ranges.map(r => `
 <div class="flex justify-between items-center py-1 border-b" style="border-color:var(--border)">
 <span style="color:var(--text-2)">${r.name}</span>
 <div class="flex gap-3">
 <span class="text-muted text-xs">Market: ${r.range}</span>
 <span class="font-semibold text-xs" style="color:var(--primary)">Allocation: ${r.budget}</span>
 </div>
 </div>
 `).join('');
 }
 lucide.createIcons();
}

// """ QUOTE ANALYSIS """""""""""""""""""""""""""""""""""""""""
function selectQuoteTab(cat, el) {
 State.activeQuoteTab = cat;
 document.querySelectorAll('#quote-tabs .tab').forEach(t => t.classList.remove('active'));
 el.classList.add('active');
 renderQuotes(cat);
 lucide.createIcons();
}

function renderQuotes(cat) {
 const el = document.getElementById('quote-content');
 if (!el) return;
 const plan = buildBudgetPlan();
 const category = quoteCategoryFromTab(cat);
 const vendors = getComparisonVendors(category, plan);
 if (!vendors.length) { el.innerHTML = emptyState(`No ${category.toLowerCase()} quote samples available for ${plan.city} yet.`); return; }
 el.innerHTML = vendors.map(v => renderQuoteCard(v, plan)).join('');
 lucide.createIcons();
}

function quoteCategoryFromTab(cat) {
 return { photography:'Photography', venue:'Venue', catering:'Catering', decoration:'Decoration' }[cat] || cat;
}

function vendorTypeIcon(type, category) {
 const key = type || category;
 return { Hotel:'hotel', Farmhouse:'trees', Photographer:'camera', Decorator:'flower-2', Catering:'utensils', Venue:'building-2', Photography:'camera', Decoration:'sparkles' }[key] || 'store';
}

function renderQuoteCard(v, plan) {
 const included = v.included.map(i => `<div class="quote-status quote-status-good"><i data-lucide="check-circle-2"></i><span>${i}</span></div>`).join('');
 const missing = v.excluded.map(i => `<div class="quote-status quote-status-warn"><i data-lucide="alert-triangle"></i><span>${i}</span></div>`).join('');
 const confColor = { High:'green', Medium:'amber', Low:'red' }[v.confidence] || 'grey';
 const icon = vendorTypeIcon(v.profile?.type, v.category);
 const marketMin = Math.round(v.fit.target * 0.9);
 const marketMax = Math.round(v.fit.target * 1.25);
 const hiddenMin = Math.max(0, v.estimatedFinalMin - v.quotedPrice);
 const hiddenMax = Math.max(hiddenMin, v.estimatedFinalMax - v.quotedPrice);
 return `
 <div class="card mb-4">
 <div class="flex justify-between items-start mb-4">
 <div>
 <div class="flex items-center gap-2 mb-1">
 <span class="vendor-logo-tile tile-blue" style="width:38px;height:38px"><i data-lucide="${icon}"></i></span>
 <div>
 <h3 class="font-bold text-lg">${v.name}</h3>
 <span class="text-muted text-sm">${v.location} - ${plan.guests} guests</span>
 </div>
 </div>
 </div>
 <div class="flex gap-2 flex-wrap">
 <span class="badge badge-${v.badgeColor === 'violet' ? 'violet' : v.badgeColor === 'green' ? 'green' : v.badgeColor === 'red' ? 'red' : 'amber'}">${v.badge}</span>
 <span class="badge badge-${confColor}">Confidence: ${v.confidence}</span>
 </div>
 </div>

 <!-- Pricing -->
 <div class="grid-3 gap-4 mb-5">
 <div class="card card-flat" style="text-align:center">
 <div class="text-muted text-xs mb-1">Listed Price</div>
 <div style="font-size:1.3rem;font-weight:700;color:var(--text-3);text-decoration:line-through">${formatINRFull(v.listedPrice)}</div>
 </div>
 <div class="card card-flat" style="text-align:center">
 <div class="text-muted text-xs mb-1">Quoted Price</div>
 <div style="font-size:1.3rem;font-weight:700">${formatINRFull(v.quotedPrice)}</div>
 </div>
 <div class="card" style="text-align:center;background:var(--amber-lt);border-color:rgba(245,158,11,.2)">
 <div class="text-xs font-semibold mb-1" style="color:#92400E">Est. Final Cost</div>
 <div style="font-size:1.1rem;font-weight:800;color:#92400E">${formatINRFull(v.estimatedFinalMin)}-${formatINRFull(v.estimatedFinalMax)}</div>
 </div>
 </div>

 <!-- Included vs Missing -->
 <div class="grid-2 gap-4 mb-4">
 <div>
 <div class="font-semibold text-sm mb-2" style="color:var(--green)">Included in Quote</div>
 ${included}
 </div>
 <div>
 <div class="font-semibold text-sm mb-2" style="color:var(--amber)">Likely Missing</div>
 ${missing}
 <div class="mt-2 text-sm" style="color:var(--red);font-weight:600">Hidden estimate: ${formatINRFull(hiddenMin)}-${formatINRFull(hiddenMax)}</div>
 </div>
 </div>

 <!-- AI Review -->
 <div class="ai-box mb-4">
 <div class="ai-box-icon">Warning</div>
 <div>
 <div class="ai-box-label">Biggest Risk</div>
 <div class="ai-box-text">${v.risks[0]}</div>
 </div>
 </div>

 <!-- Benchmark -->
 <div style="background:var(--surface-2);border-radius:var(--radius);padding:12px 14px;font-size:.82rem;margin-bottom:16px">
 <span class="text-secondary">Market range for ${v.category} in ${plan.city}: </span>
 <span class="font-semibold">${formatINRFull(marketMin)}-${formatINRFull(marketMax)}</span>
 <span class="badge badge-${v.fit.color} ml-auto" style="float:right">${v.fit.label}</span>
 </div>

 <button class="btn btn-primary btn-sm" onclick="navigateTo('vendors')">Add to Comparison</button>
 </div>
 `;
}

// """ VENDOR COMPARISON """"""""""""""""""""""""""""""""""""""
function selectVendorTab(cat, el) {
 State.activeVendorTab = cat;
 document.querySelectorAll('#vendor-tabs .tab').forEach(t => t.classList.remove('active'));
 el.classList.add('active');
 renderVendors(cat);
 lucide.createIcons();
}

function renderVendors(cat) {
 const el = document.getElementById('vendor-content');
 if (!el) return;
 const plan = buildBudgetPlan();
 updateVendorTabLabels(plan);
 const vendors = getComparisonVendors(cat, plan);
 if (!vendors.length) { el.innerHTML = emptyState(`No ${cat.toLowerCase()} vendors available for ${plan.city} yet.`); return; }

 if (vendors.length === 1) {
 el.innerHTML = `
 <div class="card mb-4">
 ${renderVendorSingle(vendors[0], plan)}
 </div>
 <div class="card card-primary">
 <div class="flex items-center gap-2">
 <i data-lucide="info" style="width:16px;color:var(--primary)"></i>
 <span class="text-sm font-semibold">Only 1 verified ${cat.toLowerCase()} vendor for ${plan.city}</span>
 </div>
 <p class="text-sm text-secondary mt-2">Comparison is still calculated from your guest count, city, and budget target. More vendors can be added later.</p>
 </div>
 `;
 lucide.createIcons();
 return;
 }

 el.innerHTML = renderComparisonTable(vendors, plan);
 lucide.createIcons();
}

function updateVendorTabLabels(plan) {
 document.querySelectorAll('#vendor-tabs .tab').forEach(tab => {
 const match = tab.getAttribute('onclick')?.match(/'([^']+)'/);
 const cat = match?.[1];
 if (!cat) return;
 const count = getComparisonVendors(cat, plan).length;
 tab.textContent = `${cat} (${count})`;
 });
}

function getComparisonVendors(category, plan) {
 const selectedCity = String(plan.city || '').toLowerCase();
 const cityMatches = v => selectedCity === 'other' || String(v.location || '').toLowerCase().includes(selectedCity);
 const typeMatches = v => {
 if (category === 'Venue') return v.type === 'Hotel' || v.type === 'Farmhouse';
 if (category === 'Photography') return v.type === 'Photographer';
 if (category === 'Decoration') return v.type === 'Decorator';
 if (category === 'Catering') return v.type === 'Catering';
 return false;
 };
 const profileVendors = EVENTRA.vendorProfiles
 .filter(v => typeMatches(v) && cityMatches(v))
 .map(v => normalizeProfileVendor(v, category, plan));
 const fallback = category === 'Catering' ? buildCateringComparisons(plan) : [];
 return (profileVendors.length ? profileVendors : fallback)
 .map(v => ({ ...v, fit: vendorFit(v.profile, plan) }))
 .sort((a, b) => b.fit.score - a.fit.score);
}

function normalizeProfileVendor(v, category, plan) {
 const trueCost = calculateVendorTrueCost(v, plan.guests);
 const target = targetForVendor(v, plan);
 const ratio = trueCost / Math.max(1, target);
 const included = defaultIncludedForType(v.type);
 const excluded = defaultMissingForType(v.type);
 return {
 id: v.id,
 name: v.name,
 category,
 location: v.location,
 rating: v.rating,
 reviews: v.reviews,
 listedPrice: v.startingPrice,
 quotedPrice: v.priceUnit === 'per plate' ? v.startingPrice * plan.guests : v.startingPrice,
 estimatedFinalMin: trueCost,
 estimatedFinalMax: Math.round(trueCost * 1.12),
 matchScore: Math.max(1, Math.min(100, Math.round((Number(v.rating || 0) * 9) + (ratio <= 1 ? 45 : Math.max(5, 45 - (ratio - 1) * 45))))),
 badge: ratio <= 1 ? 'Best Fit' : ratio <= 1.15 ? 'Negotiate Extras' : 'Over Target',
 badgeColor: ratio <= 1 ? 'green' : ratio <= 1.15 ? 'amber' : 'red',
 availability: true,
 responseTime: 'Verify before booking',
 included,
 excluded,
 whyRecommended: `${v.name} is compared against your ${plan.city} ${category.toLowerCase()} target of ${formatINRFull(target)} for ${plan.guests} guests. Estimated all-in cost is ${formatINRFull(trueCost)}.`,
 risks: excluded.map(item => `${item} must be confirmed in writing before paying advance`),
 questions: vendorQuestionsForType(v.type, plan),
 confidence: ratio <= 1 ? 'High' : ratio <= 1.15 ? 'Medium' : 'Low',
 profile: v
 };
}

function buildCateringComparisons(plan) {
 const cityRate = { Mumbai:1400, Delhi:1500, Bangalore:1350, Hyderabad:1150, Chennai:1100, Pune:1200, Other:1150 }[plan.city] || 1200;
 const names = {
 Mumbai:['FeastCraft Catering','Urban Rasoi Events','Royal Platter Co.'],
 Delhi:['Delhi Zaika Caterers','Royal Rasoi NCR','Saffron Plate Delhi'],
 Bangalore:['Bengaluru Feast Co.','Namma Caterers','Urban Thali Bangalore'],
 Hyderabad:['Deccan Feast Caterers','Hyderabad Royal Kitchen','Pearl City Caterers'],
 Chennai:['Chennai Virundhu Caterers','Madras Menu Co.','South Feast Chennai'],
 Pune:['Pune Platter Co.','Saffron Pune Caterers','Banquet Bites Pune'],
 Other:['Regional Caterer A','Regional Caterer B','Regional Caterer C']
 }[plan.city] || ['Regional Caterer A','Regional Caterer B','Regional Caterer C'];
 return names.map((name, index) => {
 const rate = Math.round(cityRate * (0.9 + index * 0.12));
 const profile = { id:`cat-${plan.city}-${index}`, type:'Catering', name, location:plan.city, rating:4.2 + index * 0.15, reviews:120 + index * 55, startingPrice:rate, priceUnit:'per plate', description:'Catering comparison generated from selected city and guest count.' };
 return normalizeProfileVendor(profile, 'Catering', plan);
 });
}

function defaultIncludedForType(type) {
 if (type === 'Catering') return ['Core menu package','Serving staff estimate','Basic crockery'];
 if (type === 'Photographer') return ['Event coverage','Edited digital photos','Online delivery'];
 if (type === 'Decorator') return ['Core stage setup','Basic floral/decor elements','Installation planning'];
 return ['Venue space','Basic seating/furniture','Standard event support'];
}

function defaultMissingForType(type) {
 if (type === 'Catering') return ['GST','Vendor meals','Extra plates','Transport','Overtime'];
 if (type === 'Photographer') return ['GST','Travel','Album','Drone','Overtime'];
 if (type === 'Decorator') return ['GST','Transport','Setup labour','Teardown','Extra flowers'];
 return ['GST','Service charge','Security deposit','Outside vendor fee','Extra hours'];
}

function vendorQuestionsForType(type, plan) {
 const base = {
 Catering: [`Is GST included in the per-plate rate for ${plan.guests} guests?`, 'Are vendor meals and transport included?', 'What is the extra plate cost if guest count increases?'],
 Photographer: ['Is GST included in the package?', `Is travel within ${plan.city} included?`, 'What is the overtime rate after contracted hours?'],
 Decorator: ['Is setup labour included?', 'Is teardown included after the event?', `Is transport within ${plan.city} included?`],
 Hotel: ['Is GST and service charge included?', 'Is security deposit refundable?', 'Are outside vendors allowed and charged separately?'],
 Farmhouse: ['Is generator, security, and cleanup included?', 'What is the overtime charge?', 'Are outside vendors allowed?']
 };
 return base[type] || base.Hotel;
}

function renderVendorSingle(v, plan) {
 const scoreClass = v.matchScore >= 75 ? 'score-green' : v.matchScore >= 60 ? 'score-amber' : 'score-red';
 const icon = vendorTypeIcon(v.profile?.type, v.category);
 return `
 <div class="flex items-center justify-between mb-4">
 <div class="flex items-center gap-3">
 <span class="vendor-logo-tile tile-blue" style="width:42px;height:42px"><i data-lucide="${icon}"></i></span>
 <div>
 <h3 class="font-bold">${v.name}</h3>
 <span class="text-muted text-sm">${v.location}</span>
 </div>
 </div>
 <div class="text-center">
 <div class="match-score-circle ${scoreClass}">${v.matchScore}</div>
 <div class="text-xs text-muted">Match Score</div>
 </div>
 </div>
 <div class="grid-3 gap-3 mb-4">
 <div class="card-flat border rounded" style="padding:12px;text-align:center">
 <div class="text-muted text-xs">Listed</div>
 <div class="font-bold" style="text-decoration:line-through;color:var(--text-3)">${formatINRFull(v.listedPrice)}</div>
 </div>
 <div class="card-flat border rounded" style="padding:12px;text-align:center">
 <div class="text-muted text-xs">Quoted</div>
 <div class="font-bold">${formatINRFull(v.quotedPrice)}</div>
 </div>
 <div style="background:var(--amber-lt);padding:12px;border-radius:var(--radius);text-align:center">
 <div class="text-xs font-semibold" style="color:#92400E">Est. Final</div>
 <div class="font-bold" style="color:#92400E;font-size:.9rem">${formatINRFull(v.estimatedFinalMin)}-${formatINRFull(v.estimatedFinalMax)}</div>
 </div>
 </div>
 <div class="badge badge-${v.badgeColor === 'violet' ? 'violet' : v.badgeColor === 'green' ? 'green' : v.badgeColor === 'red' ? 'red' : 'amber'} mb-3">${v.badge}</div>
 <div class="ai-box mb-3">
 <div class="ai-box-icon">Info</div>
 <div><div class="ai-box-label">Why Recommended</div><div class="ai-box-text">${v.whyRecommended}</div></div>
 </div>
 ${renderQuestionBlock(v)}
 `;
}

function renderComparisonTable(vendors, plan) {
 const scoreClass = s => s >= 75 ? 'score-green' : s >= 60 ? 'score-amber' : 'score-red';
 const badgeClass = b => ({ green:'badge-green', amber:'badge-amber', red:'badge-red', violet:'badge-violet' }[b] || 'badge-grey');
 const avail = v => v.availability ? `<span class="badge badge-green">Available to verify</span>` : `<span class="badge badge-red">Unconfirmed</span>`;
 const status = v => v ? `<i data-lucide="check-circle-2" class="comparison-icon good"></i>` : `<i data-lucide="x-circle" class="comparison-icon bad"></i>`;

 const rows = [
 { label:'Match Score', render: v => `<div class="match-score-circle ${scoreClass(v.matchScore)}" style="margin:0 auto">${v.matchScore}</div>` },
 { label:'Badge', render: v => `<span class="badge ${badgeClass(v.badgeColor)}">${v.badge}</span>` },
 { label:`Target for ${plan.guests} guests`, render: v => `<b>${formatINRFull(v.fit.target)}</b>` },
 { label:'Listed/Base Price', render: v => `<span style="color:var(--text-3)">${formatINRFull(v.listedPrice)}</span>` },
 { label:'Working Quote', render: v => `<b>${formatINRFull(v.quotedPrice)}</b>` },
 { label:'Est. Final Cost', render: v => `<b style="color:var(--amber)">${formatINRFull(v.estimatedFinalMin)}-${formatINRFull(v.estimatedFinalMax)}</b>` },
 { label:'Availability', render: v => avail(v) },
 { label:'Response Time', render: v => `<span class="text-sm">${v.responseTime}</span>` },
 { label:'GST Clear', render: v => status(v.included.some(i => i.toLowerCase().includes('gst'))) },
 { label:'Key Add-ons Clear', render: v => status(v.excluded.length <= 2) },
 { label:'Confidence', render: v => `<span class="badge badge-${v.confidence==='High'?'green':v.confidence==='Medium'?'amber':'red'}">${v.confidence}</span>` },
 ];

 const headers = vendors.map(v => `
 <th class="vendor-col-header">
 <div class="vendor-logo-tile tile-blue" style="width:36px;height:36px;margin:0 auto 6px"><i data-lucide="${vendorTypeIcon(v.profile?.type, v.category)}"></i></div>
 <div class="vendor-name-wrap">${v.name}</div>
 <div class="text-muted text-xs">${v.location}</div>
 </th>
 `).join('');

 const tableRows = rows.map(row => `
 <tr>
 <td style="font-weight:600;font-size:.82rem;color:var(--text-2)">${row.label}</td>
 ${vendors.map(v => `<td style="text-align:center">${row.render(v)}</td>`).join('')}
 </tr>
 `).join('');

 // Accordion detail per vendor
 const details = vendors.map(v => `
 <div class="accordion">
 <div class="accordion-header" onclick="toggleAccordion(this)">
 <div class="accordion-header-left">
 <span class="vendor-logo-tile tile-blue" style="width:32px;height:32px"><i data-lucide="${vendorTypeIcon(v.profile?.type, v.category)}"></i></span>
 <div>
 <div class="accordion-title">${v.name} - Details</div>
 <div class="accordion-meta">Why recommended - Risks - Questions to ask</div>
 </div>
 </div>
 <i data-lucide="chevron-down" class="accordion-chevron"></i>
 </div>
 <div class="accordion-body" style="padding:20px">
 <div class="grid-2 gap-4 mb-4">
 <div>
 <div class="font-semibold text-sm mb-2" style="color:var(--green)">Why Recommended</div>
 <p class="text-sm text-secondary">${v.whyRecommended}</p>
 </div>
 <div>
 <div class="font-semibold text-sm mb-2" style="color:var(--red)">Warning Possible Risks</div>
 <ul style="list-style:none;padding:0">${v.risks.map(r => `<li class="text-sm text-secondary py-1">- ${r}</li>`).join('')}</ul>
 </div>
 </div>
 ${renderQuestionBlock(v)}
 </div>
 </div>
 `).join('');

 return `
 <div class="table-wrap mb-5">
 <table class="comparison-table">
 <thead><tr><th>Criteria</th>${headers}</tr></thead>
 <tbody>${tableRows}</tbody>
 </table>
 </div>
 <h3 class="font-semibold mb-3">Vendor Details & Questions</h3>
 ${details}
 `;
}

function renderQuestionBlock(v) {
 return `
 <div style="background:var(--surface-2);border-radius:var(--radius);padding:16px">
 <div class="font-semibold text-sm mb-3">Questions to Ask Before Booking</div>
 <ul class="q-list">
 ${v.questions.map((q,i) => `
 <li class="q-item">
 <div class="q-num">${i+1}</div>
 <div class="q-text">${q}</div>
 </li>
 `).join('')}
 </ul>
 <button class="btn btn-green btn-sm mt-3" onclick="copyToWhatsApp(${JSON.stringify(v.questions.join('\n'))}, '${v.name}')">
 <i data-lucide="message-circle" style="width:14px"></i> Copy as WhatsApp Message
 </button>
 </div>
 `;
}

// """ HIDDEN COSTS """"""""""""""""""""""""""""""""""""""""""""
function renderHiddenCosts() {
 const el = document.getElementById('hc-accordions');
 if (!el) return;
 el.innerHTML = EVENTRA.hiddenCosts.categories.map(cat => {
 const rows = cat.items.map(item => {
 const riskBadge = item.risk === 'High'
 ? `<span class="badge badge-red">High Risk</span>`
 : item.risk === 'Medium'
 ? `<span class="badge badge-amber">Medium Risk</span>`
 : `<span class="badge badge-grey">Low Risk</span>`;
 const statusIcon = item.status === 'confirmed'
 ? `<span style="color:var(--green);font-size:1.1rem">OK</span>`
 : item.status === 'not-applicable'
 ? `<span class="text-muted text-xs">N/A</span>`
 : `<span style="color:var(--amber);font-size:1.1rem">Warning</span>`;
 const rowStyle = item.status === 'confirmed' ? 'background:rgba(16,185,129,0.04)' : '';
 return `
 <div class="hc-row" style="${rowStyle}">
 <div class="hc-row-left">
 ${statusIcon}
 <span class="hc-row-name">${item.name}</span>
 </div>
 <div class="flex items-center gap-3">
 ${riskBadge}
 <span class="hc-row-amount">${item.amount}</span>
 </div>
 </div>
 `;
 }).join('');

 return `
 <div class="accordion">
 <div class="accordion-header" onclick="toggleAccordion(this)">
 <div class="accordion-header-left">
 <div style="width:36px;height:36px;border-radius:9px;background:var(--amber-lt);display:flex;align-items:center;justify-content:center">
 <i data-lucide="${cat.icon}" style="width:16px;color:var(--amber)"></i>
 </div>
 <div>
 <div class="accordion-title">${cat.name}</div>
 <div class="accordion-meta">${cat.riskCount} potential risks - Rs.${cat.rangeMin.toLocaleString('en-IN')}-Rs.${cat.rangeMax.toLocaleString('en-IN')}</div>
 </div>
 </div>
 <i data-lucide="chevron-down" class="accordion-chevron"></i>
 </div>
 <div class="accordion-body">${rows}</div>
 </div>
 `;
 }).join('');
}

// """ DASHBOARD """""""""""""""""""""""""""""""""""""""""""""""
function renderDashboard() {
 const d = EVENTRA.dashboard;
 const plan = buildBudgetPlan();
 const committed = 0;
 const gapText = plan.gap >= 0 ? `${formatINRFull(plan.gap)} under budget` : `${formatINRFull(Math.abs(plan.gap))} over budget`;

 // Stat cards
 const statsEl = document.getElementById('dashboard-stats');
 if (statsEl) statsEl.innerHTML = [
 { label:'Total Budget', value: formatINRFull(plan.budget), sub:'Your ceiling', icon:'wallet', iconClass:'icon-primary' },
 { label:'Committed So Far', value: formatINRFull(committed), sub:'No confirmed vendors yet', icon:'check-circle', iconClass:'icon-green' },
 { label:'Est. Final Cost', value: formatINRFull(plan.estimatedMinCost), sub:gapText, icon:'trending-up', iconClass:plan.gap >= 0 ? 'icon-green' : 'icon-red', valueColor:plan.gap >= 0 ? 'var(--green)' : 'var(--red)' },
 { label:'Contingency', value: formatINRFull(plan.contingency), sub:'10% reserve - keep locked', icon:'shield', iconClass:'icon-amber' },
 { label:'Services Selected', value: plan.services.length, sub:plan.services.join(', '), icon:'users', iconClass:'icon-primary' },
 { label:'Hidden Cost Warnings', value: d.hiddenCostWarnings, sub:`${d.totalFlagged || 12} flagged, ${d.totalConfirmed||3} confirmed`, icon:'eye-off', iconClass:'icon-amber' },
 { label:'Pending Decisions', value: d.pendingDecisions, sub:'Require action this week', icon:'clock', iconClass:'icon-red' },
 { label:'Event Date', value: plan.date || 'Not set', sub:`${plan.guests} guests in ${plan.city}`, icon:'calendar', iconClass:'icon-primary' },
 ].map(s => `
 <div class="stat-card">
 <div class="stat-card-icon ${s.iconClass}"><i data-lucide="${s.icon}"></i></div>
 <div class="stat-card-label">${s.label}</div>
 <div class="stat-card-value" style="${s.valueColor?'color:'+s.valueColor:''}">${s.value}</div>
 <div class="stat-card-sub">${s.sub}</div>
 </div>
 `).join('');

 // Next best decision
 const nbd = d.nextBestDecision;
 const nbdTitle = document.getElementById('nbd-title');
 const nbdDesc = document.getElementById('nbd-desc');
 const nbdDL = document.getElementById('nbd-deadline');
 if (nbdTitle) nbdTitle.textContent = nbd.title;
 if (nbdDesc) nbdDesc.textContent = nbd.description;
 if (nbdDL) nbdDL.textContent = nbd.deadline;

 // Recent changes
 const rcEl = document.getElementById('recent-changes');
 if (rcEl) rcEl.innerHTML = d.recentChanges.map(c => `
 <div class="flex items-center gap-3 py-2 border-b" style="border-color:var(--border)">
 <span class="badge ${c.type==='warning'?'badge-amber':'badge-grey'}" style="flex-shrink:0">${c.date}</span>
 <span class="text-sm text-secondary">${c.description}</span>
 </div>
 `).join('');

 // Category spend
 const csEl = document.getElementById('category-spend-rows');
 if (csEl) csEl.innerHTML = plan.categories.map(c => {
 const pct = c.allocation > 0 ? Math.round(c.recommended/c.allocation*100) : 0;
 const color = c.risk === 'High' ? '#EF4444' : c.risk === 'Medium' ? '#F59E0B' : c.risk === 'Locked' ? '#94A3B8' : '#10B981';
 return `
 <div class="flex items-center gap-3 py-3 border-b" style="border-color:var(--border)">
 <div style="width:12px;height:12px;border-radius:3px;background:${color};flex-shrink:0"></div>
 <span class="font-semibold text-sm" style="min-width:110px">${c.name}</span>
 <div style="flex:1">
 <div class="progress-wrap">
 <div class="progress-bar" style="width:${Math.min(100, pct)}%;background:${color}"></div>
 </div>
 </div>
 <span class="text-sm font-bold" style="min-width:90px;text-align:right">${formatINRFull(c.recommended)}</span>
 <span class="text-muted text-xs" style="min-width:80px;text-align:right">target ${formatINRFull(c.allocation)}</span>
 <span class="badge badge-grey text-xs" style="min-width:45px;text-align:center">${pct}%</span>
 </div>
 `;
 }).join('');

 // Payment schedule
 const pEl = document.getElementById('payment-tbody');
 if (pEl) pEl.innerHTML = d.payments.map(p => {
 const statusClass = p.status === 'pending' ? 'payment-status-pending' : p.status === 'future' ? 'payment-status-future' : 'payment-status-paid';
 const statusLabel = p.status === 'pending' ? ' Due Soon' : p.status === 'future' ? 'Upcoming' : 'OK Paid';
 return `
 <tr>
 <td class="font-medium">${p.vendor}</td>
 <td class="text-secondary">${p.type}</td>
 <td class="font-bold td-num">${formatINRFull(p.amount)}</td>
 <td class="text-secondary">${p.dueDate}</td>
 <td class="${statusClass}">${statusLabel}</td>
 </tr>
 `;
 }).join('');

 // Chart.js
 renderBudgetChart();
}

function renderBudgetChart() {
 const canvas = document.getElementById('budget-chart');
 if (!canvas) return;
 if (State.chartInstance) { State.chartInstance.destroy(); State.chartInstance = null; }
 const plan = buildBudgetPlan();
 const data = plan.categories;
 const colors = data.map(c => c.risk === 'High' ? '#EF4444' : c.risk === 'Medium' ? '#F59E0B' : c.risk === 'Locked' ? '#94A3B8' : '#10B981');
 State.chartInstance = new Chart(canvas, {
 type: 'doughnut',
 data: {
 labels: data.map(d => d.name),
 datasets: [{
 data: data.map(d => d.recommended),
 backgroundColor: colors,
 borderWidth: 2,
 borderColor: '#fff',
 hoverOffset: 8,
 }]
 },
 options: {
 cutout: '68%',
 plugins: {
 legend: { position:'bottom', labels:{ padding:14, font:{ size:12, family:'Inter' } } },
 tooltip: {
 callbacks: {
 label: ctx => ` ${ctx.label}: ${formatINRFull(ctx.parsed)} (${Math.round(ctx.parsed/plan.budget*100)}%)`
 }
 }
 }
 }
 });
}

// """ SIMULATOR """"""""""""""""""""""""""""""""""""""""""""""
function renderSimulator() {
 // Already static in HTML, just ensure lucide icons
}

function updateSimulatorInput() {
 const type = document.getElementById('sim-type')?.value;
 const label = document.getElementById('sim-input-label');
 const input = document.getElementById('sim-value');
 if (!label || !input) return;
 const map = {
 'guests': { label:'New Guest Count', val:180 },
 'budget': { label:'New Total Budget (Rs.)', val:750000 },
 'function': { label:'Number of Functions', val:2 },
 'vendor-price': { label:'New Vendor Price (Rs.)', val:90000 },
 'upgrade': { label:'Upgrade Amount (Rs.)', val:25000 },
 };
 const m = map[type] || map['guests'];
 label.textContent = m.label;
 input.value = m.val;
}

function runSimulation() {
 const type = document.getElementById('sim-type')?.value;
 const value = parseInt(document.getElementById('sim-value')?.value || '180');
 const d = EVENTRA.simulator.guestImpact;

 const resultsEl = document.getElementById('sim-results');
 const recoveryEl = document.getElementById('recovery-section');
 const titleEl = document.getElementById('sim-results-title');
 const deltaEl = document.getElementById('sim-total-delta');
 const tbodyEl = document.getElementById('sim-tbody');
 const beforeTotalEl = document.getElementById('sim-before-total');
 const afterTotalEl = document.getElementById('sim-after-total');
 const deltaTotalEl = document.getElementById('sim-delta-total');
 if (!resultsEl) return;

 // Use built-in guest impact data for guest type
 if (type === 'guests') {
 titleEl.textContent = `Impact of Adding ${value - 150} Guests (150 to ${value})`;
 const scaleFactor = (value - 150) / 30;
 const rows = d.rows.map(r => ({
 ...r,
 after: r.affected ? r.before + Math.round(r.delta * scaleFactor) : r.before,
 delta: r.affected ? Math.round(r.delta * scaleFactor) : 0,
 }));
 const totalDelta = rows.reduce((sum, r) => sum + r.delta, 0);
 const totalAfter = d.totalBefore + totalDelta;

 deltaEl.textContent = '+Rs.' + totalDelta.toLocaleString('en-IN');
 tbodyEl.innerHTML = rows.map(r => `
 <tr class="${r.affected ? 'sim-row-affected' : ''}">
 <td class="font-medium">${r.name}</td>
 <td class="td-num">${formatINRFull(r.before)}</td>
 <td class="td-num font-semibold">${formatINRFull(r.after)}</td>
 <td class="${r.delta > 0 ? 'sim-delta-up' : 'sim-delta-zero'}">
 ${r.delta > 0 ? '+Rs.' + r.delta.toLocaleString('en-IN') : '-'}
 </td>
 </tr>
 `).join('');

 beforeTotalEl.textContent = formatINRFull(d.totalBefore);
 afterTotalEl.textContent = formatINRFull(totalAfter);
 deltaTotalEl.textContent = '+Rs.' + totalDelta.toLocaleString('en-IN');

 resultsEl.style.display = 'block';
 renderRecoveryOptions(totalDelta);
 recoveryEl.style.display = 'block';
 } else {
 titleEl.textContent = 'Simulated Impact';
 deltaEl.textContent = '+Rs.40,000 (estimated)';
 tbodyEl.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--text-3)">Sample simulation - use Guest Count for full calculation</td></tr>`;
 beforeTotalEl.textContent = 'Rs.8,00,000';
 afterTotalEl.textContent = 'Rs.8,40,000';
 deltaTotalEl.textContent = '+Rs.40,000';
 resultsEl.style.display = 'block';
 renderRecoveryOptions(40000);
 recoveryEl.style.display = 'block';
 }

 lucide.createIcons();
}

function renderRecoveryOptions(totalDelta) {
 const el = document.getElementById('recovery-cards');
 if (!el) return;
 el.innerHTML = EVENTRA.simulator.recoveryOptions.map(r => {
 const stars = Array(5).fill(0).map((_,i) => `<span style="color:${i<r.stars?'var(--amber)':'var(--border-2)'}">*</span>`).join('');
 const usesContingency = r.usesContingency ? `
 <div class="badge badge-red mb-2">Warning Uses Rs.${r.usesContingency.toLocaleString('en-IN')} of contingency</div>
 <div class="text-xs text-secondary mb-2">Only Rs.${r.contingencyRemaining.toLocaleString('en-IN')} remaining as buffer</div>
 ` : '';
 return `
 <div class="recovery-card">
 <div class="flex justify-between items-start mb-2">
 <h4 class="font-bold text-sm">${r.title}</h4>
 <span class="badge badge-${r.riskColor==='green'?'green':r.riskColor==='red'?'red':'amber'}">${r.risk} Risk</span>
 </div>
 ${r.saving > 0 ? `<div class="recovery-saving">-Rs.${r.saving.toLocaleString('en-IN')}</div>` : usesContingency}
 <div class="recovery-action">${r.action}</div>
 <div class="recovery-meta">
 <span class="text-muted text-xs">Experience Impact: ${r.experienceImpact}</span>
 <span class="text-sm">${stars}</span>
 </div>
 <button class="btn btn-outline btn-sm btn-full" onclick="showToast('Recovery scenario previewed - no changes applied')">Preview This Recovery</button>
 </div>
 `;
 }).join('');
}

// """ TRADE-OFF ADVISOR """""""""""""""""""""""""""""""""""""""
function renderTradeoff() {
 const plan = buildBudgetPlan();
 const protectedPriorities = [...document.querySelectorAll('#tradeoff-priorities .pill.active')]
 .map(p => p.dataset.pri || p.textContent.replace(' Locked', '').trim());
 const bannerTitle = document.querySelector('#screen-tradeoff .tradeoff-banner h3');
 const bannerCopy = document.querySelector('#screen-tradeoff .tradeoff-banner p');
 if (bannerTitle) {
 bannerTitle.textContent = plan.gap < 0
 ? `Your estimated final cost of ${formatINRFull(plan.estimatedMinCost)} exceeds your budget by ${formatINRFull(Math.abs(plan.gap))}`
 : `Your estimated final cost of ${formatINRFull(plan.estimatedMinCost)} is within your ${formatINRFull(plan.budget)} budget`;
 }
 if (bannerCopy) {
 bannerCopy.textContent = plan.gap < 0
 ? 'Choose what to protect. Eventra will suggest recovery moves that reduce risk without cutting your top priorities.'
 : 'Your plan is currently feasible. Use these scenarios only if vendors quote higher than the target amounts.';
 }
 const el = document.getElementById('tradeoff-scenarios');
 if (!el) return;
 const scenarios = buildTradeoffScenarios(plan, protectedPriorities);
 el.innerHTML = scenarios.map((s, idx) => {
 const adjustedSaving = s.saving;
 const adjustedTotal = s.resultingTotal;
 const isWithinBudget = adjustedTotal <= plan.budget;
 const impactBars = (label, impact) => {
 const levels = { None:5, Low:4, Medium:3, High:1 };
 const filled = levels[impact] || 3;
 const bars = Array(5).fill(0).map((_,i) => {
 const color = impact==='Low'||impact==='None' ? 'var(--green)' : impact==='Medium' ? 'var(--amber)' : 'var(--red)';
 return `<div class="impact-bar" style="${i<filled?'background:'+color:''}"></div>`;
 }).join('');
 return `<div class="impact-row"><span class="text-muted">${label}</span><div class="impact-bars">${bars}</div></div>`;
 };

 const changes = s.changes.map(c => `
 <li>
 <span>${c.category}: ${c.change}</span>
 <span class="change-saving">-${formatINRFull(c.saving)}</span>
 </li>
 `).join('');

 const withinBadge = isWithinBudget
 ? `<span class="badge badge-green" style="font-size:.8rem;padding:5px 12px">Within budget</span>`
 : '';

 const vendorTrust = s.vendorTrustInfo ? `
 <div class="card" style="background:rgba(26,29,46,0.03); border:1px solid var(--border-2); padding:16px; margin: 16px 0; border-radius: var(--radius);">
 <div class="text-xs font-bold mb-2 text-secondary" style="letter-spacing:0.05em; text-transform:uppercase;">Recommended Vendor Profile</div>
 <div class="flex justify-between items-start mb-2">
 <div>
 <h4 class="font-bold text-base" style="color:var(--text-1)">${s.vendorTrustInfo.name}</h4>
 <div class="text-xs text-muted flex items-center gap-1 mt-1"><i data-lucide="map-pin" style="width:12px"></i> ${s.vendorTrustInfo.location}</div>
 </div>
 <div class="badge badge-green flex items-center gap-1"><i data-lucide="star" style="width:12px"></i> ${s.vendorTrustInfo.rating} (${s.vendorTrustInfo.reviews})</div>
 </div>
 <p class="text-sm text-secondary mt-2 mb-3" style="line-height:1.4">${s.vendorTrustInfo.highlight}</p>
 <div class="flex flex-wrap gap-2">
 ${s.vendorTrustInfo.badges.map(b => `
 <span class="badge badge-grey flex items-center gap-1" style="font-size:0.7rem; padding: 3px 8px;">
 <i data-lucide="shield-check" style="width:10px; height:10px; color:var(--violet)"></i> ${b}
 </span>
 `).join('')}
 </div>
 </div>
 ` : '';

 return `
 <div class="scenario-card ${isWithinBudget ? 'within-budget' : ''}">
 <div class="flex justify-between items-start mb-2">
 <h3 class="font-bold">${s.title}</h3>
 <span class="badge ${idx===0?'badge-violet':idx===1?'badge-grey':'badge-green'}">${s.chip}</span>
 </div>
 <div class="scenario-saving">-${formatINRFull(adjustedSaving)}</div>
 <div class="scenario-total">New total: ${formatINRFull(adjustedTotal)} ${withinBadge}</div>
 
 <h4 class="font-semibold text-sm mb-2 mt-4">Recommended Changes</h4>
 <ul class="scenario-changes">${changes}</ul>
 
 <div class="divider" style="margin: 16px 0;"></div>
 <h4 class="font-semibold text-sm mb-2">Impact Assessment</h4>
 ${impactBars('Experience', s.experienceImpact)}
 ${impactBars('Quality', s.qualityImpact)}
 ${impactBars('Convenience',s.convenienceImpact)}
 <div class="scenario-note">${s.guestNote}</div>
 <button class="btn ${idx===0?'btn-primary':'btn-outline'} btn-full mt-4" onclick="showToast('Scenario previewed - go to Dashboard to apply')">
 Explore This Scenario
 </button>
 </div>
 `;
 }).join('');
 lucide.createIcons();
}

function buildTradeoffScenarios(plan, protectedPriorities = []) {
 const gap = Math.max(0, Math.abs(Math.min(0, plan.gap)));
 const need = gap || Math.round(plan.budget * 0.05);
 const protectedSet = new Set(protectedPriorities);
 const canTouch = category => {
 const normalized = category === 'Decoration' ? 'Decor' : category;
 if (protectedSet.has(normalized)) return false;
 if (category === 'Catering' && (protectedSet.has('Food Quality') || protectedSet.has('Guest Experience'))) return false;
 if (category === 'Venue' && protectedSet.has('Guest Experience')) return false;
 if (category === 'Photography' && protectedSet.has('Photography')) return false;
 return category !== 'Contingency';
 };
 const adjustable = plan.categories
 .filter(c => canTouch(c.name))
 .sort((a, b) => (b.recommended - b.allocation) - (a.recommended - a.allocation));
 const fallback = plan.categories.filter(c => c.name !== 'Contingency');

 const scenarioFrom = (title, chip, factor, impact, note) => {
 const pool = adjustable.length ? adjustable : fallback;
 const changes = [];
 let saved = 0;
 for (const cat of pool) {
 if (saved >= need * factor) break;
 const maxCut = Math.max(Math.round(cat.recommended * 0.08), Math.round(cat.recommended - cat.allocation));
 const saving = Math.max(3000, Math.min(maxCut, Math.round((need * factor - saved) * 0.75)));
 if (saving <= 0) continue;
 const action = tradeoffAction(cat.name, saving);
 changes.push({ category: cat.name, change: action, saving });
 saved += saving;
 }
 if (!changes.length) {
 const saving = Math.round(need * factor);
 changes.push({ category:'Vendor Negotiation', change:'Ask every shortlisted vendor for an all-inclusive written package and remove optional add-ons', saving });
 saved = saving;
 }
 return {
 title,
 chip,
 saving: saved,
 resultingTotal: Math.max(0, plan.estimatedMinCost - saved),
 changes,
 experienceImpact: impact.experience,
 qualityImpact: impact.quality,
 convenienceImpact: impact.convenience,
 guestNote: note
 };
 };

 return [
 scenarioFrom('Low-Risk Negotiation', 'Best First Step', 0.7, { experience:'Low', quality:'Low', convenience:'Low' }, 'Start here before cutting guest experience. This focuses on quote cleanup, GST clarity, and removing extras.'),
 scenarioFrom('Balanced Scope Reset', 'Recommended', 1, { experience:'Medium', quality:'Low', convenience:'Low' }, 'This is the most practical path when the current plan is over budget and priority categories must stay protected.'),
 scenarioFrom('Strong Recovery Plan', 'Maximum Saving', 1.25, { experience:'Medium', quality:'Medium', convenience:'Medium' }, 'Use this only if vendors quote above target or the budget gap remains after negotiation.')
 ];
}

function tradeoffAction(category, saving) {
 const amount = formatINRFull(saving);
 const actions = {
 Venue: `Negotiate minimum billing, remove non-essential hall add-ons, and cap service charge impact by about ${amount}`,
 Catering: `Reduce premium counters or beverage add-ons without changing the core menu, saving about ${amount}`,
 Decoration: `Use focused stage and entry decor instead of full-area styling, saving about ${amount}`,
 Photography: `Keep core coverage and remove album, drone, or express delivery add-ons, saving about ${amount}`,
 Makeup: `Limit package to primary people and remove optional trials/add-ons, saving about ${amount}`,
 Entertainment: `Shift to a shorter performance slot or curated playlist, saving about ${amount}`,
 Logistics: `Use local vendors and combine transport/setup trips, saving about ${amount}`
 };
 return actions[category] || `Negotiate this category down by about ${amount}`;
}

function toggleTOPri(el) {
  el.classList.toggle('active');
  const isProtected = el.classList.contains('active');
  const priName = el.dataset.pri || el.textContent.replace(' Locked', '').trim();
  el.textContent = isProtected ? priName + ' Locked' : priName;
  renderTradeoff();
}

// """ VENDOR QUESTIONS """"""""""""""""""""""""""""""""""""""""
function selectQTab(cat, el) {
 State.activeQTab = cat;
 document.querySelectorAll('#q-tabs .tab').forEach(t => t.classList.remove('active'));
 el.classList.add('active');
 renderQuestions(cat);
}

function renderQuestions(cat) {
 const el = document.getElementById('q-content');
 if (!el) return;
 const questions = EVENTRA.questions[cat] || [];
 if (!questions.length) { el.innerHTML = emptyState('No questions available for this category.'); return; }

 // Find vendor in this category
 const catKey = cat.toLowerCase();
 const vendor = (EVENTRA.vendors[catKey] || [])[0];
 const vendorName = vendor ? vendor.name : cat + ' Vendor';

 el.innerHTML = `
 <div class="card mb-4">
 <div class="flex justify-between items-center mb-4">
 <div>
 <h3 class="font-bold">Questions for ${vendorName}</h3>
 <p class="text-secondary text-sm">Based on quotation analysis and detected missing items</p>
 </div>
 <button class="btn btn-green" onclick="copyAllQuestions('${cat}', '${vendorName}')">
 <i data-lucide="message-circle" style="width:14px"></i> Copy as WhatsApp Message
 </button>
 </div>
 <ul class="q-list">
 ${questions.map((q,i) => `
 <li class="q-item">
 <div class="q-num">${i+1}</div>
 <div class="q-text">${q}</div>
 </li>
 `).join('')}
 </ul>
 </div>

 <div class="card card-primary">
 <h4 class="font-semibold mb-2">How to use these questions</h4>
 <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:8px">
 <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">Step</span>Send before paying any advance - vendor responses reveal their transparency</li>
 <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">Step</span>A vendor who avoids direct answers to pricing questions is a red flag</li>
 <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">Step</span>Request the answers in writing (WhatsApp message or email) for your records</li>
 <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">Step</span>Update your quote analysis after receiving the answers</li>
 </ul>
 </div>
 `;
 lucide.createIcons();
}

function copyAllQuestions(cat, vendorName) {
 const questions = EVENTRA.questions[cat] || [];
 const plan = buildBudgetPlan();
 const eventType = plan.type || 'event';
 const city = plan.city || 'my city';
 const dateText = plan.date ? ` on ${plan.date}` : '';
 const text = `Hi, I'm planning a ${eventType} in ${city}${dateText} (${plan.guests} guests). Before we proceed, could you please clarify a few things:\n\n` +
 questions.map((q,i) => `${i+1}. ${q}`).join('\n') +
 `\n\nThank you!`;
 copyToWhatsApp(text, vendorName);
}

// """ SETUP FORM """""""""""""""""""""""""""""""""""""""""""""
function setupNext(step) {
 if (step === 1) {
 if (!document.getElementById('f-type').value) { alert('Please select an event type'); return; }
 if (!document.getElementById('f-date').value) { alert('Please select a date'); return; }
 if (!document.getElementById('f-city').value) { alert('Please select a city'); return; }
 syncFormFromInputs();
 }
 if (step === 2) {
 const g = parseInt(document.getElementById('f-guests').value);
 const b = parseBudgetInput(document.getElementById('f-budget').value, 0);
 if (!g || g < 10 || g > 5000) { alert('Guest count must be between 10 and 5,000'); return; }
 if (!b || b < 10000) { alert('Please enter a valid budget (minimum Rs.10,000)'); return; }
 if (document.getElementById('f-functions')?.value === 'custom' && !document.getElementById('f-itinerary-custom')?.value.trim()) {
 alert('Please type your custom event itinerary');
 return;
 }
 syncFormFromInputs();
 }
 if (step === 3) {
 const active = document.querySelectorAll('#services-pills .pill.active');
 if (active.length === 0) { alert('Please select at least one service'); return; }
 syncFormFromInputs();
 }
 document.getElementById(`setup-step-${step}`).classList.add('hidden');
 document.getElementById(`setup-step-${step+1}`).classList.remove('hidden');
 updateSetupProgress(step + 1);
}

function setupBack(step) {
 document.getElementById(`setup-step-${step}`).classList.add('hidden');
 document.getElementById(`setup-step-${step-1}`).classList.remove('hidden');
 updateSetupProgress(step - 1);
}

function setupSubmit() {
 const activePriorities = document.querySelectorAll('#priority-pills .pill.active');
 if (activePriorities.length !== 3) {
 document.getElementById('priority-error').classList.remove('hidden');
 return;
 }
 document.getElementById('priority-error').classList.add('hidden');
 syncFormFromInputs();
 updateSetupProgress(5);
 showToast('Event setup complete! Analysing your budget...');
 setTimeout(() => navigateTo('feasibility'), 1200);
}

function updateSetupProgress(currentStep) {
 for (let step = 1; step <= 4; step += 1) {
 const node = document.getElementById(`snode-${step}`);
 const line = document.getElementById(`sline-${step}`);
 if (node) {
 node.classList.toggle('done', step < currentStep);
 node.classList.toggle('active', step === currentStep && currentStep <= 4);
 node.textContent = step < currentStep ? 'OK' : String(step);
 }
 if (line) line.classList.toggle('done', step < currentStep);
 }
}

function togglePill(el) {
 el.classList.toggle('active');
 lucide.createIcons();
}

function togglePriority(el) {
 const active = document.querySelectorAll('#priority-pills .pill.active');
 if (!el.classList.contains('active') && active.length >= 3) {
 document.getElementById('priority-error').classList.remove('hidden');
 setTimeout(() => document.getElementById('priority-error').classList.add('hidden'), 2000);
 return;
 }
 el.classList.toggle('active');
 document.getElementById('priority-error').classList.add('hidden');
}

// Budget input format hint
document.addEventListener('DOMContentLoaded', () => {
 updateItineraryOptions();
 const budgetInput = document.getElementById('f-budget');
 const budgetHint = document.getElementById('budget-hint');
 if (budgetInput && budgetHint) {
 budgetInput.addEventListener('input', () => {
 const val = parseBudgetInput(budgetInput.value, 0);
 if (!isNaN(val)) budgetHint.textContent = formatINRFull(val);
 });
 }
});

// """ ACCORDIONS """""""""""""""""""""""""""""""""""""""""""""
function toggleAccordion(header) {
 const body = header.nextElementSibling;
 const chevron = header.querySelector('.accordion-chevron');
 const isOpen = body.classList.contains('open');
 body.classList.toggle('open', !isOpen);
 if (chevron) chevron.classList.toggle('open', !isOpen);
 lucide.createIcons();
}

// """ COPY / TOAST """"""""""""""""""""""""""""""""""""""""""""
function copyToWhatsApp(questionsOrText, vendorName) {
 let text;
 if (typeof questionsOrText === 'string' && questionsOrText.includes('\n')) {
 text = questionsOrText;
 } else {
 const questions = Array.isArray(questionsOrText) ? questionsOrText : [questionsOrText];
 text = `Hi ${vendorName || ''},\n\nI'm planning an event and have a few questions about your quote before we proceed:\n\n` +
 questions.map((q,i) => `${i+1}. ${q}`).join('\n') +
 `\n\nThank you!`;
 }
 navigator.clipboard.writeText(text)
 .then(() => showToast('OK Copied to clipboard - ready to paste in WhatsApp'))
 .catch(() => showToast('Could not copy - please select and copy manually'));
}

function showToast(message) {
 const t = document.getElementById('toast');
 if (!t) return;
 t.textContent = message;
 t.classList.add('show');
 setTimeout(() => t.classList.remove('show'), 3200);
}

// """ UTILITY """"""""""""""""""""""""""""""""""""""""""""""""
function emptyState(msg) {
 return `<div class="empty-state"><div class="empty-state-icon">Empty</div><h3>Nothing here yet</h3><p>${msg}</p></div>`;
}

// """ INIT """""""""""""""""""""""""""""""""""""""""""""""""""
window.addEventListener('DOMContentLoaded', () => {
 lucide.createIcons();
 const hash = window.location.hash.replace('#','') || 'home';
 navigateTo(hash);
});


