document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('fluid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);

  const drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function addDrop(x, y) {
    drops.push({ x, y, alpha: 1, r: 0 });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      d.r += 1;
      d.alpha *= 0.96;
      if (d.alpha < 0.01) {
        drops.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${d.alpha})`;
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', (e) => addDrop(e.clientX, e.clientY));
  canvas.addEventListener('touchmove', (e) => {
    for (const t of e.touches) addDrop(t.clientX, t.clientY);
  });

  draw();
});

