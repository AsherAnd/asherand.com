import { useNavigate } from "react-router";
import ComicButton from "../components/ComicButton";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="error-page">
        <div className="error-message">
          <span>#404</span> <span>Not Found</span>
        </div>
        <ComicButton text="Back" onClick={() => navigate(-1)} />
      </div>
    </>
  );
}
