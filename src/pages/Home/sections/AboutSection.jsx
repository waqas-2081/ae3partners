import { Link } from 'react-router-dom';
import { normalizeAppPath } from '../../../api/cmsApi';
import './AboutSection.css';

const P = process.env.PUBLIC_URL || '';

const FALLBACK_POINTS = [
  'Focused on your needs and outcomes',
  'Timeless, attractive, and sustainable design',
  'Delivering on budget and schedule',
  'Collaborative, ego-free team approach',
];

export default function AboutSection({ data }) {
  const subHeading = data?.sub_heading || 'Who We Are';
  const title = data?.title || 'Trusted Advisors.';
  const titleAccent = data?.title_accent || 'Proven Partners.';
  const points =
    Array.isArray(data?.points) && data.points.length
      ? data.points.map((p) => p.label || p).filter(Boolean)
      : FALLBACK_POINTS;
  const description =
    data?.description ||
    'AE3 is an architecture firm providing planning and construction management services for public and private clients across California and beyond. We combine creative thinking, technical expertise, and responsive leadership to help clients achieve successful outcomes.';
  const buttonText = data?.button_text || 'Our Team';
  const buttonLink = normalizeAppPath(data?.button_link || '/our-firm') || '/our-firm';
  const image = data?.image || `${P}/assets/newimages/whoweare2.jpg`;

  return (
    <section className="ae3-about about-section overflow-hidden">
      <div
        className="about-bg"
        style={{ backgroundImage: `url(${P}/assets/img/bg-img/about-bg.png)` }}
        aria-hidden="true"
      />
      <div className="about-text" aria-hidden="true">
        <span>AE3</span>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div
              className="about-content white-content slide-anim"
              data-delay="0.3"
              data-offset="100"
              data-direction="left"
            >
              <div className="section-heading white-content mb-30">
                <h4
                  className="sub-heading"
                  data-text-animation="fade-in-right"
                  data-split="char"
                  data-duration="0.9"
                  data-stagger="0.03"
                >
                  {subHeading}
                </h4>
                <h2 className="section-title cursor-effect">
                  {title} <span>{titleAccent}</span>
                </h2>
              </div>
              <ul className="about-list">
                {points.map((label) => (
                  <li key={label}>
                    <img src={`${P}/assets/img/icon/about-1.png`} alt="" />
                    {label}
                  </li>
                ))}
              </ul>
              <p>{description}</p>
              <div className="about-btn">
                <Link to={buttonLink} className="tl-primary-btn white-btn">
                  {buttonText}{' '}
                  <span className="icon">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="about-img slide-anim"
              data-delay="0.3"
              data-offset="100"
              data-direction="right"
            >
              <img src={image} alt="AE3 Partners team and firm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
