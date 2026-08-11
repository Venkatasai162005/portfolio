// ── Theme Toggle ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  const icon = document.getElementById('themeIcon');
  icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('vsd-theme', isLight ? 'light' : 'dark');
}
// Restore saved theme immediately on load
(function () {
  if (localStorage.getItem('vsd-theme') === 'light') {
    document.body.classList.add('light-theme');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = 'fas fa-sun';
  }
})();

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const isLight = document.body.classList.contains('light-theme');
  if (isLight) {
    nav.style.background = window.scrollY > 50 ? 'rgba(244,246,255,0.98)' : 'rgba(244,246,255,0.9)';
  } else {
    nav.style.background = window.scrollY > 50 ? 'rgba(5,8,20,0.98)' : 'rgba(5,8,20,0.8)';
  }
});

// Mobile nav
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Typewriter effect
const roles = ['AI & Data Science Engineer', 'Full Stack Developer', 'Tech Content Creator', 'ML Engineer'];
let ri = 0, ci = 0, del = false;
const subtitle = document.querySelector('.hero-subtitle');
function typeWriter() {
  const current = `&lt; ${roles[ri]} /&gt;`;
  const plain = `< ${roles[ri]} />`;
  if (!del) {
    subtitle.textContent = plain.substring(0, ci + 1);
    ci++;
    if (ci === plain.length) { del = true; setTimeout(typeWriter, 2000); return; }
  } else {
    subtitle.textContent = plain.substring(0, ci - 1);
    ci--;
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeWriter, del ? 60 : 100);
}
typeWriter();

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    btn.textContent = 'Send Message 🚀';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 4000);
  }, 1200);
}

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#a855f7' : '';
  });
});

// Particle cursor trail
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
let particles = [];
document.addEventListener('mousemove', e => {
  for (let i = 0; i < 2; i++) {
    particles.push({ x: e.clientX, y: e.clientY, size: Math.random() * 4 + 1, life: 1, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 });
  }
});
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168,85,247,${p.life * 0.6})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy; p.life -= 0.03; p.size *= 0.97;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
