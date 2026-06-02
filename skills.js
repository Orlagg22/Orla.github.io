/* SKILLS.JS — Animate skill bars on scroll */
(function() {
  const fills = document.querySelectorAll('.skill-fill[data-pct]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.dataset.pct;
        entry.target.style.width = pct + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
})();
