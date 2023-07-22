import Home from "./Home";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";

function Main(props) {
  return (
    <>
      <div className="empty">
        <div className="container"></div>
      </div>
      <Home theme={props.theme} />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}

export default Main;
