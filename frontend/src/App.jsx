import { useGSAP } from "@gsap/react";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./containers/Home.jsx";
import About from "./containers/About.jsx";
import Experience from "./containers/Experience.jsx";
import Projects from "./containers/Projects.jsx";
import Contact from "./containers/Contact.jsx";
import Footer from "./components/footer.jsx";
import PageLoader from "./components/PageLoader.jsx";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

export default function App() {
  // gsap timeline
  const [tl, setTl] = useState();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    setTl(tl);
  });

  return (
    <div className="App">
      <PageLoader gsapTimeline={tl} />
      <Navbar />
      <div className="content">
        <Home gsapTimeline={tl} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
