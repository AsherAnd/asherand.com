import image from "../assets/images/PageTex001.jpg";
import "../styles/components/project.css";

export default function Project() {
  return (
    <div>
      <div className="project-image">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="project-text">
        <h3 className="project-title">Test</h3>
        <h6 className="sub-categorties">HTML, CSS, JS</h6>
      </div>
    </div>
  );
}
