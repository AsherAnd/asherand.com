import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export default function PageLoader({ gsapTimeline }) {
  const { progress } = useProgress();
  const [load, setLoad] = useState(false);
  const textRoll = ["Loading", "Coding", "Reading"];

  // hide scrollbar when loading
  if (!load) {
    document.querySelector("body").classList.add("loading");
  }

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setLoad(true);
        document.querySelector("body").classList.remove("loading");
        gsapTimeline && gsapTimeline.play();
      }, 500);
    }
  }, [progress]);

  useGSAP(() => {
    gsapTimeline &&
      gsapTimeline.to(".page-loader", {
        duration: 0.5,
        height: "0vh",
        ease: "power1.out",
      });
  }, [gsapTimeline]);

  return (
    <div className="page-loader">
      <p>#{Math.round(progress)}</p>
      <p>{textRoll[0]}...</p>
    </div>
  );
}
