const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
const mouse = { x: null, y: null, r: 120 };

function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.8 + 0.4,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  a: Math.random() * 0.5 + 0.25
}));

function draw() {
  ctx.clearRect(0,0,w,h);
  for (let p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    if (mouse.x !== null) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist < mouse.r){
        const force = (mouse.r - dist)/mouse.r;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle)*force*2.5;
        p.y += Math.sin(angle)*force*2.5;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,180,220,${p.a})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();