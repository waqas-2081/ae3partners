import { useLayoutEffect, useRef } from "react";

const P = process.env.PUBLIC_URL || "";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const modelCanvasRef = useRef(null);
  const skylineRowRef = useRef(null);
  const contentRef = useRef(null);
  const wrapRef = useRef(null);
  const scrollIndRef = useRef(null);

  useLayoutEffect(() => {
    let st = null;
    let alive = true;

    async function init() {
      if (process.env.NODE_ENV === "test") {
        return () => {};
      }
      const THREE_NS = await import("three");
      const THREE = THREE_NS.default ?? THREE_NS;
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const modelCanvas = modelCanvasRef.current;
      const sectionEl = sectionRef.current;
      if (!modelCanvas || !sectionEl) return () => {};

      for (let i = 0; i < 20; i++) {
        if (!alive) return () => {};
        if (modelCanvas.clientWidth > 0 && modelCanvas.clientHeight > 0) break;
        await new Promise((r) => requestAnimationFrame(r));
      }
      if (!alive) return () => {};

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, modelCanvas.clientWidth / modelCanvas.clientHeight, 0.1, 2000);
      camera.position.set(0, -4, 10);

      /*
        Performance profile similar to lightweight marketing3D heroes (e.g. empiremetaverse.com):
        - Sky = CSS gradient (composited by the browser, not a full-screen fragment shader every frame).
        - Single WebGL canvas, single scene render per frame — no shadow maps, no tone-mapping pipeline.
        - DPR locked to 1 on the hero to avoid4× fill-rate on retina.
      */
      const modelRenderer = new THREE.WebGLRenderer({
        canvas: modelCanvas,
        antialias: false,
        alpha: true,
        depth: true,
        stencil: false,
        powerPreference: "high-performance"
      });
      modelRenderer.setPixelRatio(1);
      modelRenderer.setSize(modelCanvas.clientWidth, modelCanvas.clientHeight, false);
      modelRenderer.setClearColor(0x000000, 0);
      modelRenderer.outputColorSpace = THREE.SRGBColorSpace;
      modelRenderer.toneMapping = THREE.NoToneMapping;
      modelRenderer.shadowMap.enabled = false;

      const preventCtxLoss = (e) => e.preventDefault();
      modelCanvas.addEventListener("webglcontextlost", preventCtxLoss, false);

      /* ── Lighting (cheap: ambient + one directional, no shadows) ── */
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
      scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.85);
      sunLight.position.set(5, 12, 8);
      scene.add(sunLight);

      /* ── Pivot group ── */
      const pivot = new THREE.Group();
      scene.add(pivot);

      const applyScrollTransform = (p) => {
        pivot.rotation.y = p * Math.PI * 1.8;
        pivot.position.x = p * 3.8;
        const zoomStart = 2.0;
        const zoomEndExtra = 0.6;
        const zoom = zoomStart + Math.pow(p, 1.1) * zoomEndExtra;
        pivot.scale.setScalar(zoom);
        const baseTopBias = -5.6;
        const zoomTopBias = -(zoom - zoomStart) * 0.12;
        pivot.position.y = baseTopBias + zoomTopBias + Math.sin(p * Math.PI) * 0.15;
        camera.fov = 42 + p * 8;
        camera.updateProjectionMatrix();
      };

      const applyHeroScrollUi = (p) => {
        applyScrollTransform(p);

        const textP = Math.min(1, Math.max(0, (p - 0.3) / 0.55));
        if (contentRef.current) {
          contentRef.current.style.opacity = String(textP);
          contentRef.current.style.transform = `translateX(${(1 - textP) * -70}px) translateY(-50%)`;
        }

        const startOverlay = sectionRef.current?.querySelector(".ae3h__start-overlay");
        if (startOverlay) {
          const fadeOut = Math.max(0, 1 - p / 0.25);
          startOverlay.style.opacity = String(fadeOut);
          startOverlay.style.transform = `scale(${1 - p * 0.08})`;
        }

        if (scrollIndRef.current) {
          scrollIndRef.current.style.opacity = String(Math.max(0, 1 - p * 8));
        }

        if (skylineRowRef.current) {
          const skylineHide = Math.max(0, 1 - p * 14);
          skylineRowRef.current.style.opacity = String(skylineHide);
          skylineRowRef.current.style.visibility = skylineHide < 0.02 ? "hidden" : "visible";
        }
      };

      applyHeroScrollUi(0);

      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=280%",
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          applyHeroScrollUi(self.progress);
        },
      });

      const onLoadRefresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(onLoadRefresh);
      window.addEventListener("load", onLoadRefresh, { once: true });

      /* ── Load GLB ── */
      const draco = new DRACOLoader();
      draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(draco);

      const glbUrl = `${process.env.PUBLIC_URL || ""}/assets/img/control_tower_san_francisco.glb`;

      loader.load(
        glbUrl,
        (gltf) => {
          if (!alive) return;
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const sc = 4 / maxDim;

          model.position.sub(center.multiplyScalar(sc));
          model.scale.setScalar(sc);
          model.traverse((c) => {
            if (c.isMesh) {
              c.frustumCulled = true;
              c.castShadow = false;
              c.receiveShadow = false;
              if (c.material) c.material.envMapIntensity = 0.85;
            }
          });
          pivot.add(model);

          ScrollTrigger.refresh();
        },
        undefined,
        (err) => console.error("GLB error:", err)
      );

      let heroInView = true;
      const viewIo =
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(
              ([e]) => {
                heroInView = e.isIntersecting;
              },
              { root: null, threshold: 0, rootMargin: "80px" }
            )
          : null;
      viewIo?.observe(sectionEl);

      let stRefreshTimer = null;
      const scheduleStRefresh = () => {
        clearTimeout(stRefreshTimer);
        stRefreshTimer = setTimeout(() => {
          stRefreshTimer = null;
          ScrollTrigger.refresh();
        }, 160);
      };

      /* ── One render / frame; tiny wobble (no extra GSAP ticker on the pivot) ── */
      let rafId = 0;
      const clock = new THREE.Clock();
      function animate() {
        rafId = requestAnimationFrame(animate);
        if (!alive) return;
        if (document.visibilityState === "hidden" || !heroInView) return;

        const w = modelCanvas.clientWidth;
        const h = modelCanvas.clientHeight;
        if (w < 2 || h < 2) return;

        const t = clock.getElapsedTime();
        pivot.rotation.x = Math.sin(t * 0.35) * 0.018;

        modelRenderer.render(scene, camera);
      }
      animate();

      /* ── Resize ── */
      let lastCanvasWidth = 0;
      let lastCanvasHeight = 0;
      function onResize(shouldRefresh = true) {
        const w = modelCanvas.clientWidth;
        const h = modelCanvas.clientHeight;
        if (!w || !h) return;
        if (w === lastCanvasWidth && h === lastCanvasHeight) return;

        lastCanvasWidth = w;
        lastCanvasHeight = h;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        modelRenderer.setSize(w, h, false);
        if (shouldRefresh) scheduleStRefresh();
      }
      onResize(false);
      const handleWindowResize = () => onResize(true);
      window.addEventListener("resize", handleWindowResize);

      let roRaf = 0;
      const ro = new ResizeObserver(() => {
        if (roRaf) return;
        roRaf = requestAnimationFrame(() => {
          roRaf = 0;
          onResize(false);
        });
      });
      if (modelCanvas) ro.observe(modelCanvas);

      /* ── Entrance animation ── */
      if (wrapRef.current) {
        gsap.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out", delay: 0.3 });
      }
      if (scrollIndRef.current) {
        gsap.fromTo(scrollIndRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.8 });
      }

      return () => {
        viewIo?.disconnect();
        window.removeEventListener("resize", handleWindowResize);
        window.removeEventListener("load", onLoadRefresh);
        clearTimeout(stRefreshTimer);
        ro.disconnect();
        cancelAnimationFrame(rafId);
        modelCanvas.removeEventListener("webglcontextlost", preventCtxLoss, false);
        draco.dispose();
        modelRenderer.dispose();
      };
    }

    const cleanup = init();
    return () => {
      alive = false;
      cleanup.then((fn) => fn && fn());
      if (st) st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="ae3h">
      <div className="ae3h__line ae3h__line--l" />
      <div className="ae3h__line ae3h__line--r" />
      <div className="ae3h__line ae3h__line--h" />

      <div ref={wrapRef} className="ae3h__canvas-wrap">
        <div className="ae3h__sky-css" aria-hidden="true" />
        <div className="ae3h__glow" />
      </div>

      <div ref={skylineRowRef} className="ae3h__skyline-row">
        <div className="ae3h__skyline-side ae3h__skyline-side--left">
          <img src={`${P}/assets/img/skyline.png`} alt="" />
        </div>
        <div className="ae3h__skyline-spacer" aria-hidden="true" />
        <div className="ae3h__skyline-side ae3h__skyline-side--right">
          <img src={`${P}/assets/img/skyline.png`} alt="" />
        </div>
      </div>

      <div className="ae3h__model-wrap" aria-hidden="true">
        <canvas ref={modelCanvasRef} className="ae3h__model-canvas" />
      </div>

      <div className="ae3h__start-overlay">
        {/* <div className="ae3h__start-eyebrow">
          <span className="ae3h__start-dash" />
          Designing for the 21st Century
        </div> */}
        <h1 className="ae3h__start-headline">
          AE3
          <br />
          Partners
        </h1>
        {/* <p className="ae3h__start-loc">One Great Client at a Time</p> */}
      </div>

      <div ref={contentRef} className="ae3h__content">
        <div className="ae3h__eyebrow">
          <span className="ae3h__eyebrow-line" />
          Architecture + Construction Management
        </div>
        <h2 className="ae3h__headline">
          Full-Service Support, <span className="ae3h__accent">One Great Client at a Time</span>
        </h2>
        <p className="ae3h__sub">
          AE3 Partners provides integrated architecture and construction management services across California, from
          early strategy through closeout.
        </p>
        <div className="ae3h__actions">
          <a href="/" onClick={(e) => e.preventDefault()} className="ae3h__btn ae3h__btn--primary">
            <span>Our Services</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        
        </div>
      </div>

      <div ref={scrollIndRef} className="ae3h__scroll">
        <div className="ae3h__scroll-track">
          <div className="ae3h__scroll-dot" />
        </div>
        <span className="ae3h__scroll-label">Scroll</span>
      </div>
    </section>
  );
}