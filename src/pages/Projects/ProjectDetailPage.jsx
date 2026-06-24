import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ensureTemplateScriptsLoaded } from '../../template/loadTemplateScripts';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import Footer from '../Home/sections/Footer';
import ScrollPercentage from '../Home/components/ScrollPercentage';
import './ProjectsPage.css';
import './ProjectDetailPage.css';

const P = process.env.PUBLIC_URL || '';
const publicImage = (file) => `${P}/assets/newimages/${file}`;

/** In-app URL for the Dublin Transit Center Parking Garage project detail. */
export const DUBLIN_SHERIFF_DETAIL_PATH = '/projects/dublin-transit-center-parking-garage';

const DUBLIN_SHERIFF_IDS = new Set(['feat-dublin-transit', 'civ-dublin-sheriff']);

export function projectHasDublinSheriffDetail(projectId) {
  return DUBLIN_SHERIFF_IDS.has(projectId);
}

const GALLERY_IMAGES = [
  publicImage('dub1.jpg'),
  publicImage('dub2.jpg'),
  publicImage('dub3.jpg'),
  publicImage('project2.jpg')
];

function usePdReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('.pd-reveal');
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('pd-is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

export default function ProjectDetailPage() {
  const rootRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return i <= 0 ? GALLERY_IMAGES.length - 1 : i - 1;
    });
  }, []);
  const goLightboxNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return i >= GALLERY_IMAGES.length - 1 ? 0 : i + 1;
    });
  }, []);

  useEffect(() => {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch (_) {
      /* ignore */
    }
    try {
      window.scrollTo(0, 0);
    } catch (_) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    ensureTemplateScriptsLoaded().catch(() => {});
  }, []);

  usePdReveal(rootRef);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goLightboxNext();
      else if (e.key === 'ArrowLeft') goLightboxPrev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, closeLightbox, goLightboxNext, goLightboxPrev]);

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="projects-page pd-page" ref={rootRef}>
        <div id="app-content">
          <section className="pp-page-header" aria-label="Project">
            <div className="pp-page-header__inner">
              <h1 className="pp-page-header__title">Dublin Transit Center Parking Garage</h1>
              <nav className="pp-page-header__crumb" aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/projects">Projects</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Dublin Transit Center Parking Garage</li>
                </ol>
              </nav>
            </div>
          </section>

          <section className="pd-dark-story" aria-label="Project description">
            <div className="pd-dark-story__inner">
              <div className="pd-dark-story__copy">
                <h2 className="pd-anim-stagger pd-as-1">Dublin Transit Center Parking Garage</h2>
                <p className="pd-anim-stagger pd-as-1">
                  Envisioned as a critical link between regional commuters and Bay Area transit, the Dublin
                  Transit Center Parking Garage establishes a structured, forward-looking approach to transit-
                  oriented infrastructure. Located adjacent to the Dublin BART station, the five-level, 570-space
                  facility supports daily commuter flow from the Central San Joaquin Valley, providing a clear and
                  efficient transition from vehicular arrival to rail connectivity. Developed in partnership with
                  Alameda County, Caltrans, and the Livermore Amador Valley Transit Authority (LAVTA), the
                  project reflects a coordinated investment in mobility, access, and long-term transportation
                  resilience.
                </p>
                <p className="pd-anim-stagger pd-as-2">
                  AE3 Partners served as the Basis of Design Architect, shaping the project&apos;s architectural vision,
                  planning framework, and core design strategies. The concept prioritizes evolving transportation
                  patterns, incorporating infrastructure for electric vehicles and commuter vans, while
                  accommodating emerging technologies such as autonomous neighborhood shuttles. Sustainable
                  design principles were embedded early, including provisions for a rooftop photovoltaic array,
                  high-performance lighting systems, and material strategies to reduce environmental impact.
                  AE3&apos;s design direction, captured in early renderings and planning studies, established the
                  facility&apos;s architectural character and user experience, informing a final built environment that
                  closely reflects the project&apos;s original design intent.
                </p>
              </div>
              <div className="pd-dark-story__meta pd-anim-stagger pd-as-3">
                <h3 className="pd-meta-heading">Project Details</h3>
                <ul className="pd-meta-list">
                  <li>
                    <strong>Location:</strong> Dublin, California
                  </li>
                  <li>
                    <strong>Services Rendered:</strong> Basis of Design; Architectural Planning; Concept Design;
                    Visualization/Renderings
                  </li>
                  <li>
                    <strong>Size:</strong> 5 Levels; 570 Parking Spaces
                  </li>
                  <li>
                    <strong>Status:</strong> Complete
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ③ Gallery */}
          <section className="pd-gallery" aria-labelledby="pd-gallery-title">
            <div className="pd-gallery__head pd-container pd-reveal">
              <h2 id="pd-gallery-title" className="pd-gallery__title">
                OUR PROJECTS GALLERY
              </h2>
            </div>
            <div className="pd-container">
              <div className="pd-gallery-grid">
                {GALLERY_IMAGES.map((src, i) => (
                  <button
                    key={src + String(i)}
                    type="button"
                    className="pd-gallery-cell pd-reveal"
                    style={{ '--pd-i': i }}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open image ${i + 1} of ${GALLERY_IMAGES.length} in gallery`}
                  >
                    <div className="pd-gallery-cell__shine" aria-hidden="true" />
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ④ Split contact: equal columns */}
          <section className="pd-contact-split" aria-labelledby="pd-contact-heading">
            <div className="pd-contact-split__left">
              <div className="pd-contact-split__left-inner pd-reveal">
                <p className="pd-contact-split__label">Contact us</p>
                <h2 id="pd-contact-heading" className="pd-contact-split__headline">
                  Let&apos;s build something together.
                </h2>
                <p className="pd-contact-split__lead">
                  Our clients are shaping the future and we enjoy being part of their story.
                </p>
                <p className="pd-contact-split__direct-h">Prefer to reach out directly?</p>
                <ul className="pd-contact-split__contacts">
                  <li>
                    <a href="tel:+14152339991" className="pd-contact-split__link">
                      <span className="pd-contact-split__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M5 4h4l2 4-2 2a12 12 0 006 6l2-2 4 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-1z" />
                        </svg>
                      </span>
                      <span>(415) 233 – 9991</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@ae3partners.com" className="pd-contact-split__link">
                      <span className="pd-contact-split__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="M3 7l9 6 9-6" />
                        </svg>
                      </span>
                      <span>info@ae3partners.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pd-contact-split__right">
              <form
                className="pd-form-minimal pd-reveal"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="pd-form-minimal__row2">
                  <label className="pd-field">
                    <span className="pd-field__label">Name</span>
                    <input name="name" type="text" autoComplete="name" placeholder="John Carter" />
                  </label>
                  <label className="pd-field">
                    <span className="pd-field__label">Email</span>
                    <input name="email" type="email" autoComplete="email" placeholder="email@example.com" />
                  </label>
                </div>
                <label className="pd-field">
                  <span className="pd-field__label">Subject</span>
                  <input name="subject" type="text" placeholder="Ex. Project" />
                </label>
                <label className="pd-field">
                  <span className="pd-field__label">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Please describe what service you are interested in..."
                  />
                </label>
                <button type="submit" className="pd-form-minimal__submit">
                  <span>Send message</span>
                  <span className="pd-form-minimal__submit-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </form>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
          <button
            type="button"
            className="pd-lightbox__backdrop"
            aria-label="Close gallery"
            onClick={closeLightbox}
          />
          <button type="button" className="pd-lightbox__close" onClick={closeLightbox} aria-label="Close">
            ×
          </button>
          <button
            type="button"
            className="pd-lightbox__nav pd-lightbox__nav--prev"
            onClick={goLightboxPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="pd-lightbox__frame">
            <img src={GALLERY_IMAGES[lightboxIndex]} alt="" />
          </div>
          <button
            type="button"
            className="pd-lightbox__nav pd-lightbox__nav--next"
            onClick={goLightboxNext}
            aria-label="Next image"
          >
            ›
          </button>
          <p className="pd-lightbox__counter" aria-live="polite">
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </p>
        </div>
      ) : null}

      <ScrollPercentage />
    </>
  );
}
