import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "../styles/components/navbar.css";

export default function Navbar() {
  gsap.registerPlugin(useGSAP, ScrollToPlugin);

  // Toggle only on devices less than a desktop
  var windowWidth = window.innerWidth;
  const screenSize = 1024;

  // Sticky Navbar
  const [fixed, setScroll] = useState(true);

  //button state
  const [menuState, setState] = useState("closed");

  // gsap cleanup
  const navLinks = useRef();
  const { contextSafe } = useGSAP({ scope: navLinks });

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

  const scrollTo = contextSafe((e) => {
    const id = e.target.innerText.toLowerCase();

    gsap.to(window, {
      duration: 0.25,
      scrollTo: { y: `#${id}`, offsetY: 112 },
    });

    if (windowWidth < screenSize) {
      toggleMenu();
    }
  });

  return (
    <div>
      <nav className={fixed ? "navbar" : "navbar scrolled"}>
        <div className="logo">Asher</div>
        <div className="nav-links" ref={navLinks}>
          <ul>
            <li>
              <button className="nav-link" onClick={scrollTo}>
                Home
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={scrollTo}>
                About
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={scrollTo}>
                Experience
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={scrollTo}>
                Projects
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={scrollTo}>
                Contact
              </button>
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
