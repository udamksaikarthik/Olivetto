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

    reviews.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to review ${i + 1}`);
      b.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    const goTo = (index) => {
      current = (index + reviews.length) % reviews.length;
      track.style.transform = `translateX(${-current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });

    const startAuto = () => { auto = setInterval(() => goTo(current + 1), 5500); };
    const resetAuto = () => { clearInterval(auto); startAuto(); };
    const stopAuto  = () => { clearInterval(auto); };

    const reviewsSection = track.closest('.reviews');
    if (reviewsSection) {
      reviewsSection.addEventListener('mouseenter', stopAuto);
      reviewsSection.addEventListener('mouseleave', startAuto);
    }

    let revTouchX = null;
    track.addEventListener('touchstart', e => { revTouchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      if (revTouchX === null) return;
      const dx = e.changedTouches[0].clientX - revTouchX;
      if (Math.abs(dx) > 40) { dx < 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
      revTouchX = null;
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* -------- Hero image slider -------- */
  const heroSlides = Array.from(document.querySelectorAll('.hero__slide'));
  const heroDotWrap = document.getElementById('heroIndicators');

  if (heroSlides.length > 1 && heroDotWrap) {
    let hIdx = 0;
    let hTimer;
    const hDots = [];

    heroSlides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Slide ${i + 1}`);
      b.classList.toggle('active', i === 0);
      b.addEventListener('click', () => { goHero(i); resetHeroTimer(); });
      heroDotWrap.appendChild(b);
      hDots.push(b);
    });

    const goHero = (i) => {
      heroSlides[hIdx].classList.remove('is-active');
      hIdx = (i + heroSlides.length) % heroSlides.length;
      heroSlides[hIdx].classList.add('is-active');
      hDots.forEach((d, j) => d.classList.toggle('active', j === hIdx));
    };

    const startHeroTimer = () => { hTimer = setInterval(() => goHero(hIdx + 1), 5500); };
    const resetHeroTimer = () => { clearInterval(hTimer); startHeroTimer(); };

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(hTimer));
      heroSection.addEventListener('mouseleave', startHeroTimer);
    }

    startHeroTimer();
  }

  /* -------- Gallery slider -------- */
  const galTrack  = document.getElementById('galleryTrack');
  const galPrev   = document.getElementById('galPrev');
  const galNext   = document.getElementById('galNext');
  const galDotsEl = document.getElementById('galDots');

  if (galTrack && galPrev && galNext) {
    const galSlides = Array.from(galTrack.children);
    let galIdx = 0;
    const galDots = [];

    if (galDotsEl) {
      galSlides.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Image ${i + 1}`);
        b.classList.toggle('active', i === 0);
        b.addEventListener('click', () => goGal(i));
        galDotsEl.appendChild(b);
        galDots.push(b);
      });
    }

    const goGal = (i) => {
      galIdx = (i + galSlides.length) % galSlides.length;
      galTrack.style.transform = `translateX(${-galIdx * 100}%)`;
      galDots.forEach((d, j) => d.classList.toggle('active', j === galIdx));
    };

    galPrev.addEventListener('click', () => goGal(galIdx - 1));
    galNext.addEventListener('click', () => goGal(galIdx + 1));

    const galVP = galTrack.parentElement;
    let galTouchX = null;
    galVP.addEventListener('touchstart', e => { galTouchX = e.touches[0].clientX; }, { passive: true });
    galVP.addEventListener('touchend', e => {
      if (galTouchX === null) return;
      const dx = e.changedTouches[0].clientX - galTouchX;
      if (Math.abs(dx) > 40) { dx < 0 ? goGal(galIdx + 1) : goGal(galIdx - 1); }
      galTouchX = null;
    }, { passive: true });
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
