// app.js â€” Eventra Application Logic
// Router Â· All screen renderers Â· All interactivity

'use strict';

// â”€â”€â”€ State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  activeVendorTab: 'photography',
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
  const sel = document.getElementById('event-type');
  if (sel) {
    if (eventType.includes('Wedding')) sel.value = 'Wedding / Engagement';
    else if (eventType.includes('Birthday')) sel.value = 'Birthday Party';
    else if (eventType.includes('Corporate')) sel.value = 'Corporate Event';
  }
  navigateTo('setup');
}

function onRouteEnter(route) {
  if (route === 'home')        renderHome();
  if (route === 'discovery')   renderDiscovery();
  if (route === 'directory')   renderDirectory('all');
  if (route === 'feasibility') renderFeasibility();
  if (route === 'quotes')      renderQuotes(State.activeQuoteTab);
  if (route === 'vendors')     renderVendors(State.activeVendorTab);
  if (route === 'hidden-costs')renderHiddenCosts();
  if (route === 'dashboard')   renderDashboard();
  if (route === 'simulator')   renderSimulator();
  if (route === 'tradeoff')    renderTradeoff();
  if (route === 'questions')   renderQuestions(State.activeQTab);
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#','') || 'home';
  navigateTo(hash);
});

// â”€â”€â”€ HOME / LANDING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ DISCOVERY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderDiscovery() {
  const grid = document.getElementById('pp-grid');
  if (!grid) return;
  grid.innerHTML = EVENTRA.painPoints.map(pp => `
    <div class="pp-card pp-${pp.priority}">
      <div class="pp-card-icon"><i data-lucide="${pp.icon}"></i></div>
      <div style="min-width:0">
        <div class="pp-card-id">${pp.id} Â· ${priorityLabel(pp.priority)}</div>
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

// â”€â”€â”€ VENDOR DIRECTORY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  const vendors = EVENTRA.vendorProfiles.filter(v => filterType === 'all' || v.type === filterType);
  if (!vendors.length) { el.innerHTML = emptyState('No vendors found for this category.'); return; }

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
    const baseCost = v.startingPrice * (v.priceUnit === 'per plate' ? 150 : 1);
    const gst = baseCost * 0.18;
    const hiddenCost = v.type === 'Farmhouse' ? 45000 : (v.type === 'Hotel' ? baseCost * 0.10 : 0);
    const trueCost = baseCost + gst + hiddenCost;
    const icon = iconByType[v.type] || 'store';
    const tile = gradientTiles[index % gradientTiles.length];
    const locationLine = v.type === 'Photographer' || v.type === 'Decorator'
      ? `${v.type === 'Decorator' ? 'Decor' : v.type} · ${v.location}`
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
        <div class="vendor-rating">★ ${v.rating}</div>
      </div>
      <p class="vendor-description">${v.description}</p>
      <div class="vendor-price-row">
        <div>
          <div class="vendor-price">${formatINRFull(Math.round(trueCost))}</div>
          <div class="vendor-price-caption">all-in for 150 guests</div>
        </div>
      </div>
      <div class="vendor-risk"><i data-lucide="triangle-alert"></i> ${hiddenWarning}</div>
    </button>
    `;
  }).join('');
  lucide.createIcons();
}
// ─── FEASIBILITY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderFeasibility() {
  const cats = EVENTRA.feasibility.categories;
  const catEl = document.getElementById('feas-categories');
  if (!catEl) return;
  catEl.innerHTML = cats.map(c => {
    const pct = c.percent;
    const riskBadge = c.risk === 'Locked'
      ? `<span class="badge badge-grey">ðŸ”’ Locked</span>`
      : c.risk === 'Low'
      ? `<span class="badge badge-green">Low Risk</span>`
      : `<span class="badge badge-amber">Medium Risk</span>`;
    return `
      <div class="category-row">
        <div class="category-icon"><i data-lucide="${c.icon}"></i></div>
        <div class="category-name">${c.name}</div>
        <div class="category-bar-wrap">
          <div class="category-bar-bg">
            <div class="category-bar-fill" style="width:${pct*3.3}%;background:${c.risk==='Locked'?'var(--border-2)':c.risk==='Low'?'var(--green)':'var(--amber)'}"></div>
          </div>
        </div>
        <div class="category-amount">${formatINRFull(c.recommended)}</div>
        <div class="category-pct">${pct}%</div>
        <div>${riskBadge}</div>
      </div>
    `;
  }).join('');

  const bm = document.getElementById('feas-benchmarks');
  if (bm) {
    const ranges = [
      { name:'Venue (150 pax)', range:'â‚¹1,80,000â€“â‚¹3,20,000', budget:'â‚¹2,40,000' },
      { name:'Catering /plate', range:'â‚¹1,000â€“â‚¹1,800', budget:'â‚¹1,333' },
      { name:'Photography',     range:'â‚¹55,000â€“â‚¹1,20,000', budget:'â‚¹80,000' },
      { name:'Decoration',      range:'â‚¹60,000â€“â‚¹1,50,000', budget:'â‚¹80,000' },
    ];
    bm.innerHTML = ranges.map(r => `
      <div class="flex justify-between items-center py-1 border-b" style="border-color:var(--border)">
        <span style="color:var(--text-2)">${r.name}</span>
        <div class="flex gap-3">
          <span class="text-muted text-xs">Market: ${r.range}</span>
          <span class="font-semibold text-xs" style="color:var(--primary)">Your: ${r.budget}</span>
        </div>
      </div>
    `).join('');
  }
}

