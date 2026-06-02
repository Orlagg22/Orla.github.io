/* ABOUT3D.JS — 3D tilt card effect + counter animation */
(function() {
  // 3D Card tilt
  const card = document.getElementById('aboutCard');
  if (card) {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.querySelector('.card-face').style.transform =
        `perspective(800px) rotateY(${dx * 15}deg) rotateX(${-dy * 15}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.card-face').style.transform =
        'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    });
  }

  // Animated counters
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target + '+'; clearInterval(interval); }
      else { el.textContent = Math.floor(current); }
    }, 25);
  }

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(n => observer.observe(n));
})();
