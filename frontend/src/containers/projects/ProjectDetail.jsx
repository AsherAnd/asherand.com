import { useParams } from "react-router-dom";
import Footer from "../Footer";

function ProjectDetail() {
  const { id } = useParams();

  return (
    <>
      <h2>{id}</h2>
      <Footer />
    </>
  );
}

export default ProjectDetail;