// â”€â”€â”€ QUOTE ANALYSIS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  const vendors = EVENTRA.vendors[cat] || [];
  if (!vendors.length) { el.innerHTML = emptyState('No quotes uploaded for this category yet.'); return; }
  el.innerHTML = vendors.map(v => renderQuoteCard(v)).join('');
}

function renderQuoteCard(v) {
  const included = v.included.map(i => `<div class="flex items-center gap-2 text-sm py-1"><span style="color:var(--green);font-size:1rem">âœ“</span>${i}</div>`).join('');
  const missing = v.excluded.map(i => `<div class="flex items-center gap-2 text-sm py-1"><span style="color:var(--amber);font-size:1rem">âš </span>${i}</div>`).join('');
  const confColor = { High:'green', Medium:'amber', Low:'red' }[v.confidence] || 'grey';
  return `
    <div class="card mb-4">
      <div class="flex justify-between items-start mb-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span style="font-size:1.5rem">${v.image}</span>
            <div>
              <h3 class="font-bold text-lg">${v.name}</h3>
              <span class="text-muted text-sm">${v.location}</span>
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
          <div style="font-size:1.1rem;font-weight:800;color:#92400E">${formatINRFull(v.estimatedFinalMin)}â€“${formatINRFull(v.estimatedFinalMax)}</div>
        </div>
      </div>

      <!-- Included vs Missing -->
      <div class="grid-2 gap-4 mb-4">
        <div>
          <div class="font-semibold text-sm mb-2" style="color:var(--green)">âœ“ Included in Quote</div>
          ${included}
        </div>
        <div>
          <div class="font-semibold text-sm mb-2" style="color:var(--amber)">âš  Likely Missing</div>
          ${missing}
          <div class="mt-2 text-sm" style="color:var(--red);font-weight:600">Hidden estimate: ${v.hiddenEstimate || (formatINRFull(v.estimatedFinalMin - v.quotedPrice) + 'â€“' + formatINRFull(v.estimatedFinalMax - v.quotedPrice))}</div>
        </div>
      </div>

      <!-- AI Review -->
      <div class="ai-box mb-4">
        <div class="ai-box-icon">âš ï¸</div>
        <div>
          <div class="ai-box-label">Biggest Risk</div>
          <div class="ai-box-text">${v.risks[0]}</div>
        </div>
      </div>

      <!-- Benchmark -->
      <div style="background:var(--surface-2);border-radius:var(--radius);padding:12px 14px;font-size:.82rem;margin-bottom:16px">
        <span class="text-secondary">Market range for ${v.category} in Mumbai: </span>
        <span class="font-semibold">â‚¹55,000â€“â‚¹1,20,000</span>
        <span class="badge badge-green ml-auto" style="float:right">Within market range</span>
      </div>

      <button class="btn btn-primary btn-sm" onclick="navigateTo('vendors')">Add to Comparison â†’</button>
    </div>
  `;
}

