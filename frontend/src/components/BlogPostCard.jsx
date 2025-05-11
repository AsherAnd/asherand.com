import { Link } from "react-router";
import defImage from "../assets/images/working_on_something3.jpg";
import "../styles/components/blogcard.css";

export default function BlogPostCard({
  title = "???",
  slug = "#",
  image = defImage,
  category = "",
  subcategories = "",
  date = "TBD",
}) {
  const formattedDate =
    date !== "TBD"
      ? new Date(date).toLocaleDateString("en-US", {
          timeZone: "UTC",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "TBD";

  return (
    <div className="blog-card">
      <div className="blog-card-content">
        <Link to={slug} className="blog-link">
          <div className="blog-img-wrapper">
            <img src={image} alt={title} loading="lazy" draggable="false" />
          </div>
          <div className="blog-info">
            <span>{category?.name}</span>
            <span>{formattedDate}</span>
          </div>
          <div className="blog-text">
            <div className="blog-title">
              <h2>{title}</h2>
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
          </div>
        </Link>
      </div>
    </div>
  );
}
