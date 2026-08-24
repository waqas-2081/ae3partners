import { memo, useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import { fetchProjectCategories, fetchProjects } from '../../api/projectsApi';
import './ProjectsPage.css';

const P = process.env.PUBLIC_URL || '';
const SLIDE_INTERVAL_MS = 5200;
const FEATURED_SLIDER_LIMIT = 3;
const GRID_BATCH_SIZE = 6;
const GRID_INITIAL_COUNT = 6;

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

function projectCardKey(proj) {
  return proj.slug || String(proj.id);
}

function useScrollGridCount(total, resetKey) {
  const sentinelRef = useRef(null);
  const visibleRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const initial = total ? Math.min(GRID_INITIAL_COUNT, total) : 0;
    visibleRef.current = initial;
    setVisibleCount(initial);
  }, [total, resetKey]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !total || visibleCount >= total) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const current = visibleRef.current;
        if (current >= total) return;
        const next = Math.min(current + GRID_BATCH_SIZE, total);
        visibleRef.current = next;
        startTransition(() => setVisibleCount(next));
      },
      { rootMargin: '350px 0px', threshold: 0 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [total, visibleCount, resetKey]);

  return { visibleCount, sentinelRef };
}

const FeaturedSlider = memo(function FeaturedSlider({ projects }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const slideIdxRef = useRef(0);
  const viewportRef = useRef(null);
  const slideCount = projects.length;
  slideIdxRef.current = slideIdx;

  const goSlide = useCallback(
    (next) => {
      if (!slideCount) return;
      setSlideIdx((next + slideCount) % slideCount);
    },
    [slideCount]
  );

  useEffect(() => {
    setSlideIdx(0);
  }, [projects]);

  useEffect(() => {
    projects.forEach((proj) => {
      const src = featuredSlideImage(proj);
      if (!src) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [projects]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) viewport.classList.add('pp-is-visible');
  }, [projects]);

  useEffect(() => {
    if (!slideCount || slideCount < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const tick = () => {
      if (document.hidden) return;
      goSlide(slideIdxRef.current + 1);
    };

    const id = window.setInterval(tick, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goSlide, slideCount]);

  const activeProject = projects[slideIdx];
  if (!activeProject) return null;

  return (
    <>
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
              disabled={slideCount < 2}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="pp-slider-btn"
                    aria-label="Next featured project"
                    onClick={() => goSlide(slideIdx + 1)}
              disabled={slideCount < 2}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div
        ref={viewportRef}
        className="pp-slider-viewport pp-slider-viewport--single pp-reveal pp-is-visible"
      >
        <article className="pp-slide pp-is-active">
          <div className="pp-slide-stack" aria-hidden="true">
            {projects.map((proj, i) => {
              const src = featuredSlideImage(proj);
              if (!src) return null;
              return (
                <img
                  key={projectCardKey(proj)}
                  src={src}
                  alt=""
                  className={i === slideIdx ? 'pp-is-active' : ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i === 0 ? 'high' : 'low'}
                />
              );
            })}
          </div>
                    <div className="pp-slide-overlay" />
                    <div className="pp-slide-content">
            <span className="pp-slide-tag">{activeProject.location || 'California'}</span>
            <h3 className="pp-slide-title">{activeProject.title}</h3>
            <p className="pp-slide-meta">{activeProject.excerpt || ''}</p>
            {activeProject.slug ? (
              <Link className="pp-slide-link" to={`/projects/${activeProject.slug}`}>
                        Explore project →
              </Link>
            ) : (
              <span className="pp-slide-link">Explore project →</span>
            )}
                    </div>
                  </article>
            </div>

            <div className="pp-container pp-container--head">
              <div className="pp-slider-dots" role="tablist" aria-label="Featured slides">
          {projects.map((proj, i) => (
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
  );
});

const ProjectCard = memo(function ProjectCard({ proj, badgeLabel }) {
  return (
    <article className="pp-project-card">
      <div className="pp-card-media">
        {proj.image ? (
          <img
            src={proj.image}
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
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
        <span className="pp-card-badge">{badgeLabel}</span>
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
  );
});

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

const AllProjectsSection = memo(function AllProjectsSection({
  listLoading,
  listError,
  projects,
  categories,
}) {
  const [activeTab, setActiveTab] = useState('all');

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

  const tabLabelMap = useMemo(() => {
    return new Map(projectTabs.map((tab) => [tab.id, tab.label]));
  }, [projectTabs]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab, projects]);

  const gridResetKey = `${activeTab}|${filteredProjects.length}|${filteredProjects[0]?.id ?? 0}`;
  const { visibleCount: visibleGridCount, sentinelRef: gridSentinelRef } = useScrollGridCount(
    filteredProjects.length,
    gridResetKey
  );

  const handleTabChange = useCallback((tabId) => {
    startTransition(() => setActiveTab(tabId));
  }, []);

  useEffect(() => {
    if (activeTab === 'all') return;
    const exists = categories.some((c) => c.slug === activeTab);
    if (!exists) setActiveTab('all');
  }, [categories, activeTab]);

  const visibleGridItems = useMemo(() => {
    return filteredProjects.slice(0, visibleGridCount).map((proj) => ({
      key: projectCardKey(proj),
      proj,
      badgeLabel:
        activeTab === 'all'
          ? proj.category_label || tabLabelMap.get(proj.category) || 'Project'
          : tabLabelMap.get(proj.category) || proj.category,
    }));
  }, [activeTab, filteredProjects, tabLabelMap, visibleGridCount]);

  return (
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
                onClick={() => handleTabChange(tab.id)}
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
          <>
            <div className="pp-project-grid">
              {visibleGridItems.map(({ key, proj, badgeLabel }) => (
                <ProjectCard key={key} proj={proj} badgeLabel={badgeLabel} />
              ))}
                    </div>
            {visibleGridCount < filteredProjects.length ? (
              <div ref={gridSentinelRef} className="pp-grid-sentinel" aria-hidden="true" />
            ) : null}
          </>
                      )}
                    </div>
    </section>
  );
});

export default function Projects() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  const featuredProjects = useMemo(
    () => projects.slice(0, FEATURED_SLIDER_LIMIT),
    [projects]
  );

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

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div
        id="app-wrapper"
        className="projects-page studio-page pp-performance"
        aria-busy={listLoading}
      >
        <div id="app-content" className="studio-reveal-content">
          <section className="pp-section pp-featured" id="pp-featured">
            {listLoading ? (
              <div className="pp-container pp-container--head">
                <div className="pp-featured-head pp-reveal">
                  <div>
                    <p className="pp-section-eyebrow">Spotlight</p>
                    <h2 className="pp-section-title">Featured Work</h2>
                    <p className="pp-section-sub">
                      Landmark work shaping communities, campuses, and infrastructure across California.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {listLoading ? <FeaturedSliderSkeleton /> : null}
            {!listLoading && featuredProjects.length > 0 ? (
              <FeaturedSlider projects={featuredProjects} />
            ) : null}
          </section>

          <AllProjectsSection
            listLoading={listLoading}
            listError={listError}
            projects={projects}
            categories={categories}
          />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
