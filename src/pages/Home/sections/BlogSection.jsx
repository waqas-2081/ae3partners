import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../../api/cmsApi';
import './BlogSection.css';

const P = process.env.PUBLIC_URL || '';

const FALLBACK_POSTS = [
  {
    slug: 'wlac',
    image: `${P}/assets/newimages/blog1.jpg`,
    title: 'Building the Future: WLAC Kicks Off Construction of New Facilities & Shops Complex',
    date: 'Dec 19, 2025',
    category: 'Education',
  },
  {
    slug: 'liberation-park',
    image: `${P}/assets/newimages/blog2.jpg`,
    title: 'Liberation Park Project Takes Shape in East Oakland: A New Hub for Community Empowerment',
    date: 'Dec 19, 2025',
    category: 'Projects',
  },
  {
    slug: 'lawa',
    image: `${P}/assets/newimages/blog3.jpg`,
    title:
      'AE3 Partners and Steinberg Hart Collaborate with LAWA to Enhance Traveler Experience Ahead of the Los Angeles Olympics',
    date: 'Dec 19, 2025',
    category: 'Transportation',
  },
];

export default function BlogSection() {
  const [posts, setPosts] = useState(FALLBACK_POSTS);

  useEffect(() => {
    let cancelled = false;
    fetchBlogs({ limit: 6 })
      .then((list) => {
        if (cancelled || !list.length) return;
        setPosts(
          list.map((item) => ({
            slug: item.slug,
            image: item.image,
            title: item.title,
            date: item.date,
            category: item.category || 'News',
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setPosts(FALLBACK_POSTS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="ae3-blog blog-section pt-30 fade-wrapper tl-bg-color">
      <div className="container container-2">
        <div className="row section-heading-wrap fade-top">
          <div className="shape" aria-hidden="true">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="" />
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="section-heading mb-0">
              <h4
                className="sub-heading"
                data-text-animation="fade-in-right"
                data-split="char"
                data-duration="0.9"
                data-stagger="0.03"
              >
                Latest News and Events
              </h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="section-heading section-heading-2 mb-0">
              <h2 className="section-title cursor-effect title-2">
                Insights, milestones, <span>and project updates</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="blog-carousel swiper fade-top">
          <div className="swiper-wrapper">
            {posts.map((p) => (
              <div className="swiper-slide" key={p.slug || p.title}>
                <div className="post-card">
                  <div className="post-thumb">
                    <Link to={p.slug ? `/insights/${p.slug}` : '/insights'}>
                      <img src={p.image} alt={p.title} />
                    </Link>
                    <span className="category">{p.category || 'news'}</span>
                  </div>
                  <div className="post-content">
                    <ul className="post-meta">
                      <li>{p.date || '—'}</li>
                      <li>
                        By <span>AE3 Partners</span>
                      </li>
                    </ul>
                    <h3 className="title">
                      <Link to={p.slug ? `/insights/${p.slug}` : '/insights'}>{p.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
