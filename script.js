/* =============================================
   ALLAN CRUZ — CV WEB PROFESIONAL · script.js
   ============================================= */

/* 1. SCROLL PROGRESS */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
});

/* 2. DARK / LIGHT TOGGLE */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.replace('dark-mode', 'light-mode');
  themeIcon.className = 'fas fa-sun';
}
themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-mode');
  document.body.classList.toggle('light-mode', !isLight);
  document.body.classList.toggle('dark-mode', isLight);
  themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

/* 3. TYPING EFFECT */
const phrases = [
  'Estudiante de Ingeniería en Sistemas',
  'Soporte Técnico & Infraestructura de Red',
  'Programación · Bases de Datos · IT',
  'Apasionado por la tecnología',
  'Listo para nuevos retos profesionales'
];
let pi = 0, ci = 0, del = false;
const typingEl = document.getElementById('typing-text');
function typeEffect() {
  const cur = phrases[pi];
  if (!del) {
    typingEl.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(typeEffect, 1800); return; }
    setTimeout(typeEffect, 60);
  } else {
    typingEl.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(typeEffect, 400); return; }
    setTimeout(typeEffect, 35);
  }
}
setTimeout(typeEffect, 800);

/* 4. FADE-IN */
function activate(el) {
  el.classList.add('visible');
  el.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.width + '%');
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { activate(e.target); observer.unobserve(e.target); } });
}, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
/* Fallback 2s */
setTimeout(() => document.querySelectorAll('.fade-in:not(.visible)').forEach(activate), 2000);

/* 5. BACK TO TOP */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => backToTop && backToTop.classList.toggle('visible', window.scrollY > 350));
backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* 6. MODAL */
const langTrigger = document.getElementById('lang-trigger');
const langModal = document.getElementById('lang-modal');
const modalClose = document.getElementById('modal-close');
if (langTrigger && langModal && modalClose) {
  const open  = () => { langModal.style.display = 'flex'; document.body.style.overflow = 'hidden'; };
  const close = () => { langModal.style.display = 'none';  document.body.style.overflow = ''; };
  langTrigger.addEventListener('click', open);
  modalClose.addEventListener('click', close);
  langModal.addEventListener('click', e => { if (e.target === langModal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* 7. PARTICLES */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
resize(); window.addEventListener('resize', resize);
const pts = Array.from({length: 55}, () => ({
  x: Math.random()*canvas.width, y: Math.random()*canvas.height,
  vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
  s:Math.random()*1.8+.5, a:Math.random()*.5+.1
}));
(function anim() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pts.forEach(p => {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width||p.y<0||p.y>canvas.height){p.x=Math.random()*canvas.width;p.y=Math.random()*canvas.height;}
    ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle=`rgba(79,195,247,${p.a})`;ctx.fill();
  });
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
    const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
    if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(79,195,247,${(1-d/130)*.15})`;ctx.lineWidth=.7;ctx.stroke();}
  }
  requestAnimationFrame(anim);
})();

/* 8. SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});

/* 9. CARD TILT */
document.querySelectorAll('.timeline-card,.info-card,.lang-card,.contact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r=card.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
    const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
    card.style.transform=`perspective(600px) rotateX(${dy*-3}deg) rotateY(${dx*3}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

console.log('%c Allan Cruz · CV Web · 2026 ','background:#4FC3F7;color:#0a0e17;font-weight:800;font-size:14px;padding:6px 12px;border-radius:4px;');
