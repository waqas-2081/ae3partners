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
              A Process Built on <span>Partnership</span>
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
            {
              n: '01',
              title: 'Listen & Align',
              img: `${P}/assets/newimages/service1.jpg`,
              text: 'We start by understanding your goals, constraints, and stakeholders so every decision reflects what success looks like for you.',
            },
            {
              n: '02',
              title: 'Plan & Design',
              img: `${P}/assets/newimages/service2.jpg`,
              text: 'Thoughtful planning and design options that balance vision, budget, schedule, and long term performance.',
            },
            {
              n: '03',
              title: 'Deliver & Coordinate',
              img: `${P}/assets/newimages/service3.jpg`,
              text: 'Hands-on coordination through construction keeping teams aligned, issues resolved, and the project moving forward.',
            },
            {
              n: '04',
              title: 'Close Out & Support',
              img: `${P}/assets/newimages/service4.jpg`,
              text: 'A clean closeout with documentation, punch-list resolution, and support that carries the project from delivery to day to day use.',
            },
          ].map((p) => (
            <div className="col-xl-3 col-lg-6 col-md-6" key={p.n}>
              <div className="process-item fade-top">
                <div className="process-thumb">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="process-content">
                  <h3 className="title">
                    <span>{p.n}</span>. {p.title}
                  </h3>
                  <p>{p.text}</p>
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

