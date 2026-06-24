import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const P = process.env.PUBLIC_URL || '';


const logoDefaultSrc = `${P}/assets/newimages/logo.png`;

const logoStickySrc = `${P}/assets/newimages/logo.png`;

export default function Header() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remove legacy meanmenu wrappers if they already exist in current session.
    document.querySelectorAll('.mean-bar, .mean-push, .mean-nav, .mean-remove').forEach((el) => el.remove());
  }, []);

  return (
    <header className="header sticky-active">
      <div className="primary-header">
        <div className="container">
          <div className="primary-header-inner">
            <div className="header-left-wrap">
              <div className="header-logo d-lg-block">
                <Link to="/">
                  <img
                    className="header-logo-default"
                    src={logoDefaultSrc}
                    alt="AE3 Partners"
                  />
                  <img
                    className="header-logo-sticky"
                    src={logoStickySrc}
                    alt="AE3 Partners"
                  />
                </Link>
              </div>
              <div className="header-menu-wrap">
                <div className="mobile-menu-items">
                  <ul>
                    {/* <li className={pathname === '/' ? 'active' : ''}>
                      <Link to="/">Home</Link>
                    </li> */}
                    <li>
                      <a href="/" onClick={(e) => e.preventDefault()}>Expertise</a>
                    </li>
                    <li className={pathname.startsWith('/projects') ? 'active' : ''}>
                      <Link to="/projects">Work</Link>
                    </li>
                    <li>
                      <a href="/" onClick={(e) => e.preventDefault()}>Studio</a>
                    </li>
                
                    <li>
                      <a href="/" onClick={(e) => e.preventDefault()}>Insights</a>
                    </li>
                 
                    <li>
                      <a href="/" onClick={(e) => e.preventDefault()}>Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="header-right-wrap">
              <div className="header-social-wrap" aria-label="Follow us">
                <a href="https://www.facebook.com/ae3partners" className="header-social-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/ae3partners" className="header-social-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/ae3-partners-inc-/" className="header-social-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCrSVQuoNOudm2OsAxlkXplw" className="header-social-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
              <div className="header-right">
                <div className="header-right-item">
                  <button
                    type="button"
                    className="mobile-side-menu-toggle ae3-hamburger-btn"
                    aria-label="Open menu"
                  >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

