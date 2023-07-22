import { Heading, SubHeading } from "../components/Headings";
import Image from "../assets/images/Prometheus.png";

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-image">
          <figure>
            <img src={Image} alt="prometheus" />
            <figcaption>(The Coming of Prometheus by Me)</figcaption>
          </figure>
        </div>
        <div className="about-info">
          <SubHeading text="About Me" />
          <Heading first="What I Do" second="What I Can Do for You" />
          <p className="text">
            <a href="https://en.wikipedia.org/wiki/Amharic" className="amharic">
              ስላም!
            </a>
            My name is Asher and I am currently a 3rd year Computer Science
            student at Toronto Metropolitan University. When I'm not forced to
            code at school, I code in my free time, experimenting with new or
            old topics that intrigue me. Besides being a software developer both
            professionally and as a hobbiest, I also possess other skills which
            include but are not limited to
            <span className="highlight"> Photoshop</span>,
            <span className="highlight"> 3D Printing</span> and
            <span className="highlight"> Basic Electronics</span> to name a few.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