// â”€â”€â”€ VENDOR COMPARISON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  const vendors = EVENTRA.vendors[cat] || [];
  if (!vendors.length) { el.innerHTML = emptyState('No vendors added for this category.'); return; }

  if (vendors.length === 1) {
    el.innerHTML = `
      <div class="card mb-4">
        ${renderVendorSingle(vendors[0])}
      </div>
      <div class="card card-primary">
        <div class="flex items-center gap-2">
          <i data-lucide="info" style="width:16px;color:var(--primary)"></i>
          <span class="text-sm font-semibold">Only 1 vendor in this category</span>
        </div>
        <p class="text-sm text-secondary mt-2">Upload additional quotes to enable side-by-side comparison. Go to Quote Analysis to upload another vendor.</p>
        <button class="btn btn-outline btn-sm mt-3" onclick="navigateTo('quotes')">Add Another Quote</button>
      </div>
    `;
    return;
  }

  // Multi-vendor comparison table (photography has 3)
  el.innerHTML = renderComparisonTable(vendors);
}

function renderVendorSingle(v) {
  const scoreClass = v.matchScore >= 75 ? 'score-green' : v.matchScore >= 60 ? 'score-amber' : 'score-red';
  return `
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <span style="font-size:1.8rem">${v.image}</span>
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
        <div class="font-bold" style="color:#92400E;font-size:.9rem">${formatINRFull(v.estimatedFinalMin)}â€“${formatINRFull(v.estimatedFinalMax)}</div>
      </div>
    </div>
    <div class="badge badge-${v.badgeColor === 'violet' ? 'violet' : v.badgeColor === 'green' ? 'green' : v.badgeColor === 'red' ? 'red' : 'amber'} mb-3">${v.badge}</div>
    <div class="ai-box mb-3">
      <div class="ai-box-icon">ðŸ’¡</div>
      <div><div class="ai-box-label">Why Recommended</div><div class="ai-box-text">${v.whyRecommended}</div></div>
    </div>
    ${renderQuestionBlock(v)}
  `;
}

