const P = process.env.PUBLIC_URL || '';

export default function SidebarArea() {
  return (
    <>
      <div id="sidebar-area" className="sidebar-area">
        <button className="sidebar-trigger close" type="button">
          <svg
            className="sidebar-close"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="16px"
            height="12.7px"
            viewBox="0 0 16 12.7"
            style={{ enableBackground: 'new 0 0 16 12.7' }}
            xmlSpace="preserve"
          >
            <g>
              <rect x="0" y="5.4" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.1569 7.5208)" width="16" height="2" />
              <rect x="0" y="5.4" transform="matrix(0.7071 0.7071 -0.7071 0.7071 6.8431 -3.7929)" width="16" height="2" />
            </g>
          </svg>
        </button>
        <div className="side-menu-content">
          <div className="side-menu-logo">
            <a className="dark-img" href="index.html">
              <img src={`${P}/assets/newimages/logo.png`} alt="AE3 Partners" />
            </a>
            <a className="light-img" href="index.html">
              <img src={`${P}/assets/newimages/logo.png`} alt="AE3 Partners" />
            </a>
          </div>
          <div className="side-menu-wrap"></div>
          <div className="side-menu-about">
            <h4 className="title">We Shape Interior Designs, Crafting Timeless and Inspiring Spaces</h4>
          </div>
          <div className="side-menu-gallary">
            {['project1.jpg', 'project2.jpg', 'project3.jpg', 'project4.jpg', 'project5.jpg', 'blog1.jpg'].map((img) => (
              <div className="side-menu-gallary-item" key={img}>
                <a href={`${P}/assets/newimages/${img}`} className="venobox" data-gall="gallary1">
                  <img src={`${P}/assets/newimages/${img}`} alt="" />
                </a>
              </div>
            ))}
          </div>
          <div className="side-menu-contact">
            <ul className="side-menu-list">
              <li>
                5609 E Sprague Ave, <br />
                Spokane Valley, WA 99212,
                <br /> USA
              </li>
              <li>
                <a href="tel:+0844560789">+(084) 456-0789</a>
              </li>
              <li>
                <a className="mail" href="mailto:support@example.com">
                  support@example.com
                </a>
              </li>
            </ul>
          </div>
          <ul className="side-menu-social">
            <li className="facebook">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="instagram">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="twitter">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="g-plus">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <i className="fab fa-fab fa-google-plus"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div id="sidebar-overlay"></div>
    </>
  );
}

