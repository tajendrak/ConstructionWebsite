/* ==========================================================================
   APEX M&E — script.js
   All logic lives in named functions (not inline handlers) so each piece
   is easy to point to and explain individually: data, rendering, filtering,
   the product modal, FAQ accordion, nav, and the contact form demo.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* 1. DATA — single source of truth for categories and products.          */
/* ---------------------------------------------------------------------- */

const CATEGORIES = [
  { id: 'elevators',  name: 'Elevators',          blurb: 'Traction, MRL, freight & capsule systems.' },
  { id: 'fans',        name: 'Fans',                blurb: 'Ceiling, industrial and exhaust airflow.' },
  { id: 'ac',          name: 'AC Systems',          blurb: 'Split, VRF, ducted and cassette climate control.' },
  { id: 'lighting',    name: 'Lighting',            blurb: 'Ambient, task, accent and decorative fixtures.' },
  { id: 'switchboard', name: 'Switchboard Modules', blurb: 'Distribution, metering and isolation modules.' },
];

const PRODUCTS = [
  { id: 'ELV-TR-100',  category: 'elevators',  name: 'Traction Elevator TR-100', icon: 'elevator',
    specs: [['Capacity','1000 kg'],['Speed','1.75 m/s'],['Travel','Up to 120 m']],
    desc: 'Counterweighted traction system built for mid- to high-rise commercial towers.', price: 48500 },
  { id: 'ELV-MRL-80',  category: 'elevators',  name: 'Machine-Room-Less MRL-80', icon: 'elevator',
    specs: [['Capacity','800 kg'],['Speed','1.5 m/s'],['Shaft footprint','Reduced']],
    desc: 'Compact hoistway with drive integrated into the shaft head — ideal for retrofits.', price: 41200 },
  { id: 'ELV-FR-2000', category: 'elevators',  name: 'Freight Elevator FR-2000', icon: 'elevator',
    specs: [['Capacity','2000 kg'],['Speed','0.5 m/s'],['Cab','Reinforced steel']],
    desc: 'Heavy-duty cab rated for pallet loads and equipment transport.', price: 55900 },
  { id: 'ELV-CAP-60',  category: 'elevators',  name: 'Capsule Elevator CAP-60', icon: 'elevator',
    specs: [['Capacity','630 kg'],['Cab','Panoramic glass'],['Use','Atrium / retail']],
    desc: 'Full-glass panoramic cab for atriums, malls and hotel lobbies.', price: 62800 },

  { id: 'FAN-IND-24',  category: 'fans',       name: 'Industrial Drum Fan IND-24', icon: 'fan',
    specs: [['Airflow','9800 m³/h'],['Diameter','24 in'],['Motor','1.5 HP']],
    desc: 'Portable heavy-gauge drum fan for warehouse ventilation and drying.', price: 890 },
  { id: 'FAN-EXH-10',  category: 'fans',       name: 'Wall Exhaust Fan EXH-10', icon: 'fan',
    specs: [['Airflow','850 m³/h'],['Mount','Wall'],['Noise','<48 dB']],
    desc: 'Low-noise extraction fan for kitchens, washrooms and plant rooms.', price: 145 },
  { id: 'FAN-CEIL-56', category: 'fans',       name: 'Commercial Ceiling Fan CEIL-56', icon: 'fan',
    specs: [['Sweep','56 in'],['Speeds','6-step'],['Reverse','Yes']],
    desc: 'DC-motor ceiling fan for offices and lobbies, reversible airflow.', price: 265 },
  { id: 'FAN-PED-18',  category: 'fans',       name: 'Pedestal Fan PED-18', icon: 'fan',
    specs: [['Sweep','18 in'],['Height','Adjustable'],['Oscillation','90°']],
    desc: 'Freestanding oscillating fan for site offices and temporary cooling.', price: 78 },

  { id: 'AC-SPL-12',   category: 'ac',         name: 'Split AC Unit SPL-12', icon: 'ac',
    specs: [['Capacity','1.0 Ton'],['SEER','18'],['Rooms','Single']],
    desc: 'Wall-mounted single-zone split system for individual offices.', price: 1150 },
  { id: 'AC-VRF-48',   category: 'ac',         name: 'VRF System VRF-48', icon: 'ac',
    specs: [['Capacity','4 Ton'],['Zones','Up to 12'],['Control','Individual']],
    desc: 'Variable refrigerant flow system for large commercial floors.', price: 9800 },
  { id: 'AC-DUC-60',   category: 'ac',         name: 'Ducted Central AC DUC-60', icon: 'ac',
    specs: [['Capacity','5 Ton'],['Distribution','Ductwork'],['Use','Whole-building']],
    desc: 'Centralised cooling distributed through ductwork building-wide.', price: 12400 },
  { id: 'AC-CAS-24',   category: 'ac',         name: 'Cassette AC CAS-24', icon: 'ac',
    specs: [['Capacity','2 Ton'],['Mount','Ceiling'],['Throw','4-way']],
    desc: 'Ceiling-recessed 4-way cassette unit for retail and offices.', price: 2350 },

  { id: 'LIT-HB-150',  category: 'lighting',   name: 'LED High-Bay HB-150', icon: 'lighting',
    specs: [['Output','150W'],['Lumens','21,000 lm'],['Use','Warehouse']],
    desc: 'High-output LED fixture for warehouse and factory ceilings.', price: 210 },
  { id: 'LIT-TSK-20',  category: 'lighting',   name: 'Task Lamp TSK-20', icon: 'lighting',
    specs: [['Output','20W'],['Arm','Adjustable'],['Use','Focused task']],
    desc: 'Directed task lighting for workstations and desks.', price: 62 },
  { id: 'LIT-ACC-10',  category: 'lighting',   name: 'Accent Spotlight ACC-10', icon: 'lighting',
    specs: [['Output','10W'],['Beam','Narrow'],['Use','Artwork / feature']],
    desc: 'Narrow-beam accent fixture for artwork and signage.', price: 48 },
  { id: 'LIT-DEC-PN',  category: 'lighting',   name: 'Decorative Pendant DEC-PN', icon: 'lighting',
    specs: [['Output','12W'],['Style','Ornamental'],['Use','Lobby / feature']],
    desc: 'Statement pendant fixture for lobbies and dining areas.', price: 135 },

  { id: 'SWB-DB-100',  category: 'switchboard', name: 'Distribution Board DB-100', icon: 'switch',
    specs: [['Ways','24-way'],['Rating','100A'],['Standard','IEC 61439']],
    desc: 'Modular distribution board built to IEC 61439 standards.', price: 420 },
  { id: 'SWB-MCB-32',  category: 'switchboard', name: 'MCB Module MCB-32', icon: 'switch',
    specs: [['Rating','32A'],['Poles','Single/Triple'],['Curve','Type C']],
    desc: 'Miniature circuit breaker module, DIN-rail mounted.', price: 24 },
  { id: 'SWB-MET-1P',  category: 'switchboard', name: 'Metering Module MET-1P', icon: 'switch',
    specs: [['Type','Single-phase'],['Comms','Modbus RTU'],['Accuracy','Class 1']],
    desc: 'DIN-rail energy meter with digital comms output.', price: 88 },
  { id: 'SWB-ISO-63',  category: 'switchboard', name: 'Isolator Switch ISO-63', icon: 'switch',
    specs: [['Rating','63A'],['Poles','4-pole'],['Use','Maintenance isolation']],
    desc: 'Load-break isolator, lockable in the open position.', price: 56 },
];

