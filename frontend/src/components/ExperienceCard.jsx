import Markdown from "react-markdown";
import defImage from "../assets/images/PageTex001.jpg";
import { useEffect, useState } from "react";

export default function ExperienceCard({
  title = "Title",
  place = "Place",
  image = defImage,
  desc = "",
}) {
  const [markdown, setMarkdown] = useState(null);

  const APIUrl = import.meta.env.VITE_API_URL;
  const APIKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (desc) {
      fetch(desc)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch markdown content");
          return res.text();
        })
        .then(setMarkdown)
        .catch((err) => {
          console.error("Error loading markdown:", err);
          setMarkdown("# Error loading content");
        });
    }
  }, []);
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
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </div>
  );
}
