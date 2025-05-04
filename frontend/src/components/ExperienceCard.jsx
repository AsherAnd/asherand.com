import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import defImage from "../assets/images/PageTex001.jpg";

export default function ExperienceCard({
  title = "Title",
  place = "Place",
  image = defImage,
  desc = "",
}) {
  return (
    <div className="experience-card-container glass-container">
      <div className="experience-text-mobile">
        <div className="experience-title">
          <h2>
            <span>{title}</span> @ <span>{place}</span>
          </h2>
        </div>
      </div>
      <div className="experience-img-wrapper">
        <img src={image} alt={title} loading="lazy" draggable="false" />
      </div>
      <div className="experience-text">
        <div className="experience-title">
          <h2>
            <span>{title}</span> @ <span>{place}</span>
          </h2>
        </div>
        <div className="experience-desc">
          <Markdown remarkPlugins={[remarkGfm]}>{desc}</Markdown>
        </div>
      </div>
    </div>
  );
}
