const P = process.env.PUBLIC_URL || '';

export default function FeatureSection() {
  return (
    <section className="feature-section pb-110 overflow-hidden tl-bg-color fade-wrapper">
      <div className="container container-2">
        <div className="row section-heading-wrap fade-top feature-top">
          <div className="shape">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="shape" />
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
        <div className="row fade-top">
          <div className="col-lg-6">
            <div className="feature-item-imgs">
              <div className="feature-img">
                <img src={`${P}/assets/newimages/whoweare2.jpg`} alt="" />
                <div className="img-content">
                  <p>
                    From programming and conceptual design to project controls and closeout, our team helps you build with
                    confidence, clarity, and long-term value.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="feature-item-list feature-item-list-1">
              {[
                {
                  n: '01',
                  title: 'Architecture & Interior Design',
                  img: `${P}/assets/newimages/service1.jpg`,
                  text:
                    'Programming, conceptual design, design development, construction documents, and permitting.'
                },
                {
                  n: '02',
                  title: 'Construction Management',
                  img: `${P}/assets/newimages/service2.jpg`,
                  text: 'Budget tracking, project controls, bid management, value engineering, and closeout.'
                },
                {
                  n: '03',
                  title: 'Sustainable Design',
                  img: `${P}/assets/newimages/service3.jpg`,
                  text: 'Guidelines and strategy, LEED support, low-impact design, and sustainability planning.'
                },
                {
                  n: '04',
                  title: 'Site Planning & Portfolio Analysis',
                  img: `${P}/assets/newimages/service4.jpg`,
                  text: 'Existing building studies, real estate portfolio analysis, and long-range planning.'
                },
                {
                  n: '05',
                  title: 'Real Estate Acquisitions',
                  img: `${P}/assets/newimages/project5.jpg`,
                  text:
                    'Property identification, evaluation, conceptual development, and financial/pro forma analysis.'
                }
              ].map((item) => (
                <div className="feature-item" key={item.n} data-img={item.img} data-text={item.text}>
                  <span className="number">{item.n}</span>
                  <h3 className="title">
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      {item.title}
                    </a>
                  </h3>
                  <a href="/" onClick={(e) => e.preventDefault()} className="arrow">
                    <i className="fa-regular fa-arrow-right"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

