import { ProjectCard } from "./Cards";
import { ExperienceCard } from "./Cards";
import { motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../styles/swiper.css";

function ProjectGallery(props) {
  return (
    <>
      <motion.div layout className="projects-gallery">
        {props.projects?.map((project, i) => {
          return (
            <ProjectCard
              img={project.thumbnail}
              alt="image"
              title={project.title}
              largeImg={project.images[0]}
              link=""
              key={i}
            />
          );
        })}
      </motion.div>
    </>
  );
}

function ExperienceGallery(props) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "" + "</span>";
    },
  };

  return (
    <div className="experience-gallery">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: true,
        }}
        pagination={pagination}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ExperienceCard
            title="Test"
            img="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            alt="image"
          />
        </SwiperSlide>

        {props.experience?.map((experience, i) => {
          return (
            <SwiperSlide>
              <ExperienceCard
                title={experience.title}
                img={experience.images[0]}
                alt={experience.title}
                key={i}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export { ProjectGallery, ExperienceGallery };
