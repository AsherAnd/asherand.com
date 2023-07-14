import { Heading, SubHeading } from "../components/Headings";
import FilterButtons from "../components/Filter";
import { ProjectGallery } from "../components/Gallery";
import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await fetch(
      "https://personal-site-51a24-default-rtdb.firebaseio.com/projects.json"
    );
    const projectsJson = await data.json();
    setProjects(projectsJson);
    setFiltered(projectsJson);
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header">
          <FilterButtons
            projects={projects}
            setFiltered={setFiltered}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <div className="projects-title">
            <SubHeading text="Projects"></SubHeading>
            <Heading first="What I Did" second="What I Made"></Heading>
          </div>
        </div>
        <ProjectGallery projects={filtered} />
      </div>
    </section>
  );
}

export default Projects;
