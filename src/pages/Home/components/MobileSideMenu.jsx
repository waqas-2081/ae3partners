import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileSideMenu.css';

const P = process.env.PUBLIC_URL || '';
const LOGO_SRC = `${P}/assets/newimages/ae3-logo.png`;

const NAV_ITEMS = [
  { to: '/expertise', label: 'Expertise', match: '/expertise' },
  { to: '/projects', label: 'Work', match: '/projects' },
  { to: '/studio', label: 'Studio', match: '/studio' },
  { to: '/insights', label: 'Insights', match: '/insights' },
  { to: '/contact', label: 'Contact Us', match: '/contact' },
];

export default function MobileSideMenu() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      const toggle = e.target.closest?.('.mobile-side-menu-toggle');
      if (!toggle) return;
      e.preventDefault();
      e.stopPropagation();
      setOpen((prev) => !prev);
    };

    document.addEventListener('click', onDocClick, true);
    return () => document.removeEventListener('click', onDocClick, true);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('ae3-menu-open', open);
    document.querySelectorAll('.mobile-side-menu-toggle').forEach((btn) => {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.classList.toggle('is-open', open);
    });
    return () => {
      document.body.classList.remove('ae3-menu-open');
      document.querySelectorAll('.mobile-side-menu-toggle').forEach((btn) => {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('is-open');
      });
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div
        className={`ae3-drawer mobile-side-menu${open ? ' is-open' : ''}`}
        id="ae3-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Site navigation"
      >
        <div className="ae3-drawer__inner side-menu-content">
          <div className="ae3-drawer__head side-menu-head">
            <Link to="/" className="ae3-drawer__logo" onClick={close}>
              <img src={LOGO_SRC} alt="AE3 Partners" />
            </Link>
            <button
              className="ae3-drawer__close mobile-side-menu-close"
              type="button"
              aria-label="Close menu"
              onClick={close}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <nav className="ae3-drawer__nav side-menu-wrap" aria-label="Mobile">
            <ul className="ae3-drawer__list mobile-side-menu-nav">
              {NAV_ITEMS.map((item, index) => {
                const active = pathname.startsWith(item.match);
                return (
                  <li
                    key={item.to}
                    className={active ? 'active' : undefined}
                    style={{ '--i': index }}
                  >
                    <Link to={item.to} onClick={close}>
                      <span className="ae3-drawer__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="ae3-drawer__label">{item.label}</span>
                      <span className="ae3-drawer__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <button
        type="button"
        className={`ae3-drawer__overlay mobile-side-menu-overlay${open ? ' is-open' : ''}`}
        aria-label="Close menu overlay"
        tabIndex={open ? 0 : -1}
        onClick={close}
      />
    </>
  );
}
