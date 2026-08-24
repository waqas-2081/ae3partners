import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ensureTemplateScriptsLoaded } from '../../template/loadTemplateScripts';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import GallerySection from '../Home/sections/GallerySection';
import ScrollPercentage from '../Home/components/ScrollPercentage';
import { fetchProjectCategories, fetchProjects } from '../../api/projectsApi';
import './ProjectsPage.css';

const P = process.env.PUBLIC_URL || '';
const SLIDE_INTERVAL_MS = 5200;
/** Featured slider: first N projects from API (by sort_order) */
const FEATURED_SLIDER_LIMIT = 3;

/** High-res local images for featured slider (API thumbs can look soft/blurry). */
const FEATURED_IMAGE_OVERRIDES = [
  {
    match: /liberation-park/i,
    image: `${P}/assets/newimages/featured-projects/liberation-park-featured.png`,
  },
  {
    match: /kingmakers/i,
    image: `${P}/assets/newimages/featured-projects/kingmakers-featured.png`,
  },
];

function featuredSlideImage(proj) {
  if (!proj) return '';
  const haystack = `${proj.slug || ''} ${proj.title || ''}`;
  const override = FEATURED_IMAGE_OVERRIDES.find((row) => row.match.test(haystack));
  return override?.image || proj.image || '';
}

function useScrollReveal(rootRef, revealKey = '') {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const els = Array.from(root.querySelectorAll('.pp-reveal')).filter(
      (el) => !el.closest('.pp-project-grid') && !el.closest('.pp-slider-viewport')
    );
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('pp-is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, revealKey]);
}

function useFeaturedSliderReveal(viewportRef, featuredKey) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !featuredKey) return undefined;
    viewport.classList.add('pp-is-visible');
  }, [viewportRef, featuredKey]);
}

function useProjectGridReveal(gridRef, activeTab, projectsKey) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const els = grid.querySelectorAll('.pp-reveal');
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('pp-is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    els.forEach((el) => {
      el.classList.remove('pp-is-visible');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [gridRef, activeTab, projectsKey]);
}

function projectCardKey(proj) {
  return proj.slug || String(proj.id);
}

function FeaturedSliderSkeleton() {
  return (
    <div className="pp-skel-featured" aria-hidden="true">
      <div className="pp-skel-featured-inner">
        <span className="pp-skel pp-skel-tag" />
        <span className="pp-skel pp-skel-title" />
        <span className="pp-skel pp-skel-meta" />
        <span className="pp-skel pp-skel-btn" />
      </div>
    </div>
  );
}

function ProjectTabsSkeleton() {
  return (
    <div className="pp-tabs pp-skel-tabs" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="pp-skel pp-skel-tab"
          style={{ width: i === 0 ? 128 : 96 + (i % 3) * 12 }}
        />
      ))}
    </div>
  );
}

