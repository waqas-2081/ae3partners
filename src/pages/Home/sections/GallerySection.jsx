import { Link } from 'react-router-dom';
import './GallerySection.css';

const P = process.env.PUBLIC_URL || '';
const IMG = `${P}/assets/newimages/gallery-ribbon`;

/**
 * Bottom gallery ribbon — projects + images from AE3 Dropbox
 * "Bottom Ribbon_Home Page" folder (official project photos).
 */
const GALLERY_PROJECTS = [
  {
    img: `${IMG}/college-of-alameda-aviation.png`,
    title: 'College of Alameda Aviation Complex Replacement',
    to: '/projects',
  },
  {
    img: `${IMG}/wlac-plant-facilities.png`,
    title: 'WLAC Plant Facilities & Shops Replacement',
    to: '/projects',
  },
  {
    img: `${IMG}/lax-cta-west-corridor.png`,
    title: 'LAX CTA West Corridor Design-Build',
    to: '/projects',
  },
  {
    img: `${IMG}/liberation-park.png`,
    title: 'Liberation Park Market Hall & Communal Courtyard',
    to: '/projects',
  },
  {
    img: `${IMG}/merritt-cdc.png`,
    title: 'Merritt College Child Development Center',
    to: '/projects',
  },
  {
    img: `${IMG}/oak-arrivals-exterior.png`,
    title: 'Oakland International Airport, International Arrivals Building Improvements',
    to: '/projects',
  },
  {
    img: `${IMG}/sfo-sky-terrace.png`,
    title: 'SFO Terminal 2 Sky Terrace and Build-Back',
    to: '/projects',
  },
];

const GALLERY_ROW_1 = GALLERY_PROJECTS.slice(0, 4);
const GALLERY_ROW_2 = GALLERY_PROJECTS.slice(4);

function GalleryItem({ item }) {
  return (
    <div className="gallary-scroll-item">
      <Link to={item.to} className="gallary-scroll-link">
        <img src={item.img} alt={item.title} loading="lazy" />
        <span className="gallary-scroll-caption">{item.title}</span>
      </Link>
    </div>
  );
}

export default function GallerySection() {
  return (
    <div className="gallary-section overflow-hidden">
      <div className="gallary-text" aria-hidden="true">
        <span>Gallery</span>
      </div>

      <div className="container container-2">
        <div className="row section-heading-wrap gallary-heading-wrap">
          <div className="shape">
            <img src={`${P}/assets/img/shapes/section-heading.png`} alt="" />
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="section-heading mb-0">
              <h4 className="sub-heading">Gallery</h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="section-heading section-heading-2 mb-0">
              <h2 className="section-title title-2">
                A closer look at <span>spaces we shape</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="gallary-wrap wrap-1">
        <div className="gallery-scroll-wrap">
          {GALLERY_ROW_1.map((item) => (
            <GalleryItem key={item.title} item={item} />
          ))}
        </div>
      </div>
      <div className="gallary-wrap gallery-scroll-direction-ltr">
        <div className="gallery-scroll-wrap align-items-start">
          {GALLERY_ROW_2.map((item) => (
            <GalleryItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
