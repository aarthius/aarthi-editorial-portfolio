// ── Scroll-reveal ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.project-card, .flip-card, .about-box, .about-image')
  .forEach(el => observer.observe(el));


// ── Nav references (needed for scroll handler) ──────────────
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');


// ── Combined scroll handler ─────────────────────────────────
window.addEventListener('scroll', () => {

  // Nav background
  nav.style.background = window.scrollY > 80
    ? 'rgba(0,0,0,0.95)'
    : 'rgba(0,0,0,0.3)';

  // Active nav link highlight
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? '#8b0000'
      : '';
  });

});


// ── Typing effect ───────────────────────────────────────────
// Cycles only the role word; the dots and surrounding text stay fixed in HTML.
// HTML subtitle should be: <p><span id="typed-role"></span></p>
// If your HTML has the full "Developer • Storyteller • Creator" as text content,
// this replaces it cleanly on first run.
const roles = ['Developer', 'Storyteller', 'Creator'];
const subtitle = document.querySelector('.hero-text p');

// Replace static text with a typed span so layout stays stable
subtitle.innerHTML = '<span id="typed-role"></span>';
const typedEl = document.getElementById('typed-role');

let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const current = roles[roleIndex % roles.length];

  if (deleting) {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
  } else {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
  }

  if (!deleting && charIndex === current.length) {
    // Pause at end of word before deleting
    deleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex++;
  }

  setTimeout(type, deleting ? 60 : 100);
}

type();


// ── Project card cursor glow ────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, #1a0003, #0d0d0d)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '#0d0d0d';
  });
});