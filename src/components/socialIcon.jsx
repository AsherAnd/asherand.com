function SocialIcon(props) {
  return (
    <a href={props.link} className="social-link">
      <i className={props.icon}></i>
    </a>
  );
}
export default SocialIcon;
