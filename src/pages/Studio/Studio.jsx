import { useEffect, useRef, useState } from 'react';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import GallerySection from '../Home/sections/GallerySection';
import './Studio.css';

const P = process.env.PUBLIC_URL || '';

const PERSPECTIVE_ITEMS = [
  {
    n: '01',
    title: 'Life Outside the Office',
    body:
      'We believe great work comes from balanced lives. From team gatherings to time away from the desk, we support the people behind the practice.',
    icon: 'life',
  },
  {
    n: '02',
    title: 'Investing In Growth',
    body:
      'Mentorship, continuing education, and hands-on project leadership help every team member grow - technically, professionally, and personally.',
    icon: 'growth',
  },
  {
    n: '03',
    title: 'Reimagine The Future',
    body:
      'We approach each project with curiosity and ambition, looking for better ways to design, deliver, and serve the communities we work in.',
    icon: 'future',
  },
  {
    n: '04',
    title: 'Our Community',
    body:
      'AE3 is committed to the communities in which we serve. We are actively involved with local organizations that assist disadvantaged residents in the San Francisco Bay Area.',
    icon: 'community',
  },
];

function PerspectiveIcon({ name }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  };

  if (name === 'life') {
    return (
      <svg {...common}>
        <path
          d="M12 21s-6.5-4.35-9.2-8.1C1.2 10.7 1.7 7.6 4.1 6.2c1.7-1 3.8-.6 5.1.8L12 9.2l2.8-2.2c1.3-1.4 3.4-1.8 5.1-.8 2.4 1.4 2.9 4.5 1.3 6.7C18.5 16.65 12 21 12 21z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'growth') {
    return (
      <svg {...common}>
        <path
          d="M4 19V5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M4 19h16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8 15l3.2-3.2 2.6 2.6L18 8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 8H18v3.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'future') {
    return (
      <svg {...common}>
        <path
          d="M9.5 18h5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M10 21h4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8.8 15.2c-1.7-1.1-2.8-3-2.8-5.1C6 6.5 8.7 3.8 12 3.8S18 6.5 18 10.1c0 2.1-1.1 4-2.8 5.1-.5.3-.8.8-.8 1.4V17H9.6v-.3c0-.6-.3-1.1-.8-1.5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="15.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.8 17.5c.6-2.2 2.5-3.5 4.7-3.5s4.1 1.3 4.7 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13.2 14.4c.6-.3 1.3-.5 2.1-.5 1.8 0 3.3 1 4 2.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const WHY_CHOOSE_ITEMS = [
  {
    n: '01',
    title: 'We Are Focused on You',
    body:
      "It's all about your needs and required outcomes for your projects. We offer collaborative, ego-free, small firm service with large firm vision and experience to create a tailored approach to make your projects a reality.",
  },
  {
    n: '02',
    title: 'Timeless, Attractive & Green Design',
    body:
      'We believe in simple, efficient design that creates places - not just buildings - where people live, work, and play, built with the latest advances in sustainability, zero net energy, and low carbon design.',
  },
  {
    n: '03',
    title: 'We Play Well With Others',
    body:
      'From Progressive Design-Build to conventional Design-Bid-Build, to expansive stakeholder engagement and community outreach, our team knows how to collaborate with everyone around the table to achieve exceptional outcomes.',
  },
  {
    n: '04',
    title: 'Diverse Designers',
    body:
      'We are one of the largest African-American owned firms in California, and our diverse team reflects the communities in which we design and ensures their voices are reflected in their buildings.',
  },
  {
    n: '05',
    title: 'Delivering on Budget & Schedule',
    body:
      'Our blend of architecture and construction management services, coupled with deep experience, allows us to partner closely with clients to develop timely and cost-effective solutions.',
  },
];

const MISSION_SLIDES = [
  {
    id: 'mission',
    n: '01',
    title: 'Our Mission At AE3 Partners',
    body:
      "Our mission at AE3 Partners is to empower communities through innovative design and to bring our clients' visions to life through expert knowledge.",
    image: `${P}/assets/newimages/featured-projects/liberation-park.png`,
    theme: 'navy',
  },
  {
    id: 'vision',
    n: '02',
    title: "Designing What's Next For Communities",
    body:
      'We envision thoughtfully planned spaces that strengthen communities — combining architecture, planning, and construction management to deliver projects built to last.',
    image: `${P}/assets/newimages/vision.png`,
    theme: 'orange',
  },
];

const TEAM_IMG = `${P}/assets/newimages/team`;

const KEY_TEAM_MEMBERS = [
  { name: 'Rick Dumas', title: 'Principal', image: `${TEAM_IMG}/rick-dumas.jpg` },
  { name: 'Doug Davis', title: 'Principal', image: `${TEAM_IMG}/doug-davis.jpg` },
  { name: 'Elizabeth Andrews', title: 'Operations Manager', image: `${TEAM_IMG}/elizabeth-andrews.jpg` },
  { name: 'Lisa Arias', title: 'Sr. Marketing Manager', image: `${TEAM_IMG}/lisa-arias.jpg` },
  { name: 'Dong-Mei Bien', title: 'Accountant', image: `${TEAM_IMG}/dong-mei-bien.jpg` },
  { name: 'Willy Deng', title: 'IT Manager', image: `${TEAM_IMG}/willy-deng.jpg` },
  { name: 'Brandon Doherty', title: 'Associate Project Manager', image: `${TEAM_IMG}/brandon-doherty.jpg` },
  { name: 'Anna Dunnigan', title: 'Sr. Project Architect / Manager', image: `${TEAM_IMG}/anna-dunnigan.jpg` },
  { name: 'Antonio Escobedo', title: 'Job Captain', image: `${TEAM_IMG}/antonio-escobedo.jpg` },
  { name: 'David Hughes', title: 'Construction Manager / Inspector', image: `${TEAM_IMG}/david-hughes.jpg` },
  { name: 'Benjamin Loggins', title: 'Sr. QA/QC Manager', image: `${TEAM_IMG}/benjamin-loggins.jpg` },
  { name: 'Antoinette Nascimento', title: 'Sr. Project Architect / CM', image: `${TEAM_IMG}/antoinette-nascimento.jpg` },
  { name: 'Troy Newell', title: 'Associate Project Manager', image: `${TEAM_IMG}/troy-newell.jpg` },
  { name: 'Denise Nolden', title: 'Sr. Educational Lead', image: `${TEAM_IMG}/denise-nolden.jpg` },
  { name: 'Deborah Peters', title: 'Job Captain', image: `${TEAM_IMG}/deborah-peters.jpg` },
  { name: 'Ann Prometheus', title: 'Associate Project Manager', image: `${TEAM_IMG}/ann-prometheus.jpg` },
  { name: 'Anika Scott', title: 'Project Manager', image: `${TEAM_IMG}/anika-scott.jpg` },
  { name: 'Diana Uriostegui', title: 'Job Captain', image: `${TEAM_IMG}/diana-uriostegui.jpg` },
  { name: 'Marta Wojcik', title: 'Job Captain', image: `${TEAM_IMG}/marta-wojcik.jpg` },
  { name: 'Michael Wilson', title: 'Sr. Project Manager', image: `${TEAM_IMG}/michael-wilson.jpg` },
  { name: 'Quintus Colbert', title: 'Job Captain', image: `${TEAM_IMG}/quintus-colbert.png` },
];

const MAP_LOCATIONS = [
  {
    id: 'sf',
    name: 'San Francisco',
    top: '25%',
    left: '45%',
    icon: 'tower',
    cardTitle: 'San Francisco Office',
    cardBody:
      '505 Montgomery St., 10th Floor - our Bay Area home base for architecture, planning, and construction management across California.',
    image: `${P}/assets/newimages/gallery-ribbon/sfo-sky-terrace.png`,
    cardPos: 'right',
  },
  {
    id: 'oak',
    name: 'Oakland',
    top: '40%',
    left: '16%',
    icon: 'bridge',
    cardTitle: 'Oakland Office',
    cardBody:
      '11 Embarcadero West, Suite 205 - serving the East Bay with thoughtful design and delivery across civic, aviation, and community projects.',
    image: `${P}/assets/newimages/gallery-ribbon/oak-arrivals-exterior.png`,
    cardPos: 'right',
  },
  {
    id: 'la',
    name: 'Los Angeles',
    top: '64%',
    left: '35%',
    icon: 'palms',
    cardTitle: 'Los Angeles Office',
    cardBody:
      '527 West 7th St., Suite 700 - supporting Southern California clients with design leadership and hands-on project delivery.',
    image: `${P}/assets/newimages/gallery-ribbon/lax-cta-west-corridor.png`,
    cardPos: 'up',
  },
  {
    id: 'dc',
    name: 'Washington, D.C.',
    top: '36%',
    left: '78%',
    icon: 'capitol',
    cardTitle: 'Washington, D.C. Office',
    cardBody:
      '1629 K Street, Suite 300 - supporting federal and East Coast clients with architecture and construction management expertise.',
    image: `${P}/assets/newimages/gallery-ribbon/college-of-alameda-aviation.png`,
    cardPos: 'left',
  },
];

function MapPinIcon({ type }) {
  if (type === 'palms') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3.5c-1.2 3-3.6 5-6.6 5.6 1.7.5 3.2 1.6 4.2 3.1-1.7-.7-3.6-1-5.5-.8 1.9 1.2 3.3 3.1 3.8 5.3-1.5-1.1-3.2-1.6-5-1.7 2.3 1.3 4 3.5 4.6 6.1-.3-1.6 0-3.2.9-4.6.3 2.2 1.1 4.3 2.5 6.1.6-2.3 1.8-4.4 3.5-6"
        />
        <path
          fill="currentColor"
          d="M16 3.5c1.2 3 3.6 5 6.6 5.6-1.7.5-3.2 1.6-4.2 3.1 1.7-.7 3.6-1 5.5-.8-1.9 1.2-3.3 3.1-3.8 5.3 1.5-1.1 3.2-1.6 5-1.7-2.3 1.3-4 3.5-4.6 6.1.3-1.6 0-3.2-.9-4.6-.3 2.2-1.1 4.3-2.5 6.1-.6-2.3-1.8-4.4-3.5-6"
        />
        <path fill="currentColor" d="M15 16.5h2V28h-2z" />
        <path fill="currentColor" d="M10.8 18.5h1.5V28h-1.5z" />
        <path fill="currentColor" d="M19.7 18.5h1.5V28h-1.5z" />
      </svg>
    );
  }
  if (type === 'bridge') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 21.5h26v2.4H3zm1.2-7.2 1.8-.9 1.3 7H5.7l-1.5-6.1zm23.6 0-1.8-.9-1.3 7h1.6l1.5-6.1z"
        />
        <path
          fill="currentColor"
          d="M7 11.8c3-3.6 6.1-5.6 9-5.6s6 2 9 5.6l-1.6 1.2c-2.4-2.9-5-4.4-7.4-4.4s-5 1.5-7.4 4.4L7 11.8z"
        />
        <path fill="currentColor" d="M15 6.5h2v13h-2zM9 13h1.7v6.5H9zm12.3 0H23v6.5h-1.7z" />
        <path fill="currentColor" d="M6.2 19.8h19.6v1.5H6.2zM4.8 24h2.4v3.2H4.8zm9.8 0h2.4v3.2h-2.4zm9.8 0h2.4v3.2h-2.4z" />
      </svg>
    );
  }
  if (type === 'capitol') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M15.2 3.2h1.6l.8 4.2h-3.2l.8-4.2zM14 8.2h4v1.6h-4z"
        />
        <path
          fill="currentColor"
          d="M8.5 11.2h15l1.2 2.2H7.3l1.2-2.2zM9.2 14.2h2.2v8.2H9.2zm5.7 0h2.2v8.2h-2.2zm5.7 0H22.8v8.2h-2.2z"
        />
        <path fill="currentColor" d="M6.5 23.2h19v2.2h-19zM5 26.2h22v2.4H5z" />
        <path fill="currentColor" d="M15.1 9.8h1.8v1.4h-1.8z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path fill="currentColor" d="M16 2.5 20.2 22h-8.4L16 2.5zm0 5.5L13.6 20h4.8L16 8z" />
      <path fill="currentColor" d="M14.6 22h2.8v6.5h-2.8z" />
      <path fill="currentColor" d="M10.8 26.5h10.4V29H10.8z" />
    </svg>
  );
}

