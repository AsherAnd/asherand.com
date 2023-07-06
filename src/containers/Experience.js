import { Heading, SubHeading } from "../components/Headings";
import { ExperienceGallery } from "../components/Gallery";

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="experience-title">
          <SubHeading text="Experience"></SubHeading>
          <Heading first="What I Learned" second="What I Gained"></Heading>
        </div>
        <ExperienceGallery />
      </div>
    </section>
  );
}

export default Experience;
