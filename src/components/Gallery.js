import { ProjectCard } from "../components/Cards";
import { ExperienceCard } from "../components/Cards";
import { motion } from "framer-motion";

function ProjectGallery(props) {
  return (
    <motion.div layout className="projects-gallery">
      {props.projects?.map((project, i) => {
        return (
          <ProjectCard
            img={project.thumbnail}
            alt="image"
            title={project.title}
            link=""
            key={i}
          />
        );
      })}
    </motion.div>
  );
}

function ExperienceGallery(props) {
  return (
    <div className="experience-gallery">
      <ExperienceCard
        title="Test"
        img="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
        alt="image"
      />
      {/* {props.experience?.map((experience, i) => {
        return (
          <ExperienceCard
            title={experience.title}
            img={experience.images[0]}
            alt="image"
            key={i}
          />
        );
      })} */}
    </div>
  );
}

export { ProjectGallery, ExperienceGallery };
