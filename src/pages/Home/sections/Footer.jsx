import './Footer.css';

const P = process.env.PUBLIC_URL || '';

const quickLinks = ['Expertise', 'Work', 'Studio', 'Insights', 'Contact Us'];
const serviceLinks = [
  'Architecture & Interior Design',
  'Construction Management',
  'Sustainable Design',
  'Site Planning',
  'Real Estate Acquisitions',
  'Renovation Strategy'
];

const socialItems = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ae3partners',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.8 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.4 1.5-1.4h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.1v3h2.6V21h3.1Z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ae3partners',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7.1A4.9 4.9 0 1 0 12 17a4.9 4.9 0 0 0 0-9.9Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM18.2 6.9a1.1 1.1 0 1 0 0-2.1 1.1 1.1 0 0 0 0 2.1ZM12 2.8c2.9 0 3.3 0 4.5.1 1.1.1 1.7.2 2.1.4.5.2.9.4 1.3.8.4.4.6.8.8 1.3.2.4.3 1 .4 2.1.1 1.2.1 1.6.1 4.5s0 3.3-.1 4.5c-.1 1.1-.2 1.7-.4 2.1-.2.5-.4.9-.8 1.3-.4.4-.8.6-1.3.8-.4.2-1 .3-2.1.4-1.2.1-1.6.1-4.5.1s-3.3 0-4.5-.1c-1.1-.1-1.7-.2-2.1-.4a3.5 3.5 0 0 1-2.1-2.1c-.2-.4-.3-1-.4-2.1-.1-1.2-.1-1.6-.1-4.5s0-3.3.1-4.5c.1-1.1.2-1.7.4-2.1.2-.5.4-.9.8-1.3.4-.4.8-.6 1.3-.8.4-.2 1-.3 2.1-.4 1.2-.1 1.6-.1 4.5-.1Zm0-1.8C9 1 8.6 1 7.4 1.1c-1.2.1-2 .3-2.7.5a5.3 5.3 0 0 0-1.9 1.2A5.3 5.3 0 0 0 1.6 4.7c-.2.7-.4 1.5-.5 2.7C1 8.6 1 9 1 12s0 3.4.1 4.6c.1 1.2.3 2 .5 2.7.3.8.7 1.4 1.2 1.9.5.5 1.1.9 1.9 1.2.7.2 1.5.4 2.7.5 1.2.1 1.6.1 4.6.1s3.4 0 4.6-.1c1.2-.1 2-.3 2.7-.5.8-.3 1.4-.7 1.9-1.2.5-.5.9-1.1 1.2-1.9.2-.7.4-1.5.5-2.7.1-1.2.1-1.6.1-4.6s0-3.4-.1-4.6c-.1-1.2-.3-2-.5-2.7a5.3 5.3 0 0 0-1.2-1.9 5.3 5.3 0 0 0-1.9-1.2c-.7-.2-1.5-.4-2.7-.5C15.4 1 15 1 12 1Z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCrSVQuoNOudm2OsAxlkXplw',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2c-1.8-.5-8.5-.5-8.5-.5s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2C1 9 1 12 1 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM10 15.7V8.3L16 12l-6 3.7Z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/ae3-partners-inc-/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.7 8.7H2.5V21h3.2V8.7Zm.2-4a1.9 1.9 0 1 0-3.8 0 1.9 1.9 0 0 0 3.8 0ZM21 13.5c0-3.6-1.9-5.3-4.5-5.3-2 0-2.9 1.1-3.4 1.9V8.7h-3.2V21h3.2v-6.8c0-1.8.3-3.4 2.6-3.4s2.3 2.1 2.3 3.5V21H21v-7.5Z" />
      </svg>
    )
  }
];

const particlePositions = [
  { top: '16%', left: '9%', delay: '0s' },
  { top: '22%', left: '88%', delay: '1.2s' },
  { top: '31%', left: '55%', delay: '0.8s' },
  { top: '42%', left: '18%', delay: '2.4s' },
  { top: '49%', left: '74%', delay: '1.6s' },
  { top: '57%', left: '43%', delay: '0.5s' },
  { top: '64%', left: '7%', delay: '1.8s' },
  { top: '74%', left: '91%', delay: '2.1s' },
  { top: '82%', left: '29%', delay: '0.9s' },
  { top: '86%', left: '62%', delay: '1.4s' },
  { top: '14%', left: '39%', delay: '2.8s' },
  { top: '67%', left: '84%', delay: '0.3s' }
];

function FooterList({ title, items }) {
  return (
    <div className="ae3-footer-card">
      <h4>{title}</h4>
      <ul className="ae3-footer-links">
        {items.map((item) => (
          <li key={item}>
            <a href="/" onClick={(e) => e.preventDefault()}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="ae3-premium-footer">
      <div className="ae3-footer-glow ae3-glow-1" aria-hidden="true"></div>
      <div className="ae3-footer-glow ae3-glow-2" aria-hidden="true"></div>
      <div className="ae3-footer-glow ae3-glow-3" aria-hidden="true"></div>

      <div className="ae3-footer-particles" aria-hidden="true">
        {particlePositions.map((particle, index) => (
          <span
            key={`particle-${index + 1}`}
            style={{ top: particle.top, left: particle.left, animationDelay: particle.delay }}
          ></span>
        ))}
      </div>

      <div className="container container-2">
        <div className="ae3-footer-grid">
          <div className="ae3-footer-card ae3-about-card">
            <div className="ae3-footer-logo">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <img src={`${P}/assets/newimages/logo.png`} alt="AE3 Partners" />
              </a>
            </div>
            <h4>About AE3 Partners</h4>
            <p>
              Full-service Architecture + Construction Management studio shaping visionary spaces across California with
              precision, purpose, and timeless style.
            </p>
            <p className="ae3-location">San Francisco, California - United States</p>
          </div>

          <FooterList title="Quick Links" items={quickLinks} />

          <FooterList title="Services" items={serviceLinks} />

          <div className="ae3-footer-card">
            <h4>Contact</h4>
            <div className="ae3-contact-row">
              <span className="ae3-contact-label">Call</span>
              <a href="tel:+14152339991">(415) 233 - 9991</a>
            </div>
            <div className="ae3-contact-row">
              <span className="ae3-contact-label">Email</span>
              <a href="mailto:info@ae3partners.com">info@ae3partners.com</a>
            </div>
            <div className="ae3-contact-row">
              <span className="ae3-contact-label">Hours</span>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>

            <div className="ae3-social-wrap">
              <h5>Social Media</h5>
              <ul className="ae3-social-list" aria-label="Social media links">
                {socialItems.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <span className="ae3-social-icon">{social.icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="ae3-footer-bottom">
          <p>
            © 2026 AE3 Partners. All Rights Reserved. Designed & Developed by{' '}
            <a href="https://www.fixmywebs.com" target="_blank" rel="noopener noreferrer">
              Fixmywebs
            </a>
          </p>
        </div>
      </div>

      <div className="footer-text" aria-hidden="true">
        <span>AE3</span>
      </div>
    </footer>
  );
}

