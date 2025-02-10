import { scrollTo } from "../utils/Navigation";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import "../styles/components/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // Window width (used for device checks)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const screenSize = 1024;

  // Sticky Navbar
  const [fixed, setScroll] = useState(true);

  //button state
  const [menuState, setMenuState] = useState("closed");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuState((prevState) => (prevState === "open" ? "closed" : "open"));
  };

  const navigateTo = (id) => {
    scrollTo(id);
    if (windowWidth < screenSize) {
      toggleMenu();
    }
  };

  return (
    <div>
      <nav
        className={`navbar${fixed ? "" : " scrolled"}${
          menuState === "open" ? " open" : ""
        }`}
      >
        <div className="logo">Asher</div>
        <div className="nav-links">
          <ul>
            <li>
              <button className="nav-link" onClick={() => navigateTo("home")}>
                Home
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={() => navigateTo("about")}>
                About
              </button>
            </li>
            <li>
              <button
                className="nav-link"
                onClick={() => navigateTo("experience")}
              >
                Experience
              </button>
            </li>
            <li>
              <button
                className="nav-link"
                onClick={() => navigateTo("projects")}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                className="nav-link"
                onClick={() => navigateTo("contact")}
              >
                Contact
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={() => navigate("/blog")}>
                Blog
              </button>
            </li>
          </ul>
        </div>
        <div className="hamburger">
          <i
            className={`fa-solid ${
              menuState === "open" ? "fa-xmark" : "fa-bars"
            } fa-lg`}
            onClick={toggleMenu}
          ></i>
        </div>
      </nav>
      <div className="nav-padder"></div>
      <div
        className={`overlay${menuState === "open" ? " open" : ""}`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
}
