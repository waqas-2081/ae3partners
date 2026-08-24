import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import { fetchProjectBySlug } from '../../api/projectsApi';
import { ensureTemplateScriptsLoaded } from '../../template/loadTemplateScripts';
import './ProjectsPage.css';
import './ProjectDetailPage.css';

/** @deprecated Kept for old bookmarks / redirects */
export const LIBERATION_PARK_DETAIL_PATH = '/projects/dublin-transit-center-parking-garage';

/** @deprecated Use LIBERATION_PARK_DETAIL_PATH */
export const DUBLIN_SHERIFF_DETAIL_PATH = LIBERATION_PARK_DETAIL_PATH;

/** @deprecated Detail pages are now slug-based for all projects */
export function projectHasLiberationParkDetail() {
  return true;
}

/** @deprecated Use projectHasLiberationParkDetail */
export function projectHasDublinSheriffDetail() {
  return true;
}

const SPEC_FIELDS = [
  { id: 'sector', label: 'Sector', key: 'sector' },
  { id: 'location', label: 'Location', key: 'location' },
  { id: 'role', label: 'Role', key: 'role' },
  { id: 'size', label: 'Size', key: 'size' },
  { id: 'status', label: 'Status', key: 'status' },
];

function SpecIcon({ id }) {
  const icons = {
    sector: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    role: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 20h16M6 20V9l6-4 6 4v11M9 14h2v6H9v-6zm4 0h2v6h-2v-6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    size: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    status: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    related: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[id] ?? icons.sector;
}

function SpecCard({ spec, index }) {
  return (
    <article className={`pd-spec-card pd-spec-card--${spec.id}`}>
      <span className="pd-spec-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="pd-spec-card__icon" aria-hidden="true">
        <SpecIcon id={spec.id} />
      </span>
      <p className="pd-spec-card__label">{spec.label}</p>
      {spec.related ? (
        <ul className="pd-spec-card__list">
          {spec.related.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="pd-spec-card__value">
          {spec.live ? (
            <>
              <span className="pd-spec-card__live" aria-hidden="true" />
              {spec.value}
            </>
          ) : (
            spec.value
          )}
        </p>
      )}
    </article>
  );
}

function GalleryCell({ item, index, onOpen }) {
  return (
    <button
      type="button"
      className="pd-gallery-full__cell"
      onClick={() => onOpen(index)}
      aria-label={`Open ${item.caption} in gallery`}
    >
      <img src={item.src} alt={item.caption} loading="lazy" decoding="async" />
      <span className="pd-gallery-full__cell-overlay" aria-hidden="true" />
      <span className="pd-gallery-full__cell-caption">{item.caption}</span>
      <span className="pd-gallery-full__cell-zoom" aria-hidden="true">
        +
      </span>
    </button>
  );
}

function usePdMobileSwiper(carouselRef, { enabled, slidesPerView = 1.15, spaceBetween = 14, loop = true }) {
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || !enabled) return undefined;

    const mql = window.matchMedia('(max-width: 767px)');
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

      destroy();

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const slideCount = el.querySelectorAll('.swiper-slide').length;

      instance = new window.Swiper(el, {
        slidesPerView,
        spaceBetween,
        centeredSlides: false,
        loop: loop && slideCount > 2,
        speed: 650,
        grabCursor: true,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        autoplay: reduceMotion
          ? false
          : {
              delay: 3800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
        pagination: {
          el: el.querySelector('.pd-mobile-dots'),
          clickable: true,
        },
      });
    };

    ensureTemplateScriptsLoaded()
      .then(() => {
        if (!cancelled) init();
      })
      .catch(() => {});

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
  }, [carouselRef, enabled, slidesPerView, spaceBetween, loop]);
}

function buildSpecs(project) {
  const specs = project?.specs || {};
  const cards = SPEC_FIELDS.filter((field) => specs[field.key])
    .map((field) => ({
      id: field.id,
      label: field.label,
      value: specs[field.key],
      live: field.id === 'status' ? Boolean(specs.status_is_live) : false,
    }));

  const related = Array.isArray(specs.related_projects)
    ? specs.related_projects.filter(Boolean)
    : [];

  if (related.length) {
    cards.push({
      id: 'related',
      label: 'Projects To Be Listed Only',
      related,
    });
  }

  return cards;
}

function buildGallery(project) {
  const fromApi = Array.isArray(project?.gallery)
    ? project.gallery
        .filter((img) => img?.src)
        .map((img) => ({
          id: img.id,
          src: img.src,
          caption: img.caption || project.title || 'Project image',
        }))
    : [];

  if (fromApi.length) return fromApi;

  if (project?.image) {
    return [
      {
        id: 'hero',
        src: project.image,
        caption: project.title || 'Project image',
      },
    ];
  }

  return [];
}

