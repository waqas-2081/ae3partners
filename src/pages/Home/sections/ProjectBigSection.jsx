import { Link } from 'react-router-dom';
import './ProjectBigSection.css';

const P = process.env.PUBLIC_URL || '';

const projects = [
  {
    n: '01',
    img: `${P}/assets/newimages/featured-projects/college-of-alameda-aviation.png`,
    title: 'College of Alameda Aviation Complex',
    location: 'Alameda, California',
    description:
      'A new gateway for aviation education, providing students with hands-on training, modern learning environments, and pathways to careers in one of the region\'s most vital industries.',
  },
  {
    n: '02',
    img: `${P}/assets/newimages/featured-projects/wlac-plant-facilities.png`,
    title: 'WLAC Plant Facilities & Shops Replacement',
    location: 'Los Angeles, California',
    description:
      'Designed to support the people who keep the campus running, this facility equips students and staff with the tools, training, and infrastructure needed to maintain and improve the college for generations to come.',
    reverse: true,
  },
  {
    n: '03',
    img: `${P}/assets/newimages/featured-projects/liberation-park.png`,
    title: 'Liberation Park Market Hall & Communal Courtyard',
    location: 'Oakland, California',
    description:
      'Created as a place to gather, celebrate, and grow, Liberation Park provides local entrepreneurs, artists, and residents with a vibrant community destination rooted in culture, connection, and opportunity.',
  },
];

export default function ProjectBigSection() {
  return (
    <section className="fp" aria-label="Featured projects">
    

      <div className="fp__list">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`fp__row${project.reverse ? ' fp__row--reverse' : ''}`}
          >
            <div className="fp__content">
              <span className="fp__num" aria-hidden="true">
                {project.n}
              </span>
              <div className="fp__location">
                <span className="fp__location-dot" />
                {project.location}
              </div>
              <h3 className="fp__project-title">{project.title}</h3>
              <p className="fp__desc">{project.description}</p>
              <Link to="/projects" className="fp__btn">
                <span>View Details</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="fp__media">
              <div className="fp__img-wrap">
                <img src={project.img} alt={project.title} loading="lazy" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
