/* SCROLL.JS — Reveal on scroll animations */
(function() {
  const els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => observer.observe(el));
})();
