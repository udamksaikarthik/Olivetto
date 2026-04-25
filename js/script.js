/* =====================================================
   Olivetto · script.js
   - Mobile menu toggle
   - Sticky nav scroll state
   - Smooth scroll-reveal on scroll
   - Menu card click toggle (color stays on tap)
   - Reviews carousel (dots + arrows + auto-advance)
   - Footer year
   ===================================================== */

(() => {
  'use strict';

  /* -------- Footer year -------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Sticky nav scroll state -------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile menu toggle -------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    const closeMenu = () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on resize up to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* -------- Scroll reveal (IntersectionObserver) -------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* -------- Menu card click toggle (so colour change stays on tap) -------- */
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle clicked card; remove from others (single-active behaviour)
      const wasActive = card.classList.contains('active');
      cards.forEach(c => c.classList.remove('active'));
      if (!wasActive) card.classList.add('active');
    });
    // keyboard: enter/space toggles
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* -------- Reviews carousel -------- */
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('revPrev');
  const nextBtn = document.getElementById('revNext');
  const dotsWrap = document.getElementById('revDots');

  if (track && prevBtn && nextBtn && dotsWrap) {
    const reviews = Array.from(track.querySelectorAll('.review'));
    let current = 0;
    let auto;

    // Build dots
    reviews.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to review ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    const visibleCount = () => {
      const w = window.innerWidth;
      if (w < 700) return 1;
      if (w < 1000) return 2;
      return 3;
    };

    const goTo = (index) => {
      const max = Math.max(0, reviews.length - visibleCount());
      current = Math.max(0, Math.min(index, max));
      const target = reviews[current];
      if (!target) return;
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      updateDots();
    };

    const updateDots = () => {
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    nextBtn.addEventListener('click', () => goTo(current + 1));
    prevBtn.addEventListener('click', () => goTo(current - 1));

    // Sync on manual scroll
    let scrollTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const closest = reviews.reduce((acc, r, i) => {
          const dist = Math.abs(r.offsetLeft - track.offsetLeft - track.scrollLeft);
          return dist < acc.dist ? { i, dist } : acc;
        }, { i: 0, dist: Infinity });
        current = closest.i;
        updateDots();
      }, 120);
    }, { passive: true });

    // Auto-advance (pause on hover/focus)
    const startAuto = () => {
      stopAuto();
      auto = setInterval(() => {
        const max = Math.max(0, reviews.length - visibleCount());
        const next = current >= max ? 0 : current + 1;
        goTo(next);
      }, 5500);
    };
    const stopAuto = () => { if (auto) clearInterval(auto); };

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    track.addEventListener('focusin', stopAuto);
    track.addEventListener('focusout', startAuto);

    window.addEventListener('resize', () => goTo(current));
    updateDots();
    startAuto();
  }

  /* -------- Smooth in-page scroll with nav offset compensation -------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
