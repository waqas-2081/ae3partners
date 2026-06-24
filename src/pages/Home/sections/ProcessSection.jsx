import './ProcessSection.css';

const P = process.env.PUBLIC_URL || '';

export default function ProcessSection() {
  return (
    <section className="process-section overflow-hidden fade-wrapper">
      <div className="bg-shape" data-background={`${P}/assets/img/shapes/process-shape-1.png`}></div>
      <div className="container container-2">
        <div className="heading-space align-items-end">
          <div className="section-heading mb-0">
            <h4 className="sub-heading" data-text-animation="fade-in-right" data-split="char" data-duration="0.9" data-stagger="0.03">
              How We Work
            </h4>
            <h2 className="section-title cursor-effect title-2">
              Collaborative <span>delivery built around <br /> your goals</span> and outcomes.
            </h2>
          </div>
          <div className="process-desc">
            <p className="mb-0">
              We tailor each engagement to client priorities with transparent planning, practical decision-making, and
              coordinated execution from concept to completion.
            </p>
          </div>
        </div>
        <div className="row gy-xl-0 gy-4 process-wrap fade-wrapper">
          {[
            { n: '01', title: 'Listen & Align', img: `${P}/assets/newimages/service1.jpg` },
            { n: '02', title: 'Plan & Design', img: `${P}/assets/newimages/service2.jpg` },
            { n: '03', title: 'Deliver & Coordinate', img: `${P}/assets/newimages/service3.jpg` },
            { n: '04', title: 'Close Out & Support', img: `${P}/assets/newimages/service4.jpg` }
          ].map((p) => (
            <div className="col-xl-3 col-lg-6 col-md-6" key={p.n}>
              <div className="process-item fade-top">
                <div className="process-thumb">
                  <img src={p.img} alt="process" />
                </div>
                <div className="process-content">
                  <h3 className="title">
                    <span>{p.n}</span>. {p.title}
                  </h3>
                  <p>Integrated architecture + CM guidance, delivered with collaboration, speed, and accountability.</p>
                </div>
                <span className="number">{p.n}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="process-text">
          <h5 className="bottom-text">
            Ready to build something meaningful? <a href="/" onClick={(e) => e.preventDefault()}>Let’s start today</a>
          </h5>
        </div>
      </div>
    </section>
  );
}

