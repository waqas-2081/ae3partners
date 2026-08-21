import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import GallerySection from '../Home/sections/GallerySection';
import '../Studio/Studio.css';
import { getArticleById, getRelatedArticles } from './insightsData';
import './InsightDetail.css';

export default function InsightDetail() {
  const { slug } = useParams();
  const article = getArticleById(slug);
  const related = getRelatedArticles(slug, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('studio-route');
    return () => {
      document.documentElement.classList.remove('studio-route');
    };
  }, [slug]);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="insight-detail-page studio-page">
        <div id="app-content" className="studio-reveal-content">
          <section className="id-hero" aria-label={article.title}>
            <img className="id-hero__bg" src={article.image} alt="" aria-hidden="true" />
            <div className="id-hero__shade" aria-hidden="true" />
            <div className="id-hero__content">
              <nav className="id-hero__crumb" aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/insights">Insights</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Article</li>
                </ol>
              </nav>
              <p className="id-hero__meta">
                <span>{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </p>
              <h1 className="id-hero__title">{article.title}</h1>
            </div>
          </section>

          <article className="id-article">
            <div className="id-article__inner">
              <p className="id-article__lead">{article.excerpt}</p>
              <figure className="id-article__figure">
                <img src={article.image} alt="" />
              </figure>
              <div className="id-article__body">
                {article.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          {related.length > 0 ? (
            <section className="id-related" aria-labelledby="id-related-heading">
              <div className="id-related__inner">
                <p className="id-related__eyebrow">Keep Reading</p>
                <h2 id="id-related-heading" className="id-related__heading">
                  More Insights
                </h2>
                <div className="id-related__grid">
                  {related.map((item) => (
                    <article key={item.id} className="id-related__card">
                      <Link to={`/insights/${item.id}`} className="id-related__media">
                        <img src={item.image} alt="" loading="lazy" />
                      </Link>
                      <p className="id-related__date">{item.date}</p>
                      <h3 className="id-related__title">
                        <Link to={`/insights/${item.id}`}>{item.title}</Link>
                      </h3>
                      <Link to={`/insights/${item.id}`} className="insights-readmore">
                        <span>Read More</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
          <GallerySection />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
