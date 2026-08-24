import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ensureTemplateScriptsLoaded } from '../../../template/loadTemplateScripts';
import { fetchProjectBySlug } from '../../../api/projectsApi';
import './GallerySection.css';

const P = process.env.PUBLIC_URL || '';
const IMG = `${P}/assets/newimages/gallery-ribbon`;

/**
 * Fixed gallery list (same projects as before).
 * Images are replaced with each project's live admin / detail-page hero image.
 */
const GALLERY_PROJECTS = [
  {
    img: `${IMG}/college-of-alameda-aviation.png`,
    title: 'College of Alameda Aviation Complex Replacement',
    slug: 'college-of-alameda-aviation-complex-phases-i-ii-peralta-community-college-district-I3Gx',
  },
  {
    img: `${IMG}/wlac-plant-facilities.jpg`,
    title: 'WLAC Plant Facilities & Shops Replacement',
    slug: 'west-los-angeles-college-plant-shops-and-facilities-replacement-los-angeles-community-college-district-RpmD',
  },
  {
    img: `${IMG}/lax-cta-west-corridor.png`,
    title: 'LAX CTA West Corridor Design-Build',
    slug: 'los-angeles-international-airport-cta-west-los-angeles-world-airports-pVbm',
  },
  {
    img: `${IMG}/liberation-park.png`,
    title: 'Liberation Park Market Hall & Communal Courtyard',
    slug: 'liberation-park-market-hall-communal-courtyard-black-cultural-zone-community-development-corporation-RxNp',
  },
  {
    img: `${IMG}/merritt-cdc.png`,
    title: 'Merritt College Child Development Center',
    slug: 'merritt-college-child-development-center-peralta-community-college-district-Kwy2',
  },
  {
    img: `${IMG}/oak-arrivals-exterior.png`,
    title: 'Oakland International Airport, International Arrivals Building Improvements',
    slug: 'oak-international-arrivals-building-expansion-oakland-international-airport-fOPF',
  },
  {
    img: `${IMG}/sfo-sky-terrace.png`,
    title: 'SFO Terminal 2 Sky Terrace and Build-Back',
    slug: 'sfo-terminal-2-gate-15-renovation-expansion-san-francisco-international-airport-Ix0L',
  },
];

/** Same hero image the project detail page uses. */
function detailHeroImage(project) {
  if (!project) return '';
  if (project.image) return project.image;
  if (Array.isArray(project.gallery) && project.gallery[0]?.src) {
    return project.gallery[0].src;
  }
  return '';
}

async function loadGalleryWithLiveImages() {
  const results = await Promise.all(
    GALLERY_PROJECTS.map(async (item) => {
      try {
        const project = await fetchProjectBySlug(item.slug);
        const liveImg = detailHeroImage(project);
        return {
          ...item,
          img: liveImg || item.img,
        };
      } catch (_) {
        return item;
      }
    })
  );
  return results;
}

function GalleryItem({ item }) {
  return (
    <div className="gallary-scroll-item">
      <Link to={`/projects/${item.slug}`} className="gallary-scroll-link">
        <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
        <span className="gallary-scroll-caption">{item.title}</span>
      </Link>
    </div>
  );
}

function killGalleryTriggers(root) {
  const ScrollTrigger = window.ScrollTrigger;
  if (!ScrollTrigger || !root) return;
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger;
    if (!trigger) return;
    if (root.contains(trigger) || trigger.classList?.contains('gallary-wrap')) {
      st.kill();
    }
  });
}

