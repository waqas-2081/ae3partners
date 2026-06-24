import { useEffect, useRef } from 'react';

const P = process.env.PUBLIC_URL || '';

function resolvePanoramaImageUrl(raw) {
  if (!raw || typeof window === 'undefined') return '';
  const s = String(raw).trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  try {
    return new URL(s, window.location.origin).href;
  } catch {
    return s;
  }
}

export default function PanoramaArea() {
  const hostRef = useRef(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || process.env.NODE_ENV === 'test') return undefined;

    let cancelled = false;
    let viewer = null;
    let observer = null;
    let raf = 0;
    let panolensWaitFrames = 0;

    const cleanupViewer = () => {
      try {
        if (viewer && typeof viewer.destroy === 'function') {
          viewer.destroy();
        }
      } catch {
        /* ignore */
      }
      viewer = null;
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    };

    const startWhenVisible = () => {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer.disconnect();
          observer = null;

          const PANOLENS = window.PANOLENS;
          if (!PANOLENS || cancelled) return;

          const raw = el.getAttribute('data-img') || '';
          const imageUrl = resolvePanoramaImageUrl(raw);
          if (!imageUrl) return;

          cleanupViewer();
          try {
            const panorama = new PANOLENS.ImagePanorama(imageUrl);
            viewer = new PANOLENS.Viewer({ container: el });
            viewer.add(panorama);
          } catch (e) {
            console.warn('Panorama init failed:', e);
          }
        },
        { root: null, rootMargin: '120px', threshold: 0.01 }
      );
      observer.observe(el);
    };

    const waitPanolens = () => {
      if (cancelled) return;
      if (window.PANOLENS) {
        startWhenVisible();
        return;
      }
      if (++panolensWaitFrames > 900) return;
      raf = window.requestAnimationFrame(waitPanolens);
    };

    waitPanolens();

    return () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
      cleanupViewer();
    };
  }, []);

  return (
    <div className="ae3-panoroma-area fade-wrapper">
      <div className="bg-shape">
        <img src={`${P}/assets/img/shapes/panoroma-shape-1.png`} alt="" />
      </div>
      <div className="container">
        <div className="section-heading text-center align-items-center fade-top">
          <h4 className="sub-heading" data-text-animation="fade-in-right" data-split="char" data-duration="0.9" data-stagger="0.03">
            Design Philosophy
          </h4>
          <h2 className="section-title cursor-effect title-2">
            Timeless, attractive, <span>sustainable <br /> places</span>
          </h2>
        </div>
      </div>
      <div className="ae3-panoroma-container container fade-top">
        <div
          ref={hostRef}
          className="ae3-panoroma-img"
          data-img={`${P}/assets/img/bg-img/virtual-tours.jpg`}
        />
      </div>
    </div>
  );
}
