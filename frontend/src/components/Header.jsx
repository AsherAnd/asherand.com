import { useState } from "react";
import ThemeButton from "./ThemeButton";
import Hamburger from "./Hamburger";

function Header(props) {
  var windowWidth = window.innerWidth;
  const screenSize = 768;

  // Sticky Navbar
  const [fixed, setScroll] = useState(true);

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
  });

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  });

  const toggleMenu = () => {
    if (windowWidth <= screenSize) props.toggleMenu();
  };

  return (
    <header className={fixed ? "" : "scrolled"}>
      <nav className="container">
        <div className="name">ASHER</div>
        <ul className="pages">
          <li>
            <a href="#home" className="nav-link" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#experience" className="nav-link" onClick={toggleMenu}>
              Experience
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link" onClick={toggleMenu}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </a>
          </li>
        </ul>
        <div className="side-buttons">
          <ThemeButton theme={props.theme} changeTheme={props.changeTheme} />
          <Hamburger toggle={props.toggleMenu} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
