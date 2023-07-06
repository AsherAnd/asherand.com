import { Heading, SubHeading } from "../components/Headings";
import { ProjectGallery } from "../components/Gallery";

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header">
          <div className="filter-btns">
            <button className="filter-btn" data-filter="all">
              All
            </button>
            <button className="filter-btn" data-filter=".web">
              Web
            </button>
            <button className="filter-btn" data-filter=".tool">
              Tools
            </button>
            <button className="filter-btn" data-filter=".photo">
              Photoshop
            </button>
          </div>
          <div className="projects-title">
            <SubHeading text="Projects"></SubHeading>
            <Heading first="What I Did" second="What I Made"></Heading>
          </div>
        </div>
        <ProjectGallery />
      </div>
    </section>
  );
}

export default Projects;
