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
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setFiltered(data);
      });
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
        {filtered && <ProjectGallery projects={filtered} />}
      </div>
    </section>
  );
}

export default Projects;
