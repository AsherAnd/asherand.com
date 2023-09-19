import { useLoaderData, useParams } from "react-router-dom";
import PhotoshopDetail from "./PhotoshopDetail";
import WebDetail from "./WebDetail";
import Footer from "../Footer";

function ProjectDetail() {
  const { id } = useParams();
  const project = useLoaderData();

  if (project[0].type == "Photoshop") {
    return (
      <>
        <PhotoshopDetail project={project[0]} />
        <Footer />
      </>
    );
  } else if (project[0].type == "Web") {
    return (
      <>
        <WebDetail project={project[0]} />
        <Footer />
      </>
    );
  }
  return <></>;
}

const ProjectDetailLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);

  // if (!res.ok) {
  //   re;
  // }
  return res;
};

export { ProjectDetail, ProjectDetailLoader };
