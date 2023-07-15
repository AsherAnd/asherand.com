import { SecondaryButton } from "./Button";
import { motion } from "framer-motion";

function ProjectCard(props) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="project-card"
    >
      <div className="project-image">
        <img src={props.img} alt={props.alt} />
        <div className="project-overlay">
          <span className="magnify">
            <i className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
          </span>
        </div>
      </div>
      <div className="project-description">
        <h3>{props.title}</h3>
        <SecondaryButton link={props.link} text="Read More" />
      </div>
    </motion.div>
  );
}

function ExperienceCard(props) {
  return (
    <div className="experience-card">
      <div className="experience-description">
        <h1>{props.title}</h1>
        <p className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
          rhoncus nunc. Aenean porttitor nulla eget risus molestie semper.
          Phasellus vitae quam imperdiet, vehicula augue et, tempus ipsum.
          Praesent egestas varius lorem a semper. Quisque suscipit, dolor eu
          hendrerit faucibus, dolor enim convallis ante, in accumsan felis leo
          non tortor. Etiam ex eros, lobortis at efficitur eu, viverra at nibh.
          Pellentesque quis urna vulputate, efficitur nisl id, semper ante.
          Morbi non augue lacinia, ultricies dui auctor, consectetur orci. Donec
          faucibus metus et dolor consequat commodo. Aenean eu enim in ligula
          suscipit venenatis. Maecenas sit amet ex ligula. Donec finibus
          bibendum laoreet. Integer lobortis orci in nisl molestie, vel rhoncus
          felis porta. Nulla in velit tempor odio volutpat ultricies. Aliquam
          fringilla porta hendrerit. Duis vestibulum velit nulla. Suspendisse
          posuere hendrerit eros quis rhoncus. Vivamus eu vulputate dui, id
          ullamcorper quam. Curabitur convallis, lectus ac varius blandit, nisl
          tellus facilisis mauris, et imperdiet justo nisl id lorem. Phasellus
          eget nisl sit amet tortor congue pellentesque nec at nisi. Fusce
          dapibus interdum purus, at fermentum elit tempus laoreet. Sed ac
          luctus odio. Vivamus ac quam vitae magna aliquet rutrum vitae vitae
          nisl. Sed consequat odio non dapibus malesuada. Cras elit mauris,
          tempor vel aliquet quis, aliquam at eros. Vivamus id dui vel felis
          ullamcorper venenatis at eu dolor. Phasellus a neque eget ipsum
          maximus aliquet. Nullam sed dui arcu. Nam semper vitae leo ut finibus.
          Integer eu interdum nisl. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Mauris non rhoncus nunc. Aenean porttitor nulla eget
          risus molestie semper. Phasellus vitae quam imperdiet, vehicula augue
          et, tempus ipsum. Praesent egestas varius lorem a semper. Quisque
          suscipit, dolor eu hendrerit faucibus, dolor enim convallis ante, in
          accumsan felis leo non tortor. Etiam ex eros, lobortis at efficitur
          eu, viverra at nibh. Pellentesque quis urna vulputate, efficitur nisl
          id, semper ante. Morbi non augue lacinia, ultricies dui auctor,
          consectetur orci. Donec faucibus metus et dolor consequat commodo.
          Aenean eu enim in ligula suscipit venenatis. Maecenas sit amet ex
          ligula. Donec finibus bibendum laoreet. Integer lobortis orci in nisl
          molestie, vel rhoncus felis porta. Nulla in velit tempor odio volutpat
          ultricies. Aliquam fringilla porta hendrerit. Duis vestibulum velit
          nulla. Suspendisse posuere hendrerit eros quis rhoncus. Vivamus eu
          vulputate dui, id ullamcorper quam. Curabitur convallis, lectus ac
          varius blandit, nisl tellus facilisis mauris, et imperdiet justo nisl
          id lorem. Phasellus eget nisl sit amet tortor congue pellentesque nec
          at nisi. Fusce dapibus interdum purus, at fermentum elit tempus
          laoreet. Sed ac luctus odio. Vivamus ac quam vitae magna aliquet
          rutrum vitae vitae nisl. Sed consequat odio non dapibus malesuada.
          Cras elit mauris, tempor vel aliquet quis, aliquam at eros. Vivamus id
          dui vel felis ullamcorper venenatis at eu dolor. Phasellus a neque
          eget ipsum maximus aliquet. Nullam sed dui arcu. Nam semper vitae leo
          ut finibus. Integer eu interdum nisl. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Mauris non rhoncus nunc. Aenean porttitor
          nulla eget risus molestie semper. Phasellus vitae quam imperdiet,
          vehicula augue et, tempus ipsum. Praesent egestas varius lorem a
          semper. Quisque suscipit, dolor eu hendrerit faucibus, dolor enim
          convallis ante, in accumsan felis leo non tortor. Etiam ex eros,
          lobortis at efficitur eu, viverra at nibh. Pellentesque quis urna
          vulputate, efficitur nisl id, semper ante. Morbi non augue lacinia,
          ultricies dui auctor, consectetur orci. Donec faucibus metus et dolor
          consequat commodo. Aenean eu enim in ligula suscipit venenatis.
          Maecenas sit amet ex ligula. Donec finibus bibendum laoreet. Integer
          lobortis orci in nisl molestie, vel rhoncus felis porta. Nulla in
          velit tempor odio volutpat ultricies. Aliquam fringilla porta
          hendrerit. Duis vestibulum velit nulla. Suspendisse posuere hendrerit
          eros quis rhoncus. Vivamus eu vulputate dui, id ullamcorper quam.
          Curabitur convallis, lectus ac varius blandit, nisl tellus facilisis
          mauris, et imperdiet justo nisl id lorem. Phasellus eget nisl sit amet
          tortor congue pellentesque nec at nisi. Fusce dapibus interdum purus,
          at fermentum elit tempus laoreet. Sed ac luctus odio. Vivamus ac quam
          vitae magna aliquet rutrum vitae vitae nisl. Sed consequat odio non
          dapibus malesuada. Cras elit mauris, tempor vel aliquet quis, aliquam
          at eros. Vivamus id dui vel felis ullamcorper venenatis at eu dolor.
          Phasellus a neque eget ipsum maximus aliquet. Nullam sed dui arcu. Nam
          semper vitae leo ut finibus. Integer eu interdum nisl.
        </p>
      </div>
      <div className="experience-background">
        <div className="experience-image">
          <img src={props.img} alt={props.alt} />
        </div>
      </div>
    </div>
  );
}

export { ProjectCard, ExperienceCard };
