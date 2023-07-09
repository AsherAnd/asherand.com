import { Heading, SubHeading } from "../components/Headings";
import SocialIcon from "../components/socialIcon";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-text">
          <SubHeading text="Contact" />
          <Heading first="Interested" second="Reach Out" />
          <p className="text">
            Interested in connecting? You're welcome to reach me in any way
            you'd like and I'll be sure to respond to you in a timely manner.
          </p>
        </div>
        <div className="contact-options">
          <ul className="socials">
            <li>
              <SocialIcon
                link="mailto:ashertew@gmail.com"
                icon="fa-solid fa-envelope fa-lg"
              />
            </li>
            <li>
              <SocialIcon
                link="https://www.linkedin.com/in/asher-andargachew"
                icon="fa-brands fa-linkedin fa-lg"
              />
            </li>

            <li>
              <SocialIcon
                link="https://www.instagram.com/stark_intern/"
                icon="fa-brands fa-instagram fa-lg"
              />
            </li>

            <li>
              <SocialIcon
                link="https://github.com/asherand"
                icon="fa-brands fa-github fa-lg"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contact;
