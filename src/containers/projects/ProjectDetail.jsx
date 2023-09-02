import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();

  return (
    <>
      <h2>{id}</h2>
    </>
  );
}

export default ProjectDetail;
