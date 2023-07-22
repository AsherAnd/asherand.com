function ThemeButton(props) {
  return (
    <div className="toggle-btn-container">
      <i
        className={
          props.theme === "dark"
            ? "fa-solid fa-sun fa-lg toggle-btn"
            : "fa-solid fa-moon fa-lg toggle-btn"
        }
        onClick={props.changeTheme}
      ></i>
    </div>
  );
}

export default ThemeButton;