function renderComparisonTable(vendors) {
  const scoreClass = s => s >= 75 ? 'score-green' : s >= 60 ? 'score-amber' : 'score-red';
  const badgeClass = b => ({ green:'badge-green', amber:'badge-amber', red:'badge-red', violet:'badge-violet' }[b] || 'badge-grey');
  const avail = v => v.availability ? `<span class="badge badge-green">âœ“ Available</span>` : `<span class="badge badge-red">âœ— Unconfirmed</span>`;
  const bool = v => v ? `<span style="color:var(--green)">âœ“</span>` : `<span style="color:var(--red)">âœ—</span>`;

  const rows = [
    { label:'Match Score',     render: v => `<div class="match-score-circle ${scoreClass(v.matchScore)}" style="margin:0 auto">${v.matchScore}</div>` },
    { label:'Badge',           render: v => `<span class="badge ${badgeClass(v.badgeColor)}">${v.badge}</span>` },
    { label:'Listed Price',    render: v => `<span style="text-decoration:line-through;color:var(--text-3)">${formatINRFull(v.listedPrice)}</span>` },
    { label:'Quoted Price',    render: v => `<b>${formatINRFull(v.quotedPrice)}</b>` },
    { label:'Est. Final Cost', render: v => `<b style="color:var(--amber)">${formatINRFull(v.estimatedFinalMin)}â€“${formatINRFull(v.estimatedFinalMax)}</b>` },
    { label:'Availability',    render: v => avail(v) },
    { label:'Response Time',   render: v => `<span class="text-sm">${v.responseTime}</span>` },
    { label:'GST Included',    render: v => bool(v.included.some(i => i.toLowerCase().includes('gst'))) },
    { label:'Album Included',  render: v => bool(v.included.some(i => i.toLowerCase().includes('album'))) },
    { label:'Confidence',      render: v => `<span class="badge badge-${v.confidence==='High'?'green':v.confidence==='Medium'?'amber':'red'}">${v.confidence}</span>` },
  ];

  const headers = vendors.map(v => `
    <th class="vendor-col-header">
      <div style="font-size:1.3rem;margin-bottom:6px">${v.image}</div>
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
          <span style="font-size:1.1rem">${v.image}</span>
          <div>
            <div class="accordion-title">${v.name} â€” Details</div>
            <div class="accordion-meta">Why recommended Â· Risks Â· Questions to ask</div>
          </div>
        </div>
        <i data-lucide="chevron-down" class="accordion-chevron"></i>
      </div>
      <div class="accordion-body" style="padding:20px">
        <div class="grid-2 gap-4 mb-4">
          <div>
            <div class="font-semibold text-sm mb-2" style="color:var(--green)">ðŸ’¡ Why Recommended</div>
            <p class="text-sm text-secondary">${v.whyRecommended}</p>
          </div>
          <div>
            <div class="font-semibold text-sm mb-2" style="color:var(--red)">âš  Possible Risks</div>
            <ul style="list-style:none;padding:0">${v.risks.map(r => `<li class="text-sm text-secondary py-1">â€¢ ${r}</li>`).join('')}</ul>
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
      <div class="font-semibold text-sm mb-3">â“ Questions to Ask Before Booking</div>
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

// â”€â”€â”€ HIDDEN COSTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        ? `<span style="color:var(--green);font-size:1.1rem">âœ“</span>`
        : item.status === 'not-applicable'
        ? `<span class="text-muted text-xs">N/A</span>`
        : `<span style="color:var(--amber);font-size:1.1rem">âš </span>`;
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
              <div class="accordion-meta">${cat.riskCount} potential risks Â· â‚¹${cat.rangeMin.toLocaleString('en-IN')}â€“â‚¹${cat.rangeMax.toLocaleString('en-IN')}</div>
            </div>
          </div>
          <i data-lucide="chevron-down" class="accordion-chevron"></i>
        </div>
        <div class="accordion-body">${rows}</div>
      </div>
    `;
  }).join('');
}

// â”€â”€â”€ DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderDashboard() {
  const d = EVENTRA.dashboard;

  // Stat cards
  const statsEl = document.getElementById('dashboard-stats');
  if (statsEl) statsEl.innerHTML = [
    { label:'Total Budget', value: formatINRFull(d.totalBudget), sub:'Your ceiling', icon:'wallet', iconClass:'icon-primary' },
    { label:'Committed So Far', value: formatINRFull(d.committed), sub:`${Math.round(d.committed/d.totalBudget*100)}% of budget`, icon:'check-circle', iconClass:'icon-green' },
    { label:'Est. Final Cost', value: formatINRFull(d.estimatedFinal), sub:'â‚¹65,000 over budget', icon:'trending-up', iconClass:'icon-red', valueColor:'var(--red)' },
    { label:'Contingency', value: formatINRFull(d.contingency), sub:'10% reserve â€” untouched', icon:'shield', iconClass:'icon-amber' },
    { label:'Vendors Selected', value: d.vendorsSelected + ' of ' + d.form?.services?.length || '5', sub:'3 pending decision', icon:'users', iconClass:'icon-primary' },
    { label:'Hidden Cost Warnings', value: d.hiddenCostWarnings, sub:`${d.totalFlagged || 12} flagged, ${d.totalConfirmed||3} confirmed`, icon:'eye-off', iconClass:'icon-amber' },
    { label:'Pending Decisions', value: d.pendingDecisions, sub:'Require action this week', icon:'clock', iconClass:'icon-red' },
    { label:'Days Until Event', value: '166', sub:'18 Dec 2026', icon:'calendar', iconClass:'icon-primary' },
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
  if (nbdDesc)  nbdDesc.textContent  = nbd.description;
  if (nbdDL)    nbdDL.textContent    = nbd.deadline;

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
  if (csEl) csEl.innerHTML = d.categorySpend.map(c => {
    const pct = c.allocated > 0 ? Math.round(c.committed/c.allocated*100) : 0;
    return `
      <div class="flex items-center gap-3 py-3 border-b" style="border-color:var(--border)">
        <div style="width:12px;height:12px;border-radius:3px;background:${c.color};flex-shrink:0"></div>
        <span class="font-semibold text-sm" style="min-width:110px">${c.name}</span>
        <div style="flex:1">
          <div class="progress-wrap">
            <div class="progress-bar" style="width:${pct}%;background:${c.color}"></div>
          </div>
        </div>
        <span class="text-sm font-bold" style="min-width:90px;text-align:right">${formatINRFull(c.committed)}</span>
        <span class="text-muted text-xs" style="min-width:80px;text-align:right">of ${formatINRFull(c.allocated)}</span>
        <span class="badge badge-grey text-xs" style="min-width:45px;text-align:center">${pct}%</span>
      </div>
    `;
  }).join('');

  // Payment schedule
  const pEl = document.getElementById('payment-tbody');
  if (pEl) pEl.innerHTML = d.payments.map(p => {
    const statusClass = p.status === 'pending' ? 'payment-status-pending' : p.status === 'future' ? 'payment-status-future' : 'payment-status-paid';
    const statusLabel = p.status === 'pending' ? 'âš¡ Due Soon' : p.status === 'future' ? 'Upcoming' : 'âœ“ Paid';
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
  const data = EVENTRA.dashboard.categorySpend;
  State.chartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        data: data.map(d => d.allocated),
        backgroundColor: data.map(d => d.color),
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
            label: ctx => ` ${ctx.label}: ${formatINRFull(ctx.parsed)} (${Math.round(ctx.parsed/800000*100)}%)`
          }
        }
      }
    }
  });
}

