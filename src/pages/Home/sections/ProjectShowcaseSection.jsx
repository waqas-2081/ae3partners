import './ProjectShowcaseSection.css';

const P = process.env.PUBLIC_URL || '';

export default function ProjectShowcaseSection() {
  return (
    <section className="ae3-project-showcase tl-bg-color fade-wrapper" aria-label="Projects showcase">
      <div className="ae3-project-showcase__visual">
        <video src={`${P}/assets/img/video.mp4`} autoPlay loop muted playsInline />
      </div>
    </section>
  );
}