function DescriptionBody({ html, fallback }) {
  const content = (html && String(html).trim()) || '';
  if (content) {
    return (
      <div
        className="pd-showcase__copy pd-reveal pd-is-visible"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  if (fallback) {
    return (
      <div className="pd-showcase__copy">
        <p className="pd-reveal pd-is-visible">{fallback}</p>
      </div>
    );
  }
  return null;
}

function ProjectDetailSkeleton() {
  return (
    <>
      <section className="pd-showcase" aria-busy="true" aria-label="Loading project">
        <div className="pd-showcase__inner">
          <div className="pd-showcase__grid">
            <figure className="pd-showcase__media">
              <div className="pd-showcase__media-frame pd-skel pd-skel-hero" />
            </figure>
            <div className="pd-showcase__body">
              <div className="pd-showcase__body-inner">
                <div className="pd-showcase__label-row">
                  <span className="pd-skel pd-skel-label" />
                </div>
                <span className="pd-skel pd-skel-heading" />
                <span className="pd-skel pd-skel-heading pd-skel-heading--sm" />
                <span className="pd-skel pd-skel-copy" />
                <span className="pd-skel pd-skel-copy" />
                <span className="pd-skel pd-skel-copy" />
                <span className="pd-skel pd-skel-copy pd-skel-copy--short" />
              </div>
            </div>
            <p className="pd-showcase__caption">
              <span className="pd-skel pd-skel-caption" />
            </p>
          </div>
        </div>
      </section>

      <section className="pd-specs-cards" aria-hidden="true">
        <div className="pd-specs-cards__inner">
          <div className="pd-specs-cards__head">
            <span className="pd-skel pd-skel-label" style={{ margin: '0 auto 14px' }} />
            <span className="pd-skel pd-skel-section-title" />
            <span className="pd-skel pd-skel-copy pd-skel-copy--center" />
          </div>
          <div className="pd-specs-cards__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="pd-spec-card pd-skel-spec">
                <span className="pd-skel pd-skel-icon" />
                <span className="pd-skel pd-skel-spec-label" />
                <span className="pd-skel pd-skel-spec-value" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-gallery-full" aria-hidden="true">
        <div className="pd-gallery-full__inner">
          <div className="pd-gallery-full__head">
            <div className="pd-gallery-full__head-left">
              <span className="pd-skel pd-skel-label" />
              <span className="pd-skel pd-skel-section-title" style={{ marginTop: 14 }} />
            </div>
            <span className="pd-skel pd-skel-copy" />
          </div>
          <div className="pd-gallery-full__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="pd-gallery-full__cell pd-skel pd-skel-gallery" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const LazyGallerySection = lazy(() => import('../Home/sections/GallerySection'));

const DeferredGallerySection = memo(function DeferredGallerySection() {
  const sentinelRef = useRef(null);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowGallery(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px 0px' }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  if (!showGallery) {
    return <div ref={sentinelRef} className="pp-gallery-sentinel" aria-hidden="true" />;
  }

  return (
    <Suspense fallback={null}>
      <LazyGallerySection />
    </Suspense>
  );
});

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const specsSwiperRef = useRef(null);
  const gallerySwiperRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setProject(null);
      setLightboxIndex(null);
      try {
        const data = await fetchProjectBySlug(slug);
        if (!cancelled) setProject(data);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load project');
          setProject(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (slug) load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const galleryImages = useMemo(() => buildGallery(project), [project]);
  const projectSpecs = useMemo(() => buildSpecs(project), [project]);
  const gallerySrcs = useMemo(() => galleryImages.map((item) => item.src), [galleryImages]);
  const heroImage = project?.image || galleryImages[0]?.src || '';
  const captionBits = [
    project?.specs?.location,
    project?.specs?.size,
    project?.specs?.role,
  ].filter(Boolean);

  usePdMobileSwiper(specsSwiperRef, {
    enabled: !loading && !error && projectSpecs.length > 0,
    slidesPerView: 1,
    spaceBetween: 14,
    loop: true,
  });

  usePdMobileSwiper(gallerySwiperRef, {
    enabled: !loading && !error && galleryImages.length > 0,
    slidesPerView: 1,
    spaceBetween: 12,
    loop: true,
  });

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || !gallerySrcs.length) return null;
      return i <= 0 ? gallerySrcs.length - 1 : i - 1;
    });
  }, [gallerySrcs.length]);
  const goLightboxNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || !gallerySrcs.length) return null;
      return i >= gallerySrcs.length - 1 ? 0 : i + 1;
    });
  }, [gallerySrcs.length]);

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
  }, [slug]);

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

      <div
        id="app-wrapper"
        className="projects-page pd-page pd-performance studio-page"
        aria-busy={loading}
      >
        <div id="app-content" className="studio-reveal-content">
          {loading ? <ProjectDetailSkeleton /> : null}

          {!loading && error ? (
            <section className="pd-showcase">
              <div className="pd-showcase__inner">
                <div style={{ padding: '4rem 1.5rem' }}>
                  <p className="pd-reveal pd-is-visible" style={{ color: '#b42318' }}>
                    Project not found or API unavailable.
                  </p>
                  <p className="pd-reveal pd-is-visible">
                    <Link to="/projects">← Back to all projects</Link>
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {!loading && !error && project ? (
            <>
              <section className="pd-showcase" aria-label="Project overview">
                <div className="pd-showcase__inner">
                  <div className="pd-showcase__grid">
                    <figure className="pd-showcase__media pd-reveal">
                      <div className="pd-showcase__media-frame">
                        {heroImage ? (
                          <img
                            src={heroImage}
                            alt={project.title || 'Project'}
                            loading="eager"
                            decoding="async"
                          />
                        ) : (
                          <div
                            aria-hidden
                            style={{
                              width: '100%',
                              minHeight: 320,
                              background: '#e8eef5',
                            }}
                          />
                        )}
                      </div>
                    </figure>

                    <div className="pd-showcase__body">
                      <span className="pd-showcase__watermark" aria-hidden="true">
                        01
                      </span>
                      <div className="pd-showcase__body-inner">
                        <div className="pd-showcase__label-row pd-reveal">
                          <span className="pd-showcase__label-line" aria-hidden="true" />
                          <span className="pd-showcase__label">
                            {project.category_label || 'Project Overview'}
                          </span>
                        </div>
                        <h2 className="pd-showcase__title pd-reveal">{project.title}</h2>
                        <DescriptionBody
                          html={project.long_description}
                          fallback={project.short_description}
                        />
                      </div>
                    </div>

                    {captionBits.length ? (
                      <p className="pd-showcase__caption pd-reveal">
                        {captionBits.join(' · ')}
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              {projectSpecs.length ? (
                <section className="pd-specs-cards" aria-label="Project specifications">
                  <div className="pd-specs-cards__inner">
                    <div className="pd-specs-cards__head pd-reveal">
                      <p className="pd-specs-cards__eyebrow">
                        <span className="pd-specs-cards__eyebrow-line" aria-hidden="true" />
                        Project Details
                      </p>
                      <h2 className="pd-specs-cards__title">Location &amp; Scope</h2>
                      <p className="pd-specs-cards__lead">
                        Key project information at a glance — sector, location, role, scale, and current status.
                      </p>
                    </div>

                    <div className="pd-specs-cards__grid">
                      {projectSpecs.map((spec, i) => (
                        <div
                          key={spec.id}
                          className="pd-reveal"
                          style={{ '--pd-i': i }}
                        >
                          <SpecCard spec={spec} index={i} />
                        </div>
                      ))}
                    </div>

                    <div className="pd-specs-cards__slider">
                      <div className="pd-specs-cards__carousel swiper" ref={specsSwiperRef}>
                        <div className="swiper-wrapper">
                          {projectSpecs.map((spec, i) => (
                            <div className="swiper-slide" key={spec.id}>
                              <SpecCard spec={spec} index={i} />
                            </div>
                          ))}
                        </div>
                        <div className="pd-mobile-dots" />
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              {galleryImages.length ? (
                <section className="pd-gallery-full" aria-labelledby="pd-gallery-title">
                  <div className="pd-gallery-full__inner">
                    <div className="pd-gallery-full__head pd-reveal">
                      <div className="pd-gallery-full__head-left">
                        <p className="pd-gallery-full__eyebrow">
                          <span className="pd-gallery-full__eyebrow-line" aria-hidden="true" />
                          Visual Story
                        </p>
                        <h2 id="pd-gallery-title" className="pd-gallery-full__title">
                          Our Projects Gallery
                        </h2>
                      </div>
                      <p className="pd-gallery-full__lead">
                        {project.short_description ||
                          `Images from ${project.title}.`}
                      </p>
                    </div>

                    <div className="pd-gallery-full__grid">
                      {galleryImages.map((item, i) => (
                        <div
                          key={(item.id != null ? String(item.id) : item.src) + String(i)}
                          className="pd-reveal"
                          style={{ '--pd-i': i }}
                        >
                          <GalleryCell item={item} index={i} onOpen={setLightboxIndex} />
                        </div>
                      ))}
                    </div>

                    <div className="pd-gallery-full__slider">
                      <div className="pd-gallery-full__carousel swiper" ref={gallerySwiperRef}>
                        <div className="swiper-wrapper">
                          {galleryImages.map((item, i) => (
                            <div
                              className="swiper-slide"
                              key={`m-${item.id != null ? String(item.id) : item.src}-${i}`}
                            >
                              <GalleryCell item={item} index={i} onOpen={setLightboxIndex} />
                            </div>
                          ))}
                        </div>
                        <div className="pd-mobile-dots" />
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}
            </>
          ) : null}

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
          <DeferredGallerySection />
        </div>

        <SiteFooter />
      </div>

      {lightboxIndex !== null && gallerySrcs.length ? (
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
            <img src={gallerySrcs[lightboxIndex]} alt="" />
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
            {lightboxIndex + 1} / {gallerySrcs.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
