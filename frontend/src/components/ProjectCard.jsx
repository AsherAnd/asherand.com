import { Link } from "react-router";
import defImage from "../assets/images/Working on something3.jpg";
import "../styles/components/project.css";

export default function ProjectCard({
  title = "???",
  image = defImage,
  date = "TBD",
  url = "#",
}) {
  const isExternalLink =
    url.startsWith("http://") || url.startsWith("https://");

  const cardContent = (
    <>
      <div className="project-img-wrapper">
        <img src={image} alt={title} loading="lazy" draggable="false" />
      </div>
      <div className="project-date">
        <small>{date}</small>
      </div>
      <div className="project-text">
        <div className="project-title">
          <h5>{title}</h5>
        </div>
        <div className="sub-categories">
          <small className="sub-category">html</small>
          <small className="sub-category">css</small>
          <small className="sub-category">js</small>
        </div>
      </div>
    </>
  );

  return (
    <div className="project-card">
      {isExternalLink ? (
        <a
          href={url}
          className="project-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      ) : (
        <Link to={`/blog/${url}`} className="project-link">
          {cardContent}
        </Link>
      )}
    </div>
  );
}
