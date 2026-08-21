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

/** Shown in the featured slider — same projects as home `ProjectBigSection`. */
const FEATURED_PROJECTS = [
  {
    id: 'feat-coalameda-aviation',
    title: 'College of Alameda Aviation Complex',
    location: 'Alameda, California',
    description:
      'A new gateway for aviation education, providing students with hands-on training, modern learning environments, and pathways to careers in one of the region\'s most vital industries.',
    image: `${P}/assets/newimages/featured-projects/college-of-alameda-aviation.png`,
  },
  {
    id: 'feat-wlac-plant',
    title: 'WLAC Plant Facilities & Shops Replacement',
    location: 'Los Angeles, California',
    description:
      'Designed to support the people who keep the campus running, this facility equips students and staff with the tools, training, and infrastructure needed to maintain and improve the college for generations to come.',
    image: `${P}/assets/newimages/featured-projects/wlac-plant-facilities.png`,
  },
  {
    id: 'feat-liberation-park',
    title: 'Liberation Park Market Hall & Communal Courtyard',
    location: 'Oakland, California',
    description:
      'Created as a place to gather, celebrate, and grow, Liberation Park provides local entrepreneurs, artists, and residents with a vibrant community destination rooted in culture, connection, and opportunity.',
    image: `${P}/assets/newimages/featured-projects/liberation-park.png`,
  },
];

const SLIDE_INTERVAL_MS = 5200;
const FEATURED_FOR_SLIDER = FEATURED_PROJECTS;
/** All-projects grid: max cards shown (per active tab) */
const ALL_PROJECTS_GRID_LIMIT = 6;

function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const els = Array.from(root.querySelectorAll('.pp-reveal')).filter(
      (el) => !el.closest('.pp-project-grid')
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
  }, [rootRef]);
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
  slideIdxRef.current = slideIdx;
  const slideCount = FEATURED_FOR_SLIDER.length;

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
      setSlideIdx((next + slideCount) % slideCount);
    },
    [slideCount]
  );

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab, projects]);

  const gridProjects = filteredProjects.slice(0, ALL_PROJECTS_GRID_LIMIT);
  const projectsKey = gridProjects.map(projectCardKey).join('|');

  useScrollReveal(rootRef);
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
    const id = window.setInterval(() => {
      goSlide(slideIdxRef.current + 1);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goSlide]);

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="projects-page studio-page" ref={rootRef}>
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
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="pp-slider-btn"
                    aria-label="Next featured project"
                    onClick={() => goSlide(slideIdx + 1)}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div
              className="pp-slider-viewport pp-reveal"
              style={{ '--pp-slide-count': Math.max(1, slideCount) }}
            >
              <div
                className="pp-slider-track"
                style={{
                  transform: `translateX(-${(slideIdx * 100) / Math.max(1, slideCount)}%)`,
                }}
              >
                {FEATURED_FOR_SLIDER.map((proj, i) => (
                  <article
                    key={proj.id}
                    className={`pp-slide ${i === slideIdx ? 'pp-is-active' : ''}`}
                    aria-hidden={i !== slideIdx}
                  >
                    <img src={proj.image} alt="" />
                    <div className="pp-slide-overlay" />
                    <div className="pp-slide-content">
                      <span className="pp-slide-tag">{proj.location}</span>
                      <h3 className="pp-slide-title">{proj.title}</h3>
                      <p className="pp-slide-meta">{proj.description}</p>
                      <a
                        href="#pp-all"
                        className="pp-slide-link"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('pp-all')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Explore project →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="pp-container pp-container--head">
              <div className="pp-slider-dots" role="tablist" aria-label="Featured slides">
                {FEATURED_FOR_SLIDER.map((proj, i) => (
                  <button
                    key={proj.id}
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
          </section>

          <section className="pp-section pp-all" id="pp-all">
            <div className="pp-container">
              <div className="pp-all-head pp-reveal">
                <div>
                  <h2 className="pp-section-title">All Projects</h2>
                </div>
              </div>

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

              {listLoading ? (
                <p className="pp-reveal pp-is-visible" style={{ marginTop: '1.5rem' }}>
                  Loading projects…
                </p>
              ) : null}

              {listError ? (
                <p className="pp-reveal pp-is-visible" style={{ marginTop: '1.5rem', color: '#b42318' }}>
                  Could not load projects. Make sure the API is running at{' '}
                  {process.env.REACT_APP_API_URL || 'http://localhost:8000'}.
                </p>
              ) : null}

              {!listLoading && !listError && gridProjects.length === 0 ? (
                <p className="pp-reveal pp-is-visible" style={{ marginTop: '1.5rem' }}>
                  No projects in this category yet.
                </p>
              ) : null}

              <div className="pp-project-grid" ref={gridRef}>
                {gridProjects.map((proj, idx) => (
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
