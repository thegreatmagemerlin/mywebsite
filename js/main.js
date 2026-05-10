/* ============================================================
   main.js — Runs on every page.
   Nav scroll behaviour, mobile menu, scroll reveal,
   and featured project card rendering for the homepage.
   ============================================================ */

/* ── Nav: transparent → frosted on scroll ──────────────────── */
const nav = document.getElementById('nav');

const handleNavScroll = () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load in case page is pre-scrolled

/* ── Nav: mobile toggle ─────────────────────────────────────── */
const toggle    = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('nav-mobile');

toggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  // Animate the hamburger → X
  const spans = toggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* ── Scroll reveal ──────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // Stagger children if they appear close together
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, i * 60);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Featured projects (homepage only) ─────────────────────── */
const featuredGrid = document.getElementById('featured-grid');

if (featuredGrid && typeof PROJECTS !== 'undefined') {
  const featured = PROJECTS.filter(p => p.featured).slice(0, 4);

  if (featured.length === 0) {
    featuredGrid.innerHTML = `
      <p style="color:var(--text-muted); font-family:var(--font-mono);
                font-size:var(--text-sm); grid-column:1/-1;">
        Projects incoming.
      </p>`;
  } else {
    featuredGrid.innerHTML = featured.map(buildCard).join('');
  }
}

function buildCard(p) {
  const tags = p.tags.map(t =>
    `<span class="tag">${t}</span>`
  ).join('');

  return `
    <article class="proj-card reveal" onclick="location.href='${p.url}'">
      <div class="proj-card__tags">${tags}</div>
      <h3 class="proj-card__title">${p.title}</h3>
      <p  class="proj-card__desc">${p.summary}</p>
      <div class="proj-card__footer">
        <span class="proj-card__link">View project →</span>
        <span class="proj-card__year">${p.year}</span>
      </div>
    </article>`;
}