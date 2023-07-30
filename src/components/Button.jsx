import { HashLink } from "react-router-hash-link";

function PrimaryButton(props) {
  return (
    <HashLink to={props.link} className="btn">
      {props.text}
    </HashLink>
  );
}

function SecondaryButton(props) {
  return (
    <HashLink to={props.link} className="btn secondary-btn sm">
      {props.text}
    </HashLink>
  );
}

export { PrimaryButton, SecondaryButton };
