import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../api/cmsApi';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import GallerySection from '../Home/sections/GallerySection';
import '../Studio/Studio.css';
import { ARTICLES } from './insightsData';
import './Insights.css';

function toCard(article) {
  return {
    id: article.slug || article.id,
    slug: article.slug || article.id,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    image: article.image,
    category: article.category,
  };
}

export default function Insights() {
  const [articles, setArticles] = useState(ARTICLES.map(toCard));
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const featured = articles[featuredIndex] || articles[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('studio-route');
    return () => {
      document.documentElement.classList.remove('studio-route');
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchBlogs()
      .then((list) => {
        if (cancelled) return;
        if (list.length) {
          setArticles(list.map(toCard));
          setFeaturedIndex(0);
        }
      })
      .catch(() => {
        if (!cancelled) setArticles(ARTICLES.map(toCard));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const goPrev = () => {
    setFeaturedIndex((i) => (i === 0 ? articles.length - 1 : i - 1));
  };

  const goNext = () => {
    setFeaturedIndex((i) => (i === articles.length - 1 ? 0 : i + 1));
  };

  if (!featured) {
    return (
      <>
        <Header />
        <MobileSideMenu />
        <div id="app-wrapper" className="insights-page studio-page">
          <div id="app-content" className="studio-reveal-content">
            <p style={{ padding: '6rem 1.5rem' }}>
              {loading ? 'Loading insights…' : 'No insights published yet.'}
            </p>
          </div>
          <SiteFooter />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="insights-page studio-page">
        <div id="app-content" className="studio-reveal-content">
          <section className="insights-featured" aria-label="Featured insight">
            <div className="insights-featured__media">
              <Link to={`/insights/${featured.slug}`}>
                <img src={featured.image} alt="" key={featured.slug} />
              </Link>
            </div>

            <div className="insights-featured__copy">
              <div className="insights-featured__nav" aria-label="Featured articles">
                <button type="button" className="insights-featured__arrow" onClick={goPrev} aria-label="Previous article">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button type="button" className="insights-featured__arrow" onClick={goNext} aria-label="Next article">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              <p className="insights-featured__date">{featured.date}</p>
              <h1 className="insights-featured__title">
                <Link to={`/insights/${featured.slug}`}>{featured.title}</Link>
              </h1>
              <p className="insights-featured__excerpt">{featured.excerpt}</p>
              <Link className="insights-readmore" to={`/insights/${featured.slug}`}>
                <span>Read More</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
            </div>
          </section>

          <section className="insights-grid-section" aria-label="Latest articles">
            <div className="insights-grid">
              {articles.map((article) => (
                <article key={article.slug} className="insights-card">
                  <Link className="insights-card__media" to={`/insights/${article.slug}`}>
                    <img src={article.image} alt="" loading="lazy" />
                  </Link>
                  <p className="insights-card__date">{article.date}</p>
                  <h2 className="insights-card__title">
                    <Link to={`/insights/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="insights-card__excerpt">{article.excerpt}</p>
                  <Link className="insights-readmore" to={`/insights/${article.slug}`}>
                    <span>Read More</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </section>
          <GallerySection />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
