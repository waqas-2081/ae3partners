import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollPageToTop() {
  try {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  } catch (_) {
    /* ignore */
  }

  const scroll = () => {
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (_) {
      /* ignore */
    }
  };

  scroll();

  requestAnimationFrame(() => {
    scroll();

    if (window.ScrollTrigger) {
      try {
        window.ScrollTrigger.clearScrollMemory?.();
        window.ScrollTrigger.refresh();
      } catch (_) {
        /* ignore */
      }
    }
  });

  window.setTimeout(scroll, 0);
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    scrollPageToTop();
  }, [pathname]);

  return null;
}
