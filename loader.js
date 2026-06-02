/* LOADER.JS — 25-second animated loading screen */
(function() {
  const DURATION = 25000; // 25 seconds
  const loaderEl = document.getElementById('loader');
  const siteEl = document.getElementById('site');
  const barEl = document.getElementById('loaderBar');
  const percentEl = document.getElementById('loaderPercent');
  const taglineEl = document.getElementById('loaderTagline');
  const codeEl = document.getElementById('loaderCode');

  // Boot lightning
  const loaderCanvas = document.getElementById('lightningLoader');
  new LightningEngine(loaderCanvas, { maxBolts: 8, interval: 600, opacity: 0.9 });

  const steps = [
    { at: 0,    msg: 'Inicializando núcleo del sistema...',  code: 'import { Dev } from "./orlando.js"' },
    { at: 8,    msg: 'Cargando módulos de diseño...',        code: 'const design = new UIEngine({ theme: "electric" })' },
    { at: 18,   msg: 'Compilando animaciones 3D...',         code: 'WebGL.init(canvas, { antialiasing: true })' },
    { at: 28,   msg: 'Conectando con el servidor...',        code: 'fetch("/api/portfolio").then(r => r.json())' },
    { at: 38,   msg: 'Montando componentes interactivos...', code: 'ReactDOM.render(<Portfolio />, root)' },
    { at: 50,   msg: 'Procesando partículas lightning....',  code: 'LightningEngine.spawn({ bolts: 12, speed: 0.8 })' },
    { at: 62,   msg: 'Aplicando efectos visuales...',        code: 'ShaderProgram.compile(vertexSrc, fragmentSrc)' },
    { at: 74,   msg: 'Optimizando rendimiento...',           code: 'Performance.mark("portfolio-ready")' },
    { at: 85,   msg: 'Última verificación del sistema...',   code: 'System.check({ errors: 0, warnings: 0 })' },
    { at: 95,   msg: '¡Todo listo! Bienvenido.',             code: '// Portfolio loaded successfully ✓' }
  ];

  let start = null;
  let lastStep = -1;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function tick(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const rawProgress = Math.min(elapsed / DURATION, 1);
    const progress = easeInOut(rawProgress);
    const pct = Math.floor(progress * 100);

    // Update bar
    barEl.style.width = pct + '%';
    percentEl.textContent = pct + '%';

    // Update step messages
    for (let i = steps.length - 1; i >= 0; i--) {
      if (pct >= steps[i].at && i > lastStep) {
        lastStep = i;
        taglineEl.textContent = steps[i].msg;
        if (codeEl) {
          codeEl.textContent = '> ' + steps[i].code;
          codeEl.style.animation = 'none';
          codeEl.offsetHeight; // reflow
          codeEl.style.animation = 'fadeCodeIn 0.3s ease';
        }
        break;
      }
    }

    if (rawProgress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Done — fade out loader, reveal site
      setTimeout(() => {
        loaderEl.classList.add('fade-out');
        siteEl.classList.remove('site-hidden');
        siteEl.classList.add('site-visible');
        // Start bg lightning
        setTimeout(() => {
          const bgCanvas = document.getElementById('bgCanvas');
          new LightningEngine(bgCanvas, {
            maxBolts: 5,
            interval: 1200,
            opacity: 0.25,
            color: '#00f0ff',
            color2: '#7c3aed'
          });
        }, 200);
      }, 400);
    }
  }

  requestAnimationFrame(tick);
})();