// â”€â”€â”€ SIMULATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderSimulator() {
  // Already static in HTML, just ensure lucide icons
}

function updateSimulatorInput() {
  const type = document.getElementById('sim-type')?.value;
  const label = document.getElementById('sim-input-label');
  const input = document.getElementById('sim-value');
  if (!label || !input) return;
  const map = {
    'guests':       { label:'New Guest Count',        val:180 },
    'budget':       { label:'New Total Budget (â‚¹)',    val:750000 },
    'function':     { label:'Number of Functions',     val:2 },
    'vendor-price': { label:'New Vendor Price (â‚¹)',    val:90000 },
    'upgrade':      { label:'Upgrade Amount (â‚¹)',      val:25000 },
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
    titleEl.textContent = `Impact of Adding ${value - 150} Guests (150 â†’ ${value})`;
    const scaleFactor = (value - 150) / 30;
    const rows = d.rows.map(r => ({
      ...r,
      after:  r.affected ? r.before + Math.round(r.delta * scaleFactor) : r.before,
      delta:  r.affected ? Math.round(r.delta * scaleFactor) : 0,
    }));
    const totalDelta = rows.reduce((sum, r) => sum + r.delta, 0);
    const totalAfter = d.totalBefore + totalDelta;

    deltaEl.textContent = '+â‚¹' + totalDelta.toLocaleString('en-IN');
    tbodyEl.innerHTML = rows.map(r => `
      <tr class="${r.affected ? 'sim-row-affected' : ''}">
        <td class="font-medium">${r.name}</td>
        <td class="td-num">${formatINRFull(r.before)}</td>
        <td class="td-num font-semibold">${formatINRFull(r.after)}</td>
        <td class="${r.delta > 0 ? 'sim-delta-up' : 'sim-delta-zero'}">
          ${r.delta > 0 ? '+â‚¹' + r.delta.toLocaleString('en-IN') : 'â€”'}
        </td>
      </tr>
    `).join('');

    beforeTotalEl.textContent = formatINRFull(d.totalBefore);
    afterTotalEl.textContent  = formatINRFull(totalAfter);
    deltaTotalEl.textContent  = '+â‚¹' + totalDelta.toLocaleString('en-IN');

    resultsEl.style.display = 'block';
    renderRecoveryOptions(totalDelta);
    recoveryEl.style.display = 'block';
  } else {
    titleEl.textContent = 'Simulated Impact';
    deltaEl.textContent = '+â‚¹40,000 (estimated)';
    tbodyEl.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--text-3)">Sample simulation â€” use Guest Count for full calculation</td></tr>`;
    beforeTotalEl.textContent = 'â‚¹8,00,000';
    afterTotalEl.textContent = 'â‚¹8,40,000';
    deltaTotalEl.textContent = '+â‚¹40,000';
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
    const stars = Array(5).fill(0).map((_,i) => `<span style="color:${i<r.stars?'var(--amber)':'var(--border-2)'}">â˜…</span>`).join('');
    const usesContingency = r.usesContingency ? `
      <div class="badge badge-red mb-2">âš  Uses â‚¹${r.usesContingency.toLocaleString('en-IN')} of contingency</div>
      <div class="text-xs text-secondary mb-2">Only â‚¹${r.contingencyRemaining.toLocaleString('en-IN')} remaining as buffer</div>
    ` : '';
    return `
      <div class="recovery-card">
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-bold text-sm">${r.title}</h4>
          <span class="badge badge-${r.riskColor==='green'?'green':r.riskColor==='red'?'red':'amber'}">${r.risk} Risk</span>
        </div>
        ${r.saving > 0 ? `<div class="recovery-saving">âˆ’â‚¹${r.saving.toLocaleString('en-IN')}</div>` : usesContingency}
        <div class="recovery-action">${r.action}</div>
        <div class="recovery-meta">
          <span class="text-muted text-xs">Experience Impact: ${r.experienceImpact}</span>
          <span class="text-sm">${stars}</span>
        </div>
        <button class="btn btn-outline btn-sm btn-full" onclick="showToast('Recovery scenario previewed â€” no changes applied')">Preview This Recovery</button>
      </div>
    `;
  }).join('');
}

