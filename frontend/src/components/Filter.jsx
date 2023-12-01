import { useEffect } from "react";

function FilterButtons(props) {
  useEffect(() => {
    if (props.activeFilter === "All") {
      props.setFiltered(props.projects);
      return;
    }
    const filtered = props.projects.filter(
      (project) => project.type === props.activeFilter
    );
    props.setFiltered(filtered);
  }, [props.activeFilter]);

  return (
    <div className="filter-btns">
      <button
        className="filter-btn"
        onClick={() => props.setActiveFilter("All")}
      >
        All
      </button>
      <button
        className="filter-btn"
        onClick={() => props.setActiveFilter("Code")}
      >
        Code
      </button>
      <button
        className="filter-btn"
        onClick={() => props.setActiveFilter("Photoshop")}
      >
        Photoshop
      </button>
      <button
        className="filter-btn"
        onClick={() => props.setActiveFilter("Misc")}
      >
        Misc.
      </button>
    </div>
  );
}

export default FilterButtons;
