function SocialIcon(props) {
  return (
    <a href={props.link} className="social-link" target="_blank">
      <i className={props.icon}></i>
    </a>
  );
}
export default SocialIcon;
