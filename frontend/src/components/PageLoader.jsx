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
    gsapTimeline &&
      gsapTimeline.to(".page-loader", {
        duration: 0.5,
        height: "0vh",
        ease: "power1.out",
      });

    if (progress === 100) {
      setTimeout(() => {
        setLoad(true);
        document.querySelector("body").classList.remove("loading");
        gsapTimeline && gsapTimeline.play();
      }, 500);
    }

    setIndex(textIndex + 1);
  }, [progress, gsapTimeline]);

  return (
    <div className="page-loader">
      <div className="loader-message">
        <span>
          {textRoll[textIndex % textRoll.length]} #{Math.round(progress)}
        </span>
      </div>
    </div>
  );
}
