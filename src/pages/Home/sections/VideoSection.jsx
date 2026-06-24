const P = process.env.PUBLIC_URL || '';

export default function VideoSection() {
  return (
    <section className="video-section">
      <div className="bg-img" data-background={`${P}/assets/img/bg-img/video-bg-1.png`}></div>
      <div className="container container-2">
        <div className="video-content">
          <div className="play-btn">
            <a className="video-popup venobox" data-autoplay="true" data-vbtype="video" href={`${P}/assets/newimages/video.mp4`}>
              <i className="fa-solid fa-play"></i>
            </a>
          </div>
          <h2 className="video-title">
            Let’s Build Something <br /> Together
          </h2>
          <p>
            Prefer to reach out directly? Call (415) 233-9991 or email info@ae3partners.com to discuss your next project.
          </p>
        </div>
      </div>
    </section>
  );
}

