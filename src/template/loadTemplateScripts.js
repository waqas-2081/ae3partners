const TEMPLATE_SCRIPTS = [
  '/assets/js/vendor/jquary-3.7.1.min.js',
  '/assets/js/vendor/bootstrap-bundle.js',
  '/assets/js/vendor/imagesloaded-pkgd.js',
  '/assets/js/vendor/waypoints.min.js',
  '/assets/js/vendor/venobox.min.js',
  '/assets/js/vendor/odometer.min.js',
  '/assets/js/vendor/meanmenu.js',
  '/assets/js/vendor/jquery.isotope.js',
  '/assets/js/vendor/swiper.min.js',
  '/assets/js/vendor/split-type.min.js',
  '/assets/js/vendor/gsap.min.js',
  '/assets/js/vendor/scroll-trigger.min.js',
  '/assets/js/vendor/scroll-smoother.js',
  '/assets/js/vendor/jquery.carouselTicker.js',
  '/assets/js/vendor/nice-select.js',
  '/assets/js/vendor/three.min.js',
  '/assets/js/vendor/panolens.min.js',
  '/assets/js/vendor/jquery.event.move.min.js',
  '/assets/js/vendor/jquery.twentytwenty.min.js',
  '/assets/js/slider.js',
  '/assets/js/banner-process.js',
  '/assets/js/contact.js',
  '/assets/js/main.js'
];

function hasScript(src) {
  return Boolean(document.querySelector(`script[data-template-script="true"][src="${src}"]`));
}

function loadScriptSequentially(srcList) {
  return srcList.reduce((p, src) => {
    return p.then(
      () =>
        new Promise((resolve, reject) => {
          if (hasScript(src)) return resolve();
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.defer = false;
          script.dataset.templateScript = 'true';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed loading script: ${src}`));
          document.body.appendChild(script);
        })
    );
  }, Promise.resolve());
}

export async function ensureTemplateScriptsLoaded() {
  // Ensure React has mounted markup before running template initializers.
  await new Promise((r) => setTimeout(r, 0));
  await loadScriptSequentially(TEMPLATE_SCRIPTS);
}