// â”€â”€â”€ TRADE-OFF ADVISOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderTradeoff() {
  const el = document.getElementById('tradeoff-scenarios');
  if (!el) return;
  el.innerHTML = EVENTRA.tradeoff.scenarios.map((s, idx) => {
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
        <span class="change-saving">âˆ’â‚¹${c.saving.toLocaleString('en-IN')}</span>
      </li>
    `).join('');

    const withinBadge = s.withinBudget
      ? `<span class="badge badge-green" style="font-size:.8rem;padding:5px 12px">âœ“ Exactly within budget</span>`
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
      <div class="scenario-card ${s.withinBudget ? 'within-budget' : ''}">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold">${s.title}</h3>
          <span class="badge ${idx===0?'badge-violet':idx===1?'badge-grey':'badge-green'}">${s.chip}</span>
        </div>
        <div class="scenario-saving">âˆ’â‚¹${s.saving.toLocaleString('en-IN')}</div>
        <div class="scenario-total">New total: â‚¹${s.resultingTotal.toLocaleString('en-IN')} ${withinBadge}</div>
        
        <h4 class="font-semibold text-sm mb-2 mt-4">Recommended Changes</h4>
        <ul class="scenario-changes">${changes}</ul>
        
        ${vendorTrust}
        
        <div class="divider" style="margin: 16px 0;"></div>
        <h4 class="font-semibold text-sm mb-2">Impact Assessment</h4>
        ${impactBars('Experience', s.experienceImpact)}
        ${impactBars('Quality',    s.qualityImpact)}
        ${impactBars('Convenience',s.convenienceImpact)}
        <div class="scenario-note">${s.guestNote}</div>
        <button class="btn ${idx===0?'btn-primary':'btn-outline'} btn-full mt-4" onclick="showToast('Scenario previewed â€” go to Dashboard to apply')">
          Explore This Scenario â†’
        </button>
      </div>
    `;
  }).join('');
}

function toggleTOPri(el) {
  el.classList.toggle('active');
  const isProtected = el.classList.contains('active');
  const priName = el.dataset.pri;
  el.innerHTML = el.innerHTML.replace(' ðŸ”’','') + (isProtected ? ' ðŸ”’' : '');
}

