import { Link, useLocation } from 'react-router-dom';

const P = process.env.PUBLIC_URL || '';

export default function MobileSideMenu() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="mobile-side-menu">
        <div className="side-menu-content">
          <div className="side-menu-head">
           
            <button className="mobile-side-menu-close" type="button">
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
          <div className="side-menu-wrap">
            <ul className="mobile-side-menu-nav">
              {/* <li className={pathname === '/' ? 'active' : ''}>
                <Link to="/">Home</Link>
              </li> */}
              <li>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Expertise
                </a>
              </li>
              <li className={pathname.startsWith('/projects') ? 'active' : ''}>
                <Link to="/projects">Work</Link>
              </li>
              <li>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Studio
                </a>
              </li>
              <li>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Insights
                </a>
              </li>
              <li>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Contact Us
                </a>
              </li>
             
            </ul>
          </div>
          <div className="side-menu-contact">
          </div>
          
        </div>
      </div>
      <div className="mobile-side-menu-overlay"></div>
    </>
  );
}

