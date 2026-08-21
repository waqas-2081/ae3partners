import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ValuesMotif from './components/ValuesMotif';
import './HeroSection.css';

const P = process.env.PUBLIC_URL || '';

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="ae3h" aria-label="Hero">
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

      <div className="ae3h__line ae3h__line--l" aria-hidden="true" />
      <div className="ae3h__line ae3h__line--r" aria-hidden="true" />
      <div className="ae3h__line ae3h__line--h" aria-hidden="true" />

      <div className="ae3h__content">
        <div className="ae3h__eyebrow">
          <span className="ae3h__eyebrow-line" aria-hidden="true" />
          Architecture, Planning, and Construction Management
        </div>
        <h1 className="ae3h__headline">
          Designing What&apos;s <span className="ae3h__accent">Next.</span>
        </h1>
        <p className="ae3h__sub">
          AE3 Partners provides integrated architecture, planning, and construction management services for public and
          private clients. We transform ideas into thoughtfully designed, successfully delivered projects.
        </p>
        <ValuesMotif variant="hero" />
        <div className="ae3h__actions">
          <Link to="/expertise" className="ae3h__btn ae3h__btn--primary">
            <span>Our Services</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="ae3h__scroll ae3h__scroll--visible" aria-hidden="true">
        <div className="ae3h__scroll-track">
          <div className="ae3h__scroll-dot" />
        </div>
        <span className="ae3h__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
