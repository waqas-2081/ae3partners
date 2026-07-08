import { useEffect, useState } from 'react';
import { ensureTemplateScriptsLoaded } from '../../template/loadTemplateScripts';
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
import Footer from './sections/Footer';
import ScrollPercentage from './components/ScrollPercentage';
import HeroSection2 from './herosection2';

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
    ensureTemplateScriptsLoaded()
      .then(() => {
        if (!cancelled) setScriptsReady(true);
      })
      .catch(() => {
        // Keep rendering markup even if scripts fail to load.
        if (!cancelled) setScriptsReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Preloader />
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper">
        <div id="app-content">
          <HeroSection2 />
          {/* <ProjectCarouselSection /> */}
          <ProjectShowcaseSection />
          <ProjectBigSection />
          {/* <FeatureSection /> */}
          <AboutSection />
          <CounterSection />
          <ProcessSection />
          <TestimonialSection />
          <SponsorSection />
          {/* <VideoSection /> */}
          <BlogSection />
          <GallerySection />
          <Footer />
        </div>
      </div>

      <ScrollPercentage />

      {/* Keeps React from tree-shaking the template load in some builds */}
      <span style={{ display: 'none' }}>{scriptsReady ? 'ready' : 'loading'}</span>
    </>
  );
}

