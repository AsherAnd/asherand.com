import { useRouteError, useNavigate } from "react-router";
import ComicButton from "../components/ComicButton";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <>
      <div className="error-page">
        <div className="error-message">
          <span>Oh no! Something Went Wrong :(</span>
        </div>
        <div className="error-issue">
          {" "}
          <p>{error.message || error.statusText}</p>
        </div>
        <ComicButton text="Home" onClick={() => navigate("/")} />
      </div>
    </>
  );
}
