import Header from "../components/Header";
import Home from "./Home";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

function Main(props) {
  return (
    <>
      <Header
        theme={props.theme}
        changeTheme={props.changeTheme}
        toggleMenu={props.toggleMenu}
      />
      <div className="empty">
        <div className="container"></div>
      </div>
      <Home theme={props.theme} />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default Main;
