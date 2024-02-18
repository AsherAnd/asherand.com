import { SecondaryButton } from "./Button";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ProjectCard(props) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="project-card"
    >
      <a className="project-image" href={props.link}>
        <div className="project-image-container">
          <LazyLoadImage src={props.img} alt={props.alt} effect="blur" />
        </div>
        <div className="project-overlay">
          <span className="magnify">
            <i className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
          </span>
        </div>
      </a>

      <div className="project-description">
        <h3>{props.title}</h3>
        <SecondaryButton
          link={props.link}
          text="Read More"
          modalId={"modal-" + props.title.replace(/ /g, "-")}
        />
      </div>
    </motion.div>
  );
}

function ExperienceCard(props) {
  return (
    <div className="experience-card">
      <div className="experience-description">
        <h1>{props.title}</h1>
        <p
          className="text"
          dangerouslySetInnerHTML={{ __html: props.desc }}
        ></p>
      </div>
      <div className="experience-background">
        <div className="experience-image">
          <LazyLoadImage src={props.img} alt={props.alt} effect="blur" />
        </div>
      </div>
    </div>
  );
}

export { ProjectCard, ExperienceCard };