const ICONS = {
  elevator: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="12" y="4" width="24" height="40" rx="1"/><path d="M20 16l4-4 4 4M20 32l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="24" x2="36" y2="24"/></svg>`,
  fan: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="3.2" fill="currentColor" stroke="none"/><path d="M24 24c0-7 -4-13-4-13a6 6 0 0 1 8 6c0 4-4 7-4 7Z"/><path d="M24 24c7 0 13-4 13-4a6 6 0 0 1-6 8c-4 0-7-4-7-4Z"/><path d="M24 24c0 7 4 13 4 13a6 6 0 0 1-8-6c0-4 4-7 4-7Z"/><path d="M24 24c-7 0-13 4-13 4a6 6 0 0 1 6-8c4 0 7 4 7 4Z"/></svg>`,
  ac: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="14" width="36" height="14" rx="2"/><line x1="12" y1="28" x2="10" y2="36" stroke-linecap="round"/><line x1="20" y1="28" x2="18" y2="38" stroke-linecap="round"/><line x1="28" y1="28" x2="26" y2="36" stroke-linecap="round"/><line x1="36" y1="28" x2="34" y2="38" stroke-linecap="round"/><circle cx="34" cy="21" r="1.6" fill="currentColor" stroke="none"/></svg>`,
  lighting: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 6a12 12 0 0 0-7 21.8c1.4 1 2 2.3 2 4.2v1h10v-1c0-1.9.6-3.2 2-4.2A12 12 0 0 0 24 6Z"/><line x1="19" y1="38" x2="29" y2="38" stroke-linecap="round"/><line x1="21" y1="42" x2="27" y2="42" stroke-linecap="round"/></svg>`,
  switch: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="6" width="32" height="36" rx="2"/><rect x="14" y="13" width="9" height="9" rx="1"/><rect x="25" y="13" width="9" height="9" rx="1"/><rect x="14" y="26" width="9" height="9" rx="1"/><line x1="29.5" y1="26" x2="29.5" y2="35" stroke-linecap="round"/></svg>`,
};

function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function getCategory(id) { return CATEGORIES.find(c => c.id === id); }
function getIcon(name) { return ICONS[name] || ICONS.switch; }

/* ---------------------------------------------------------------------- */
/* 2. STATE                                                                */
/* ---------------------------------------------------------------------- */

let activeCategory = 'all';   // current filter chip
let searchQuery = '';         // current search box text
const cart = [];              // in-memory "quote list"; see addToCart() note

/* ---------------------------------------------------------------------- */
/* 3. RENDER FUNCTIONS                                                     */
/* ---------------------------------------------------------------------- */

function renderCategoryGrid() {
  const grid = document.getElementById('category-grid');
  grid.innerHTML = CATEGORIES.map(cat => {
    const sample = PRODUCTS.find(p => p.category === cat.id);
    const count = PRODUCTS.filter(p => p.category === cat.id).length;
    return `
      <div class="cat-card" data-cat="${cat.id}">
        <div class="cat-icon">${getIcon(sample.icon)}</div>
        <h3>${cat.name}</h3>
        <p>${cat.blurb}</p>
        <span class="count">${count} SKUs →</span>
      </div>`;
  }).join('');

  // Clicking a category card jumps to the catalog and applies that filter
  grid.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      setActiveCategory(card.dataset.cat);
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function renderFilterChips() {
  const bar = document.getElementById('filter-bar');
  const chips = [{ id: 'all', name: 'All Products' }, ...CATEGORIES];
  bar.innerHTML = chips.map(c =>
    `<button class="filter-chip ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`
  ).join('');

  bar.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => setActiveCategory(chip.dataset.cat));
  });
}

