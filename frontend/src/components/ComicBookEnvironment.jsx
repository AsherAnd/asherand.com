import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ComicBook from "./ComicBook";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";

function ComicBookEnvironment() {
  const [fov, setFov] = useState(30);
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth <= 768) {
        setFov(30); // for mobile devices
      } else if (window.outerWidth <= 1024) {
        setFov(25); // for tablets
      } else if (window.outerWidth <= 1280) {
        setFov(40); // for desktops
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
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
        <ambientLight />
        <ComicBook />
      </Canvas>
    </>
  );
}

export default ComicBookEnvironment;
