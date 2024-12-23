import { useGSAP } from "@gsap/react";
import ComicButton from "../components/ComicButton";
import ComicBookEnvironment from "../components/ComicBookEnvironment";
import SvgName from "../components/SvgName";
import "../styles/home.css";

gsap.registerPlugin(useGSAP, ScrollToPlugin, DrawSVGPlugin);

export default function Home() {
  // gsap cleanup
  const { contextSafe } = useGSAP();

  useGSAP(() => {
    gsap.set(".intro-title", { y: "50px" });
    gsap.set(".strokeMask", { drawSVG: 0 });

    // gsap timeline
    const tl = gsap.timeline({});

    // svg name animation
    tl.to("#masks", { autoAlpha: 1 });
    tl.fromTo(
      "#first-name .strokeMask",
      { drawSVG: "0% 0%" },
      { drawSVG: true, duration: 0.2, stagger: 0.1 }
    );

    tl.fromTo(
      "#last-name .strokeMask",
      { drawSVG: "0% 0%" },
      { drawSVG: true, duration: 0.2, stagger: 0.05 },
      "<"
    );

    // top title animation
    tl.to(".intro-title", {
      duration: 0.5,
      stagger: 0.25,
      y: "0",
    });
  });

  // scroll to animation
  const scrollTo = contextSafe(() => {
    gsap.to(window, {
      duration: 0.25,
      scrollTo: { y: "#contact", offsetY: 112 },
    });
  });

  return (
    <>
      <div id="home">
        <div className="comic-book">
          <ComicBookEnvironment />
        </div>
        <div className="container">
          <div className="intro">
            <header>
              <div className="intro-title">Coder</div>
              <div className="intro-title">Developer</div>
              <div className="intro-title">Maker</div>
            </header>
            <div className="intro-name">
              <SvgName />
            </div>
            <div className="intro-welcome">
              <p>All right. Let’s do this again.</p>
              <p>
                Welcome to my personal website. Feel free to look around and
                contact me for any service inquiries.
              </p>
              <p>Always looking to collaborate.</p>
            </div>
            <ComicButton text="Get in touch" onClick={scrollTo} />
          </div>
        </div>
      </div>
    </>
  );
}
