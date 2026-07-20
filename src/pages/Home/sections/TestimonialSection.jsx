import './TestimonialSection.css';

const P = process.env.PUBLIC_URL || '';

export default function TestimonialSection() {
  return (
    <section className="testimonial-section  fade-wrapper">
      <div className="container container-2">
        <div className="row section-heading-wrap fade-top">
          <div className="shape">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="shape" />
          </div>
          <div className="col-12">
            <div className="section-heading testimonial-section-headings mb-0">
              <h4 className="sub-heading" data-text-animation="fade-in-right" data-split="char" data-duration="0.9" data-stagger="0.03">
                Why Clients Choose AE3
              </h4>
              <h2 className="section-title cursor-effect title-2">
                Partnerships Built on Trust. <span>Proven by Performance.</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="testi-img slide-anim" data-delay="0.3" data-offset="100" data-direction="left">
              <img src={`${P}/assets/newimages/whoweare1.jpg`} alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="testi-carousel-wrap slide-anim" data-delay="0.3" data-offset="100" data-direction="right">
              <div className="testi-top-content">
                <div className="left-content">
                  <h3 className="rating">AE3</h3>
                  <div className="rating-list">
                    <ul>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      ))}
                    </ul>
                    <span>Focused on You</span>
                  </div>
                </div>
                <div className="right-content">
                  <p>
                    We offer collaborative, ego-free, tailored service with integrated architecture and construction
                    management that keeps projects on budget and schedule.
                  </p>
                </div>
              </div>
              <div className="testi-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testi-item">
                      <p>
                        “AE3 Partners combines design excellence with practical project leadership. Their team knows how to
                        collaborate with owners, builders, and stakeholders to deliver great outcomes.”
                      </p>
                      <div className="testi-author">
                        <div className="author-img author-img-google">
                          <i className="fab fa-google" aria-hidden="true" title="Google" />
                        </div>
                        <h4 className="name">
                          Client Perspective <span>Architecture + CM Services</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