export default function Studio() {
  const mediaRef = useRef(null);
  const hslideRef = useRef(null);
  const hslideTrackRef = useRef(null);
  const teamCtaTextRef = useRef(null);
  const [openWhy, setOpenWhy] = useState('');
  const [activeMapPin, setActiveMapPin] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('studio-route');
    return () => {
      document.documentElement.classList.remove('studio-route');
    };
  }, []);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      el.classList.add('is-revealed');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = teamCtaTextRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      el.classList.add('is-inked');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-inked');
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Vertical scroll → horizontal card slider
  useEffect(() => {
    const section = hslideRef.current;
    const track = hslideTrackRef.current;
    if (!section || !track) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const syncHeaderOffset = () => {
      const header =
        document.querySelector('.header .primary-header') ||
        document.querySelector('.primary-header') ||
        document.querySelector('.header');
      const measured = header ? header.getBoundingClientRect().height : 90;
      // Extra buffer so rounded card top never sits under the fixed header
      const offset = Math.max(88, Math.ceil(measured + 12));
      section.style.setProperty('--hslide-header', `${offset}px`);
    };

    let ticking = false;

    const update = () => {
      ticking = false;
      syncHeaderOffset();
      const viewH = window.innerHeight || 1;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - viewH);
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const maxX = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      track.style.transform = `translate3d(${-maxX * progress}px, 0, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    syncHeaderOffset();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toggleWhy = (n) => {
    setOpenWhy((current) => (current === n ? '' : n));
  };

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="studio-page">
        <div id="app-content" className="studio-reveal-content">
          <section className="studio-intro">
            <div className="studio-intro__inner">
              <p className="studio-intro__eyebrow">Our Studio</p>
              <h2 className="studio-intro__heading studio-intro__heading--hero">
                We love what we do.
              </h2>
              <p className="studio-intro__lead">
                Join Our Team And Design Your Career With AE3.
              </p>
              <p className="studio-intro__tagline">
                AE3 Partners is a full-service architecture, planning, and construction management
                firm based in San Francisco, providing services throughout California.
              </p>
            </div>

            <div className="studio-intro__split">
              <div className="studio-intro__media" ref={mediaRef}>
                <div className="studio-intro__media-frame">
                  <img
                    src={`${P}/assets/newimages/collagee.png`}
                    alt="AE3 Partners architecture studio work"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="studio-intro__copy">
                <h3 className="studio-intro__subheading">Embracing Unique Perspectives</h3>
                <p className="studio-intro__body">
                  Diversity and inclusion are not just buzzwords they are facts, woven into the
                  ethos of our company. We know the power of differing perspectives on our projects
                  and we welcome everyone&apos;s point of view.
                </p>
              </div>
            </div>
          </section>

          <section className="studio-perspectives" aria-label="Culture and perspectives">
            <div className="studio-perspectives__grid">
              {PERSPECTIVE_ITEMS.map((item) => (
                <article key={item.n} className={`studio-p-card studio-p-card--${item.icon}`}>
                  <div className="studio-p-card__icon" aria-hidden="true">
                    <PerspectiveIcon name={item.icon} />
                  </div>
                  <h3 className="studio-p-card__title">{item.title}</h3>
                  <p className="studio-p-card__text">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Mission / Vision horizontal cards */}
          <section
            className="studio-hslide"
            ref={hslideRef}
            aria-label="Mission and vision"
          >
            <div className="studio-hslide__sticky">
              <div className="studio-hslide__header-gap" aria-hidden="true" />
              <div className="studio-hslide__viewport">
                <div className="studio-hslide__track" ref={hslideTrackRef}>
                  {MISSION_SLIDES.map((slide) => (
                    <article
                      key={slide.id}
                      className={`studio-hslide__card studio-hslide__card--${slide.theme}`}
                    >
                      <div className="studio-hslide__copy">
                        <div className="studio-hslide__top">
                          <span className="studio-hslide__num" aria-hidden="true">
                            {slide.n}
                          </span>
                          <h3 className="studio-hslide__title">{slide.title}</h3>
                        </div>
                        <p className="studio-hslide__body">{slide.body}</p>
                      </div>
                      <div className="studio-hslide__media">
                        <img src={slide.image} alt="" loading="lazy" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="studio-about" id="studio-about" aria-label="About Us">
            <div className="studio-about__inner">
              <div className="studio-about__copy">
                <h2 className="studio-about__heading">About Us</h2>
                <p className="studio-about__text">
                  AE3 Partners is a full service Architecture + Construction Management firm based
                  in San Francisco, providing services throughout California. Our experience and
                  insight in the realms of both architecture and construction management enables us
                  to have a knowledgeable team on every project we pursue. This depth of
                  understanding enables us to deliver unique services to our clients.
                </p>
              </div>

              <div className="studio-about__visual">
                <div className="studio-map">
                  <img
                    className="studio-map__img"
                    src={`${P}/assets/newimages/studio-usa-map.png`}
                    alt="United States map showing AE3 Partners office locations"
                    loading="lazy"
                  />

                  {MAP_LOCATIONS.map((loc) => {
                    const isActive = activeMapPin === loc.id;
                    return (
                      <div
                        key={loc.id}
                        className={`studio-map__pin studio-map__pin--${loc.cardPos}${isActive ? ' is-active' : ''}`}
                        style={{ top: loc.top, left: loc.left }}
                        onMouseEnter={() => setActiveMapPin(loc.id)}
                        onMouseLeave={() => setActiveMapPin(null)}
                        onFocus={() => setActiveMapPin(loc.id)}
                        onBlur={() => setActiveMapPin(null)}
                      >
                        <button
                          type="button"
                          className="studio-map__marker"
                          aria-expanded={isActive}
                          aria-label={`${loc.name} office`}
                          onClick={() =>
                            setActiveMapPin((current) =>
                              current === loc.id ? null : loc.id
                            )
                          }
                        >
                          <span className="studio-map__marker-icon">
                            <MapPinIcon type={loc.icon} />
                          </span>
                          <span className="studio-map__marker-label">{loc.name}</span>
                        </button>

                        <article
                          className="studio-map__card"
                          aria-hidden={!isActive}
                          style={{ backgroundImage: `url(${loc.image})` }}
                        >
                          <div className="studio-map__card-copy">
                            <h3>{loc.cardTitle}</h3>
                            <p>{loc.cardBody}</p>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="studio-leadership" aria-label="Leadership Team">
            <div className="studio-leadership__head">
              <p className="studio-leadership__eyebrow">AE3 TEAM</p>
              <h2 className="studio-leadership__heading">Leadership Team</h2>
            </div>

            <div className="studio-leadership__grid">
              <figure className="studio-leadership__photo">
                <img
                  src={`${P}/assets/newimages/founder-rick.png`}
                  alt="Rick L. Dumas, Founder of AE3"
                  loading="lazy"
                />
              </figure>

              <div className="studio-leadership__quote">
                <div className="studio-leadership__motif" aria-hidden="true">
                  <img src={`${P}/assets/newimages/ae3-logo.png`} alt="" />
                </div>
                <div className="studio-leadership__quote-inner">
                  <p>
                    We wanted to create a workplace where inclusion and transparency were the key
                    elements to our success. With AE3, we&apos;ve been able to build something
                    special.
                  </p>
                  <p>
                    Our team is our greatest asset and it&apos;s because of them that we have
                    succeeded and continue to build strong relationships with our clients and in
                    our communities
                  </p>
                  <footer className="studio-leadership__byline">
                    <span>Rick L. Dumas and Doug Davis</span>
                    <span>Founders of AE3</span>
                  </footer>
                </div>
              </div>

              <figure className="studio-leadership__photo">
                <img
                  src={`${P}/assets/newimages/founder-doug.png`}
                  alt="Doug Davis, Founder of AE3"
                  loading="lazy"
                />
              </figure>
            </div>
          </section>

          <section className="studio-team" aria-label="Key Team Members">
            <div className="studio-team__head">
              <h2 className="studio-team__heading">
                Meet our Key <span>Team Members</span>
              </h2>
              <p className="studio-team__intro">
                Our team is a diverse and creative team of experts in the architectural and
                construction management industry who bring a wealth of knowledge and experience to
                every project. We proudly employ an eclectic group of professionals, with roots
                around the world with a range of perspectives. Our team approaches problems in
                innovative ways, resulting in creative solutions that may not have been considered
                otherwise.
              </p>
            </div>

            <ul className="studio-team__grid">
              {KEY_TEAM_MEMBERS.map((member) => (
                <li key={member.name} className="studio-team__card">
                  <div className="studio-team__photo">
                    <img src={member.image} alt={member.name} loading="lazy" />
                  </div>
                  <h3 className="studio-team__name">{member.name}</h3>
                  <p className="studio-team__role">{member.title}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="studio-why" aria-label="Why Choose AE3">
            <div className="studio-why__grid">
              <div className="studio-why__copy">
                <h2 className="studio-why__heading">Why Choose AE3?</h2>
                <p className="studio-why__text">
                  AE3 Partners is a full service Architecture + Construction Management firm based
                  in San Francisco, providing services throughout California. Our experience and
                  insight in the realms of both architecture and construction management enables us
                  to have a knowledgeable team on every project we pursue. This depth of
                  understanding enables us to deliver unique services to our clients.
                </p>
              </div>

              <div className="studio-why__accordion">
                {WHY_CHOOSE_ITEMS.map((item) => {
                  const isOpen = openWhy === item.n;
                  return (
                    <div
                      key={item.n}
                      className={`studio-acc${isOpen ? ' is-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="studio-acc__trigger"
                        aria-expanded={isOpen}
                        onClick={() => toggleWhy(item.n)}
                      >
                        <span className="studio-acc__num">{item.n}</span>
                        <span className="studio-acc__title">{item.title}</span>
                        <span className="studio-acc__icon" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      <div className="studio-acc__panel" role="region">
                        <p>{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="studio-team-cta" aria-label="Our team culture">
            <div className="studio-team-cta__media">
              <video
                className="studio-team-cta__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={`${P}/assets/newimages/cta.png`}
                aria-label="AE3 Partners team gathering together"
              >
                <source
                  src={`${P}/assets/newimages/cta.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="studio-team-cta__body">
              <p className="studio-team-cta__text" ref={teamCtaTextRef}>
                Our team is a diverse and driven group of builders, tradespeople, and leaders who
                bring a wealth of knowledge and experience to every project. Together, we&apos;re
                united in creating spaces that leave a lasting impact.
              </p>
              <div className="studio-team-cta__actions">
                <a
                  className="studio-team-cta__btn studio-team-cta__btn--primary"
                  href="#"
                
                >
                  <span>Learn More About Our Team</span>
                  <span className="studio-team-cta__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a
                  className="studio-team-cta__btn studio-team-cta__btn--ghost"
                  href="/contact"
                >
                  <span>Join Our Team</span>
                  <span className="studio-team-cta__arrow" aria-hidden="true">
                    →
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