// â”€â”€â”€ VENDOR QUESTIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">â†’</span>Send before paying any advance â€” vendor responses reveal their transparency</li>
        <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">â†’</span>A vendor who avoids direct answers to pricing questions is a red flag</li>
        <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">â†’</span>Request the answers in writing (WhatsApp message or email) for your records</li>
        <li class="text-sm flex items-start gap-2"><span style="color:var(--primary)">â†’</span>Update your quote analysis after receiving the answers</li>
      </ul>
    </div>
  `;
  lucide.createIcons();
}

function copyAllQuestions(cat, vendorName) {
  const questions = EVENTRA.questions[cat] || [];
  const text = `Hi, I'm planning an engagement at Royal Orchid Banquet on 18 Dec 2026 (150 guests). Before we proceed, could you please clarify a few things:\n\n` +
    questions.map((q,i) => `${i+1}. ${q}`).join('\n') +
    `\n\nThank you!`;
  copyToWhatsApp(text, vendorName);
}

// â”€â”€â”€ SETUP FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function setupNext(step) {
  if (step === 1) {
    if (!document.getElementById('f-type').value) { alert('Please select an event type'); return; }
    if (!document.getElementById('f-date').value) { alert('Please select a date'); return; }
    if (!document.getElementById('f-city').value) { alert('Please select a city'); return; }
  }
  if (step === 2) {
    const g = parseInt(document.getElementById('f-guests').value);
    const b = parseInt(document.getElementById('f-budget').value);
    if (!g || g < 10 || g > 5000) { alert('Guest count must be between 10 and 5,000'); return; }
    if (!b || b < 10000) { alert('Please enter a valid budget (minimum â‚¹10,000)'); return; }
  }
  if (step === 3) {
    const active = document.querySelectorAll('#services-pills .pill.active');
    if (active.length === 0) { alert('Please select at least one service'); return; }
  }
  document.getElementById(`setup-step-${step}`).classList.add('hidden');
  document.getElementById(`setup-step-${step+1}`).classList.remove('hidden');
  markStepDone(step);
  markStepActive(step+1);
}

function setupBack(step) {
  document.getElementById(`setup-step-${step}`).classList.add('hidden');
  document.getElementById(`setup-step-${step-1}`).classList.remove('hidden');
  markStepActive(step-1);
}

function setupSubmit() {
  const activePriorities = document.querySelectorAll('#priority-pills .pill.active');
  if (activePriorities.length !== 3) {
    document.getElementById('priority-error').classList.remove('hidden');
    return;
  }
  document.getElementById('priority-error').classList.add('hidden');
  showToast('Event setup complete! Analysing your budgetâ€¦');
  setTimeout(() => navigateTo('feasibility'), 1200);
}

function markStepDone(step) {
  const node = document.getElementById(`snode-${step}`);
  const line = document.getElementById(`sline-${step}`);
  if (node) { node.classList.remove('active'); node.classList.add('done'); node.textContent = 'âœ“'; }
  if (line) line.classList.add('done');
}

function markStepActive(step) {
  const node = document.getElementById(`snode-${step}`);
  if (node) node.classList.add('active');
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
  const budgetInput = document.getElementById('f-budget');
  const budgetHint  = document.getElementById('budget-hint');
  if (budgetInput && budgetHint) {
    budgetInput.addEventListener('input', () => {
      const val = parseInt(budgetInput.value);
      if (!isNaN(val)) budgetHint.textContent = formatINRFull(val);
    });
  }
});

// â”€â”€â”€ ACCORDIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const chevron = header.querySelector('.accordion-chevron');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (chevron) chevron.classList.toggle('open', !isOpen);
  lucide.createIcons();
}

// â”€â”€â”€ COPY / TOAST â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    .then(() => showToast('âœ“ Copied to clipboard â€” ready to paste in WhatsApp'))
    .catch(() => showToast('Could not copy â€” please select and copy manually'));
}

function showToast(message) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// â”€â”€â”€ UTILITY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function emptyState(msg) {
  return `<div class="empty-state"><div class="empty-state-icon">ðŸ“­</div><h3>Nothing here yet</h3><p>${msg}</p></div>`;
}

// â”€â”€â”€ INIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  const hash = window.location.hash.replace('#','') || 'home';
  navigateTo(hash);
});

