import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ensureTemplateScriptsLoaded } from '../../template/loadTemplateScripts';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import Footer from '../Home/sections/Footer';
import ScrollPercentage from '../Home/components/ScrollPercentage';
import { DUBLIN_SHERIFF_DETAIL_PATH, projectHasDublinSheriffDetail } from './ProjectDetailPage';
import './ProjectsPage.css';

/** @typedef {'civic'|'education'|'transportation'|'federal'|'residential'} ProjectCategory */

const P = process.env.PUBLIC_URL || '';

const publicImage = (file) => `${P}/assets/newimages/${file}`;

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

/** @type {Array<{ id: string, category: ProjectCategory, title: string, location: string, year: string, excerpt: string, image: string }>} */
const ALL_PROJECTS = [
  /* — Civic + Commercial (https://www.ae3partners.com/project-categories/civic-commercial) — */
  {
    id: "civ-dublin-parking",
    category: "civic",
    title: "Dublin Transit Center Parking Garage",
    location: "Dublin, CA",
    year: "2024",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project2.jpg")
  },
  {
    id: "civ-liberation",
    category: "civic",
    title: "Liberation Park Market Hall & Communal Courtyard",
    location: "East Oakland, CA",
    year: "2025",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project1.jpg")
  },
  {
    id: "civ-kingmakers",
    category: "civic",
    title: "Kingmakers of Oakland",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project3.jpg")
  },
  {
    id: "civ-aahrc",
    category: "civic",
    title: "African American Holistic Resource Center",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project4.jpg")
  },
  {
    id: "civ-sclarc",
    category: "civic",
    title: "SCLARC Golden State Mutual Insurance Building",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("salcar.jpg")
  },
  {
    id: "civ-patelco-sprinkles-sr",
    category: "civic",
    title: "Patelco Credit Union & Sprinkles Cupcakes San Ramon Branch",
    location: "San Ramon, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("petcal.jpg")
  },
  {
    id: "civ-patelco-sac",
    category: "civic",
    title: "Patelco Credit Union Sacramento Branch",
    location: "Sacramento, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("pretal.jpg")
  },
  {
    id: "civ-patelco-sl",
    category: "civic",
    title: "Patelco Credit Union San Leandro Branch",
    location: "San Leandro, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("san.jpg")
  },
  {
    id: "civ-patelco-berk",
    category: "civic",
    title: "Patelco Credit Union Berkeley Branch",
    location: "Berkeley, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("credit.jpg")
  },
  {
    id: "civ-sclarc-legacy",
    category: "civic",
    title: "South Central Los Angeles Regional Center, Legacy Plaza Building",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare1.jpg")
  },
  {
    id: "civ-moscone",
    category: "civic",
    title: "Moscone Convention Center Expansion",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("moco.jpg")
  },
  {
    id: "civ-pge-auburn",
    category: "civic",
    title: "PG&E Auburn Regional Business Park",
    location: "Auburn, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project1.jpg")
  },
  {
    id: "civ-la-deferred",
    category: "civic",
    title: "County of Los Angeles Deferred Maintenance",
    location: "Los Angeles County, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project2.jpg")
  },
  {
    id: "civ-exchange",
    category: "civic",
    title: "The Exchange",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project3.jpg")
  },
  {
    id: "civ-st-anthony",
    category: "civic",
    title: "St. Anthony’s Foundation, 121 & 150 Golden Gate Avenue",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project4.jpg")
  },
  {
    id: "civ-sfpuc-SSIP",
    category: "civic",
    title: "San Francisco Public Utilities Commission, Sewer System Improvement Program (SSIP)",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project5.jpg")
  },
  {
    id: "civ-cornerstone",
    category: "civic",
    title: "Cornerstone Missionary Baptist Church",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service1.jpg")
  },
  {
    id: "civ-crenshaw",
    category: "civic",
    title: "Crenshaw Expo Village",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service2.jpg")
  },
  {
    id: "civ-alice-griffith",
    category: "civic",
    title: "Alice Griffith Phase III",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service3.jpg")
  },
  {
    id: "civ-dealership",
    category: "civic",
    title: "Dealership Restoration",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service4.jpg")
  },
  {
    id: "civ-bioscience-la",
    category: "civic",
    title: "Bioscience LA",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare1.jpg")
  },
  {
    id: "civ-dublin-sheriff",
    category: "civic",
    title: "Dublin Alameda County Sheriff’s Office",
    location: "Dublin, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare2.jpg")
  },
  {
    id: "civ-patelco-sj",
    category: "civic",
    title: "Patelco Credit Union San Jose Branch",
    location: "San Jose, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("cherry.jpg")
  },
  {
    id: "civ-chase-arena",
    category: "civic",
    title: "Chase Arena Office Tower",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project2.jpg")
  },

  /* — Education + Institutional (https://www.ae3partners.com/project-categories/education-institutional) — */
  {
    id: "edu-lausd-gym",
    category: "education",
    title: "LAUSD El Camino Charter High School Gymnasium & Accessibility Upgrades",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("lusa.jpg")
  },
  {
    id: "edu-wccusd",
    category: "education",
    title: "West Contra Costa Unified School District (WCCUSD) Summer Modernization Project",
    location: "Contra Costa County, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("west.jpg")
  },
  {
    id: "edu-eagle-rock",
    category: "education",
    title: "Eagle Rock Elementary Access Barrier Removal Project",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("eagle.jpg")
  },
  {
    id: "edu-barbara-lee",
    category: "education",
    title: "Barbara Lee Center for Social Justice & Civic Engagement",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("babar.jpg")
  },
  {
    id: "edu-coalameda-aviation",
    category: "education",
    title: "College of Alameda Aviation Complex Replacement",
    location: "Alameda, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("collage.png")
  },
  {
    id: "edu-merritt-cdc",
    category: "education",
    title: "Merritt College Child Development Center",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("merit.jpg")
  },
  {
    id: "edu-laccd-wlac",
    category: "education",
    title: "Los Angeles Community College District, West Los Angeles College Plant Facilities & Shops Replacement",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service4.jpg")
  },
  {
    id: "edu-kaiser-oak",
    category: "education",
    title: "Kaiser Oakland Hospital Replacement",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare1.jpg")
  },
  {
    id: "edu-laccd-security",
    category: "education",
    title: "Los Angeles Community College District Security Masterplan, Regions 1 & 3",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare2.jpg")
  },
  {
    id: "edu-realm",
    category: "education",
    title: "Realm Charter School",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project1.jpg")
  },
  {
    id: "edu-ousd-glenview",
    category: "education",
    title: "Oakland Unified School District, Glenview Elementary School Playground Replacement",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project2.jpg")
  },

  /* — Transportation (https://www.ae3partners.com/project-categories/transporation) — */
  {
    id: "trn-lawa-f",
    category: "transportation",
    title: "LAWA Lot F Rehab Project",
    location: "Los Angeles, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("lawa.jpg")
  },
  {
    id: "trn-oak-iab",
    category: "transportation",
    title: "Oakland International Airport, International Arrivals Building Improvements",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("arival.jpg")
  },
  {
    id: "trn-sfo-atc-demo",
    category: "transportation",
    title: "San Francisco International Airport, Air Traffic Control Tower Demolition",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare1.jpg")
  },
  {
    id: "trn-oak-demo",
    category: "transportation",
    title: "Oakland International Airport Demolition Projects",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("okland.jpg")
  },
  {
    id: "trn-sfo-cell",
    category: "transportation",
    title: "San Francisco International Airport Cell Phone Waiting Lot Improvements",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("phone.jpg")
  },
  {
    id: "trn-sfo-t2-atc",
    category: "transportation",
    title: "San Francisco International Airport Terminal 2 Air Traffic Control Tower Demolition and Terminal Improvements",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("terace.jpg")
  },
  {
    id: "trn-sfo-asneeded",
    category: "transportation",
    title: "San Francisco International Airport — As-Needed Construction Management Support Services",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service4.jpg")
  },
  {
    id: "trn-bart-ecdn",
    category: "transportation",
    title: "BART El Cerrito Del Norte Station",
    location: "El Cerrito, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare1.jpg")
  },
  {
    id: "trn-sfo-t2-g15",
    category: "transportation",
    title: "San Francisco International Airport — Terminal 2, 15th Gate Renovation",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("whoweare2.jpg")
  },
  {
    id: "trn-bart-oac",
    category: "transportation",
    title: "BART, Oakland Airport Connector",
    location: "Oakland / San Francisco Bay, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project1.jpg")
  },

  /* — Federal (https://www.ae3partners.com/project-categories/federal) — */
  {
    id: "fed-conf-airport",
    category: "federal",
    title: "Confidential Airport Client",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("airpot.jpg")
  },
  {
    id: "fed-nasa-ames",
    category: "federal",
    title: "NASA Ames Research Center Mentor-Protégé Program",
    location: "Moffett Field, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("nasa.jpg")
  },
  {
    id: "fed-hud-mfh",
    category: "federal",
    title: "HUD Multi-Family Housing Inspections",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("hod.jpg")
  },
  {
    id: "fed-gsa-peckham",
    category: "federal",
    title: "GSA, Robert F. Peckham Federal Building Judge’s Chambers Tenant Improvements",
    location: "San Jose, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("robert.jpg")
  },
  {
    id: "fed-gsa-dellums",
    category: "federal",
    title: "GSA, Ronald V. Dellums Federal Building",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("gsa.jpg")
  },
  {
    id: "fed-gsa-burton",
    category: "federal",
    title: "GSA, Phillip J. Burton Federal Building and U.S. Courthouse, U.S. Trustees Relocation Project",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("gas.jpg")
  },
  {
    id: "fed-gsa-un50",
    category: "federal",
    title: "GSA, 50 United Nations Plaza Federal Office Building, Pacific Rim 9 Regional Office Realignment Project",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("service3.jpg")
  },

  /* — Residential (https://www.ae3partners.com/project-categories/residential) — */
  {
    id: "res-venue",
    category: "residential",
    title: "Venue",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("venu.jpg")
  },
  {
    id: "res-one-mission",
    category: "residential",
    title: "One Mission Bay",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("one.jpg")
  },
  {
    id: "res-palisades",
    category: "residential",
    title: "The Palisades",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("palidas.jpg")
  },
  {
    id: "res-lowell",
    category: "residential",
    title: "Lowell Street Condominiums",
    location: "San Francisco, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("model.jpg")
  },
  {
    id: "res-purissima",
    category: "residential",
    title: "Purissima Modern Residence",
    location: "Bay Area, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("puri.jpg")
  },
  {
    id: "res-campus",
    category: "residential",
    title: "Campus Residence",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("campus.jpg")
  },
  {
    id: "res-fairview",
    category: "residential",
    title: "Fairview Park Residence",
    location: "California",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project4.jpg")
  },
  {
    id: "res-oak-hills",
    category: "residential",
    title: "Oakland Hills Residence",
    location: "Oakland, CA",
    year: "—",
    excerpt: "Architecture and construction management delivery aligned with AE3 portfolio standards.",
    image: publicImage("project5.jpg")
  }
];

