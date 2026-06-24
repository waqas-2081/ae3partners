import { Link } from 'react-router-dom';
import { DUBLIN_SHERIFF_DETAIL_PATH } from '../../Projects/ProjectDetailPage';
import './ProjectBigSection.css';

const P = process.env.PUBLIC_URL || '';

export default function ProjectBigSection() {
  const projects = [
    {
      n: '01',
      img: `${P}/assets/newimages/project2.jpg`,
      title: 'Dublin Transit Center Parking Garage',
      detailPath: DUBLIN_SHERIFF_DETAIL_PATH,
    },
    { n: '02', img: `${P}/assets/newimages/credit.jpg`, title: 'Patelco Credit Union and Sprinkles' },
    { n: '03', img: `${P}/assets/newimages/okland.jpg`, title: 'Oakland International Airport' },
  ];

  return (
    <section className="ae3-project-big project-section-4 pt-0 pb-0 overflow-hidden">
      <div className="project-item-wrap-2">
        {projects.map((p) => (
          <div className="project-item-2 project-item-4" key={p.title}>
            <div className="project-thumb">
              <img src={p.img} alt="project" />
              {/* <ul>
                <li>Featured Project</li>
                <li>California</li>
              </ul> */}
              <span className="number">{p.n}</span>
            </div>
            <div className="project-content">
              <h3 className="title">
                {p.detailPath ? (
                  <Link className="project-title-link" to={p.detailPath}>
                    {p.title}
                  </Link>
                ) : (
                  p.title
                )}
              </h3>
              <p>
                AE3 Partners <br /> Architecture + CM
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

