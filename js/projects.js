/* ============================================================
   projects.js — Filter, search, and render logic for projects.html.
   Reads from PROJECTS in data/projects.js.
   You should never need to edit this file when adding projects.
   ============================================================ */

/* ── State ──────────────────────────────────────────────────── */
let activeCategory = 'all';
let activeTags     = new Set();
let searchQuery    = '';

/* ── DOM refs ───────────────────────────────────────────────── */
const grid      = document.getElementById('projects-grid');
const meta      = document.getElementById('projects-meta');
const empty     = document.getElementById('projects-empty');
const tabsEl    = document.getElementById('filter-tabs');
const tagsEl    = document.getElementById('filter-tags');
const searchEl  = document.getElementById('search-input');
const clearBtn  = document.getElementById('clear-filters');

/* ── Build filter UI from project data ─────────────────────── */
function buildFilters() {
  // Derive unique categories and tags from the data
  const categories = ['all', ...new Set(PROJECTS.map(p => p.category))];
  const allTags    = [...new Set(PROJECTS.flatMap(p => p.tags))].sort();

  // Category tabs — append after the "All" tab already in HTML
  tabsEl.innerHTML = categories.map(cat => `
    <button
      class="filter-tab ${cat === 'all' ? 'filter-tab--active' : ''}"
      data-filter="${cat}"
    >${cat === 'all' ? 'All' : cat}</button>
  `).join('');

  // Divider + tag pills
  tagsEl.innerHTML = allTags.map(tag => `
    <button class="tag" data-tag="${tag}">${tag}</button>
  `).join('');

  // Category tab click
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    activeCategory = btn.dataset.filter;
    tabsEl.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('filter-tab--active'));
    btn.classList.add('filter-tab--active');
    render();
  });

  // Tag pill click — toggle
  tagsEl.addEventListener('click', e => {
    const btn = e.target.closest('.tag');
    if (!btn) return;
    const tag = btn.dataset.tag;
    activeTags.has(tag) ? activeTags.delete(tag) : activeTags.add(tag);
    btn.classList.toggle('tag--active');
    render();
  });
}

/* ── Search ─────────────────────────────────────────────────── */
searchEl?.addEventListener('input', e => {
  searchQuery = e.target.value.toLowerCase().trim();
  render();
});

/* ── Clear filters ──────────────────────────────────────────── */
clearBtn?.addEventListener('click', () => {
  activeCategory = 'all';
  activeTags.clear();
  searchQuery    = '';
  searchEl.value = '';
  tabsEl.querySelectorAll('.filter-tab').forEach((b, i) => {
    b.classList.toggle('filter-tab--active', i === 0);
  });
  tagsEl.querySelectorAll('.tag').forEach(b => b.classList.remove('tag--active'));
  render();
});

/* ── Filter logic ───────────────────────────────────────────── */
function getFiltered() {
  return PROJECTS.filter(p => {
    const matchCat  = activeCategory === 'all' || p.category === activeCategory;
    const matchTags = activeTags.size === 0 || [...activeTags].every(t => p.tags.includes(t));
    const haystack  = `${p.title} ${p.summary} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
    const matchSearch = searchQuery === '' || haystack.includes(searchQuery);
    return matchCat && matchTags && matchSearch;
  });
}

/* ── Status badge helper ────────────────────────────────────── */
function statusBadge(status) {
  const map = {
    'Complete':    'complete',
    'In Progress': 'in-progress',
    'Archived':    'archived',
  };
  const cls = map[status] || 'archived';
  return `<span class="status-badge status-badge--${cls}">${status}</span>`;
}

/* ── Build a single card ─────────────────────────────────────── */
function buildCard(p) {
  const thumb = p.thumb
    ? `<img class="pcard__thumb" src="${p.thumb}" alt="${p.title}" loading="lazy" />`
    : `<div class="pcard__thumb-placeholder"><span>No preview</span></div>`;

  const tags = p.tags.map(t =>
    `<span class="tag ${activeTags.has(t) ? 'tag--active' : ''}">${t}</span>`
  ).join('');

  return `
    <article class="pcard reveal" onclick="location.href='${p.url}'">
      ${thumb}
      <div class="pcard__body">
        <div class="pcard__meta">
          <span class="pcard__category">${p.category}</span>
          <span class="pcard__year">${p.year}</span>
        </div>
        <h2 class="pcard__title">${p.title}</h2>
        <p  class="pcard__desc">${p.description}</p>
        <div class="pcard__tags">${tags}</div>
        <div class="pcard__footer">
          <span class="pcard__link">View project →</span>
          ${statusBadge(p.status)}
        </div>
      </div>
    </article>`;
}

/* ── Render ──────────────────────────────────────────────────── */
function render() {
  const filtered = getFiltered();

  // Update count
  meta.textContent = `Showing ${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;

  // Show/hide empty state
  const isEmpty = filtered.length === 0;
  grid.style.display  = isEmpty ? 'none' : 'grid';
  empty.style.display = isEmpty ? 'flex' : 'none';

  if (isEmpty) return;

  grid.innerHTML = filtered.map(buildCard).join('');

  // Re-run reveal observer on new cards
  grid.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ── Shared reveal observer (reused from main.js pattern) ───── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 60);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

/* ── Init ────────────────────────────────────────────────────── */
buildFilters();
render();