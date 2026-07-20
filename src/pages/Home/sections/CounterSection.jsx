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
            {
              count: 19,
              title: 'Years of experience',
              text: 'Nearly two decades shaping public and private environments across California with proven design and delivery.',
            },
            {
              count: 250,
              title: 'Successful projects',
              text: 'From campuses and civic spaces to airports and workplaces projects delivered with care, clarity, and accountability.',
            },
            {
              count: 28,
              title: 'Team members',
              text: 'Architects, planners, and construction managers working as one collaborative, ego free team for every client.',
            },
            {
              count: 140,
              title: 'Clients served',
              text: 'Long term partnerships with agencies, institutions, and owners who trust AE3 to turn ideas into results.',
            },
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
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

