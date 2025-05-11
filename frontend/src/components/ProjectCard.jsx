import { Link } from "react-router";
import defImage from "../assets/images/Working on something3.jpg";
import "../styles/components/project.css";

export default function ProjectCard({
  title = "???",
  image = defImage,
  date = "TBD",
  subcategories = "",
  url = "#",
}) {
  const isExternalLink =
    url.startsWith("http://") || url.startsWith("https://");

  const formattedDate =
    date !== "TBD"
      ? new Date(date).toLocaleDateString("en-US", {
          timeZone: "UTC",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "TBD";

  const cardContent = (
    <>
      <div className="project-img-wrapper">
        <img src={image} alt={title} loading="lazy" draggable="false" />
      </div>
      <div className="project-date">
        <small>{formattedDate}</small>
      </div>
      <div className="project-title">
        <h5>{title}</h5>
      </div>
      <div className="sub-categories">
        {subcategories && subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <small key={sub.id} className="sub-category">
              {sub.name}
            </small>
          ))
        ) : (
          <small className="sub-category">???</small>
        )}
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
        <Link to={url} className="project-link">
          {cardContent}
        </Link>
      )}
    </div>
  );
}
