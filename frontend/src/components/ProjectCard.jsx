import { Link } from "react-router";
import defImage from "../assets/images/Working on something3.jpg";
import "../styles/components/project.css";

export default function ProjectCard({
  title = "???",
  image = defImage,
  date = "TBD",
}) {
  return (
    <div className="project-card">
      <Link to="/" className="project-link">
        <div className="project-img-wrapper">
          <img src={image} alt={title} loading="lazy" draggable="false" />
        </div>
        <div className="project-date">
          <span>{date}</span>
        </div>
        <div className="project-text">
          <div className="project-title">
            <h4>{title}</h4>
          </div>
          <div className="sub-categories">
            <h6 className="sub-category">html</h6>
            <h6 className="sub-category">css</h6>
            <h6 className="sub-category">js</h6>
          </div>
        </div>
      </Link>
    </div>
  );
}
