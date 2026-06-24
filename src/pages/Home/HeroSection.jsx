import { useEffect, useRef } from "react";

const P = process.env.PUBLIC_URL || "";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="ae3h">
      <div className="ae3h__video-wrap">
        <video
          ref={videoRef}
          className="ae3h__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={`${P}/assets/video/AE3_banner_video_compressed.mp4`} type="video/mp4" />
        </video>
        <div className="ae3h__overlay" aria-hidden="true" />
      </div>

      <div className="ae3h__line ae3h__line--l" />
      <div className="ae3h__line ae3h__line--r" />
      <div className="ae3h__line ae3h__line--h" />

      <div className="ae3h__content">
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

      <div className="ae3h__scroll ae3h__scroll--visible">
        <div className="ae3h__scroll-track">
          <div className="ae3h__scroll-dot" />
        </div>
        <span className="ae3h__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
