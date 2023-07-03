import { SecondaryButton } from "./Button";

function ProjectCards(props) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={props.img} alt={props.alt} />
        <div className="project-overlay">
          <span className="magnify">
            <i className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
          </span>
        </div>
      </div>
      <div className="project-description">
        <h3>{props.title}</h3>
        <SecondaryButton link={props.link} text="Read More" />
      </div>
    </div>
  );
}

export default ProjectCards;
