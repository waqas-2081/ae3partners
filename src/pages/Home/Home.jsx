import { useEffect, useState } from 'react';
import { ensureTemplateScriptsLoaded } from '../../template/loadTemplateScripts';
import { reinitPageEffects } from '../../template/reinitPageEffects';
import Preloader from './components/Preloader';
import Header from './components/Header';
import MobileSideMenu from './components/MobileSideMenu';
import HeroSection from './components/HeroSection';
import ProjectShowcaseSection from './sections/ProjectShowcaseSection';
import AboutSection from './sections/AboutSection';
import FeatureSection from './sections/FeatureSection';
import ProjectBigSection from './sections/ProjectBigSection';
import CounterSection from './sections/CounterSection';
import ProcessSection from './sections/ProcessSection';
import ProjectCarouselSection from './sections/ProjectCarouselSection';
import TestimonialSection from './sections/TestimonialSection';
import SponsorSection from './sections/SponsorSection';
import VideoSection from './sections/VideoSection';
import BlogSection from './sections/BlogSection';
import GallerySection from './sections/GallerySection';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import ScrollPercentage from './components/ScrollPercentage';
import ValuesMotif from './components/ValuesMotif';
import './Home.css';

export default function Home() {
  const [scriptsReady, setScriptsReady] = useState(false);

  useEffect(() => {
    // Prevent browser scroll restoration from landing mid-page on refresh,
    // which breaks pinned hero initialization until you "jiggle" scroll.
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch (_) {
      // ignore
    }
    if (process.env.NODE_ENV !== 'test') {
      try {
        if (typeof window.scrollTo === 'function') {
          window.scrollTo(0, 0);
        }
      } catch (_) {
        // ignore
      }
    }

    let cancelled = false;
    let cleanupEffects = () => {};

    ensureTemplateScriptsLoaded()
      .then(() => {
        if (cancelled) return;
        setScriptsReady(true);
        // Remount-safe: rebind swipers / fades after SPA navigation back to Home
        window.setTimeout(() => {
          if (cancelled) return;
          cleanupEffects =
            reinitPageEffects(document.getElementById('app-content') || document) || (() => {});
        }, 80);
      })
      .catch(() => {
        if (!cancelled) setScriptsReady(false);
      });

    return () => {
      cancelled = true;
      cleanupEffects();
    };
  }, []);

  return (
    <div className="home-page">
      <Preloader />
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="studio-page">
        <div id="app-content" className="studio-reveal-content">
          <HeroSection />
          {/* <ProjectCarouselSection /> */}
          <ProjectShowcaseSection />
          <ProjectBigSection />
          <ValuesMotif variant="band" />
          {/* <FeatureSection /> */}
          <AboutSection />
          <CounterSection />
          <ProcessSection />
          <ValuesMotif variant="band-dark" />
          <TestimonialSection />
          <SponsorSection />
          {/* <VideoSection /> */}
          <BlogSection />
          <GallerySection />
        </div>

        <SiteFooter />
      </div>

      <ScrollPercentage />

      {/* Keeps React from tree-shaking the template load in some builds */}
      <span style={{ display: 'none' }}>{scriptsReady ? 'ready' : 'loading'}</span>
    </div>
  );
}
