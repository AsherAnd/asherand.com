function PrimaryButton(props) {
  return (
    <a href={props.link} className="btn">
      {props.text}
    </a>
  );
}

function SecondaryButton(props) {
  return (
    <a href={props.link} className="btn secondary-btn sm">
      {props.text}
    </a>
  );
}

export { PrimaryButton, SecondaryButton };
