import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import ComicBook from "./ComicBook";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";

function ComicBookEnvironment() {
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  return (
    <>
      <Leva collapsed hidden={true} />
      <Canvas shadows camera={{ fov: 30 }}>
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
