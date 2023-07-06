import { ProjectCard } from "../components/Cards";
import { ExperienceCard } from "../components/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const testImage = require("../assets/images/Coming Soon.png");

function ProjectGallery() {
  return (
    <div className="projects-gallery">
      <ProjectCard img={testImage} alt="" title="Test Title" link="" />
      <ProjectCard img={testImage} alt="" title="Test Title" link="" />
      <ProjectCard img={testImage} alt="" title="Test Title" link="" />
      <ProjectCard img={testImage} alt="" title="Test Title" link="" />
    </div>
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
