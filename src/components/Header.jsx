import { useEffect, useState } from "react";
import ThemeButton from "./ThemeButton";
import Hamburger from "./Hamburger";
import { HashLink } from "react-router-hash-link";

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
            <HashLink to="/#home" className="nav-link" onClick={toggleMenu}>
              Home
            </HashLink>
          </li>
          <li>
            <HashLink to="/#about" className="nav-link" onClick={toggleMenu}>
              About
            </HashLink>
          </li>
          <li>
            <HashLink
              to="/#experience"
              className="nav-link"
              onClick={toggleMenu}
            >
              Experience
            </HashLink>
          </li>
          <li>
            <HashLink to="/#projects" className="nav-link" onClick={toggleMenu}>
              Projects
            </HashLink>
          </li>
          <li>
            <HashLink to="/#contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </HashLink>
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
