const P = process.env.PUBLIC_URL || '';

const PARTNER_FILES = [
  'partner1.png',
  'partner2.png',
  'partner3.png',
  'partner4.png',
  'partner5.png',
  'partner6.png',
  'partner7.png',
  'partner8.png',
  'partner9.png',
  'partner10.png',
  'partner11.png',
  'partner12.png',
  'partner13.png',
  'partner14.png',
  'partner15.png',
  'partner16.png',
  'partner17.png',
  'partner18.jpg',
  'partner19.png',
  'partner20.png'
];

export default function SponsorSection() {
  return (
    <section className="sponsor-section sponsor-1 bg-grey pt-120 pb-40 overflow-hidden">
      <div className="container">
        <div className="sponsor-text-wrap">
          <h5 className="sponsor-text">
            Trusted by&nbsp;<span>140</span>+&nbsp;clients across California
          </h5>
        </div>
        <div className="sponsor-carousel swiper">
          <div className="swiper-wrapper">
            {PARTNER_FILES.map((img) => (
              <div className="swiper-slide" key={img}>
                <div className="sponsor-item">
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    <img src={`${P}/assets/newimages/${img}`} alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

