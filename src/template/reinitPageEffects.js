/**
 * Re-bind template UI after React route remounts.
 * main.js only runs once; SPA navigation needs this.
 */

function killOrphanScrollTriggers() {
  const ScrollTrigger = window.ScrollTrigger;
  if (!ScrollTrigger) return;
  ScrollTrigger.getAll().forEach((st) => {
    if (!st.trigger || !document.body.contains(st.trigger)) {
      st.kill();
    }
  });
}

function initBlogCarousel(root = document) {
  if (typeof window.Swiper !== 'function') return [];
  const instances = [];
  root.querySelectorAll('.blog-carousel').forEach((el) => {
    if (el.swiper) {
      try {
        el.swiper.destroy(true, true);
      } catch (_) {
        // ignore
      }
    }
    const instance = new window.Swiper(el, {
      slidesPerView: 3,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      autoplay: true,
      grabCursor: true,
      speed: 800,
      breakpoints: {
        320: { slidesPerView: 1, slidesPerGroup: 1 },
        767: { slidesPerView: 2, slidesPerGroup: 1 },
        1024: { slidesPerView: 3, slidesPerGroup: 1 },
        1199: { slidesPerView: 3, slidesPerGroup: 1 },
      },
    });
    instances.push(instance);
  });
  return instances;
}

function initSponsorCarousel(root = document) {
  if (typeof window.Swiper !== 'function') return [];
  const instances = [];
  root.querySelectorAll('.sponsor-carousel').forEach((el) => {
    if (el.swiper) {
      try {
        el.swiper.destroy(true, true);
      } catch (_) {
        // ignore
      }
    }
    const instance = new window.Swiper(el, {
      slidesPerView: 6,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      autoplay: false,
      grabCursor: true,
      speed: 800,
      breakpoints: {
        320: { slidesPerView: 2, slidesPerGroup: 1 },
        767: { slidesPerView: 4, slidesPerGroup: 1 },
        1024: { slidesPerView: 4, slidesPerGroup: 1 },
        1199: { slidesPerView: 6, slidesPerGroup: 1 },
      },
    });
    instances.push(instance);
  });
  return instances;
}

function initFadeTops(root = document) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  root.querySelectorAll('.fade-wrapper').forEach((section) => {
    section.querySelectorAll('.fade-top').forEach((element, index) => {
      if (element.dataset.ae3FadeBound === '1') return;

      // Already initialized by template main.js on first load
      if (element.style.opacity !== '' || element.style.transform !== '') {
        element.dataset.ae3FadeBound = '1';
        return;
      }

      element.dataset.ae3FadeBound = '1';
      const delay = index * 0.1;
      gsap.set(element, { opacity: 0, y: 100 });

      ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        end: 'bottom 20%',
        scrub: 0.5,
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
          });
        },
        once: true,
      });
    });
  });
}

function initTextAnimations(root = document) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitType = window.SplitType;
  if (!gsap || !ScrollTrigger || typeof SplitType !== 'function') return;

  const nodes = Array.from(root.querySelectorAll('[data-text-animation]')).filter((el) => {
    if (el.dataset.ae3TextBound === '1') return false;
    // Already split by template main.js
    if (el.querySelector('.char, .word, .line')) {
      el.dataset.ae3TextBound = '1';
      return false;
    }
    return true;
  });
  if (!nodes.length) return;

  nodes.forEach((el) => {
    el.dataset.ae3TextBound = '1';
  });

  // Fresh split for unbound nodes only
  // eslint-disable-next-line no-new
  new SplitType(nodes, {
    types: 'lines, words, chars',
    className: 'line',
  });

  nodes.forEach((animation) => {
    let type = animation.getAttribute('data-text-animation') || 'slide-up';
    let duration = Number(animation.getAttribute('data-duration') || 0.75);
    let stagger = Number(animation.getAttribute('data-stagger') || 0.03);
    let split = animation.getAttribute('data-split') || 'char';
    const ease = animation.getAttribute('data-ease') || 'power2.out';

    const targets = animation.querySelectorAll(`.${split}`);
    if (!targets.length) {
      gsap.set(animation, { opacity: 1 });
      return;
    }

    gsap.set(animation, { opacity: 1 });
    const tl = gsap.timeline({ paused: true });

    if (type === 'fade-in-right') {
      tl.from(targets, {
        x: 40,
        opacity: 0,
        duration,
        ease,
        stagger: { amount: stagger * targets.length },
      });
    } else {
      tl.from(targets, {
        yPercent: 80,
        opacity: 0,
        duration,
        ease,
        stagger: { amount: stagger * targets.length },
      });
    }

    ScrollTrigger.create({
      trigger: animation,
      start: 'top 80%',
      onEnter: () => tl.play(),
      once: true,
    });
  });
}

export function reinitPageEffects(root = document) {
  killOrphanScrollTriggers();

  const swipers = [
    ...initBlogCarousel(root),
    ...initSponsorCarousel(root),
  ];

  initFadeTops(root);
  initTextAnimations(root);

  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }

  return () => {
    swipers.forEach((s) => {
      try {
        s.destroy(true, true);
      } catch (_) {
        // ignore
      }
    });
  };
}
