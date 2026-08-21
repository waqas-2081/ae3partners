import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ensureTemplateScriptsLoaded } from '../../../template/loadTemplateScripts';
import './GallerySection.css';

const P = process.env.PUBLIC_URL || '';
const IMG = `${P}/assets/newimages/gallery-ribbon`;

/**
 * Bottom gallery ribbon — projects + images from AE3 Dropbox
 * "Bottom Ribbon_Home Page" folder (official project photos).
 */
const GALLERY_PROJECTS = [
  {
    img: `${IMG}/college-of-alameda-aviation.png`,
    title: 'College of Alameda Aviation Complex Replacement',
    to: '/projects',
  },
  {
    img: `${IMG}/wlac-plant-facilities.png`,
    title: 'WLAC Plant Facilities & Shops Replacement',
    to: '/projects',
  },
  {
    img: `${IMG}/lax-cta-west-corridor.png`,
    title: 'LAX CTA West Corridor Design-Build',
    to: '/projects',
  },
  {
    img: `${IMG}/liberation-park.png`,
    title: 'Liberation Park Market Hall & Communal Courtyard',
    to: '/projects',
  },
  {
    img: `${IMG}/merritt-cdc.png`,
    title: 'Merritt College Child Development Center',
    to: '/projects',
  },
  {
    img: `${IMG}/oak-arrivals-exterior.png`,
    title: 'Oakland International Airport, International Arrivals Building Improvements',
    to: '/projects',
  },
  {
    img: `${IMG}/sfo-sky-terrace.png`,
    title: 'SFO Terminal 2 Sky Terrace and Build-Back',
    to: '/projects',
  },
];

const GALLERY_ROW_1 = GALLERY_PROJECTS.slice(0, 4);
const GALLERY_ROW_2 = GALLERY_PROJECTS.slice(4);

function GalleryItem({ item }) {
  return (
    <div className="gallary-scroll-item">
      <Link to={item.to} className="gallary-scroll-link">
        <img src={item.img} alt={item.title} loading="lazy" />
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

    if (!imageContainer.dataset.ae3OriginalHtml) {
      imageContainer.dataset.ae3OriginalHtml = imageContainer.innerHTML;
    }
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

  // Snapshot clean React markup before template main.js can duplicate it
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll('.gallery-scroll-wrap').forEach((el) => {
      if (!el.dataset.ae3OriginalHtml) {
        el.dataset.ae3OriginalHtml = el.innerHTML;
      }
    });
  }, []);

  useEffect(() => {
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
      if (!el || swiperRef.current) return;

      swiperRef.current = new window.Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 14,
        loop: true,
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
        // After template main.js gallaryScroll(), re-bind cleanly for this mount
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
  }, []);

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

      {/* Desktop: GSAP scroll ribbons */}
      <div className="ae3-gallery__desktop">
        <div className="gallary-wrap wrap-1">
          <div className="gallery-scroll-wrap">
            {GALLERY_ROW_1.map((item) => (
              <GalleryItem key={item.title} item={item} />
            ))}
          </div>
        </div>
        <div className="gallary-wrap gallery-scroll-direction-ltr">
          <div className="gallery-scroll-wrap align-items-start">
            {GALLERY_ROW_2.map((item) => (
              <GalleryItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: one card + autoplay */}
      <div className="ae3-gallery__mobile">
        <div className="ae3-gallery-mobile swiper" ref={mobileRef}>
          <div className="swiper-wrapper">
            {GALLERY_PROJECTS.map((item) => (
              <div className="swiper-slide" key={item.title}>
                <Link to={item.to} className="ae3-gallery-mobile__card">
                  <img src={item.img} alt={item.title} loading="lazy" />
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
