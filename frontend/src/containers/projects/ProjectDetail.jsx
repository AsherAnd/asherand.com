import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import PhotoshopDetail from "./PhotoshopDetail";
import WebDetail from "./WebDetail";
import Footer from "../Footer";

function ProjectDetail() {
  const { id } = useParams();
  const project = useLoaderData();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  if (project[0].type === "Photoshop") {
    return (
      <>
        <PhotoshopDetail project={project[0]} back={goBack} />
        <Footer />
      </>
    );
  } else if (project[0].type === "Web") {
    return (
      <>
        <WebDetail project={project[0]} back={goBack} />
        <Footer />
      </>
    );
  }
  return <></>;
}

const ProjectDetailLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);

  if (!res.ok) {
    throw Error("No such project exists");
  }

  return res.json();
};

export { ProjectDetail, ProjectDetailLoader };
