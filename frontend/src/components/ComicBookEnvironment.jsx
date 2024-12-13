import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ComicBook from "./ComicBook";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";

function ComicBookEnvironment() {
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  const [fov, setFov] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setFov(25); // Set fov to 20 for mobile devices
      } else {
        setFov(30); // Set fov to 30 for desktops
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Leva collapsed />
      <Canvas shadows camera={{ fov: fov }}>
        {perfVisible ? <Perf position="top-left" /> : null}
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight />
        <Suspense fallback={null}>
          <ComicBook />
        </Suspense>
      </Canvas>
    </>
  );
}

export default ComicBookEnvironment;
