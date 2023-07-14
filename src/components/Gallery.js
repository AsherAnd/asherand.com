import { ProjectCard } from "../components/Cards";
import { ExperienceCard } from "../components/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const testImage = require("../assets/images/Coming Soon.png");

function ProjectGallery(props) {
  return (
    <motion.div layout className="projects-gallery">
      {props.projects?.map((project) => {
        return (
          <ProjectCard
            img={project.thumbnail}
            alt="image"
            title={project.title}
            link=""
            key={project.title}
          />
        );
      })}
    </motion.div>
  );
}

function ExperienceGallery() {
  return (
    <div className="experience-gallery">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ExperienceCard title="Test Title" img={testImage} alt="test image" />
        </SwiperSlide>
        <SwiperSlide>
          <ExperienceCard title="Test Title" img={testImage} alt="test image" />
        </SwiperSlide>
        <SwiperSlide>
          <ExperienceCard title="Test Title" img={testImage} alt="test image" />
        </SwiperSlide>
        <SwiperSlide>
          <ExperienceCard title="Test Title" img={testImage} alt="test image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export { ProjectGallery, ExperienceGallery };
