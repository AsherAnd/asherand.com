import { useState } from "react";
import ThemeButton from "./ThemeButton";
import Hamburger from "./Hamburger";
import MenuToggle from "../actions/MenuToggle";

function Header(props) {
  // Sticky Navbar
  const [fixed, setScroll] = useState(true);

  // hamburger menu
  const { _, toggleMenu } = MenuToggle();

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  });

  return (
    <header className={fixed ? "" : "scrolled"}>
      <nav className="container">
        <div className="name">ASHER</div>
        <ul className="pages">
          <li>
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#experience" className="nav-link">
              Experience
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        <div className="side-buttons">
          <ThemeButton theme={props.theme} changeTheme={props.changeTheme} />
          <Hamburger toggle={toggleMenu} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
