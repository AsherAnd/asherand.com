import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export default function PageLoader({ gsapTimeline }) {
  const { progress } = useProgress();
  const [load, setLoad] = useState(false);
  const [textIndex, setIndex] = useState(0);
  const textRoll = ["Loading", "Coding", "Reading"];

  // hide scrollbar when loading
  if (!load) {
    document.querySelector("body").classList.add("loading");
  }

  useGSAP(() => {
    if (progress === 100) {
      setTimeout(() => {
        setLoad(true);
        document.querySelector("body").classList.remove("loading");
        gsapTimeline && gsapTimeline.play();
      }, 500);
    }

    setIndex((textIndex + 1) % textRoll.length);

    gsapTimeline &&
      gsapTimeline.to(".page-loader", {
        duration: 0.5,
        height: "0vh",
        ease: "power1.out",
      });
  }, [progress, gsapTimeline]);

  return (
    <div className="page-loader">
      <div className="loader-message">
        <span>
          #{Math.round(progress)} {textRoll[textIndex]}...
        </span>
      </div>
    </div>
  );
}
