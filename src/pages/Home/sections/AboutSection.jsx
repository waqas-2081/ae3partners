const P = process.env.PUBLIC_URL || '';

export default function AboutSection() {
  return (
    <section className="about-section overflow-hidden">
      <div className="about-bg" data-background={`${P}/assets/img/bg-img/about-bg.png`}></div>
      <div className="about-text">
        <span>AE3</span>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-content white-content slide-anim" data-delay="0.3" data-offset="100" data-direction="left">
              <div className="section-heading white-content mb-30">
                <h4
                  className="sub-heading"
                  data-text-animation="fade-in-right"
                  data-split="char"
                  data-duration="0.9"
                  data-stagger="0.03"
                >
                  Who We Are
                </h4>
                <h2 className="section-title cursor-effect">
                  Trusted Advisors. <span>Proven Partners.</span>
                </h2>
              </div>
              <ul className="about-list">
                {[
                  'Focused on your needs and outcomes',
                  'Timeless, attractive, and sustainable design',
                  'Delivering on budget and schedule',
                  'Collaborative, ego-free team approach'
                ].map((label) => (
                  <li key={label}>
                    <img src={`${P}/assets/img/icon/about-1.png`} alt="about" />
                    {label}
                  </li>
                ))}
              </ul>
              <p>
                AE3 is an architecture firm providing planning and construction management services for public and
                private clients across California and beyond. We combine creative thinking, technical expertise, and
                responsive leadership to help clients achieve successful outcomes.
              </p>
              <div className="about-btn">
                <a href="/" onClick={(e) => e.preventDefault()} className="tl-primary-btn white-btn">
                  Our Team{' '}
                  <span className="icon">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-img slide-anim" data-delay="0.3" data-offset="100" data-direction="right">
              <img src={`${P}/assets/newimages/whoweare2.jpg`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

