import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import "../styles/components/Sectiontitle.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SectionTitle(props) {
  const titleRef = useRef(null);

  useGSAP(() => {
    gsap.set(titleRef.current, {
      clipPath: "polygon(0 0, 5% 0, 5% 100%, 0 100%)",
    });

    // swipe reveal animation
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 70%",
        end: "bottom 15%",
        toggleActions: "restart reverse restart reverse",
      },
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    });
  });

  return (
    <div ref={titleRef} className="section-title">
      {props.title}
    </div>
  );
}
