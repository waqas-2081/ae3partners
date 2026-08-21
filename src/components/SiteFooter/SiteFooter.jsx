import { Link } from 'react-router-dom';
import './SiteFooter.css';

const P = process.env.PUBLIC_URL || '';

const SERVICES = [
  { label: 'Architecture', to: '/expertise' },
  { label: 'Construction Management', to: '/expertise' },
  { label: 'Design-Build', to: '/expertise' },
  { label: 'Sustainable Design', to: '/expertise' },
  { label: 'Real Estate Acquisitions', to: '/expertise' },
];

const QUICK_LINKS = [
  { label: 'Expertise', to: '/expertise' },
  { label: 'Work', to: '/projects' },
  { label: 'Studio', to: '/studio' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

const SOCIAL = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ae3partners',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ae3partners',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/ae3-partners-inc-/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M22.23 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28z"
        />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCrSVQuoNOudm2OsAxlkXplw',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.57V8.43L15.82 12l-6.07 3.57z"
        />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ae3-site-footer" aria-label="Site footer">
      <div className="ae3-site-footer__inner">
        <div className="ae3-site-footer__grid">
          {/* Column 1 — Brand */}
          <div className="ae3-site-footer__brand">
            <Link to="/" className="ae3-site-footer__logo">
              <img
                src={`${P}/assets/newimages/ae3-logo.png`}
                alt="AE3 Architecture + CM"
              />
            </Link>

            <div className="ae3-site-footer__help">
              <p>
                AE3 Partners delivers architecture and construction management with clarity,
                care, and accountability — from first conversation through project completion.
                Reach out anytime and we will help you move forward with confidence.
              </p>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="ae3-site-footer__col">
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="ae3-site-footer__col">
            <h4>Services</h4>
            <ul>
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact + Social */}
          <div className="ae3-site-footer__col ae3-site-footer__col--contact">
            <h4>Contact us</h4>
            <ul className="ae3-site-footer__contact">
              <li>
                <a href="tel:+14152339991">
                  <span className="ae3-site-footer__contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z"
                      />
                    </svg>
                  </span>
                  (415) 233 – 9991
                </a>
              </li>
              <li>
                <a href="mailto:info@ae3partners.com">
                  <span className="ae3-site-footer__contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4.2-8 5.1-8-5.1V6.5l8 5.1 8-5.1v1.7Z"
                      />
                    </svg>
                  </span>
                  info@ae3partners.com
                </a>
              </li>
            </ul>

            <div className="ae3-site-footer__social">
              <div className="ae3-site-footer__social-row" aria-label="Social media links">
                {SOCIAL.map((item) => (
                  <a
                    key={item.name}
                    className={`ae3-site-footer__social-btn ae3-site-footer__social-btn--${item.name.toLowerCase()}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    title={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ae3-site-footer__bottom">
          <p>
            © {year} AE3 Partners. All Rights Reserved. Designed &amp; Developed by{' '}
            <a
              href="https://www.fixmywebs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fixmywebs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
