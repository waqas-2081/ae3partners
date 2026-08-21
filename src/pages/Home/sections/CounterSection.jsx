import { useLayoutEffect, useRef } from 'react';
import './CounterSection.css';

const P = process.env.PUBLIC_URL || '';

const STATS = [
  {
    count: 19,
    title: 'Years of experience',
    text: 'Nearly two decades shaping public and private environments across California with proven design and delivery.',
  },
  {
    count: 250,
    title: 'Successful projects',
    text: 'From campuses and civic spaces to airports and workplaces projects delivered with care, clarity, and accountability.',
  },
  {
    count: 28,
    title: 'Team members',
    text: 'Architects, planners, and construction managers working as one collaborative, ego free team for every client.',
  },
  {
    count: 140,
    title: 'Clients served',
    text: 'Long term partnerships with agencies, institutions, and owners who trust AE3 to turn ideas into results.',
  },
];

function killScrollImgTriggers(scrollArea, scrollImg) {
  const ScrollTrigger = window.ScrollTrigger;
  if (!ScrollTrigger) return;
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger;
    const targets = typeof st.getTargets === 'function' ? st.getTargets() : [];
    const hitsTrigger = trigger === scrollArea || trigger === scrollImg;
    const hitsTarget = Array.isArray(targets) && targets.includes(scrollImg);
    if (hitsTrigger || hitsTarget) st.kill();
  });
}

function initCounterScrollImage(root) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || !root) return () => {};

  if (typeof gsap.registerPlugin === 'function') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const scrollArea = root.querySelector('.scroll-area');
  const scrollImg = root.querySelector('.scroll-img');
  if (!scrollArea || !scrollImg) return () => {};

  killScrollImgTriggers(scrollArea, scrollImg);
  gsap.set(scrollImg, { x: 0 });

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const tween = gsap.to(scrollImg, {
      x: -400,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollArea,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2.5,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
      gsap.set(scrollImg, { x: 0 });
    };
  });

  ScrollTrigger.refresh();

  return () => {
    mm.revert();
    killScrollImgTriggers(scrollArea, scrollImg);
    gsap.set(scrollImg, { x: 0 });
  };
}

function initOdometers(root) {
  if (typeof window.jQuery !== 'function' || !window.jQuery.fn?.waypoint) {
    // Fallback without waypoint: count when section enters view
    const nodes = root.querySelectorAll('.odometer[data-count]');
    if (!nodes.length || !('IntersectionObserver' in window)) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.ae3OdoDone === '1') return;
          el.dataset.ae3OdoDone = '1';
          el.textContent = el.getAttribute('data-count') || '0';
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    nodes.forEach((el) => {
      el.dataset.ae3OdoDone = '';
      el.textContent = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }

  const $ = window.jQuery;
  const $odos = $(root).find('.odometer[data-count]');
  $odos.each(function reset() {
    this.dataset.ae3OdoDone = '';
    this.textContent = '0';
  });

  $odos.waypoint(
    function onEnter() {
      const el = this.element || this;
      if (el.dataset.ae3OdoDone === '1') return;
      el.dataset.ae3OdoDone = '1';
      el.textContent = el.getAttribute('data-count') || '0';
    },
    { offset: '80%', triggerOnce: true }
  );

  return () => {};
}

export default function CounterSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let cleanupScroll = () => {};
    let cleanupOdo = () => {};
    let timer = 0;

    const boot = () => {
      cleanupScroll = initCounterScrollImage(root) || (() => {});
      cleanupOdo = initOdometers(root) || (() => {});
    };

    // Wait briefly so template scripts (gsap) are available after SPA remount
    if (window.gsap && window.ScrollTrigger) {
      timer = window.setTimeout(boot, 40);
    } else {
      timer = window.setTimeout(boot, 120);
    }

    return () => {
      window.clearTimeout(timer);
      cleanupScroll();
      cleanupOdo();
    };
  }, []);

  return (
    <section ref={rootRef} className="ae3-counter counter-section counter-1">
      <div className="counter-text" aria-hidden="true">
        <span>AE3</span>
      </div>
      <div className="counter-element scroll-area" aria-hidden="true">
        <img className="scroll-img" src={`${P}/assets/img/images/counter-img-1.png`} alt="" />
      </div>
      <div className="container container-2">
        <div className="row gy-5 fade-wrapper">
          {STATS.map((c) => (
            <div className="col-lg-3 col-md-6 fade-top" key={c.title}>
              <div className="counter-item">
                <h3 className="title">
                  <span className="odometer" data-count={c.count}>
                    0
                  </span>
                  <span className="icon">+</span>
                </h3>
                <h4 className="sub-title">{c.title}</h4>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
