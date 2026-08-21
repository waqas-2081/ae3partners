import { useEffect, useRef, useState } from 'react';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import GallerySection from '../Home/sections/GallerySection';
import './Expertise.css';

const P = process.env.PUBLIC_URL || '';
const IMG = `${P}/assets/newimages/expertise`;
const G = `${P}/assets/newimages/review`;

const SERVICES = [
  {
    id: 'architecture',
    n: '01',
    label: 'Architecture',
    title: 'Architecture and Interiors',
    body:
      'We believe that thoughtful design is good design. Working closely with our clients allows us to create spaces that are sustainable, intelligent and beautiful. At AE3, successful design happens when we achieve the client’s dream aesthetic, and deliver a project that exceeds all of its initial objectives.',
    image: `${IMG}/architecture-interiors.jpg`,
    href: '/contact',
  },
  {
    id: 'construction',
    n: '02',
    label: 'Construction',
    title: 'Construction Management',
    body:
      'AE3 has adopted a strong client-centered construction management approach based on proven methods. Our experienced team takes the time to engage and understand the needs of the client and make the transition to occupancy as quick and efficiently as possible.',
    image: `${IMG}/construction-management.jpg`,
    href: '/contact',
  },
  {
    id: 'sustainable',
    n: '03',
    label: 'Sustainability',
    title: 'Sustainable Design',
    body:
      'At AE3, Sustainable Design is a basic requirement of every project. We set measurable goals and seek opportunities to minimize our impact on the environment while optimizing value, budget and timeline. AE3 is a signatory to the American Institute of Architects 2030 Commitment, and we have adopted the 2030 Challenge to reduce greenhouse gas emissions by the year 2030.',
    image: `${IMG}/sustainable-design.jpg`,
    href: '/contact',
  },
  {
    id: 'real-estate',
    n: '04',
    label: 'Development',
    title: 'Real Estate Acquisitions',
    body:
      'With over 10 years of experience managing development projects for a range of clients, we have the capabilities to offer services that range from finding suitable opportunities to providing full scale developer-for-fee services. We serve private equity and institutional investors on a variety of projects.',
    image: `${IMG}/real-estate-acquisitions.jpg`,
    href: '/contact',
  },
];

const TESTIMONIALS = [
  {
    id: 'dexter',
    label: 'Client Voice',
    place: 'SCLARC',
    name: 'Dexter Henderson',
    role: 'CEO @ SCLARC',
    quote:
      'They took the time to not only listen and understand our needs, but the needs of our clients and stakeholders.',
    image: `${G}/1.png`,
    sideImage: `${G}/side1.png`,
  },
  {
    id: 'traci',
    label: 'Client Voice',
    place: 'St. Anthony Foundation',
    name: 'Traci Lewis',
    role: 'Director of Asset Management @ St. Anthony Foundation',
    quote:
      'The AE3 team was informed and current with up-to-date industry standards, have creative ideas and a wealth of past accomplishments that enabled them to bring savvy and money saving ideas to the table.',
    image: `${G}/2.png`,
    sideImage: `${G}/side2.png`,
  },
  {
    id: 'chris',
    label: 'Client Voice',
    place: 'Lincoln Child Center',
    name: 'Chris Stoner',
    role: 'CEO @ Lincoln Child Center',
    quote:
      'We loved the approach they took, engaging our team and ensuring that each component of our programs was addressed in the design.',
    image: `${G}/3.png`,
    sideImage: `${G}/side3.png`,
  },
  {
    id: 'kevin',
    label: 'Client Voice',
    place: 'Patelco Credit Union',
    name: 'Kevin Barron',
    role: 'Corporate Real Estate @ Patelco Credit Union',
    quote:
      "Their team's expertise and willingness to adapt to our unique needs and requirements have made them a valuable partner in our growth and success.",
    image: `${G}/4.png`,
    sideImage: `${G}/side4.png`,
  },
  {
    id: 'charles',
    label: 'Client Voice',
    place: 'West Contra Costa USD',
    name: 'Charles Ramsey',
    role: 'School Board President Emeritus @ West Contra Costa Unified School District',
    quote:
      'We found AE3 Partners to be a reliable and capable partner on this project that resolved numerous challenges inherent in renovation projects.',
    image: `${G}/5.png`,
    sideImage: `${G}/side5.png`,
  },
];

