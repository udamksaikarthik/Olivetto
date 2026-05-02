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

  /* -------- Tripadvisor reviews carousel -------- */
  const track2   = document.getElementById('reviewsTrack2');
  const prevBtn2 = document.getElementById('revPrev2');
  const nextBtn2 = document.getElementById('revNext2');
  const dotsWrap2 = document.getElementById('revDots2');

  if (track2 && prevBtn2 && nextBtn2 && dotsWrap2) {
    const reviews2 = Array.from(track2.querySelectorAll('.review'));
    let current2 = 0;
    let auto2;

    reviews2.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to review ${i + 1}`);
      b.addEventListener('click', () => { goTo2(i); resetAuto2(); });
      dotsWrap2.appendChild(b);
    });
    const dots2 = Array.from(dotsWrap2.children);

    const goTo2 = (index) => {
      current2 = (index + reviews2.length) % reviews2.length;
      track2.style.transform = `translateX(${-current2 * 100}%)`;
      dots2.forEach((d, i) => d.classList.toggle('active', i === current2));
    };

    nextBtn2.addEventListener('click', () => { goTo2(current2 + 1); resetAuto2(); });
    prevBtn2.addEventListener('click', () => { goTo2(current2 - 1); resetAuto2(); });

    const startAuto2 = () => { auto2 = setInterval(() => goTo2(current2 + 1), 6200); };
    const resetAuto2 = () => { clearInterval(auto2); startAuto2(); };

    let revTouchX2 = null;
    track2.addEventListener('touchstart', e => { revTouchX2 = e.touches[0].clientX; }, { passive: true });
    track2.addEventListener('touchend', e => {
      if (revTouchX2 === null) return;
      const dx = e.changedTouches[0].clientX - revTouchX2;
      if (Math.abs(dx) > 40) { dx < 0 ? goTo2(current2 + 1) : goTo2(current2 - 1); resetAuto2(); }
      revTouchX2 = null;
    }, { passive: true });

    goTo2(0);
    startAuto2();
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

  /* -------- Menu pages slider -------- */
  const mpTrack  = document.getElementById('menuPagesTrack');
  const mpPrev   = document.getElementById('mpPrev');
  const mpNext   = document.getElementById('mpNext');
  const mpDotsEl = document.getElementById('mpDots');
  const mpCount  = document.getElementById('mpCounter');

  if (mpTrack && mpPrev && mpNext) {
    const mpSlides = Array.from(mpTrack.children);
    let mpIdx = 0;
    const mpDots = [];

    if (mpDotsEl) {
      mpSlides.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Menu page ${i + 1}`);
        b.classList.toggle('active', i === 0);
        b.addEventListener('click', () => goMp(i));
        mpDotsEl.appendChild(b);
        mpDots.push(b);
      });
    }

    const goMp = (i) => {
      mpIdx = (i + mpSlides.length) % mpSlides.length;
      mpTrack.style.transform = `translateX(${-mpIdx * 100}%)`;
      mpDots.forEach((d, j) => d.classList.toggle('active', j === mpIdx));
      if (mpCount) mpCount.textContent = `${mpIdx + 1} / ${mpSlides.length}`;
    };

    mpPrev.addEventListener('click', () => goMp(mpIdx - 1));
    mpNext.addEventListener('click', () => goMp(mpIdx + 1));

    const mpVP = mpTrack.closest('.menu-pages__viewport');
    let mpTouchX = null;
    mpVP.addEventListener('touchstart', e => { mpTouchX = e.touches[0].clientX; }, { passive: true });
    mpVP.addEventListener('touchend', e => {
      if (mpTouchX === null) return;
      const dx = e.changedTouches[0].clientX - mpTouchX;
      if (Math.abs(dx) > 40) dx < 0 ? goMp(mpIdx + 1) : goMp(mpIdx - 1);
      mpTouchX = null;
    }, { passive: true });
  }

  /* -------- Ribbon marquee — pixel-accurate, starts after fonts load -------- */
  const ribbonTrack = document.querySelector('.hero__ribbon-track');
  if (ribbonTrack) {
    const startRibbon = () => {
      const shift = Math.round(ribbonTrack.scrollWidth / 4);
      ribbonTrack.style.setProperty('--ribbon-shift', `-${shift}px`);
      ribbonTrack.style.animationPlayState = 'running';
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startRibbon);
    } else {
      window.addEventListener('load', startRibbon);
    }
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

  /* -------- On The Menu — tabbed category slider -------- */
  const menuTabsEl  = document.getElementById('menuTabs');
  const menuTrackEl = document.getElementById('menuTrack');
  const menuPrevEl  = document.getElementById('menuPrev');
  const menuNextEl  = document.getElementById('menuNext');
  const menuDotsEl  = document.getElementById('menuDots');

  const menuData = [
    {
      label: 'Starters', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Soup of the Day',    desc: 'Chef\'s freshly made soup served with warm artisan bread' },
        { name: 'Flatbread',          desc: 'Freshly baked flatbread with olive oil and balsamic dip' },
        { name: 'Potato Skins',       desc: 'Crispy skins loaded with melted cheese and sour cream' },
        { name: 'Bruschetta',         desc: 'Grilled sourdough, vine tomatoes, basil, extra virgin olive oil' },
        { name: 'Garlic Mushrooms',   desc: 'Pan-fried mushrooms in garlic butter with crusty bread' },
        { name: 'Garlic Bread',       desc: 'Stone-baked ciabatta with herb garlic butter' },
        { name: 'Mussels',            desc: 'Fresh mussels in white wine, garlic and cream sauce' },
        { name: 'Nachos',             desc: 'Corn tortilla chips, melted cheese, salsa and sour cream' },
        { name: 'Anti Pasto',         desc: 'Italian cured meats, olives and marinated vegetables' },
        { name: 'Loaded Royal',       desc: 'Crispy loaded starter with our chef\'s signature topping' },
        { name: 'Spicy Prawns',       desc: 'King prawns in a fiery chilli and garlic sauce' },
        { name: 'Prawn Cocktail',     desc: 'Classic Marie Rose sauce with fresh prawns on crisp salad' },
        { name: 'Smoked Salmon',      desc: 'Scottish smoked salmon with capers and cream cheese' },
        { name: 'Arancini',           desc: 'Golden Sicilian rice balls with a mozzarella heart' },
        { name: 'Black Pudding',      desc: 'Pan-fried black pudding with red onion marmalade' },
        { name: 'Goats Cheese',       desc: 'Warm goats cheese with caramelised onion and dressed leaves' },
        { name: 'Calamari',           desc: 'Lightly battered calamari with lemon and aioli dip' },
        { name: 'Pâté',              desc: 'Smooth chicken liver pâté with toasted brioche and chutney' },
        { name: 'Caprese Salad',      desc: 'Buffalo mozzarella, heritage tomatoes, basil, aged balsamic' },
      ]
    },
    {
      label: 'Pizzas', img: 'Images/Pizzas/Pizza.jpeg',
      items: [
        { name: 'Margherita',                desc: 'San Marzano tomato, fior di latte mozzarella, fresh basil' },
        { name: 'Pescatora',                 desc: 'Tomato base, mixed seafood, garlic and white wine' },
        { name: 'Vegetariana',               desc: 'Roasted Mediterranean vegetables, tomato, mozzarella' },
        { name: 'Hawaiian',                  desc: 'Tomato, mozzarella, ham, pineapple' },
        { name: 'Prosciutto Funghi',         desc: 'Prosciutto di Parma, mushrooms, mozzarella' },
        { name: 'Diavolo',                   desc: 'Spicy nduja, fresh chilli, tomato, mozzarella' },
        { name: 'BBQ',                       desc: 'BBQ sauce base, chicken, red onion, mozzarella' },
        { name: 'Quattro Stagioni',          desc: 'Ham, mushrooms, artichoke, olives — four seasons classic' },
        { name: 'Calzone',                   desc: 'Folded pizza with ricotta, ham and mozzarella' },
        { name: 'Hotshot Calzone',           desc: 'Folded pizza with a fiery spicy filling' },
        { name: 'Pepperoni',                 desc: 'Classic tomato base loaded with Italian pepperoni' },
        { name: 'Pollo',                     desc: 'Grilled chicken, peppers, red onion, mozzarella' },
        { name: 'Bolognese Pizza',           desc: 'Slow-cooked beef ragu, mozzarella on a tomato base' },
        { name: 'Half Pizza / Half Pasta',   desc: 'Choose your favourite half pizza and half pasta combo' },
        { name: 'Half Parmo / Half Pasta',   desc: 'Teesside\'s finest — half parmo and half pasta' },
      ]
    },
    {
      label: 'Pasta', img: 'Images/Pizzas/Pizza%20and%20Past%20Bowl.jpeg',
      items: [
        { name: 'Traditional Bolognese',    desc: 'Slow-cooked beef ragu with tagliatelle and parmesan' },
        { name: 'Tagliatelle Piccante',     desc: 'Spicy tomato and chilli sauce with fresh tagliatelle' },
        { name: 'Lasagne',                  desc: 'Classic layered pasta with rich beef ragu and béchamel' },
        { name: 'Tagliatelle Alla Pepe',    desc: 'Freshly ground black pepper cream sauce, tagliatelle' },
        { name: 'Gnocchetti Sardi',         desc: 'Sardinian pasta with a rich tomato and herb sauce' },
        { name: 'Tagliatelle Carbonara',    desc: 'Guanciale, egg yolk, pecorino — the Roman classic' },
        { name: 'Penne Arrabbiata',         desc: 'Penne in a fiery garlic and tomato sauce' },
        { name: 'Penne Pollo',              desc: 'Penne with grilled chicken in a tomato cream sauce' },
        { name: 'Penne Alfredo',            desc: 'Penne in a rich Parmesan cream sauce' },
        { name: 'Penne 4 Formaggi',         desc: 'Penne in a luxurious four-cheese sauce' },
        { name: 'Pollo Italiano',           desc: 'Chicken with penne in a white wine and herb cream sauce' },
      ]
    },
    {
      label: 'Specials', img: 'Images/Pizzas/Pizza%20and%20Past%20Bowl.jpeg',
      items: [
        { name: 'Tagliatelle Salmon',               desc: 'Fresh salmon with tagliatelle in a dill cream sauce' },
        { name: 'Seafood Linguine',                  desc: 'Linguine with mixed seafood in a garlic white wine sauce' },
        { name: 'Linguine Con Gamberoni & Pollo',    desc: 'King prawns and chicken with linguine in cream sauce' },
        { name: 'Tagliate Al Pepe',                  desc: 'Sliced steak with tagliatelle in a black pepper cream sauce' },
        { name: 'Risotto Alla Pescatora',            desc: 'Creamy Arborio risotto with a medley of fresh seafood' },
        { name: 'Risotto Ai Frutti Di Mare',         desc: 'Rich risotto loaded with fruits of the sea' },
      ]
    },
    {
      label: 'Chicken', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Panfried Chicken',              desc: 'Lightly floured breast pan-fried to golden perfection' },
        { name: 'Pollo Milano',                  desc: 'Chicken in a rich tomato, olive and caper sauce' },
        { name: 'Pollo Pescatora',               desc: 'Chicken with mixed seafood in a white wine tomato sauce' },
        { name: 'Pollo Gamberoni Thermidor',     desc: 'Chicken with king prawns in a Thermidor cream sauce' },
        { name: 'Fajita Mexicana',               desc: 'Sizzling chicken strips with peppers and salsa' },
        { name: 'Pollo Alla Crema',              desc: 'Chicken breast in a light cream and herb sauce' },
        { name: 'Pollo Al Pepe',                 desc: 'Chicken breast in a rich black pepper cream sauce' },
        { name: 'Pollo Al Diane',                desc: 'Classic Diane sauce with cream, mustard and brandy' },
        { name: 'Pollo Al Pesto',                desc: 'Chicken breast in a vibrant Genovese basil pesto sauce' },
        { name: 'Pollo Gorgonzola',              desc: 'Chicken with a bold blue cheese and cream sauce' },
      ]
    },
    {
      label: 'Steaks', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Fillet Semplice',     desc: 'Prime fillet steak with a classic red wine jus' },
        { name: 'Fillet Al Pepe',      desc: 'Fillet steak with a rich peppercorn cream sauce' },
        { name: 'Fillet Diane',        desc: 'Fillet in a classic Diane sauce with brandy and cream' },
        { name: 'Fillet Pescatora',    desc: 'Fillet steak topped with mixed seafood and tomato sauce' },
        { name: 'Fillet Surf & Turf', desc: 'Fillet steak with king prawns in garlic butter' },
        { name: 'Sirloin Semplice',    desc: 'Aged sirloin with peppercorn jus and seasonal vegetables' },
        { name: 'Sirloin Al Pepe',     desc: 'Sirloin steak with a bold peppercorn cream sauce' },
        { name: 'Sirloin Diane',       desc: 'Sirloin in a classic Diane with brandy and mushrooms' },
        { name: 'Sirloin Dolce Latte', desc: 'Sirloin with a velvety Gorgonzola Dolcelatte sauce' },
        { name: 'Sirloin Pescatora',   desc: 'Sirloin steak with a mixed seafood and tomato topping' },
        { name: 'Sirloin Surf & Turf',desc: 'Sirloin steak with king prawns and garlic butter' },
      ]
    },
    {
      label: 'Parmo', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Traditional Parmo',  desc: 'Teesside\'s original — breaded chicken, béchamel, cheese' },
        { name: 'Bolognese Parmo',    desc: 'Parmo topped with slow-cooked beef ragu' },
        { name: 'Hot Shot Parmo',     desc: 'Parmo with a fiery spicy topping' },
        { name: 'Kiev Parmo',         desc: 'Parmo with a garlic butter Kiev-style filling' },
      ]
    },
    {
      label: 'Seafood', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Sea Bass',               desc: 'Pan-seared sea bass fillet with lemon and caper dressing' },
        { name: 'Salmon Pescatora',       desc: 'Salmon fillet with mixed seafood and tomato sauce' },
        { name: 'Fish & Chips',           desc: 'Classic battered haddock with thick-cut chips and mushy peas' },
        { name: 'Gamberoni Dolce Latte',  desc: 'King prawns in a rich Gorgonzola cream sauce' },
        { name: 'Mussels Arrabbiata',     desc: 'Fresh mussels in a spicy tomato and chilli sauce' },
        { name: 'Scampi',                 desc: 'Breaded scampi with chips, tartare sauce and lemon' },
      ]
    },
    {
      label: 'Burgers', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Plain Burger',         desc: 'Prime beef patty in a brioche bun with house sauce and salad' },
        { name: 'Cheese Burger',        desc: 'Beef patty with melted cheddar in a toasted brioche bun' },
        { name: 'Goats Cheese Burger',  desc: 'Beef patty topped with creamy warm goats cheese' },
        { name: 'Pancetta Burger',      desc: 'Beef patty with crispy pancetta and smoked cheese' },
        { name: 'Caramelised Burger',   desc: 'Beef patty with sweet caramelised onions and brie' },
        { name: 'Pineapple Burger',     desc: 'Beef patty with grilled pineapple and BBQ glaze' },
        { name: 'Tower Burger',         desc: 'The ultimate stacked burger — beef, cheese, bacon and more' },
      ]
    },
    {
      label: 'Breakfast', img: 'Images/Dishes/Breakfast/Breakfast.jpeg',
      items: [
        { name: 'Full English',                      desc: 'Bacon, eggs, sausage, beans, toast and all the trimmings' },
        { name: 'Scrambled Egg on Toast',             desc: 'Silky scrambled eggs on thick-cut buttered toast' },
        { name: 'Scrambled Egg with Bacon & Sausage', desc: 'Scrambled eggs with crispy bacon and sausage' },
        { name: 'Poached Egg on Toast',               desc: 'Perfectly poached eggs on sourdough toast' },
        { name: 'Beans on Toast',                     desc: 'Classic baked beans on thick buttered toast' },
        { name: 'Scrambled Egg & Salmon',             desc: 'Creamy scrambled eggs with smoked Scottish salmon' },
        { name: 'Omelette',                           desc: 'Fluffy omelette with your choice of fillings' },
      ]
    },
    {
      label: 'Sides', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Mixed Salad',          desc: 'Fresh seasonal leaves with house dressing' },
        { name: 'Chips / French Fries', desc: 'Crispy golden chips or thin-cut fries' },
        { name: 'Green Salad',          desc: 'Crisp greens with a light lemon vinaigrette' },
        { name: 'Tomato & Onion Salad', desc: 'Fresh tomatoes and red onion with balsamic glaze' },
        { name: 'Steamed Arborio Rice', desc: 'Lightly seasoned Italian short-grain rice' },
        { name: 'Salted New Potatoes',  desc: 'Baby new potatoes with butter and sea salt' },
      ]
    },
  ];

  if (menuTabsEl && menuTrackEl && menuPrevEl && menuNextEl && menuDotsEl) {
    let activeCat  = 0;
    let activePage = 0;

    const cardsPerView = () => window.innerWidth >= 960 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const numPages     = () => Math.ceil(menuData[activeCat].items.length / cardsPerView());

    const buildTabs = () => {
      menuTabsEl.innerHTML = '';
      menuData.forEach((cat, i) => {
        const btn = document.createElement('button');
        btn.className = 'menu__tab' + (i === activeCat ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', String(i === activeCat));
        btn.textContent = cat.label;
        btn.addEventListener('click', () => {
          activeCat  = i;
          activePage = 0;
          buildTabs();
          renderCards();
        });
        menuTabsEl.appendChild(btn);
      });
    };

    const renderCards = () => {
      const cat = menuData[activeCat];
      menuTrackEl.innerHTML = '';
      cat.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu__item-card';
        card.innerHTML =
          '<div class="menu__item-inner">' +
            '<div class="menu__item-img">' +
              '<img src="' + cat.img + '" alt="' + item.name + '" loading="lazy">' +
            '</div>' +
            '<div class="menu__item-body">' +
              '<h3 class="menu__item-name">' + item.name + '</h3>' +
              '<p class="menu__item-desc">' + item.desc + '</p>' +
            '</div>' +
          '</div>';
        menuTrackEl.appendChild(card);
      });
      buildDots();
      goToPage(0);
    };

    const buildDots = () => {
      menuDotsEl.innerHTML = '';
      const total = numPages();
      if (total <= 1) return;
      for (let i = 0; i < total; i++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Page ' + (i + 1));
        b.classList.toggle('active', i === activePage);
        b.addEventListener('click', () => goToPage(i));
        menuDotsEl.appendChild(b);
      }
    };

    const updateDots = () => {
      Array.from(menuDotsEl.children).forEach((d, i) => d.classList.toggle('active', i === activePage));
    };

    const updateArrows = () => {
      menuPrevEl.disabled = activePage === 0;
      menuNextEl.disabled = activePage >= numPages() - 1;
    };

    const goToPage = (p) => {
      activePage = Math.max(0, Math.min(p, numPages() - 1));
      menuTrackEl.style.transform = 'translateX(' + (-activePage * 100) + '%)';
      updateDots();
      updateArrows();
    };

    menuPrevEl.addEventListener('click', () => goToPage(activePage - 1));
    menuNextEl.addEventListener('click', () => goToPage(activePage + 1));

    let mTouchX = null;
    menuTrackEl.addEventListener('touchstart', e => { mTouchX = e.touches[0].clientX; }, { passive: true });
    menuTrackEl.addEventListener('touchend', e => {
      if (mTouchX === null) return;
      const dx = e.changedTouches[0].clientX - mTouchX;
      if (Math.abs(dx) > 40) { dx < 0 ? goToPage(activePage + 1) : goToPage(activePage - 1); }
      mTouchX = null;
    }, { passive: true });

    let mResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(mResizeTimer);
      mResizeTimer = setTimeout(() => { buildDots(); goToPage(activePage); }, 200);
    });

    buildTabs();
    renderCards();
  }

})();
