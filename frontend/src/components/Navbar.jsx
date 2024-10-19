import { useState, useEffect } from "react";
import "../styles/components/navbar.css";

export default function Navbar() {
  var windowWidth = window.innerWidth;

  // Sticky Navbar
  const [fixed, setScroll] = useState(true);

  //button state
  const [menuState, setState] = useState("closed");

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  });

  useEffect(() => {
    if (menuState === "open") {
      document.querySelector(".navbar").classList.add("open");
      document.querySelector(".overlay").classList.add("open");
    } else {
      document.querySelector(".navbar").classList.remove("open");
      document.querySelector(".overlay").classList.remove("open");
    }
  }, [menuState]);

  const toggleMenu = () => {
    if (menuState === "open") {
      setState("closed");
    } else {
      setState("open");
    }
  };

  return (
    <div>
      <nav className={fixed ? "navbar" : "navbar scrolled"}>
        <div className="logo">Asher</div>
        <div className="nav-links">
          <ul>
            <li>
              <button className="nav-link">Home</button>
            </li>
            <li>
              <button className="nav-link">About</button>
            </li>
            <li>
              <button className="nav-link">Experience</button>
            </li>
            <li>
              <button className="nav-link">Projects</button>
            </li>
            <li>
              <button className="nav-link">Contact</button>
            </li>
            <li>
              <button className="nav-link">Blog</button>
            </li>
          </ul>
        </div>
        <div className="hamburger">
          <i className={"fa-solid fa-bars fa-lg"} onClick={toggleMenu}></i>
        </div>
      </nav>
      <div className="nav-padder"></div>
      <div className="overlay" onClick={toggleMenu}></div>
    </div>
  );
}
