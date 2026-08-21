import { useEffect, useState } from 'react';
import Header from '../Home/components/Header';
import MobileSideMenu from '../Home/components/MobileSideMenu';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import GallerySection from '../Home/sections/GallerySection';
import '../Studio/Studio.css';
import './Contact.css';

const P = process.env.PUBLIC_URL || '';
const IMG = `${P}/assets/newimages/contact`;

const CARD_SLIDES = [
  `${IMG}/contact-card-1.jpg`,
  `${IMG}/contact-card-2.jpg`,
  `${IMG}/contact-card-3.jpg`,
];

const OFFICES = [
  {
    id: 'sf',
    city: 'San Francisco',
    address: '505 Montgomery St., 10th Floor\nSan Francisco, CA 94111',
    phone: '(415) 233 – 9991',
    phoneHref: 'tel:+14152339991',
    email: 'info@ae3partners.com',
    image: `${IMG}/office-sf.jpg`,
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=505+Montgomery+St+10th+Floor+San+Francisco+CA+94111',
  },
  {
    id: 'la',
    city: 'Los Angeles',
    address: '527 West 7th St., Suite 700\nLos Angeles, CA 90014',
    phone: '(424) 276-7040',
    phoneHref: 'tel:+14242767040',
    email: 'info@ae3partners.com',
    image: `${IMG}/office-la.jpg`,
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=527+West+7th+St+Suite+700+Los+Angeles+CA+90014',
  },
  {
    id: 'oakland',
    city: 'Oakland',
    address: '11 Embarcadero West, Suite 205\nOakland, CA 94607',
    phone: '(510) 538-9991',
    phoneHref: 'tel:+15105389991',
    email: 'info@ae3partners.com',
    image: `${IMG}/office-oakland.jpg`,
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=11+Embarcadero+West+Suite+205+Oakland+CA+94607',
  },
  {
    id: 'dc',
    city: 'Washington, D.C.',
    address: '1629 K Street, Suite 300\nWashington D.C. 20006',
    phone: '(202) 400-3505',
    phoneHref: 'tel:+12024003505',
    email: 'info@ae3partners.com',
    image: `${IMG}/office-dc.jpg`,
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=1629+K+Street+Suite+300+Washington+DC+20006',
  },
];

export default function Contact() {
  const [slide, setSlide] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('studio-route');
    return () => {
      document.documentElement.classList.remove('studio-route');
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % CARD_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <>
      <Header />
      <MobileSideMenu />

      <div id="app-wrapper" className="contact-page studio-page">
        <div id="app-content" className="studio-reveal-content">
          <section className="contact-section" aria-labelledby="contact-heading">
            <div className="contact-section__intro">
              <p className="contact-section__eyebrow">Get In Touch</p>
              <h2 id="contact-heading" className="contact-section__heading">
                Have A Project In Mind?
              </h2>
              <p className="contact-section__sub">Let&apos;s Make It Happen</p>
            </div>

            <div className="contact-section__grid">
              <aside className="contact-card" aria-label="Direct contact">
                {CARD_SLIDES.map((src, index) => (
                  <div
                    key={src}
                    className={`contact-card__slide${index === slide ? ' is-active' : ''}`}
                    style={{ backgroundImage: `url(${src})` }}
                    aria-hidden={index !== slide}
                  />
                ))}
                <div className="contact-card__shade" aria-hidden="true" />
                <div className="contact-card__content">
                  <h3 className="contact-card__title">Let&apos;s build something together.</h3>
                  <p className="contact-card__prompt">Prefer to reach out directly?</p>
                  <ul className="contact-card__links">
                    <li>
                      <a href="tel:+14152339991">
                        <span className="contact-card__icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M5 4h4l2 4-2 2a12 12 0 006 6l2-2 4 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-1z" />
                          </svg>
                        </span>
                        <span>(415) 233 – 9991</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@ae3partners.com">
                        <span className="contact-card__icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 7l9 6 9-6" />
                          </svg>
                        </span>
                        <span>info@ae3partners.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="contact-card__dots" role="tablist" aria-label="Contact images">
                  {CARD_SLIDES.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      className={`contact-card__dot${index === slide ? ' is-active' : ''}`}
                      aria-label={`Show image ${index + 1}`}
                      aria-selected={index === slide}
                      onClick={() => setSlide(index)}
                    />
                  ))}
                </div>
              </aside>

              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="contact-form__row">
                  <label className="contact-field">
                    <span className="contact-field__label">Full Name</span>
                    <input name="name" type="text" autoComplete="name" placeholder="John Carter" required />
                  </label>
                  <label className="contact-field">
                    <span className="contact-field__label">Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (234) 567-8900"
                    />
                  </label>
                </div>

                <div className="contact-form__row">
                  <label className="contact-field">
                    <span className="contact-field__label">Email Address</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="example@email.com"
                      required
                    />
                  </label>
                  <label className="contact-field">
                    <span className="contact-field__label">Subject</span>
                    <input name="subject" type="text" placeholder="Ex. New Project" />
                  </label>
                </div>

                <label className="contact-field contact-field--full">
                  <span className="contact-field__label">Write Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Please describe what service you are interested in..."
                    required
                  />
                </label>

                <div className="contact-form__actions">
                  {status === 'sent' ? (
                    <p className="contact-form__thanks" role="status">
                      Thanks — we&apos;ll get back to you within 24–48 hours.
                    </p>
                  ) : null}
                  <button type="submit" className="ae3h__btn ae3h__btn--primary contact-form__submit">
                    <span>Submit Now</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="contact-offices" aria-labelledby="offices-heading">
            <div className="contact-offices__intro">
              <p className="contact-offices__eyebrow">Office Near You</p>
              <h2 id="offices-heading" className="contact-offices__heading">
                Discover Our Presence
              </h2>
            </div>

            <div className="contact-offices__list">
              {OFFICES.map((office) => (
                <article key={office.id} className="contact-office">
                  <figure className="contact-office__media">
                    <img src={office.image} alt={`${office.city} office`} loading="lazy" />
                    <figcaption className="contact-office__city">{office.city}</figcaption>
                  </figure>

                  <div className="contact-office__address">
                    <div className="contact-office__pin" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="contact-office__label">Address</h3>
                      <p className="contact-office__text">
                        {office.address.split('\n').map((line) => (
                          <span key={line}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="contact-office__reach">
                    <div className="contact-office__reach-item">
                      <span className="contact-office__reach-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M5 4h4l2 4-2 2a12 12 0 006 6l2-2 4 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-1z" />
                        </svg>
                      </span>
                      <div>
                        <p className="contact-office__reach-label">Need Help? Call Us:</p>
                        <a href={office.phoneHref}>{office.phone}</a>
                      </div>
                    </div>
                    <div className="contact-office__reach-item">
                      <span className="contact-office__reach-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="M3 7l9 6 9-6" />
                        </svg>
                      </span>
                      <div>
                        <p className="contact-office__reach-label">Just Mail Us</p>
                        <a href={`mailto:${office.email}`}>{office.email}</a>
                      </div>
                    </div>
                  </div>

                  <a
                    className="ae3h__btn ae3h__btn--primary contact-office__map-btn"
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View On Map</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </article>
              ))}
            </div>
          </section>
          <GallerySection />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
