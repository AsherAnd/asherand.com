import { Heading, SubHeading } from "../components/Headings";
import { PrimaryButton } from "../components/Button";
import ComicCover from "../components/ComicCover";

function Home(props) {
  return (
    <section className="showcase-area" id="home">
      <div className="container">
        <div className="showcase-info">
          <SubHeading text="Coder, Developer, Maker"></SubHeading>
          <Heading first="Asher" second="ANDARGACHEW"></Heading>
          <p className="text">
            Welcome, feel free to look around and contact me for any service
            inquiries.
          </p>
          <br />
          <p>Always looking to collaborate.</p>
          <div className="showcase-btns">
            <PrimaryButton link="#contact" text="Get in Touch" />
          </div>
        </div>
        <div className="showcase-image" id="comic-cover">
          <ComicCover theme={props.theme} />
        </div>
      </div>
    </section>
  );
}

export default Home;
