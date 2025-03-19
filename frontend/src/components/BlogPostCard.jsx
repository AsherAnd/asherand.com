import { Link } from "react-router";
import defImage from "../assets/images/Working on something3.jpg";
import "../styles/components/blogcard.css";

export default function BlogPostCard({
  title = "???",
  image = defImage,
  category = "Code",
  date = "Mar 5th, 2024",
}) {
  return (
    <div className="blog-card">
      <Link to={title} className="blog-link">
        <div className="blog-img-wrapper">
          <img src={image} alt={title} loading="lazy" draggable="false" />
        </div>
        <div className="blog-info">
          <span>{category}</span>
          <span>{date}</span>
        </div>
        <div className="blog-text">
          <div className="blog-title">
            <h2>{title}</h2>
          </div>
          <div className="sub-categories">
            <small className="sub-category">html</small>
            <small className="sub-category">css</small>
            <small className="sub-category">js</small>
          </div>
        </div>
      </Link>
    </div>
  );
}
