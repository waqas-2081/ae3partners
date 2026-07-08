import { useEffect, useRef, useState } from 'react';

const P = process.env.PUBLIC_URL || '';
const MIN_DISPLAY_MS = 5000;
const FADE_OUT_MS = 800;
const LOAD_FALLBACK_MS = 15000;

function kickSliderAfterPreload() {
  if (typeof window.startSliderAfterPreload === 'function') {
    try {
      window.startSliderAfterPreload();
    } catch (_) {
      /* ignore */
    }
  }
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const mountTimeRef = useRef(Date.now());
  const exitStartedRef = useRef(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    window.dispatchEvent(new Event('ae3-preloader-ready'));
  }, []);

  useEffect(() => {
    let exitTimerId;
    let fallbackId;
    let cancelled = false;
    let pageReady = document.readyState === 'complete';

    const beginFadeOut = () => {
      if (cancelled || exitStartedRef.current) return;
      exitStartedRef.current = true;
      window.dispatchEvent(new Event('ae3-preloader-exit'));
      setFading(true);
    };

    const scheduleFadeOut = () => {
      if (!pageReady || exitStartedRef.current) return;

      const remaining = MIN_DISPLAY_MS - (Date.now() - mountTimeRef.current);
      exitTimerId = window.setTimeout(beginFadeOut, Math.max(0, remaining));
    };

    const onPageReady = () => {
      pageReady = true;
      scheduleFadeOut();
    };

    if (pageReady) {
      scheduleFadeOut();
    } else {
      window.addEventListener('load', onPageReady, { once: true });
    }

    fallbackId = window.setTimeout(onPageReady, LOAD_FALLBACK_MS);

    return () => {
      cancelled = true;
      window.removeEventListener('load', onPageReady);
      window.clearTimeout(exitTimerId);
      window.clearTimeout(fallbackId);
    };
  }, []);

  useEffect(() => {
    if (!fading) return undefined;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      kickSliderAfterPreload();
      setVisible(false);
    };

    const fallbackId = window.setTimeout(finish, FADE_OUT_MS + 50);

    return () => window.clearTimeout(fallbackId);
  }, [fading]);

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== 'opacity' || !fading) return;
    if (finishedRef.current) return;
    finishedRef.current = true;
    kickSliderAfterPreload();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`preloader overflow-hidden${fading ? ' preloader--fading' : ''}`}
      onTransitionEnd={handleTransitionEnd}
      aria-busy={!fading}
      aria-hidden={fading}
    >
      <div className="site-name">
        <img
          className="preloader-logo"
          src={`${P}/assets/newimages/logo.gif`}
          alt="AE3 Partners"
        />
      </div>
      <div className="preloader-gutters">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div className="bar" key={idx}>
            <div className="inner-bar"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