/**
 * First six rows under “All Projects” on https://www.ae3partners.com/projects (same order).
 * Pulled from `ALL_PROJECTS` by id so titles/images stay in sync.
 */
const AE3_ALL_PROJECTS_PAGE_FIRST_SIX_IDS = [
  'civ-moscone',
  'civ-patelco-sprinkles-sr',
  'civ-patelco-berk',
  'civ-patelco-sac',
  'civ-patelco-sj',
  'civ-patelco-sl'
];

const ALL_TAB_FIRST_SIX = AE3_ALL_PROJECTS_PAGE_FIRST_SIX_IDS.map((id) =>
  ALL_PROJECTS.find((p) => p.id === id)
).filter(Boolean);

const PROJECT_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'civic', label: 'Civic + Commercial' },
  { id: 'education', label: 'Education + Institutional' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'federal', label: 'Federal' },
  { id: 'residential', label: 'Residential' }
];

function tabLabelForCategory(categoryId) {
  const row = PROJECT_TABS.find((t) => t.id === categoryId);
  return row ? row.label : categoryId;
}

/**
 * Har project ki apni image yahan set karo — `Projects.jsx` wali `id` same honi chahiye.
 * File `public/assets/newimages/` mein rakho, yahan sirf naam: `publicImage('photo.jpg')`.
 * Jo `id` yahan na likho, data se wohi `image` URL use hogi.
 *
 * Examples (uncomment / copy):
 *   'civ-moscone': publicImage('moscone.jpg'),
 *   'feat-liberation': publicImage('liberation.jpg'),
 */
