document.addEventListener('DOMContentLoaded', () => {
  const transition = document.getElementById('pageTransition');
  const TRANSITION_MS = 700;

  // ENTRY animation
  requestAnimationFrame(() => {
    transition.getBoundingClientRect();

    setTimeout(() => {
      transition.classList.remove("cover");   // IMPORTANT FIX
      transition.classList.add("reveal");
    }, 40);
  });

  // EXIT animation (same as before)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    const lower = href.trim().toLowerCase();
    if (lower.startsWith('javascript:') || lower.startsWith('mailto:') || lower.startsWith('tel:')) return;
    if (link.hasAttribute('download')) return;
    if (link.target && link.target.toLowerCase() === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    let url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      return;
    }

    if (url.origin !== location.origin) return;
    if (url.href === location.href) return;

    e.preventDefault();

    transition.classList.remove('reveal');
    transition.classList.add('cover');

    setTimeout(() => window.location.assign(url.href), TRANSITION_MS + 10);
  });

});
