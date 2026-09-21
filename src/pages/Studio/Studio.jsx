import { useEffect, useRef, useState } from "react";
import Header from "../Home/components/Header";
import MobileSideMenu from "../Home/components/MobileSideMenu";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import GallerySection from "../Home/sections/GallerySection";
import { ensureTemplateScriptsLoaded } from "../../template/loadTemplateScripts";
import "./Studio.css";

const P = process.env.PUBLIC_URL || "";

const PERSPECTIVE_ITEMS = [
  {
    n: "01",
    title: "Life Outside the Office",
    body: "We believe great work comes from balanced lives. From team gatherings to time away from the desk, we support the people behind the practice.",
    icon: "life",
  },
  {
    n: "02",
    title: "Investing In Growth",
    body: "Mentorship, continuing education, and hands-on project leadership help every team member grow - technically, professionally, and personally.",
    icon: "growth",
  },
  {
    n: "03",
    title: "Reimagine The Future",
    body: "We approach each project with curiosity and ambition, looking for better ways to design, deliver, and serve the communities we work in.",
    icon: "future",
  },
  {
    n: "04",
    title: "Our Community",
    body: "AE3 is committed to the communities in which we serve. We are actively involved with local organizations that assist disadvantaged residents in the San Francisco Bay Area.",
    icon: "community",
  },
];

