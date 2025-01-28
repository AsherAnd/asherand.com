import defImage from "../assets/images/PageTex001.jpg";

export default function ExperienceCard({
  title = "Title",
  image = defImage,
  desc = "Lorem Ipsum",
}) {
  return (
    <div className="experience-card-container glass-container">
      <div className="experience-text-mobile">
        <div className="experience-title">
          <h1>
            <span>{title}</span> @ <span>Place</span>
          </h1>
        </div>
      </div>
      <div className="experience-img-wrapper">
        <img src={image} alt={title} loading="lazy" draggable="false" />
      </div>
      <div className="experience-text">
        <div className="experience-title">
          <h1>
            <span>{title}</span> @ <span>Place</span>
          </h1>
        </div>
        <div className="experience-desc">{desc}</div>
      </div>
    </div>
  );
}
