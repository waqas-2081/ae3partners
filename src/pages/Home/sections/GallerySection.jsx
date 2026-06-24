const P = process.env.PUBLIC_URL || '';

export default function GallerySection() {
  return (
    <div className="gallary-section overflow-hidden">
      <div className="gallary-text">
        <span>Gallery</span>
      </div>
      <div className="gallary-wrap wrap-1">
        <div className="gallery-scroll-wrap">
          {['project1.jpg', 'project2.jpg', 'project3.jpg', 'project4.jpg'].map((img) => (
            <div className="gallary-scroll-item" key={img}>
              <a href={`${P}/assets/newimages/${img}`} className="venobox img-popup" data-gall="gallary1" data-vbtype="image">
                <img src={`${P}/assets/newimages/${img}`} alt="" />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="gallary-wrap gallery-scroll-direction-ltr">
        <div className="gallery-scroll-wrap align-items-start">
          {['project5.jpg', 'blog1.jpg', 'blog2.jpg', 'blog3.jpg'].map((img) => (
            <div className="gallary-scroll-item" key={img}>
              <a href={`${P}/assets/newimages/${img}`} className="venobox img-popup" data-gall="gallary1" data-vbtype="image">
                <img src={`${P}/assets/newimages/${img}`} alt="" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

