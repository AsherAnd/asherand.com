import { useRouteError } from "react-router-dom";
import NotFound from "../../components/NotFound";

function ProjectNotFound() {
  const error = useRouteError();
  return (
    <>
      <NotFound />
      <p>{error.message}</p>
    </>
  );
}

export default ProjectNotFound;
