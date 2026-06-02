/* LIGHTNING.JS — Shared lightning bolt drawing engine */
class LightningEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bolts = [];
    this.opts = {
      color: options.color || '#00f0ff',
      color2: options.color2 || '#0066ff',
      maxBolts: options.maxBolts || 6,
      interval: options.interval || 800,
      opacity: options.opacity || 0.8,
      ...options
    };
    this.resize();
    this.bindResize();
    this.loop();
    setInterval(() => this.spawnBolt(), this.opts.interval);
  }
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  bindResize() { window.addEventListener('resize', () => this.resize()); }
  spawnBolt() {
    if (this.bolts.length >= this.opts.maxBolts) return;
    const startX = Math.random() * this.canvas.width;
    const startY = 0;
    this.bolts.push({ points: this.generateBolt(startX, startY), life: 1, decay: 0.04 + Math.random() * 0.04 });
  }
  generateBolt(x, y) {
    const pts = [{ x, y }];
    let cx = x, cy = y;
    const steps = 15 + Math.floor(Math.random() * 20);
    for (let i = 0; i < steps; i++) {
      const nx = cx + (Math.random() - 0.5) * 120;
      const ny = cy + this.canvas.height / steps + Math.random() * 20;
      pts.push({ x: nx, y: ny });
      cx = nx; cy = ny;
    }
    return pts;
  }
  drawBolt(bolt) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = bolt.life * this.opts.opacity;
    ctx.strokeStyle = this.opts.color;
    ctx.lineWidth = 1 + bolt.life * 2;
    ctx.shadowBlur = 20 + bolt.life * 30;
    ctx.shadowColor = this.opts.color;
    ctx.beginPath();
    bolt.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
    // glow layer
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#fff';
    ctx.globalAlpha = bolt.life * 0.3;
    ctx.beginPath();
    bolt.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }
  loop() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bolts = this.bolts.filter(b => b.life > 0);
    this.bolts.forEach(b => { this.drawBolt(b); b.life -= b.decay; });
    requestAnimationFrame(() => this.loop());
  }
  destroy() { /* Stop when loader is gone */ this.stopped = true; }
}
