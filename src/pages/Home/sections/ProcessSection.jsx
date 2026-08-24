import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProcessSection.css';

const P = process.env.PUBLIC_URL || '';

const STEPS = [
  {
    n: '01',
    title: 'Listen & Align',
    img: `${P}/assets/newimages/service1.jpg`,
    text: 'We start by understanding your goals, constraints, and stakeholders so every decision reflects what success looks like for you.',
  },
  {
    n: '02',
    title: 'Plan & Design',
    img: `${P}/assets/newimages/service2.jpg`,
    text: 'Thoughtful planning and design options that balance vision, budget, schedule, and long term performance.',
  },
  {
    n: '03',
    title: 'Deliver & Coordinate',
    img: `${P}/assets/newimages/service3.jpg`,
    text: 'Hands-on coordination through construction keeping teams aligned, issues resolved, and the project moving forward.',
  },
  {
    n: '04',
    title: 'Close Out & Support',
    img: `${P}/assets/newimages/service4.jpg`,
    text: 'A clean closeout with documentation, punch-list resolution, and support that carries the project from delivery to day to day use.',
  },
];

function ProcessCard({ step }) {
  return (
    <div className="process-item fade-top">
      <div className="process-thumb">
        <img src={step.img} alt={step.title} loading="lazy" />
      </div>
      <div className="process-content">
        <h3 className="title">
          <span>{step.n}</span>. {step.title}
        </h3>
        <p>{step.text}</p>
      </div>
      <span className="number" aria-hidden="true">
        {step.n}
      </span>
    </div>
  );
}

function useProcessMobileSwiper(carouselRef) {
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return undefined;

    const mql = window.matchMedia('(max-width: 991px)');
    let instance = null;
    let retryTimer = 0;
    let cancelled = false;

    const destroy = () => {
      if (!instance) return;
      try {
        instance.destroy(true, true);
      } catch (_) {
        /* ignore */
      }
      instance = null;
    };

    const init = () => {
      if (cancelled || !mql.matches) {
        destroy();
        return;
      }

      if (typeof window.Swiper !== 'function') {
        retryTimer = window.setTimeout(init, 120);
        return;
      }

      if (instance) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      instance = new window.Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        speed: 700,
        grabCursor: true,
        autoHeight: true,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        autoplay: reduceMotion
          ? false
          : {
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
        pagination: {
          el: el.querySelector('.ae3-process__dots'),
          clickable: true,
        },
      });
    };

    init();

    const onChange = () => {
      destroy();
      init();
    };

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
      destroy();
    };
  }, []);
}

export default function ProcessSection() {
  const carouselRef = useRef(null);
  useProcessMobileSwiper(carouselRef);

  return (
    <section className="ae3-process process-section overflow-hidden fade-wrapper">
      <div
        className="bg-shape"
        style={{ backgroundImage: `url(${P}/assets/img/shapes/process-shape-1.png)` }}
        aria-hidden="true"
      />
      <div className="container container-2">
        <div className="heading-space">
          <div className="section-heading mb-0">
            <h4
              className="sub-heading"
              data-text-animation="fade-in-right"
              data-split="char"
              data-duration="0.9"
              data-stagger="0.03"
            >
              How We Work
            </h4>
            <h2 className="section-title cursor-effect title-2">
              A Process Built on <span>Partnership</span>
            </h2>
          </div>
          <div className="process-desc">
            <p className="mb-0">
              We tailor each engagement to client priorities with transparent planning, practical decision-making, and
              coordinated execution from concept to completion.
            </p>
          </div>
        </div>

        <div className="ae3-process__grid process-wrap fade-wrapper">
          {STEPS.map((step) => (
            <div className="ae3-process__grid-item" key={step.n}>
              <ProcessCard step={step} />
            </div>
          ))}
        </div>

        <div className="ae3-process__slider">
          <div className="ae3-process__carousel swiper" ref={carouselRef}>
            <div className="swiper-wrapper">
              {STEPS.map((step) => (
                <div className="swiper-slide" key={step.n}>
                  <ProcessCard step={step} />
                </div>
              ))}
            </div>
            <div className="ae3-process__dots" />
          </div>
        </div>

        <div className="process-text">
          <h5 className="bottom-text">
            Ready to build something meaningful? <Link to="/contact">Let&apos;s start today</Link>
          </h5>
        </div>
      </div>
    </section>
  );
}