function ProjectGridSkeleton() {
  return (
    <div className="pp-project-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <article key={i} className="pp-project-card pp-skel-card">
          <div className="pp-card-media pp-skel pp-skel-media" />
          <div className="pp-card-body">
            <div className="pp-card-meta">
              <span className="pp-skel pp-skel-chip" />
              <span className="pp-skel pp-skel-chip pp-skel-chip--sm" />
            </div>
            <span className="pp-skel pp-skel-card-title" />
            <span className="pp-skel pp-skel-card-desc" />
            <span className="pp-skel pp-skel-card-desc pp-skel-card-desc--short" />
            <span className="pp-skel pp-skel-link" />
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Projects() {
  const [scriptsReady, setScriptsReady] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const slideIdxRef = useRef(0);
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const featuredRef = useRef(null);
  const featuredViewportRef = useRef(null);
  slideIdxRef.current = slideIdx;

  const featuredProjects = useMemo(
    () => projects.slice(0, FEATURED_SLIDER_LIMIT),
    [projects]
  );
  const featuredKey = featuredProjects.map((p) => p.slug || p.id).join('|');
  const slideCount = featuredProjects.length;

  const projectTabs = useMemo(
    () => [
      { id: 'all', label: 'All Projects' },
      ...categories.map((cat) => ({
        id: cat.slug,
        label: cat.name,
      })),
    ],
    [categories]
  );

  const tabLabelForCategory = useCallback(
    (categorySlug) => {
      const row = projectTabs.find((t) => t.id === categorySlug);
      return row ? row.label : categorySlug;
    },
    [projectTabs]
  );

  const goSlide = useCallback(
    (next) => {
      if (!slideCount) return;
      setSlideIdx((next + slideCount) % slideCount);
    },
    [slideCount]
  );

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab, projects]);

  const projectsKey = filteredProjects.map(projectCardKey).join('|');

  useScrollReveal(rootRef, featuredKey);
  useFeaturedSliderReveal(featuredViewportRef, featuredKey);
  useProjectGridReveal(gridRef, activeTab, projectsKey);

  useEffect(() => {
    let cancelled = false;

    async function loadProjectsList() {
      setListLoading(true);
      setListError(null);
      try {
        const [cats, list] = await Promise.all([
          fetchProjectCategories(),
          fetchProjects(),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setProjects(list);
      } catch (err) {
        if (cancelled) return;
        setCategories([]);
        setProjects([]);
        setListError(err?.message || 'Failed to load projects');
      } finally {
        if (!cancelled) setListLoading(false);
      }
    }

    loadProjectsList();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'all') return;
    const exists = categories.some((c) => c.slug === activeTab);
    if (!exists) setActiveTab('all');
  }, [categories, activeTab]);

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
    let cancelled = false;
    ensureTemplateScriptsLoaded()
      .then(() => {
        if (!cancelled) setScriptsReady(true);
      })
      .catch(() => {
        if (!cancelled) setScriptsReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSlideIdx(0);
  }, [featuredKey]);

  useEffect(() => {
    if (!slideCount) return undefined;
    const id = window.setInterval(() => {
      goSlide(slideIdxRef.current + 1);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goSlide, slideCount]);

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div
        id="app-wrapper"
        className="projects-page studio-page"
        ref={rootRef}
        aria-busy={listLoading}
      >
        <div id="app-content" className="studio-reveal-content">
          <section className="pp-section pp-featured" id="pp-featured" ref={featuredRef}>
            <div className="pp-container pp-container--head">
              <div className="pp-featured-head pp-reveal">
                <div>
                  <p className="pp-section-eyebrow">Spotlight</p>
                  <h2 className="pp-section-title">Featured Work</h2>
                  <p className="pp-section-sub">
                    Landmark work shaping communities, campuses, and infrastructure across California.
                  </p>
                </div>
                <div className="pp-slider-nav">
                  <button
                    type="button"
                    className="pp-slider-btn"
                    aria-label="Previous featured project"
                    onClick={() => goSlide(slideIdx - 1)}
                    disabled={!slideCount}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="pp-slider-btn"
                    aria-label="Next featured project"
                    onClick={() => goSlide(slideIdx + 1)}
                    disabled={!slideCount}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {listLoading ? <FeaturedSliderSkeleton /> : null}

            {!listLoading && featuredProjects.length > 0 ? (
              <>
            <div
              ref={featuredViewportRef}
              className="pp-slider-viewport pp-reveal pp-is-visible"
              style={{ '--pp-slide-count': slideCount }}
            >
              <div
                className="pp-slider-track"
                style={{
                  transform: `translateX(-${(slideIdx * 100) / slideCount}%)`,
                }}
              >
                {featuredProjects.map((proj, i) => {
                  const slideImage = featuredSlideImage(proj);
                  return (
                  <article
                    key={projectCardKey(proj)}
                    className={`pp-slide ${i === slideIdx ? 'pp-is-active' : ''}`}
                    aria-hidden={i !== slideIdx}
                  >
                    {slideImage ? (
                      <img src={slideImage} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
                    ) : (
                      <div
                        aria-hidden
                        style={{
                          width: '100%',
                          height: '100%',
                          minHeight: 420,
                          background: '#1a2744',
                        }}
                      />
                    )}
                    <div className="pp-slide-overlay" />
                    <div className="pp-slide-content">
                      <span className="pp-slide-tag">{proj.location || 'California'}</span>
                      <h3 className="pp-slide-title">{proj.title}</h3>
                      <p className="pp-slide-meta">{proj.excerpt || ''}</p>
                      {proj.slug ? (
                        <Link className="pp-slide-link" to={`/projects/${proj.slug}`}>
                          Explore project →
                        </Link>
                      ) : (
                        <span className="pp-slide-link">Explore project →</span>
                      )}
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>

            <div className="pp-container pp-container--head">
              <div className="pp-slider-dots" role="tablist" aria-label="Featured slides">
                {featuredProjects.map((proj, i) => (
                  <button
                    key={projectCardKey(proj)}
                    type="button"
                    role="tab"
                    aria-selected={i === slideIdx}
                    aria-label={`Slide ${i + 1}`}
                    className={`pp-dot ${i === slideIdx ? 'pp-is-active' : ''}`}
                    onClick={() => goSlide(i)}
                  />
                ))}
              </div>
            </div>
              </>
            ) : null}
          </section>

          <section className="pp-section pp-all" id="pp-all">
            <div className="pp-container">
              <div className="pp-all-head pp-reveal">
                <div>
                  <h2 className="pp-section-title">All Projects</h2>
                </div>
              </div>

              {listLoading ? (
                <ProjectTabsSkeleton />
              ) : (
                <div className="pp-tabs pp-reveal" role="tablist" aria-label="Project categories">
                  {projectTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      className={`pp-tab-btn ${activeTab === tab.id ? 'pp-is-active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {listError ? (
                <p className="pp-reveal pp-is-visible" style={{ marginTop: '1.5rem', color: '#b42318' }}>
                  Could not load projects. Make sure the API is running at{' '}
                  {process.env.REACT_APP_API_URL || 'http://ae3partnersadmin.testdemolink.com'}.
                </p>
              ) : null}

              {!listLoading && !listError && filteredProjects.length === 0 ? (
                <p className="pp-reveal pp-is-visible" style={{ marginTop: '1.5rem' }}>
                  No projects in this category yet.
                </p>
              ) : null}

              {listLoading ? (
                <ProjectGridSkeleton />
              ) : (
              <div className="pp-project-grid" ref={gridRef}>
                {filteredProjects.map((proj, idx) => (
                  <article
                    key={projectCardKey(proj)}
                    className={`pp-project-card pp-reveal ${
                      idx % 3 === 1 ? 'pp-delay-1' : idx % 3 === 2 ? 'pp-delay-2' : ''
                    }`.trim()}
                  >
                    <div className="pp-card-media">
                      {proj.image ? (
                        <img src={proj.image} alt="" loading="lazy" />
                      ) : (
                        <div
                          aria-hidden
                          style={{
                            width: '100%',
                            height: '100%',
                            minHeight: 220,
                            background: '#e8eef5',
                          }}
                        />
                      )}
                      <span className="pp-card-badge">
                        {activeTab === 'all'
                          ? proj.category_label || tabLabelForCategory(proj.category) || 'Project'
                          : tabLabelForCategory(proj.category)}
                      </span>
                    </div>
                    <div className="pp-card-body">
                      <div className="pp-card-meta">
                        <span>{proj.location || '—'}</span>
                        <span>{proj.year || '—'}</span>
                      </div>
                      <h3 className="pp-card-title">{proj.title}</h3>
                      <p className="pp-card-desc">{proj.excerpt || ''}</p>
                      {proj.slug ? (
                        <Link className="pp-card-link" to={`/projects/${proj.slug}`}>
                          View project →
                        </Link>
                      ) : (
                        <button type="button" className="pp-card-link" disabled>
                          View project →
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              )}
            </div>
          </section>

          <GallerySection />
        </div>

        <SiteFooter />
      </div>

      <ScrollPercentage />
      <span style={{ display: 'none' }}>{scriptsReady ? 'ready' : 'loading'}</span>
    </>
  );
}
