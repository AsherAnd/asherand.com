import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import ComicBook from "./ComicBook";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";

function ComicBookEnvironment() {
  const [fov, setFov] = useState(25);
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setFov(25); // for mobile devices
      } else {
        setFov(30); // for large desktops
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Leva collapsed hidden={true} />
      <Canvas shadows camera={{ fov: fov }}>
        {perfVisible ? <Perf position="top-left" /> : null}
        <ambientLight />
        <PresentationControls
          snap={{ mass: 4, tension: 1000 }}
          polar={[-Math.PI / 2, Math.PI / 2]}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <ComicBook />
        </PresentationControls>
      </Canvas>
    </>
  );
}

export default ComicBookEnvironment;
