const P = process.env.PUBLIC_URL || '';

export default function ProjectCarouselSection() {
  return (
    <section className="project-section ae3-project-section--carousel-only pt-0 tl-bg-color fade-wrapper">
      <div className="bg-shape" data-background={`${P}/assets/img/shapes/project-shape-1.png`}></div>
      <div className="container container-2">
        <div className="row section-heading-wrap fade-top">
          <div className="shape">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="shape" />
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="section-heading mb-0">
              <h4 className="sub-heading" data-text-animation="fade-in-right" data-split="char" data-duration="0.9" data-stagger="0.03">
                 Our Services
              </h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="section-heading section-heading-2 mb-0">
              <h2 className="section-title cursor-effect title-2">
              Integrated <span>architecture & construction management</span> services
              </h2>
              <p className="mb-0">
              We deliver a tailored blend of architecture, construction management, sustainability, and real estate
              advisory services to help clients move projects from concept through closeout.
              </p>
            </div>
          </div>
        </div>
        <div className="project-carousel swiper fade-top">
          <div className="swiper-wrapper">
            {[
              { img: `${P}/assets/newimages/service1.jpg`, title: 'Architecture & Interior Design', text: 'Programming, conceptual design, design development, construction documents, and permitting.' },
              { img: `${P}/assets/newimages/service2.jpg`, title: 'Construction Management', text: 'Budget tracking, project controls, bid management, value engineering, and closeout.' },
              { img: `${P}/assets/newimages/service3.jpg`, title: 'Sustainable Design', text: 'Guidelines and strategy, LEED support, low-impact design, and sustainability planning.' },
              { img: `${P}/assets/newimages/service4.jpg`, title: 'Site Planning & Portfolio Analysis', text: 'Existing building studies, real estate portfolio analysis, and long-range planning.' },
              { img: `${P}/assets/newimages/project5.jpg`, title: 'Real Estate Acquisitions', text: 'Property identification, evaluation, conceptual development, and financial/pro forma analysis.' }
            ].map((p) => (
              <div className="swiper-slide" key={p.title}>
                <div className="project-item">
                  <div className="project-img">
                    <img src={p.img} alt="project" />
                    {/* <ul>
                      <li>
                        <a href="/" onClick={(e) => e.preventDefault()}>AE3 Project</a>
                      </li>
                      <li>
                        <a href="/" onClick={(e) => e.preventDefault()}>California</a>
                      </li>
                    </ul> */}
                  </div>
                  <div className="project-content">
                    <h3 className="title">
                      <a href="/" onClick={(e) => e.preventDefault()}>{p.title}</a>
                    </h3>
                    <p>{p.text}</p>
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

