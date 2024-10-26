import { useGSAP } from "@gsap/react";
import ComicButton from "../components/ComicButton";
import "../styles/home.css";

export default function Home() {
  gsap.registerPlugin(useGSAP, ScrollToPlugin);

  // gsap cleanup
  const { contextSafe } = useGSAP();

  const scrollTo = contextSafe(() => {
    gsap.to(window, {
      duration: 0.25,
      scrollTo: { y: "#contact", offsetY: 112 },
    });
  });

  return (
    <div id="home" className="container">
      <div className="intro">
        <div>
          <header>
            <div className="intro-title">Coder</div>
            <div className="intro-title">Developer</div>
            <div className="intro-title">Maker</div>
          </header>
          <div className="intro-name">Asher ANDARGACHEW</div>
        </div>
        <div className="intro-welcome">
          <p>All right. Let’s do this one last time again.</p>
          <p>
            Welcome to my personal website. Feel free to look around and contact
            me for any service inquiries.
          </p>
          <p>Always looking to collaborate.</p>
        </div>
        <ComicButton onClick={scrollTo} />
      </div>
      <div className="comic-book"></div>
    </div>
  );
}
