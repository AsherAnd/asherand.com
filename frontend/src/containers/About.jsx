import "../styles/about.css";
import SectionTitle from "../components/SectionTitle";
import image from "../assets/images/All I know.png";

export default function About() {
  gsap.registerPlugin(useGSAP, ScrollToPlugin);

  // gsap cleanup
  const { contextSafe } = useGSAP();

  // scroll to animation
  const scrollTo = contextSafe(() => {
    gsap.to(window, {
      duration: 0.25,
      scrollTo: { y: "#projects", offsetY: 112 },
    });
  });
  return (
    <div id="about" className="container">
      <img
        className="about-image"
        src={image}
        alt="Blue hand in red pool"
        loading="lazy"
      />
      <div className="about-text">
        <SectionTitle title="About" />
        <p>
          <a
            href="https://www.google.com/search?q=amharic&rlz=1C1GCEA_enCA1104CA1104&oq=amharic&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiPAjIHCAIQABiPAtIBCDE1MTlqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            ስላም!
          </a>{" "}
          My name is Asher Andargachew, Computer Science major and soon to be
          graduate from Toronto Metropolitan University. When I'm not coding for
          grades, I spend my free time exploring technologies that interest me,
          constantly expanding and updating my skills and knowledge. Besides
          being a professional and hobbyist Software Developer, I also dable in
          other areas including but not limited to{" "}
          <a target="_blank" rel="noopener noreferrer" onClick={scrollTo}>
            Photoshop
          </a>
          ,{" "}
          <a target="_blank" rel="noopener noreferrer" onClick={scrollTo}>
            3D Printing
          </a>{" "}
          and{" "}
          <a target="_blank" rel="noopener noreferrer" onClick={scrollTo}>
            Basic Electronics
          </a>{" "}
          to name a few.
        </p>
        <br />
        <br />
        <p>
          Another area of interest and big inspiration to me are comic books.
          Specifically{" "}
          <a
            href="https://www.marvel.com/comics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marvel
          </a>{" "}
          and{" "}
          <a
            href="https://www.dc.com/comics"
            target="_blank"
            rel="noopener noreferrer"
          >
            DC
          </a>{" "}
          comic books (if you haven't already noticed from the look of this
          site). So look around, see some things I've done, and if you want to
          chat about something <a href=""> send a message!</a>
        </p>
      </div>
    </div>
  );
}
