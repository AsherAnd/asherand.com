import { Heading, SubHeading } from "../components/Headings";
import Image from "../assets/images/Prometheus.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PlaceholderImage = require("../assets/images/Prometheus-low.jpg");

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-image">
          <figure>
            <LazyLoadImage
              src={Image}
              placeholderSrc={PlaceholderImage}
              alt="prometheus"
              effect="blur"
            />
            <figcaption>(The Coming of Prometheus by Me)</figcaption>
          </figure>
        </div>
        <div className="about-info">
          <SubHeading text="About Me" />
          <Heading first="What I Do" second="What I Can Do for You" />
          <p className="text">
            <a
              href="https://en.wikipedia.org/wiki/Amharic"
              className="amharic"
              target="_blank"
              rel="noreferrer"
            >
              ስላም!
            </a>{" "}
            My name is Asher and I am currently a 3rd year Computer Science
            student at Toronto Metropolitan University. When I'm not forced to
            code at school, I code in my free time, experimenting with new or
            old technologies or topics that intrigue me. Besides being a
            software developer both professionally and as a hobbyist, I also
            possess other skills which include but are not limited to
            <a href="#projects" className="highlight">
              {" "}
              Photoshop
            </a>
            ,
            <a href="#projects" className="highlight">
              {" "}
              3D Printing
            </a>{" "}
            and
            <a href="#projects" className="highlight">
              {" "}
              Basic Electronics
            </a>{" "}
            to name a few. I also enjoy reading and taking inspiration from{" "}
            <a
              href="https://www.marvel.com/comics"
              className="highlight"
              target="_blank"
              rel="noreferrer"
            >
              Marvel
            </a>{" "}
            and{" "}
            <a
              href="https://www.dc.com/comics"
              className="highlight"
              target="_blank"
              rel="noreferrer"
            >
              DC
            </a>{" "}
            comic books (which you can probably tell from the look of this
            site). So look around, see some of the things I've done, and if you
            want to chat about something{" "}
            <a href="#contact" className="highlight">
              send a message!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
