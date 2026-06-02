/* CURSOR.JS — Custom electric cursor */
(function() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }
  function animRing() {
    rx = lerp(rx, mx, 0.15);
    ry = lerp(ry, my, 0.15);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Hover states
  document.querySelectorAll('a,button,.project-card,.skill-card,.stat-box,.filter-btn,.social-icon,.contact-item,.service-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();