function PerspectiveIcon({ name }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  if (name === "life") {
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

  if (name === "growth") {
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

  if (name === "future") {
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
      <circle
        cx="15.5"
        cy="8.5"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
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
    n: "01",
    title: "We Are Focused on You",
    body: "It's all about your needs and required outcomes for your projects. We offer collaborative, ego-free, small firm service with large firm vision and experience to create a tailored approach to make your projects a reality.",
  },
  {
    n: "02",
    title: "Timeless, Attractive & Green Design",
    body: "We believe in simple, efficient design that creates places - not just buildings - where people live, work, and play, built with the latest advances in sustainability, zero net energy, and low carbon design.",
  },
  {
    n: "03",
    title: "We Play Well With Others",
    body: "From Progressive Design-Build to conventional Design-Bid-Build, to expansive stakeholder engagement and community outreach, our team knows how to collaborate with everyone around the table to achieve exceptional outcomes.",
  },
  {
    n: "04",
    title: "Diverse Designers",
    body: "We are one of the largest African-American owned firms in California, and our diverse team reflects the communities in which we design and ensures their voices are reflected in their buildings.",
  },
  {
    n: "05",
    title: "Delivering on Budget & Schedule",
    body: "Our blend of architecture and construction management services, coupled with deep experience, allows us to partner closely with clients to develop timely and cost-effective solutions.",
  },
];

const MISSION_SLIDES = [
  {
    id: "mission",
    n: "01",
    title: "Our Mission At AE3 Partners",
    body: "Our mission is to strengthen communities through thoughtful, innovative design, transforming our clients’ visions into meaningful, enduring places through expertise, collaboration, and trusted partnership.",
    image: `${P}/assets/newimages/mission/mission.png`,
    theme: "navy",
  },
  {
    id: "vision",
    n: "02",
    title: "Designing What's Next For Communities",
    body: "We envision thoughtfully planned spaces that strengthen communities combining architecture, planning, and construction management to deliver projects built to last.",
    image: `${P}/assets/newimages/mission/vision.png`,
    theme: "orange",
  },
];

const TEAM_IMG = `${P}/assets/newimages/team`;

const KEY_TEAM_MEMBERS = [
  { name: "Anika Scott", title: "Project Manager & Architect", image: `${TEAM_IMG}/1.png` },
  { name: "Ann Prometheus", title: "Project Manager, Associate", image: `${TEAM_IMG}/2.png` },
  { name: "Anna Dunnigan", title: "Senior Project Manager & Architect, Associate Principal", image: `${TEAM_IMG}/3.png` },
  { name: "Antoinette Nascimento",title: "Senior Project Manager & Architect",image: `${TEAM_IMG}/4.png`,},
  { name: "Ben Loggins", title: "QA:QC Manager", image: `${TEAM_IMG}/5.png` },
  { name: "Cynthia O'Day", title: "Accountant", image: `${TEAM_IMG}/6.png` },
  {name: "Doug Davis",title: "Managing Principal",image: `${TEAM_IMG}/7.png`,},
  { name: "Elizabeth Andrews", title: "Federal Pursuits Manager, Senior Associate", image: `${TEAM_IMG}/8.png` },
  { name: "Jacqueline Saucedo", title: "Job Captain", image: `${TEAM_IMG}/9.png` },
  { name: "Lisa Arias", title: "Senior Marketing Manager, Associate", image: `${TEAM_IMG}/10.png` },
  { name: "Marta Wojcik",title: "Job Captain",image: `${TEAM_IMG}/11.png`,},
  { name: "Mike Wilson", title: "Project Manager & Architect", image: `${TEAM_IMG}/12.png` },
  { name: "Omar Higaredo", title: "Job Captain", image: `${TEAM_IMG}/13.png` },
  {name: "Philip Taylor",title: "Job Captain",image: `${TEAM_IMG}/14.png`,},
  { name: "Rick Dumas", title: "Managing Principal", image: `${TEAM_IMG}/15.png` },
  { name: "Syl Kulkarni", title: "Job Captain", image: `${TEAM_IMG}/16.png` },
  { name: "Troy Newell", title: "Project Manager & Architect, Associate", image: `${TEAM_IMG}/17.png` },
  { name: "Willy Deng", title: "IT Manager", image: `${TEAM_IMG}/18.png` },
];

/** Leadership portraits — separate from Key Team Members (1–18) */
const LEADERSHIP_MEMBERS = [
  {
    name: "Rick L. Dumas",
    title: "Managing Principal",
    image: `${TEAM_IMG}/rick.png`,
  },
  {
    name: "Doug Davis",
    title: "AIA, MBA, DBIA, NCARB, Managing Principal",
    image: `${TEAM_IMG}/doug.png` ,
  },
  {
    name: "Anna Dunnigan",
    title: "AIA, Senior Project Manager & Architect, Associate Principal",
    image: `${TEAM_IMG}/anna.png`,
  },
  {
    name: "Elizabeth Andrews",
    title: "Federal Pursuits Manager, Senior Associate",
    image: `${TEAM_IMG}/liz.png`,
  },
  {
    name: "Ann Prometheus",
    title: "Project Manager, Associate",
    image: `${TEAM_IMG}/ann.png`,
  },
  {
    name: "Troy Newell",
    title: "Project Manager, Associate",
    image: `${TEAM_IMG}/troy.png`,
  },
  {
    name: "Lisa Arias",
    title: "Senior Marketing Manager, Associate",
    image: `${TEAM_IMG}/lisa.png`,
  },
];

/** Placeholder photos — swap these paths when ready */
const TEAM_PHOTOS = [
  { id: "photo-1", image: `${TEAM_IMG}/19.png`, alt: "AE3 team photo 1" },
  { id: "photo-2", image: `${TEAM_IMG}/20.png`, alt: "AE3 team photo 2" },
  { id: "photo-3", image: `${TEAM_IMG}/21.png`, alt: "AE3 team photo 3" },
  { id: "photo-4", image: `${TEAM_IMG}/22.png`, alt: "AE3 team photo 4" },
  { id: "photo-5", image: `${TEAM_IMG}/23.png`, alt: "AE3 team photo 5" },
  { id: "photo-6", image: `${TEAM_IMG}/24.png`, alt: "AE3 team photo 6" },
  { id: "photo-7", image: `${TEAM_IMG}/25.png`, alt: "AE3 team photo 7" },
  { id: "photo-8", image: `${TEAM_IMG}/26.png`, alt: "AE3 team photo 8" },
  { id: "photo-9", image: `${TEAM_IMG}/27.png`, alt: "AE3 team photo 9" },
  { id: "photo-10", image: `${TEAM_IMG}/28.png`, alt: "AE3 team photo 10" },
  { id: "photo-11", image: `${TEAM_IMG}/29.png`, alt: "AE3 team photo 11" },
];

const JOB_OPENINGS = [
  {
    id: "senior-pm",
    title: "Senior Project Manager",
    summary:
      "Results-oriented Senior Project Manager, Revit capable, with 5+ years managing projects of $20M+ construction value.",
    applyEmail: "ae3@ae3partners.com",
    body: [
      "AE3 is seeking a results-oriented Senior Project Manager, who is Revit capable, and has a minimum of 5 years of experience managing projects with a construction value of $20 million or more. This person will lead the direct day-to-day management of projects, design, and production, and reports directly to the Principals.",
      "The candidate must demonstrate excellent communication and interpersonal skills with clients and their representatives, provide internal & external team management, and have excellent time management skills. This candidate must also demonstrate ability to interpret direction from our clients and principals, and translate it into the appropriate actions to ensure client satisfaction and to ensure projects are on track, both with budget and schedule.",
      "The ideal candidate is technically proficient and must have a minimum of five years’ experience working directly in Revit. If you are interested in a dynamic work environment that is collaborative and team-oriented, then we are looking for you! We offer the opportunity to work on a variety of project types and sizes, as well as an opportunity for professional development and growth, as we are growing fast.",
    ],
  },
  {
    id: "revit-designer",
    title: "Revit Designer",
    summary:
      "Designer with 5+ years at an architectural firm and strong Revit project experience in a collaborative studio environment.",
    applyEmail: "ae3@ae3partners.com",
    body: [
      "AE3 is seeking a Designer with 5+ years of experience working at an architectural firm. The ideal candidate is technically proficient and has a minimum of five years actual project experience with Revit. If you are interested in a dynamic work environment that is collaborative and team-oriented, then we are looking for you.",
      "We offer the opportunity to work on a variety of project types and sizes, as well as an opportunity for professional development and growth.",
    ],
    bullets: [
      "Work closely with the Project Manager and other team members on schematic design, space planning, design development, and construction documentation.",
      "Participate in programming and planning, and the selection of finishes, materials, furniture systems, and specifications.",
      "Utilize visualization, graphics, and presentation skills to effectively communicate the project design.",
      "Provide design support and documentation throughout the design phases of the project.",
      "Provide production assistance for construction documents required for permit and construction.",
      "Assist in aspects of project coordination with the team and contractors during construction administration.",
    ],
  },
  {
    id: "associate-pm",
    title: "Associate Project Manager",
    summary:
      "Bachelor’s degree plus two years as Job Captain (or similar). Revit proficiency required. From $89,000/year with full benefits.",
    applyEmail: "liza@ae3partners.com",
    body: [
      "Position Duties include project planning and coordination, documentation and reporting, budget and resource management, quality control and compliance, client and stakeholder engagement, and risk management.",
      "Requires a Bachelor’s Degree in Architecture, Construction Management, or related field. Two (2) years experience as a Job Captain (or similar entry level Architect without licensure).",
      "Demonstrated experience in Type I, II, and V construction and low- to mid-rise building types; building systems, constructability, detailing, and accurate documentation; and Revit (test will be administered) with a proven track record managing production for both Revit- and AutoCAD-based projects.",
      "Rate of Pay: From $89,000 per year. Compensation may vary based on qualifications, skills, competencies, experience, and location.",
      "Benefits include medical, vision and dental coverage, group and supplemental life insurance, 401K, paid time off (PTO), fitness and educational stipends.",
      "Employer / Work Location: AE3 Partners, 505 Montgomery Street, 10th Floor, San Francisco, CA 94111.",
    ],
    bullets: [
      "Assist in project schedules, timelines, and team coordination across architects, engineers, and consultants.",
      "Prepare meeting minutes, reports, presentations, proposals, and project status updates.",
      "Support budgets, expenses, procurement, and vendor coordination.",
      "Help ensure quality standards, reviews, inspections, and regulatory compliance.",
      "Serve as a client point of contact and support meetings and presentations.",
      "Identify risks, support mitigation strategies, and help resolve project issues.",
    ],
  },
];

function TeamMemberCard({ member }) {
  return (
    <div className="studio-team__card">
      <div className="studio-team__photo">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="studio-team__name">{member.name}</h3>
      <p className="studio-team__role">{member.title}</p>
    </div>
  );
}

function useLeadershipSwiper(carouselRef) {
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return undefined;

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
      if (cancelled) return;
      if (typeof window.Swiper !== "function") {
        retryTimer = window.setTimeout(init, 120);
        return;
      }

      destroy();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      instance = new window.Swiper(el, {
        slidesPerView: 1.15,
        spaceBetween: 16,
        centeredSlides: false,
        loop: LEADERSHIP_MEMBERS.length > 3,
        speed: 550,
        grabCursor: true,
        watchOverflow: true,
        autoplay: reduceMotion
          ? false
          : {
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
        pagination: {
          el: el.querySelector(".studio-leadership__dots"),
          clickable: true,
          bulletClass: "studio-leadership__dot",
          bulletActiveClass: "is-active",
        },
        breakpoints: {
          576: { slidesPerView: 2, spaceBetween: 18 },
          768: { slidesPerView: 3, spaceBetween: 22 },
          1100: { slidesPerView: 4, spaceBetween: 24 },
        },
      });
    };

    ensureTemplateScriptsLoaded()
      .then(() => {
        if (!cancelled) init();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      destroy();
    };
  }, [carouselRef]);
}

export default function Studio() {
  const mediaRef = useRef(null);
  const hslideRef = useRef(null);
  const hslideTrackRef = useRef(null);
  const teamCtaTextRef = useRef(null);
  const leadershipSwiperRef = useRef(null);
  const [openWhy, setOpenWhy] = useState("");
  const [openCareer, setOpenCareer] = useState("senior-pm");
  const [teamTab, setTeamTab] = useState("members");

  useLeadershipSwiper(leadershipSwiperRef);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("studio-route");
    return () => {
      document.documentElement.classList.remove("studio-route");
    };
  }, []);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      el.classList.add("is-revealed");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = teamCtaTextRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      el.classList.add("is-inked");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-inked");
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Vertical scroll → horizontal card slider
  useEffect(() => {
    const section = hslideRef.current;
    const track = hslideTrackRef.current;
    if (!section || !track) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const syncHeaderOffset = () => {
      const header =
        document.querySelector(".header .primary-header") ||
        document.querySelector(".primary-header") ||
        document.querySelector(".header");
      const measured = header ? header.getBoundingClientRect().height : 90;
      // Extra buffer so rounded card top never sits under the fixed header
      const offset = Math.max(88, Math.ceil(measured + 12));
      section.style.setProperty("--hslide-header", `${offset}px`);
    };

    let ticking = false;

    const update = () => {
      ticking = false;
      syncHeaderOffset();
      const viewH = window.innerHeight || 1;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - viewH);
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const maxX = Math.max(
        0,
        track.scrollWidth - track.parentElement.clientWidth,
      );
      track.style.transform = `translate3d(${-maxX * progress}px, 0, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    syncHeaderOffset();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggleWhy = (n) => {
    setOpenWhy((current) => (current === n ? "" : n));
  };

  const toggleCareer = (id) => {
    setOpenCareer((current) => (current === id ? "" : id));
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

              <p className="studio-intro__tagline">
                AE3 Partners is a full-service architecture, planning, and
                construction management firm based in San Francisco, providing
                services throughout California.
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
                <h3 className="studio-intro__subheading">
                  Embracing Unique Perspectives
                </h3>
                <p className="studio-intro__body">
                  Diversity and inclusion are not just buzzwords they are facts,
                  woven into the ethos of our company. We know the power of
                  differing perspectives on our projects and we welcome
                  everyone&apos;s point of view.
                </p>
              </div>
            </div>
          </section>

          <section
            className="studio-perspectives"
            aria-label="Culture and perspectives"
          >
            <div className="studio-perspectives__grid">
              {PERSPECTIVE_ITEMS.map((item) => (
                <article
                  key={item.n}
                  className={`studio-p-card studio-p-card--${item.icon}`}
                >
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
                          <span
                            className="studio-hslide__num"
                            aria-hidden="true"
                          >
                            {slide.n}
                          </span>
                          <h3 className="studio-hslide__title">
                            {slide.title}
                          </h3>
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

          <section
            className="studio-about"
            id="studio-about"
            aria-label="About Us"
          >
            <div className="studio-about__inner">
              <div className="studio-about__copy">
                <h2 className="studio-about__heading">About Us</h2>
                <p className="studio-about__text">
                  AE3 Partners is a full service Architecture + Construction
                  Management firm based in San Francisco, providing services
                  throughout California. Our experience and insight in the
                  realms of both architecture and construction management
                  enables us to have a knowledgeable team on every project we
                  pursue. This depth of understanding enables us to deliver
                  unique services to our clients.
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
                </div>
              </div>
            </div>
          </section>

          <section className="studio-team" aria-label="Key Team Members">
            <div className="studio-team__head">
              <h2 className="studio-team__heading">
                Key <span>Team Members</span>
              </h2>
              <p className="studio-team__intro">
                Our team is a diverse and creative team of experts in the
                architectural and construction management industry who bring a
                wealth of knowledge and experience to every project. We proudly
                employ an eclectic group of professionals, with roots around the
                world with a range of perspectives. Our team approaches problems
                in innovative ways, resulting in creative solutions that may not
                have been considered otherwise.
              </p>

              <div
                className="studio-team__tabs"
                role="tablist"
                aria-label="Team views"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={teamTab === "members"}
                  className={`studio-team__tab${teamTab === "members" ? " is-active" : ""}`}
                  onClick={() => setTeamTab("members")}
                >
                  <span className="studio-team__tab-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
                      <circle cx="16.5" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                      <path
                        d="M3.5 18.5c.6-2.8 2.8-4.4 5.5-4.4s4.9 1.6 5.5 4.4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14.2 14.6c1.5-.6 3.2-.4 4.6.8.8.7 1.3 1.6 1.5 2.6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="studio-team__tab-label">Team Members</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={teamTab === "photos"}
                  className={`studio-team__tab${teamTab === "photos" ? " is-active" : ""}`}
                  onClick={() => setTeamTab("photos")}
                >
                  <span className="studio-team__tab-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3.5"
                        y="5.5"
                        width="17"
                        height="13"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.7" />
                      <path
                        d="M12.5 14.5 15 12l3.5 4.5H7.5l2.2-2.8 2.8 2.8z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="studio-team__tab-label">Team Photos</span>
                </button>
              </div>
            </div>

            {teamTab === "members" ? (
              <div
                className="studio-team__grid"
                role="tabpanel"
                aria-label="Team members"
              >
                {KEY_TEAM_MEMBERS.map((member) => (
                  <TeamMemberCard key={member.name} member={member} />
                ))}
              </div>
            ) : (
              <div
                className="studio-team__photos"
                role="tabpanel"
                aria-label="Team photos"
              >
                {TEAM_PHOTOS.map((photo) => (
                  <figure key={photo.id} className="studio-team__photo-card">
                    <img
                      src={photo.image}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>
            )}
          </section>

          <section className="studio-leadership" aria-label="Leadership Team">
            <div className="studio-leadership__head">
              <p className="studio-leadership__eyebrow">AE3 TEAM</p>
              <h2 className="studio-leadership__heading">Leadership Team</h2>
              <p className="studio-leadership__text">
                We wanted to create a workplace where inclusion and transparency
                were the key elements to our success. With AE3, we&apos;ve been
                able to build something special. Our team is our greatest asset
                and it&apos;s because of them that we have succeeded and continue
                to build strong relationships with our clients and in our
                communities.
              </p>
              <p className="studio-leadership__byline-inline">
                Rick L. Dumas and Doug Davis — Founders of AE3
              </p>
            </div>

            <div className="studio-leadership__slider">
              <div
                className="studio-leadership__carousel swiper"
                ref={leadershipSwiperRef}
              >
                <div className="swiper-wrapper">
                  {LEADERSHIP_MEMBERS.map((member) => (
                    <div className="swiper-slide" key={member.name}>
                      <article className="studio-leadership__card">
                        <div className="studio-leadership__card-photo">
                          <img
                            src={member.image}
                            alt={member.name}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <h3 className="studio-leadership__card-name">
                          {member.name}
                        </h3>
                        <p className="studio-leadership__card-role">
                          {member.title}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
                <div
                  className="studio-leadership__dots"
                  aria-label="Leadership slider"
                />
              </div>
            </div>
          </section>

          <section className="studio-why" aria-label="Why Choose AE3">
            <div className="studio-why__grid">
              <div className="studio-why__copy">
                <h2 className="studio-why__heading">Why Choose AE3?</h2>
                <p className="studio-why__text">
                  AE3 Partners is a full service Architecture + Construction
                  Management firm based in San Francisco, providing services
                  throughout California. Our experience and insight in the
                  realms of both architecture and construction management
                  enables us to have a knowledgeable team on every project we
                  pursue. This depth of understanding enables us to deliver
                  unique services to our clients.
                </p>
              </div>

              <div className="studio-why__accordion">
                {WHY_CHOOSE_ITEMS.map((item) => {
                  const isOpen = openWhy === item.n;
                  return (
                    <div
                      key={item.n}
                      className={`studio-acc${isOpen ? " is-open" : ""}`}
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
                          {isOpen ? "−" : "+"}
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

          <section className="studio-careers" aria-label="Careers">
            <div className="studio-careers__inner">
              <header className="studio-careers__head">
                <p className="studio-careers__eyebrow">Careers</p>
                <h2 className="studio-careers__heading">
                  Join Our Team and Design Your Career with AE3
                </h2>
                <p className="studio-careers__lead">
                  We love what we do. Explore current openings and grow with a
                  collaborative, team-oriented studio across architecture and
                  construction management.
                </p>
              </header>

              <div className="studio-careers__openings">
                <div className="studio-careers__list">
                  {JOB_OPENINGS.map((job, index) => {
                    const isOpen = openCareer === job.id;
                    return (
                      <article
                        key={job.id}
                        className={`studio-career${isOpen ? " is-open" : ""}`}
                      >
                        <button
                          type="button"
                          className="studio-career__trigger"
                          aria-expanded={isOpen}
                          onClick={() => toggleCareer(job.id)}
                        >
                          <span className="studio-career__index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="studio-career__meta">
                            <span className="studio-career__title">
                              {job.title}
                            </span>
                            <span className="studio-career__summary">
                              {job.summary}
                            </span>
                          </span>
                          <span
                            className="studio-career__toggle"
                            aria-hidden="true"
                          >
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        <div className="studio-career__panel" role="region">
                          <div className="studio-career__panel-inner">
                            {job.body.map((paragraph) => (
                              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                            ))}

                            {job.bullets?.length ? (
                              <ul className="studio-career__bullets">
                                {job.bullets.map((bullet) => (
                                  <li key={bullet.slice(0, 48)}>{bullet}</li>
                                ))}
                              </ul>
                            ) : null}

                            <p className="studio-career__apply">
                              For consideration, please email your resume to:{" "}
                              <a href={`mailto:${job.applyEmail}`}>
                                {job.applyEmail}
                              </a>
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
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
                Our team is a diverse and driven group of builders,
                tradespeople, and leaders who bring a wealth of knowledge and
                experience to every project. Together, we&apos;re united in
                creating spaces that leave a lasting impact.
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
