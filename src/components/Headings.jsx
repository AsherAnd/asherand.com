function Heading(props) {
  return (
    <h1 className="heading">
      <span className="first-name">{props.first}</span>
      <br />
      <span className="last-name">{props.second}</span>
    </h1>
  );
}
function SubHeading(props) {
  return <h3 className="sub-heading">{props.text}</h3>;
}

export { Heading, SubHeading };
