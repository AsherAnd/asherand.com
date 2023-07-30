import { PrimaryButton } from "../components/Button";

function NotFound() {
  return (
    <>
      <div className="error-page">
        <div className="error-message">404 Not Found</div>
        <PrimaryButton link="/#projects" text="Home" />
      </div>
    </>
  );
}

export default NotFound;
