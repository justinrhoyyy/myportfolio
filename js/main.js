/* Main interactive behaviors: small-screen nav, smooth scrolling, contact form */
(function () {
  // Nav toggle for small screens
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      navToggle.setAttribute('aria-expanded', String(next));
      nav.style.display = next ? 'flex' : '';
      // toggle class for hamburger animation and nav open state
      navToggle.classList.toggle('open', next);
      nav.classList.toggle('open', next);
    });
  }

  // Close nav helper
  function closeNav() {
    if (!navToggle || !nav) return;
    nav.style.display = '';
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('open');
  }

  // Close on click outside (mobile)
  document.addEventListener('click', (e) => {
    if (!navToggle || !nav) return;
    const isOpen = navToggle.classList.contains('open');
    if (!isOpen) return;
    const target = e.target;
    if (target.closest && (target.closest('.nav') || target.closest('#primary-navigation'))) return;
    // clicked outside nav
    closeNav();
  });

  // Close when user scrolls up (mobile)
  let lastScroll = window.scrollY || 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    const isOpen = navToggle && navToggle.classList.contains('open');
    if (isOpen && y < lastScroll) {
      closeNav();
    }
    lastScroll = y;
  }, { passive: true });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  // No contact form on this site — contact handled via mailto / external links.
})();
