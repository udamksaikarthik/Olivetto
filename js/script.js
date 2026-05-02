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
        { name: 'SOUP OF THE DAY',    desc: 'Tomato, basil and mozzarella with crusty bread.' },
        { name: 'Flatbread',          desc: 'Fresh oven baked bread served with butter and marinated olives.' },
        { name: 'Potato Skins',       desc: 'Deep fried potato skins, served with a sweet chilli and garlic mayo.' },
        { name: 'Bruschetta',         desc: 'Diced tomato, fresh basil and onion, marinated in extra virgin olive oil, with mozzarella and balsamic glaze.' },
        { name: 'Garlic Mushrooms',   desc: 'Pan fried mushrooms in garlic white wine and double cream.Topped with parmesan, served with crusty bread.' },
        { name: 'Garlic Bread',       desc: 'Thin Italian crusty pizza with a choice of garlic, cheese, tomato or cheese and tomato.' },
        { name: 'Mussels Arrabbiata OR Mariniere',            desc: 'Mussels with chilli arrabbiata sauce or white wine, garlic and cream.' },
        { name: 'Nachos Mexicana',             desc: 'Crispy nachos with Napoli sauce, cheddar cheese, bolognese sauce, jalapenos, salsa, sour cream and guacamole.' },
        { name: 'Anti Pasto Del Contadino',         desc: 'Italian cured meats served with pickles, olives and bread.' },
        { name: 'Loaded Royal',       desc: 'Potato skins topped with our homemade bolognese sauce and cheddar cheese.' },
        { name: 'Spicy Prawns',       desc: 'Deep fried spicy prawns in breadcrumbs, served with a sweet chilli and garlic mayo.' },
        { name: 'Prawn Cocktail',     desc: 'Fresh prawns on a bed of lettuce topped with marie rose sauce, served with bread and butter.' },
        { name: 'Smoked Salmon',      desc: 'Diced smoked salmon, with mascarpone cheese, dill and lemon juice, served on toasted bread with mango sauce and baby prawns.' },
        { name: 'Arancini',           desc: 'Fried risotto balls with wild mushrooms, truffle, parmesan and arrabbiata sauce.' },
        { name: 'Black Pudding',      desc: 'Black pudding with battered goats cheese, topped with marmalade onions with a balsamic glaze.' },
        { name: 'Goats Cheese',       desc: 'Halloumi and goats cheese in breadcrumbs with hazelnuts, drizzled in honey and mixed berries.' },
        { name: 'Calamari',           desc: 'Deep fried squid rings served with a sweet chilli and garlic mayo.' },
        { name: 'Pâté',              desc: 'Chicken liver pate served with marmalade onions with toasted bread and balsamic glaze.' },
        { name: 'Caprese Salad',      desc: 'Buffalo mozzarella with beef tomatoes drizzled in extra virgin olive oil with fresh basil and drizzled with balsamic vinegar.' },
      ]
    },
    {
      label: 'Pizzas', img: 'Images/Pizzas/Pizza.jpeg',
      items: [
        { name: 'Margherita',                desc: 'Mozzarella cheese and tomato sauce.' },
        { name: 'Pescatora',                 desc: 'Mediterranean mixed seafood.' },
        { name: 'Vegetariana',               desc: 'Mushrooms, peppers, onions and olives artichokes.' },
        { name: 'Hawaiian',                  desc: 'Cheese, tomato sauce, ham and pineapple.' },
        { name: 'Prosciutto Funghi',         desc: 'Ham and mushroom.' },
        { name: 'Diavolo',                   desc: 'Pepperoni, parma ham and jalapeños.' },
        { name: 'BBQ',                       desc: 'Cheese, tomato sauce, bbq sauce, chicken and pancetta.' },
        { name: 'Quattro Stagioni',          desc: 'Ham, mushrooms, olives and artichokes.' },
        { name: 'Calzone',                   desc: 'Folded pizza, ham, mushrooms and spinach, served with Napoli sauce and cheese.' },
        { name: 'Hotshot Calzone',           desc: 'Folded pizza, parma ham, mushroom, pepperoni and jalapeños, served with Napoli sauce and cheese.' },
        { name: 'Pepperoni',                 desc: 'Cheese, tomato base and pepperoni.' },
        { name: 'Pollo',                     desc: 'Cheese, tomato sauce, chicken and bbq sauce.' },
        { name: 'Bolognese Pizza',           desc: 'Cheese, tomato and homemade bolognese sauce.' },
        { name: 'Half Pizza / Half Pasta',   desc: 'Choose your favourite half pizza and half pasta combo' },
        { name: 'Half Parmo / Half Pasta',   desc: 'Teesside\'s finest — half parmo and half pasta' },
      ]
    },
    {
      label: 'Pasta', img: 'Images/Pizzas/Pizza%20and%20Past%20Bowl.jpeg',
      items: [
        { name: 'Traditional Bolognese',    desc: 'Spaghetti pasta cooked with our delicious homemade bolognese sauce.' },
        { name: 'Tagliatelle Piccante',     desc: 'Tagliatelle pasta cooked with chicken, onions, fresh tomato, extra virgin olive oil, garlic and chilli flakes.' },
        { name: 'Lasagne',                  desc: 'Layers of oven baked pasta filled with bolognese, tomato sauce, topped with béchamel sauce cheese.' },
        { name: 'Tagliatelle Alla Pepe',    desc: 'Tagliatelle cooked in garlic butter, chicken, with a homemade peppercorn sauce.' },
        { name: 'Gnocchetti Sardi',         desc: 'Traditional Italian short pasta tossed with spiced sausages and Napoli sauce.' },
        { name: 'Tagliatelle Carbonara',    desc: 'Pasta ribbons cooked with pancetta, onions, black pepper and garlic in a creamy sauce. Finished with parmesan cheese.' },
        { name: 'Penne Arrabbiata',         desc: 'Penne pasta cooked with onions, garlic, tomato, extra virgin olive oil, chilli and olives.' },
        { name: 'Penne Pollo',              desc: 'Penne pasta cooked in a creamy tomato sauce with mushrooms, onions, chicken and herbs.' },
        { name: 'Penne Alfredo',            desc: 'Penne pasta cooked with chicken, mushroom and onions in a creamy pesto and garlic.' },
        { name: 'Penne 4 Formaggi',         desc: 'Penne pasta cooked with creamy sauce, onion, garlic, cheddar cheese, parmesan, mozzarella cheese and blue cheese.' },
        { name: 'Pollo Italiano',           desc: 'Tender marinated pieces of chicken cooked with onion, sliced mushrooms, simmered in delight tomato sauce, served with tagliatelle pasta.' },
      ]
    },
    {
      label: 'Specials', img: 'Images/Pizzas/Pizza%20and%20Past%20Bowl.jpeg',
      items: [
        { name: 'Tagliatelle Salmon',               desc: 'Pasta ribbons with smoked salmon, white wine and tomato in rich creamy sauce, finished with spring onions and parmesan cheese.' },
        { name: 'Seafood Linguine',                  desc: 'Linguine pasta with mixed seafood cooked with onions, fresh tomato, extra virgin olive oil, garlic and chilli.' },
        { name: 'Linguine Con Gamberoni & Pollo',    desc: 'Linguine pasta cooked with king prawns, chicken, tomato sauce and a hint of chilli.' },
        { name: 'Tagliate Al Pepe',                  desc: 'Tender marinated pieces of chicken cooked with onion, sliced mushrooms, simmered in delight tomato sauce, served with tagliatelle pasta.' },
        { name: 'Risotto Alla Pescatora',            desc: 'Arborio rice cooked in a creamy mixed herb and garlic, with chicken, baby prawns, onions and parmesan cheese.' },
        { name: 'Risotto Ai Frutti Di Mare',         desc: 'Arborio rice with mixed seafood and shellfish, cooked with onion, fresh tomato, extra virgin olive oil, garlic and chilli.' },
      ]
    },
    {
      label: 'Chicken', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Panfried Chicken',              desc: 'Served with salad, chips and garlic mayonnaise.' },
        { name: 'Pollo Milano',                  desc: 'Flattened chicken breast coated in golden breadcrumbs, cooked in garlic and herb butter and served on a bed of tomato based spaghetti.' },
        { name: 'Pollo Pescatora',               desc: 'Chicken breast in a creamy mixed herb, garlic and tomato sauce with baby prawns and onion.' },
        { name: 'Pollo Gamberoni Alla Thermidor',     desc: 'Chicken breast cooked with tiger prawns in white wine, mustard and cream sauce.' },
        { name: 'Fajita Mexicana',               desc: 'Chicken / steak or mixed, marinated with cajun spices, onions and peppers. Served with tortilla bread and a selection of dips and butter. £2 extra for steak.' },
        { name: 'Pollo Alla Crema',              desc: 'Chicken breast cooked with mushrooms, garlic and onions in a homemade creamy white wine sauce.' },
        { name: 'Pollo Al Pepe',                 desc: 'Chicken breast cooked in homemade peppercorn sauce, served with hand cut chips and salad.' },
        { name: 'Pollo Al Diane',                desc: 'Chicken breast cooked onions and mushrooms in a homemade diane sauce, infused with brandy, French mustard and cream.' },
        { name: 'Pollo Al Pesto',                desc: 'Pan fried chicken breast cooked with onions, sun dried tomato, pesto and white wine creamy sauce.' },
        { name: 'Pollo Gorgonzola',              desc: 'Chicken breast cooked in blue cheese and white wine creamy sauce.' },
      ]
    },
    {
      label: 'Steaks', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Fillet Semplice',     desc: '10oz chargrilled fillet steak, cooked to your specification, served the natural way.' },
        { name: 'Fillet Al Pepe',      desc: '10oz chargrilled fillet steak in a peppercorn sauce.' },
        { name: 'Fillet Diane',        desc: '10oz chargrilled fillet steak in a creamy diane sauce with mushrooms and onions, infused with brandy, French mustard and cream.' },
        { name: 'Fillet Pescatora',    desc: '10oz chargrilled fillet steak in a creamy mixed herbs, onion, garlic and tomato sauce with baby prawns.' },
        { name: 'Fillet Surf & Turf', desc: '10oz fillet steak cooked in garlic butter with king prawns.' },
        { name: 'Sirloin Semplice',    desc: '10oz chargrilled steak, cooked to your specification.' },
        { name: 'Sirloin Al Pepe',     desc: '10oz chargrilled steak in a peppercorn sauce.' },
        { name: 'Sirloin Diane',       desc: '10oz chargrilled steak in a creamy diane sauce with mushrooms and onions, infused with brandy, French mustard and cream.' },
        { name: 'Sirloin Dolce Latte', desc: '10oz chargrilled steak in a sauce of blue Italian cheese and white wine, spring onion and cream.' },
        { name: 'Sirloin Pescatora',   desc: '10oz chargrilled steak in a creamy mixed herb, onion, garlic and tomato sauce with baby prawns.' },
        { name: 'Sirloin Surf & Turf',desc: '10oz sirloin steak cooked in garlic butter with king prawns.' },
      ]
    },
    {
      label: 'Parmo', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Traditional Chicken Parmo',  desc: 'Flattened chicken breast, coated in golden breadcrumbs, topped with creamy béchamel and grilled with cheddar cheese.' },
        { name: 'Bolognese Chicken Parmo',    desc: 'Flattened chicken breast, coated in golden breadcrumbs, topped with creamy béchamel and grilled with cheddar cheese, topped with bolognese.' },
        { name: 'Hot Shot Parmo',     desc: 'Flattened chicken breast, coated in golden breadcrumbs, topped with creamy béchamel and grilled with cheddar cheese, topped with jalapeños and pepperoni.' },
        { name: 'Kiev Parmo',         desc: 'Flattened chicken breast, coated in golden breadcrumbs, topped with creamy béchamel and grilled with cheddar cheese, topped with garlic.' },
      ]
    },
    {
      label: 'Seafood', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Sea Bass',               desc: 'Pan fried fillet of sea bass on a bed of roast Mediterranean vegetables, sautéed potatoes and baby prawns in white wine creamy parsley sauce.' },
        { name: 'Salmon Pescatora',       desc: 'Oven baked salmon in a creamy mixed herb and garlic with baby prawns, served with baby potatoes and salad.' },
        { name: 'Fish & Chips',           desc: 'Battered fish served with homemade chips and tartar sauce, peas / beans and lemon.' },
        { name: 'Gamberoni Dolce Latte',  desc: 'King prawns cooked in a sauce of Italian blue cheese, white wine, spring onion, garlic, pesto and cream, served with sautéed baby potatoes.' },
        { name: 'Mussels Arrabbiata OR Mariniere',     desc: 'Mussels in chilli / arrabbiata sauce or white wine garlic cream.' },
        { name: 'Scampi',                 desc: 'Breaded scampi served with homemade wedges, tarte sauce, green beans, salad and lemon wedge.' },
      ]
    },
    {
      label: 'Burgers', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Plain Burger',         desc: '' },
        { name: 'Cheese Burger',        desc: '' },
        { name: 'Goats Cheese Burger',  desc: 'Peppers and goat’s cheese.' },
        { name: 'Pancetta Burger',      desc: 'Pancetta, BBQ sauce and melted mozzarella.' },
        { name: 'Caramelised Burger',   desc: 'Marmalade onions and grilled goat’s cheese.' },
        { name: 'Pineapple Burger',     desc: 'Pineapple, ham and melted mozzarella.' },
        { name: 'Tower Burger',         desc: 'Double cheeseburger.' },
      ]
    },
    {
      label: 'Breakfast', img: 'Images/Dishes/Breakfast/Breakfast.jpeg',
      items: [
        { name: 'Full English',                      desc: '(ALL DAY) 2 slices of bacon, 2 sausages, 2 fried eggs, baked beans, grilled tomato, mushrooms, black pudding and toast.' },
        { name: 'Scrambled Egg on Toast',             desc: '' },
        { name: 'Scrambled Egg on Toast with Bacon OR Sausage', desc: '' },
        { name: 'Poached Egg on Toast',               desc: '' },
        { name: 'Beans on Toast',                     desc: '' },
        { name: 'Scrambled Egg & Salmon',             desc: '' },
        { name: 'Omelette',                           desc: 'Fluffy omelette with your choice of fillings' },
      ]
    },
    {
      label: 'Sides', img: 'Images/Diverse%20food%20on%20table.jpeg',
      items: [
        { name: 'Mixed Salad',          desc: '' },
        { name: 'Homemade Chips / French Fries', desc: '' },
        { name: 'Green Salad',          desc: '' },
        { name: 'Tomato & Onion Salad', desc: '' },
        { name: 'Steamed Arborio Rice', desc: '' },
        { name: 'Salted New Potatoes',  desc: '' },
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
            '<div class="menu__item-img" style="background-image:url(\'' + cat.img + '\')" role="img" aria-label="' + item.name + '"></div>' +
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
