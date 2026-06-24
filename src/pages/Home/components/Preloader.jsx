import { useEffect, useState } from 'react';

const P = process.env.PUBLIC_URL || '';

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
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hide = () => {
      kickSliderAfterPreload();
      setGone(true);
    };

    // Full page load: window "load" runs once; main.js hides preloader after ~3s.
    // SPA visit to "/" later: "load" already fired — main.js + GSAP never re-run for new nodes.
    if (document.readyState === 'complete') {
      const id = window.setTimeout(hide, 750);
      return () => window.clearTimeout(id);
    }

    let afterLoadId;
    const onLoad = () => {
      afterLoadId = window.setTimeout(hide, 2900);
    };
    window.addEventListener('load', onLoad);
    const fallbackId = window.setTimeout(hide, 9000);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(afterLoadId);
      window.clearTimeout(fallbackId);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="preloader overflow-hidden">
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