function initDesktopGalleryScroll(root) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || !root) return () => {};

  if (typeof gsap.registerPlugin === 'function') {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.config({ force3D: true });
  killGalleryTriggers(root);

  const wraps = root.querySelectorAll('.ae3-gallery__desktop .gallary-wrap');
  const tweens = [];

  wraps.forEach((section) => {
    const imageContainer = section.querySelector('.gallery-scroll-wrap');
    if (!imageContainer) return;

    delete imageContainer.dataset.ae3OriginalHtml;
    imageContainer.dataset.ae3OriginalHtml = imageContainer.innerHTML;
    imageContainer.innerHTML =
      imageContainer.dataset.ae3OriginalHtml + imageContainer.dataset.ae3OriginalHtml;

    gsap.set(imageContainer, { x: 0 });

    let scrollDistance = -(window.innerWidth / 3);
    if (section.classList.contains('gallery-scroll-direction-ltr')) {
      scrollDistance *= -1;
    }

    const tween = gsap.to(imageContainer, {
      x: scrollDistance,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        markers: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tweens.push(tween);
  });

  ScrollTrigger.refresh();

  return () => {
    tweens.forEach((tween) => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    });
    wraps.forEach((section) => {
      const imageContainer = section.querySelector('.gallery-scroll-wrap');
      if (!imageContainer) return;
      if (imageContainer.dataset.ae3OriginalHtml) {
        imageContainer.innerHTML = imageContainer.dataset.ae3OriginalHtml;
      }
      gsap.set(imageContainer, { x: 0 });
    });
  };
}

export default function GallerySection() {
  const rootRef = useRef(null);
  const mobileRef = useRef(null);
  const swiperRef = useRef(null);
  // Wait for live detail-page images before mounting ribbons (avoids wrong local flash)
  const [items, setItems] = useState(null);

  useEffect(() => {
    let cancelled = false;

    loadGalleryWithLiveImages()
      .then((next) => {
        if (!cancelled) setItems(next);
      })
      .catch(() => {
        if (!cancelled) setItems(GALLERY_PROJECTS);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const row1 = useMemo(() => (items ? items.slice(0, 4) : []), [items]);
  const row2 = useMemo(() => (items ? items.slice(4) : []), [items]);
  const itemsKey = useMemo(
    () => (items ? items.map((i) => `${i.slug}:${i.img}`).join('|') : ''),
    [items]
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !items?.length) return;
    root.querySelectorAll('.gallery-scroll-wrap').forEach((el) => {
      delete el.dataset.ae3OriginalHtml;
      el.dataset.ae3OriginalHtml = el.innerHTML;
    });
  }, [itemsKey, items]);

  useEffect(() => {
    if (!items?.length) return undefined;

    let cancelled = false;
    let resizeTimer = 0;
    let cleanupDesktop = () => {};

    const destroyMobile = () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };

    const initMobile = () => {
      if (cancelled || typeof window.Swiper !== 'function') return;
      if (window.innerWidth > 767) {
        destroyMobile();
        return;
      }
      const el = mobileRef.current;
      if (!el) return;
      destroyMobile();

      swiperRef.current = new window.Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 14,
        loop: items.length > 1,
        speed: 650,
        observer: false,
        observeParents: false,
        resizeObserver: false,
        autoplay: {
          delay: 3200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: el.querySelector('.ae3-gallery-mobile__dots'),
          clickable: true,
        },
        watchOverflow: true,
      });
    };

    const initDesktop = () => {
      if (cancelled || window.innerWidth <= 767) {
        cleanupDesktop();
        cleanupDesktop = () => {};
        return;
      }
      cleanupDesktop();
      cleanupDesktop = initDesktopGalleryScroll(rootRef.current) || (() => {});
    };

    ensureTemplateScriptsLoaded()
      .then(() => {
        if (cancelled) return;
        window.setTimeout(() => {
          if (cancelled) return;
          initDesktop();
          initMobile();
        }, 60);
      })
      .catch(() => {});

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth > 767) {
          destroyMobile();
          initDesktop();
        } else {
          cleanupDesktop();
          cleanupDesktop = () => {};
          initMobile();
        }
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 180);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      destroyMobile();
      cleanupDesktop();
    };
  }, [itemsKey, items]);

  if (!items) {
    return (
      <div className="ae3-gallery gallary-section overflow-hidden" aria-hidden="true">
        <div className="container container-2">
          <div className="row section-heading-wrap gallary-heading-wrap">
            <div className="col-12">
              <div className="section-heading mb-0">
                <h4 className="sub-heading">Gallery</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ae3-gallery gallary-section overflow-hidden" ref={rootRef}>
      <div className="gallary-text" aria-hidden="true">
        <span>Gallery</span>
      </div>

      <div className="container container-2">
        <div className="row section-heading-wrap gallary-heading-wrap">
          <div className="shape" aria-hidden="true">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="" />
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="section-heading mb-0">
              <h4 className="sub-heading">Gallery</h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="section-heading section-heading-2 mb-0">
              <h2 className="section-title title-2">
                A closer look at <span>spaces we shape</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="ae3-gallery__desktop" key={`desk-${itemsKey}`}>
        <div className="gallary-wrap wrap-1">
          <div className="gallery-scroll-wrap">
            {row1.map((item) => (
              <GalleryItem key={item.slug} item={item} />
            ))}
          </div>
        </div>
        {row2.length > 0 ? (
          <div className="gallary-wrap gallery-scroll-direction-ltr">
            <div className="gallery-scroll-wrap align-items-start">
              {row2.map((item) => (
                <GalleryItem key={item.slug} item={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="ae3-gallery__mobile" key={`mob-${itemsKey}`}>
        <div className="ae3-gallery-mobile swiper" ref={mobileRef}>
          <div className="swiper-wrapper">
            {items.map((item) => (
              <div className="swiper-slide" key={item.slug}>
                <Link to={`/projects/${item.slug}`} className="ae3-gallery-mobile__card">
                  <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
                  <span className="ae3-gallery-mobile__caption">{item.title}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="ae3-gallery-mobile__dots" />
        </div>
      </div>
    </div>
  );
}