const PROJECT_IMAGE_OVERRIDES = {
  // id: publicImage('your-file.jpg'),
};

function projectImg(proj) {
  if (!proj?.id) return proj?.image ?? '';
  const override = PROJECT_IMAGE_OVERRIDES[proj.id];
  return override ?? proj.image;
}

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

function useProjectGridReveal(gridRef, activeTab) {
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
  }, [gridRef, activeTab]);
}

export default function Projects() {
  const [scriptsReady, setScriptsReady] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const slideIdxRef = useRef(0);
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const featuredRef = useRef(null);
  slideIdxRef.current = slideIdx;
  const slideCount = FEATURED_FOR_SLIDER.length;

  const goSlide = useCallback(
    (next) => {
      setSlideIdx((next + slideCount) % slideCount);
    },
    [slideCount]
  );

  const filteredProjects =
    activeTab === 'all'
      ? ALL_TAB_FIRST_SIX
      : ALL_PROJECTS.filter((p) => p.category === activeTab);

  const gridProjects = filteredProjects.slice(0, ALL_PROJECTS_GRID_LIMIT);

  useScrollReveal(rootRef);
  useProjectGridReveal(gridRef, activeTab);

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

      <div id="app-wrapper" className="projects-page" ref={rootRef}>
        <div id="app-content">
          <section className="pp-page-header" aria-label="Projects">
           

            <div className="pp-page-header__inner">
              <h1 className="pp-page-header__title">Our Projects</h1>
              <nav className="pp-page-header__crumb" aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Our Projects</li>
                </ol>
              </nav>
            </div>
          </section>

          <section className="pp-section pp-featured" id="pp-featured" ref={featuredRef}>
            <div className="pp-container">
              <div className="pp-featured-head pp-reveal">
                <div>
                  <p className="pp-section-eyebrow">Spotlight</p>
                  <h2 className="pp-section-title">
                    Some Featured Projects
                  </h2>
                  <p className="pp-section-sub">
                    Landmark work defining communities, infrastructure, and public life across
                    California the same sectors featured on the AE3 projects portfolio.
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

              <div
                className="pp-slider-viewport pp-reveal"
                style={{ '--pp-slide-count': Math.max(1, slideCount) }}
              >
                <div
                  className="pp-slider-track"
                  style={{
                    transform: `translateX(-${(slideIdx * 100) / Math.max(1, slideCount)}%)`
                  }}
                >
                  {FEATURED_FOR_SLIDER.map((proj, i) => (
                    <article
                      key={proj.id}
                      className={`pp-slide ${i === slideIdx ? 'pp-is-active' : ''}`}
                      aria-hidden={i !== slideIdx}
                    >
                      <img src={projectImg(proj)} alt="" />
                      <div className="pp-slide-overlay" />
                      <div className="pp-slide-content">
                        <span className="pp-slide-tag">{proj.location}</span>
                        <h3 className="pp-slide-title">{proj.title}</h3>
                        <p className="pp-slide-meta">{proj.description}</p>
                        <a
                          href="#"
                          className="pp-slide-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          View project →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

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
                  <p className="pp-section-eyebrow">Curated portfolio</p>
                  <h2 className="pp-section-title">All Projects</h2>
                </div>
                
              </div>

              <div className="pp-tabs pp-reveal" role="tablist" aria-label="Project categories">
                {PROJECT_TABS.map((tab) => (
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

              <div className="pp-project-grid" ref={gridRef}>
                {gridProjects.map((proj, idx) => (
                  <article
                    key={proj.id}
                    className={`pp-project-card pp-reveal ${
                      idx % 3 === 1 ? 'pp-delay-1' : idx % 3 === 2 ? 'pp-delay-2' : ''
                    }`.trim()}
                  >
                    <div className="pp-card-media">
                      <img src={projectImg(proj)} alt="" loading="lazy" />
                      <span className="pp-card-badge">
                        {activeTab === 'all'
                          ? (PROJECT_TABS.find((t) => t.id === 'all')?.label ?? 'All projects')
                          : tabLabelForCategory(proj.category)}
                      </span>
                    </div>
                    <div className="pp-card-body">
                      <div className="pp-card-meta">
                        <span>{proj.location}</span>
                        <span>{proj.year}</span>
                      </div>
                      <h3 className="pp-card-title">{proj.title}</h3>
                      <p className="pp-card-desc">{proj.excerpt}</p>
                      {projectHasDublinSheriffDetail(proj.id) ? (
                        <Link className="pp-card-link" to={DUBLIN_SHERIFF_DETAIL_PATH}>
                          View project →
                        </Link>
                      ) : (
                        <button type="button" className="pp-card-link">
                          View project →
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

        

          <Footer />
        </div>
      </div>

      <ScrollPercentage />
      <span style={{ display: 'none' }}>{scriptsReady ? 'ready' : 'loading'}</span>
    </>
  );
}
