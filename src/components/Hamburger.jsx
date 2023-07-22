function Hamburger(props) {
  return (
    <div className="hamburger">
      <i className={"fa-solid fa-bars fa-lg"} onClick={props.toggle}></i>
    </div>
  );
}

export default Hamburger;