export default function Expertise() {
  const rowRefs = useRef([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.classList.add('studio-route');
    return () => {
      document.documentElement.classList.remove('studio-route');
    };
  }, []);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w <= 767) setPerView(1);
      else if (w <= 1100) setPerView(2);
      else setPerView(3);
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - perView);

  useEffect(() => {
    setReviewIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const id = window.setInterval(() => {
      if (paused) return;
      setReviewIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, maxIndex]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      rows.forEach((row) => {
        row.classList.add('is-revealed');
        const frame = row.querySelector('.expertise-row__media-frame');
        if (frame) frame.style.clipPath = 'inset(0% 0% 0% 0%)';
      });
      return undefined;
    }

    let cancelled = false;
    let observer;

    const revealRow = (row) => {
      if (cancelled || !row || row.classList.contains('is-revealed')) return;
      const frame = row.querySelector('.expertise-row__media-frame');
      const img = frame?.querySelector('img');
      const fromLeft = row.classList.contains('expertise-row--reverse');
      row.classList.add('is-revealed');
      if (!frame) return;

      const closed = fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
      const open = 'inset(0% 0% 0% 0%)';
      const imgStart = fromLeft
        ? 'scale(1.08) translateX(-4%)'
        : 'scale(1.08) translateX(4%)';

      frame.style.clipPath = closed;
      if (img) img.style.transform = imgStart;

      const run = () => {
        if (cancelled) return;
        frame.animate(
          [{ clipPath: closed }, { clipPath: open }],
          {
            duration: 1800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
        if (img) {
          img.animate(
            [{ transform: imgStart }, { transform: 'scale(1) translateX(0)' }],
            {
              duration: 2000,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              fill: 'forwards',
            }
          );
        }
      };

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(run);
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealRow(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );

    rows.forEach((row) => {
      row.classList.remove('is-revealed');
      const frame = row.querySelector('.expertise-row__media-frame');
      if (frame) {
        const fromLeft = row.classList.contains('expertise-row--reverse');
        frame.style.clipPath = fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
        const img = frame.querySelector('img');
        if (img) {
          img.style.transform = fromLeft
            ? 'scale(1.08) translateX(-4%)'
            : 'scale(1.08) translateX(4%)';
        }
      }
      observer.observe(row);
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="expertise-page studio-page">
        <div id="app-content" className="studio-reveal-content">
          <section className="expertise-services" aria-label="Our Services">
            <div className="expertise-services__intro">
              <p className="expertise-services__eyebrow">What We Deliver</p>
              <h2 className="expertise-services__heading">Our Services</h2>
              <p className="expertise-services__lead">
                AE3 serves a diverse range of clients through Architecture, Construction Management,
                Sustainable Design, and Real Estate Development, with core expertise in Civic,
                Commercial, Education, Transportation, and Federal sectors.
              </p>
            </div>

            <div className="expertise-services__list">
              {SERVICES.map((service, index) => {
                const reversed = index % 2 === 1;
                return (
                  <article
                    key={service.id}
                    className={`expertise-row${reversed ? ' expertise-row--reverse' : ''}`}
                    id={service.id}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                  >
                    <div className="expertise-row__copy">
                      <span className="expertise-row__num" aria-hidden="true">
                        {service.n}
                      </span>
                      <div className="expertise-row__label">
                        <span className="expertise-row__label-dot" />
                        {service.label}
                      </div>
                      <h3 className="expertise-row__title">{service.title}</h3>
                      <p className="expertise-row__body">{service.body}</p>
                      <a className="expertise-row__btn" href={service.href}>
                        <span>Get in Touch</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                    <figure className="expertise-row__media">
                      <div className="expertise-row__media-frame">
                        <img src={service.image} alt={service.title} loading="eager" decoding="async" />
                      </div>
                    </figure>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="expertise-reviews" aria-label="Client testimonials">
            <div className="expertise-reviews__inner">
              <div className="expertise-reviews__intro">
                <p className="expertise-reviews__eyebrow">Testimonials</p>
                <h2 className="expertise-reviews__heading">
                  What Our <span>Clients Say</span>
                </h2>
                <p className="expertise-reviews__lead">
                  Our work speaks through the experiences of the people we build for. From developers
                  to foundations, our clients trust AE3 to deliver quality design, creative solutions,
                  and lasting value on every project.
                </p>
              </div>

              <div
                className="expertise-reviews__viewport"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div
                  className="expertise-reviews__track"
                  style={{
                    transform: `translateX(calc(-${reviewIndex} * ((100% + var(--er-gap)) / ${perView})))`,
                    '--per-view': perView,
                  }}
                >
                  {TESTIMONIALS.map((item, index) => (
                    <article
                      key={item.id}
                      className={`expertise-reviews__card expertise-reviews__card--${(index % 5) + 1}`}
                    >
                      <div className="expertise-reviews__card-glow" aria-hidden="true" />
                      <p className="expertise-reviews__label">{item.label}</p>
                      <p className="expertise-reviews__quote">“{item.quote}”</p>
                      <div className="expertise-reviews__meta">
                        <h3 className="expertise-reviews__place">{item.place}</h3>
                        <p className="expertise-reviews__name">{item.name}</p>
                        <p className="expertise-reviews__role">{item.role}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="expertise-reviews__dots" role="tablist" aria-label="Review slides">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={`review-dot-${index}`}
                    type="button"
                    role="tab"
                    className={`expertise-reviews__dot${reviewIndex === index ? ' is-active' : ''}`}
                    aria-selected={reviewIndex === index}
                    aria-label={`Show reviews starting at ${index + 1}`}
                    onClick={() => setReviewIndex(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="expertise-cta" aria-label="Start a conversation">
            <div className="expertise-cta__inner">
              <div className="expertise-cta__copy">
                <p className="expertise-cta__eyebrow">Start a conversation</p>
                <h2 className="expertise-cta__heading">
                  Ready for your <em>next project?</em>
                </h2>
              </div>
              <div className="expertise-cta__contacts">
                <a className="expertise-cta__link" href="tel:+14152339991">
                  <span className="expertise-cta__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 4h4l2 4-2 2a12 12 0 006 6l2-2 4 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-1z" />
                    </svg>
                  </span>
                  <span className="expertise-cta__meta">
                    <span className="expertise-cta__label">Call us</span>
                    <span className="expertise-cta__value">(415) 233 – 9991</span>
                  </span>
                </a>
                <a className="expertise-cta__link" href="mailto:info@ae3partners.com">
                  <span className="expertise-cta__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <span className="expertise-cta__meta">
                    <span className="expertise-cta__label">Email us</span>
                    <span className="expertise-cta__value">info@ae3partners.com</span>
                  </span>
                </a>
              </div>
            </div>
          </section>
          <GallerySection />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