function setActiveCategory(catId) {
  activeCategory = catId;
  renderFilterChips();   // re-render so the "active" class moves to the right chip
  renderProductGrid();
}

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.id.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
}

function renderProductGrid() {
  const list = getFilteredProducts();
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('result-count');
  const emptyEl = document.getElementById('empty-state');

  countEl.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
  emptyEl.hidden = list.length > 0;

  grid.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-media">
        <span class="tag">${getCategory(p.category).name}</span>
        ${getIcon(p.icon)}
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <span class="product-code">${p.id}</span>
        <ul class="product-specs">
          ${p.specs.slice(0, 2).map(s => `<li>${s[0]}: <b>${s[1]}</b></li>`).join('')}
        </ul>
        <div class="product-foot">
          <span class="price">$${p.price.toLocaleString()} <span>/ unit</span></span>
          <button class="btn btn-outline btn-add" style="padding:8px 14px;" data-id="${p.id}">Add</button>
        </div>
      </div>
    </div>
  `).join('');

  // Clicking the card opens the detail modal; clicking "Add" adds to cart
  // without also opening the modal (stopPropagation).
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openProductModal(card.dataset.id));
  });
  grid.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 4. PRODUCT DETAIL MODAL                                                 */
/* ---------------------------------------------------------------------- */

function openProductModal(productId) {
  const p = getProduct(productId);
  if (!p) return;
  const category = getCategory(p.category);

  document.getElementById('modal-media').innerHTML = getIcon(p.icon);
  document.getElementById('modal-code').textContent = `${p.id} · ${category.name}`;
  document.getElementById('modal-title').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-specs').innerHTML =
    p.specs.map(s => `<li>${s[0]}: <b>${s[1]}</b></li>`).join('');
  document.getElementById('modal-price').innerHTML =
    `$${p.price.toLocaleString()} <span style="font-size:0.7rem;">/ unit</span>`;

  const addBtn = document.getElementById('modal-add');
  addBtn.onclick = () => addToCart(p.id);

  document.getElementById('modal-overlay').classList.add('open');
}

function closeProductModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

/* ---------------------------------------------------------------------- */
/* 5. CART (DEMO) — in-memory only.                                        */
/* Deliberately not localStorage: keeps this dependency-free and avoids   */
/* storage permission issues when the file is opened directly (file://)   */
/* rather than served. Swap in a real store if you deploy this.           */
/* ---------------------------------------------------------------------- */

function addToCart(productId) {
  const p = getProduct(productId);
  if (!p) return;
  cart.push(p);
  showToast(`Added "${p.name}" to quote list (${cart.length} item${cart.length > 1 ? 's' : ''})`);
}

function showToast(message) {
  const toast = document.getElementById('cart-toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------------------------------------------------------------------- */
/* 6. FAQ ACCORDION                                                        */
/* ---------------------------------------------------------------------- */

function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 7. NAV — mobile toggle + highlight the link for the section in view     */
/* ---------------------------------------------------------------------- */

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  // Close the mobile menu after a link is tapped
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-50% 0px -49% 0px' });
  sections.forEach(section => observer.observe(section));
}

/* ---------------------------------------------------------------------- */
/* 8. CONTACT FORM (DEMO)                                                  */
/* ---------------------------------------------------------------------- */

function initContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', submitContactForm);
}

function submitContactForm(event) {
  event.preventDefault();
  // Demo only — no backend wired up. To go live, replace this block with:
  //   fetch('/api/enquiries', { method: 'POST', body: new FormData(form) })
  document.getElementById('form-success').hidden = false;
  event.target.reset();
}

/* ---------------------------------------------------------------------- */
/* 9. INIT                                                                 */
/* ---------------------------------------------------------------------- */

function init() {
  renderCategoryGrid();
  renderFilterChips();
  renderProductGrid();
  initFaqAccordion();
  initMobileNav();
  initScrollSpy();
  initContactForm();

  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderProductGrid();
  });

  document.getElementById('modal-close').addEventListener('click', closeProductModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeProductModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProductModal(); });

  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
