import { Link } from 'react-router-dom';
import { DUBLIN_SHERIFF_DETAIL_PATH } from '../../Projects/ProjectDetailPage';
import './GallerySection.css';

const P = process.env.PUBLIC_URL || '';

const GALLERY_ROW_1 = [
  {
    img: 'project1.jpg',
    title: 'Liberation Park Market Hall & Communal Courtyard',
    to: '/projects',
  },
  {
    img: 'project2.jpg',
    title: 'Dublin Transit Center Parking Garage',
    to: DUBLIN_SHERIFF_DETAIL_PATH,
  },
  {
    img: 'projectt.png',
    title: 'College of Alameda Aviation Complex',
    to: '/projects',
  },
  {
    img: 'project4.jpg',
    title: 'African American Holistic Resource Center',
    to: '/projects',
  },
];

const GALLERY_ROW_2 = [
  {
    img: 'project5.jpg',
    title: 'Patelco Credit Union & Sprinkles Cupcakes - San Ramon Branch',
    to: '/projects',
  },
  {
    img: 'gallery.png',
    title: 'WLAC Plant Facilities & Shops Replacement',
    to: '/projects',
  },
  {
    img: 'blog2.jpg',
    title: 'Liberation Park Project Takes Shape in East Oakland',
    to: '/projects',
  },
  {
    img: 'blog3.jpg',
    title: 'LAWA Lot F Rehab Project',
    to: '/projects',
  },
];

function GalleryItem({ item }) {
  return (
    <div className="gallary-scroll-item">
      <Link to={item.to} className="gallary-scroll-link">
        <img src={`${P}/assets/newimages/${item.img}`} alt={item.title} loading="lazy" />
        <span className="gallary-scroll-caption">{item.title}</span>
      </Link>
    </div>
  );
}

export default function GallerySection() {
  return (
    <div className="gallary-section overflow-hidden">
      <div className="gallary-text">
        <span>Gallery</span>
      </div>
      <div className="gallary-wrap wrap-1">
        <div className="gallery-scroll-wrap">
          {GALLERY_ROW_1.map((item) => (
            <GalleryItem key={item.img} item={item} />
          ))}
        </div>
      </div>
      <div className="gallary-wrap gallery-scroll-direction-ltr">
        <div className="gallery-scroll-wrap align-items-start">
          {GALLERY_ROW_2.map((item) => (
            <GalleryItem key={item.img} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
