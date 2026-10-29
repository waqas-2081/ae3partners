import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ValuesMotif from './components/ValuesMotif';
import { normalizeAppPath } from '../../api/cmsApi';
import './HeroSection.css';

const P = process.env.PUBLIC_URL || '';
const FALLBACK_VIDEO = `${P}/assets/video/AE3_banner_video_compressed.mp4`;

export default function HeroSection({ data }) {
  const videoRef = useRef(null);
  const eyebrow = data?.eyebrow || 'Architecture, Planning, and Construction Management';
  const headline = data?.headline || "Designing What's";
  const accent = data?.headline_accent || 'Next.';
  const subtext =
    data?.subtext ||
    'AE3 Partners provides integrated architecture, planning, and construction management services for public and private clients. We transform ideas into thoughtfully designed, successfully delivered projects.';
  const buttonText = data?.button_text || 'Our Services';
  const buttonLink = normalizeAppPath(data?.button_link || '/expertise') || '/expertise';
  const preferredVideo = data?.video || FALLBACK_VIDEO;
  const [videoSrc, setVideoSrc] = useState(preferredVideo);

  useEffect(() => {
    setVideoSrc(preferredVideo || FALLBACK_VIDEO);
  }, [preferredVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [videoSrc]);

  const handleVideoError = () => {
    if (videoSrc !== FALLBACK_VIDEO) {
      setVideoSrc(FALLBACK_VIDEO);
    }
  };

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
          key={videoSrc}
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="ae3h__overlay" aria-hidden="true" />
      </div>

      <div className="ae3h__line ae3h__line--l" aria-hidden="true" />
      <div className="ae3h__line ae3h__line--r" aria-hidden="true" />
      <div className="ae3h__line ae3h__line--h" aria-hidden="true" />

      <div className="ae3h__content">
        <div className="ae3h__eyebrow">
          <span className="ae3h__eyebrow-line" aria-hidden="true" />
          {eyebrow}
        </div>
        <h1 className="ae3h__headline">
          {headline} <span className="ae3h__accent">{accent}</span>
        </h1>
        <p className="ae3h__sub">{subtext}</p>
        <ValuesMotif variant="hero" />
        <div className="ae3h__actions">
          <Link to={buttonLink} className="ae3h__btn ae3h__btn--primary">
            <span>{buttonText}</span>
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
