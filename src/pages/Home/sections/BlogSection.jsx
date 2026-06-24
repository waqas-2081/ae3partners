const P = process.env.PUBLIC_URL || '';

export default function BlogSection() {
  return (
    <section className="blog-section pt-150 fade-wrapper tl-bg-color">
      <div className="container container-2">
        <div className="row section-heading-wrap fade-top">
          <div className="shape">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="shape" />
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="section-heading mb-0">
              <h4 className="sub-heading" data-text-animation="fade-in-right" data-split="char" data-duration="0.9" data-stagger="0.03">
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
            {[
              {
                img: `${P}/assets/newimages/blog1.jpg`,
                key: 'blog1.jpg',
                title: '18 Years of Design That Connects Us'
              },
              {
                img: `${P}/assets/newimages/blog2.jpg`,
                key: 'blog2.jpg',
                title: 'Liberation Park Project Takes Shape in East Oakland'
              },
              {
                img: `${P}/assets/newimages/blog3.jpg`,
                key: 'blog3.jpg',
                title: 'Designing for the 21st Century, One Great Client at a Time'
              }
            ].map((p) => (
              <div className="swiper-slide" key={p.key}>
                <div className="post-card">
                  <div className="post-thumb">
                    <img src={p.img} alt="post" />
                    <span className="category">news</span>
                  </div>
                  <div className="post-content">
                    <ul className="post-meta">
                      <li>Dec 19, 2025</li>
                      <li>
                        By <span>AE3 Partners</span>
                      </li>
                    </ul>
                    <h3 className="title">
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        {p.title}
                      </a>
                    </h3>
                    <p>Updates from our projects, practice, and community partnerships across California.</p>
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

