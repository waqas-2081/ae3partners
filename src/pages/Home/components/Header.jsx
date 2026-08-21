import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const P = process.env.PUBLIC_URL || '';


const LOGO_SRC = `${P}/assets/newimages/ae3-logo.png`;

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
                  <img src={LOGO_SRC} alt="AE3 Partners — Architecture + CM" />
                </Link>
              </div>
              <div className="header-menu-wrap">
                <div className="mobile-menu-items">
                  <ul>
                    {/* <li className={pathname === '/' ? 'active' : ''}>
                      <Link to="/">Home</Link>
                    </li> */}
                    <li className={pathname.startsWith('/expertise') ? 'active' : ''}>
                      <Link to="/expertise">Expertise</Link>
                    </li>
                    <li className={pathname.startsWith('/projects') ? 'active' : ''}>
                      <Link to="/projects">Work</Link>
                    </li>
                    <li className={pathname.startsWith('/studio') ? 'active' : ''}>
                      <Link to="/studio">Studio</Link>
                    </li>
                
                    <li className={pathname.startsWith('/insights') ? 'active' : ''}>
                      <Link to="/insights">Insights</Link>
                    </li>
                 
                    <li className={pathname.startsWith('/contact') ? 'active' : ''}>
                      <Link to="/contact">Contact</Link>
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

