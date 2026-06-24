const P = process.env.PUBLIC_URL || '';

export default function CounterSection() {
  return (
    <section className="counter-section counter-1">
      <div className="counter-text">
        <span>AE3</span>
      </div>
      <div className="counter-element scroll-area">
        <img className="scroll-img" src={`${P}/assets/img/images/counter-img-1.png`} alt="counter" />
      </div>
      <div className="container container-2">
        <div className="row gy-5 fade-wrapper">
          {[
            { count: 19, title: 'Years of experience' },
            { count: 250, title: 'Successful projects' },
            { count: 28, title: 'Team members' },
            { count: 140, title: 'Clients served' }
          ].map((c) => (
            <div className="col-lg-3 col-md-6 fade-top" key={c.title}>
              <div className="counter-item">
                <h3 className="title">
                  <span className="odometer" data-count={c.count}>
                    0
                  </span>
                  <span className="icon">+</span>
                </h3>
                <h4 className="sub-title">{c.title}</h4>
                <p>Real impact delivered through design excellence, collaboration, and cost-aware execution.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

