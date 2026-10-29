import './SponsorSection.css';

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
  'partner20.png',
];

export default function SponsorSection({ data }) {
  const logos =
    Array.isArray(data?.items) && data.items.length
      ? data.items
          .map((item, index) => ({
            key: item.image || `logo-${index}`,
            src: item.image,
          }))
          .filter((item) => item.src)
      : PARTNER_FILES.map((img) => ({
          key: img,
          src: `${P}/assets/newimages/${img}`,
        }));

  const prefix = data?.prefix || 'Trusted by';
  const highlight = data?.highlight || '140';
  const suffix = data?.suffix || '+ clients across California';

  return (
    <section className="sponsor-section sponsor-1 bg-grey pt-120 pb-40 overflow-hidden">
      <div className="container">
        <div className="sponsor-text-wrap">
          <h5 className="sponsor-text">
            {prefix}&nbsp;<span>{highlight}</span>
            {suffix.startsWith('+') || suffix.startsWith(' ') ? '' : ' '}
            {suffix}
          </h5>
        </div>
        <div className="sponsor-carousel swiper">
          <div className="swiper-wrapper">
            {logos.map((logo) => (
              <div className="swiper-slide" key={logo.key}>
                <div className="sponsor-item">
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    <img src={logo.src} alt="" />
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
