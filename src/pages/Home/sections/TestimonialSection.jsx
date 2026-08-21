import { useEffect, useRef } from 'react';
import './TestimonialSection.css';

const P = process.env.PUBLIC_URL || '';

const REVIEWS = [
  {
    quote:
      'AE3 Partners combines design excellence with practical project leadership. Their team knows how to collaborate with owners, builders, and stakeholders to deliver great outcomes.',
    name: 'Client Perspective',
    role: 'Architecture + CM Services',
  },
  {
    quote:
      'They took the time to not only listen and understand our needs, but the needs of our clients and stakeholders.',
    name: 'Dexter Henderson',
    role: 'CEO @ SCLARC',
  },
  {
    quote:
      'The AE3 team was informed and current with up-to-date industry standards, have creative ideas and a wealth of past accomplishments that enabled them to bring savvy and money saving ideas to the table.',
    name: 'Traci Lewis',
    role: 'Director of Asset Management @ St. Anthony Foundation',
  },
  {
    quote:
      'We loved the approach they took, engaging our team and ensuring that each component of our programs was addressed in the design.',
    name: 'Chris Stoner',
    role: 'CEO @ Lincoln Child Center',
  },
];

export default function TestimonialSection() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || typeof window.Swiper !== 'function') return undefined;

    if (el.swiper) {
      try {
        el.swiper.destroy(true, true);
      } catch (_) {
        // ignore
      }
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new window.Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 800,
      grabCursor: true,
      autoplay: reduceMotion
        ? false
        : {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
    });

    return () => {
      try {
        instance.destroy(true, true);
      } catch (_) {
        // ignore
      }
    };
  }, []);

  return (
    <section className="ae3-testi testimonial-section fade-wrapper">
      <div className="container container-2">
        <div className="row section-heading-wrap fade-top">
          <div className="shape" aria-hidden="true">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="" />
          </div>
          <div className="col-12">
            <div className="section-heading testimonial-section-headings mb-0">
              <h4
                className="sub-heading"
                data-text-animation="fade-in-right"
                data-split="char"
                data-duration="0.9"
                data-stagger="0.03"
              >
                Why Clients Choose AE3
              </h4>
              <h2 className="section-title cursor-effect title-2">
                Partnerships Built on Trust. <span>Proven by Performance.</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row testi-layout">
          <div className="col-lg-6">
            <div
              className="testi-img slide-anim"
              data-delay="0.3"
              data-offset="100"
              data-direction="left"
            >
              <img src={`${P}/assets/newimages/whoweare1.jpg`} alt="AE3 Partners collaboration" />
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="testi-carousel-wrap slide-anim"
              data-delay="0.3"
              data-offset="100"
              data-direction="right"
            >
              <div className="testi-top-content">
                <div className="left-content">
                  <h3 className="rating">AE3</h3>
                  <div className="rating-list">
                    <ul>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-star" aria-hidden="true"></i>
                        </li>
                      ))}
                    </ul>
                    <span>Focused on You</span>
                  </div>
                </div>
                <div className="right-content">
                  <p>
                    We offer collaborative, ego-free, tailored service with integrated architecture
                    and construction management that keeps projects on budget and schedule.
                  </p>
                </div>
              </div>
              <div className="testi-carousel swiper ae3-testi__carousel" ref={carouselRef}>
                <div className="swiper-wrapper">
                  {REVIEWS.map((review) => (
                    <div className="swiper-slide" key={`${review.name}-${review.role}`}>
                      <div className="testi-item">
                        <p>“{review.quote}”</p>
                        <div className="testi-author">
                          <div className="author-img author-img-google">
                            <i className="fab fa-google" aria-hidden="true" title="Google" />
                          </div>
                          <h4 className="name">
                            {review.name} <span>{review.role}</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
