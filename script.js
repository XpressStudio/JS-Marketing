// =========================================================
// SJ IMPORTS & EXPORTS — site interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky navbar shrink on scroll ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEls = document.querySelectorAll('.nav-links a');
  navToggle?.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinksEls.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Ambient cursor glow (desktop only) ---- */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX - 210}px, ${e.clientY - 210}px)`;
    }, { passive: true });
  }

  /* ---- Logo: fall back to initials if SJ Logo.png isn't found next to index.html ---- */
  document.querySelectorAll('.brand-mark img').forEach(img => {
    img.addEventListener('error', () => {
      const mark = img.parentElement;
      mark.textContent = 'SJ';
      mark.style.background = 'linear-gradient(135deg, #1a1e65, #00adee)';
      mark.style.color = '#fff';
      mark.style.fontFamily = "'Space Grotesk', sans-serif";
      mark.style.fontWeight = '700';
    });
  });

  /* ---- Hero video: pause gracefully if it fails to load (missing file etc.) ---- */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
    });
  }

  /* ---- Contact form: local handling (no backend wired up) ---- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const category = form.category.value;
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Enquiry: ${category} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nInterested in: ${category}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:sjmarketing06@gmail.com?subject=${subject}&body=${body}`;

    formNote.textContent = "Opening your email app to send this enquiry to sjmarketing06@gmail.com…";
  });

});
