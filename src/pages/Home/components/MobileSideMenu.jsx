import { Link, useLocation } from 'react-router-dom';

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
                <Link to="/contact">Contact Us</Link>
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

