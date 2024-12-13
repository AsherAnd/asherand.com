import { useMemo, useRef, useState, useEffect } from "react";
import { useTexture, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { images } from "./Images";
import { easing } from "maath";
import {
  BoxGeometry,
  Vector3,
  Bone,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Float32BufferAttribute,
  MeshBasicMaterial,
  SkeletonHelper,
  SRGBColorSpace,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";

// Constants for page geometry and skinning
const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71; // 4:3 aspect ratio
const PAGE_DEPTH = 0.0005;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

// Materials for the page faces
const pageMaterials = [
  new MeshBasicMaterial({ color: "white" }),
  new MeshBasicMaterial({ color: "#111" }),
  new MeshBasicMaterial({ color: "white" }),
  new MeshBasicMaterial({ color: "white" }),
];

// Helper function to create bones for the page
function createBones() {
  const bones = [];
  for (let i = 0; i <= PAGE_SEGMENTS; i++) {
    const bone = new Bone();
    bones.push(bone);
    bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;

    if (i > 0) {
      bones[i - 1].add(bone);
    }
  }

  return bones;
}

function createPageGeometry() {
  // Geometry for the page
  const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2
  );

  // Move the page center to the left edge
  pageGeometry.translate(PAGE_WIDTH / 2, 0, 0); // causes matrixworld error, fix

  // Extract position attributes for skinning
  const position = pageGeometry.attributes.position;
  const vertex = new Vector3();
  const skinIndices = [];
  const skinWeights = [];

  // Calculate skin indices and weights
  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  // Set skinning attributes on the geometry
  pageGeometry.setAttribute(
    "skinIndex",
    new Uint16BufferAttribute(skinIndices, 4)
  );
  pageGeometry.setAttribute(
    "skinWeight",
    new Float32BufferAttribute(skinWeights, 4)
  );

  return pageGeometry;
}

// Helper function to create materials with textures for front and back
function createMaterials(frontTexture, backTexture) {
  return [
    ...pageMaterials,
    new MeshBasicMaterial({
      color: "white",
      map: frontTexture,
      toneMapped: false,
    }),
    new MeshBasicMaterial({
      color: "white",
      map: backTexture,
      toneMapped: false,
    }),
  ];
}

// Page component rendering a single page with textures and animations
const Page = ({ front, back, onPage, pageNumber, setPage }) => {
  const [frontTexture, backTexture] = useTexture([front, back]);
  const groupRef = useRef();
  const skinnedMeshRef = useRef();
  const controls = useControls({
    page: {
      value: onPage,
      step: 1,
      min: 0,
      max: images.length / 2,
      onChange: (value) => {
        setPage(value);
      },
    },
    insideCurveEnd: {
      value: 0.36,
      step: 0.01,
      min: 0,
      max: 1,
    },
    outsideCurveStart: {
      value: 0.3,
      step: 0.01,
      min: 0,
      max: 1,
    },
  });
  const comicLength = 13; // Replace hard coded value
  let bookClosed = onPage === 0 || onPage === comicLength;

  // Set the color space for textures
  frontTexture.colorSpace = SRGBColorSpace;
  backTexture.colorSpace = SRGBColorSpace;

  // Generate the skinned mesh with bones and textures
  const manualSkinMesh = useMemo(() => {
    const bones = createBones();
    const skeleton = new Skeleton(bones);
    const pageGeometry = createPageGeometry();
    const materials = createMaterials(frontTexture, backTexture);

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);

    return mesh;
  }, []);

  // Skeleton helper for visualization (commented out for now)
  //   useHelper(skinnedMeshRef, SkeletonHelper, "red");

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current || !skinnedMeshRef.current.skeleton) return;

    // Calculate the page rotation based on the current page and its position
    let pageRotation = onPage > pageNumber ? -Math.PI / 2 : Math.PI / 2;
    const easingFactor = 0.5;
    const insideCurveStrength = 0.18;
    const outsideCurveStrength = 0.05;

    if (!bookClosed) {
      pageRotation += degToRad(pageNumber * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;

    // Animate bones (e.g., simulate page flipping or bending)
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? groupRef.current : bones[i];
      const insideCurveIntensity =
        i < 8 ? Math.sin(i * controls.insideCurveEnd + 0.45) : 0;
      const outsideCurveIntensity =
        i >= 8 ? Math.cos(i * controls.outsideCurveStart + 0.09) : 0;
      const foldAngleIntensity =
        i > 8 ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * delta : 0;
      let rotationAngle = 0;
      let foldAngle = 0;

      // Adjust rotation angle for page flipping
      if (bookClosed && i === 0) {
        rotationAngle = pageRotation;
      }

      if (!bookClosed) {
        rotationAngle =
          insideCurveStrength * insideCurveIntensity * pageRotation -
          outsideCurveStrength * outsideCurveIntensity * pageRotation;

        foldAngle = degToRad(Math.sign(pageRotation) * 2);
      }

      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta
      );

      //   easing.dampAngle(
      //     target.rotation,
      //     "x",
      //     foldAngle * foldAngleIntensity,
      //     easingFactor,
      //     delta
      //   );
    }
  });

  const pageClicked = (event) => {
    event.stopPropagation();
    setPage(onPage != pageNumber ? pageNumber : pageNumber + 1);
    console.log("Clicked:", onPage);
  };

  return (
    <group ref={groupRef}>
      <primitive
        object={manualSkinMesh}
        ref={skinnedMeshRef}
        position-z={-pageNumber * PAGE_DEPTH + onPage * PAGE_DEPTH}
        onClick={pageClicked}
      />
    </group>
  );
};

export default function ComicBook() {
  const [page, setPage] = useState(0);
  const comicRef = useRef();
  const controls = useControls({
    position: {
      value: 0,
      step: 0.01,
      min: 0,
      max: 1,
    },
  });

  // useEffect(() => {
  //   if (page === 0) {
  //     comicRef.current.position.x = 0;
  //   } else {
  //     comicRef.current.position.x = PAGE_WIDTH / 2;
  //   }
  // }, [page]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useFrame((_, delta) => {
    let targetPosition = 0;

    if (page === 0) {
      targetPosition = -PAGE_WIDTH / 2;
    } else if (page === 13) {
      targetPosition = PAGE_WIDTH / 2;
    }
    easing.damp(comicRef.current.position, "x", targetPosition, 0.5, delta);
  });

  // Prepare page images, handling odd numbers of images
  const pageImages = [];
  for (let i = 0; i < images.length; i += 2) {
    pageImages.push([images[i], images[i + 1] || null]);
  }

  return (
    <group
      ref={comicRef}
      rotation-y={-Math.PI / 2}
      // position={[controls.position, 0, 0]}
    >
      {pageImages.map((image, i) => (
        <Page
          key={i}
          pageNumber={i}
          onPage={page}
          front={image[0]}
          back={image[1]}
          setPage={setPage}
        />
      ))}
    </group>
  );
}
