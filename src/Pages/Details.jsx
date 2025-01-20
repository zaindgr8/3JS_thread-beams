import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import images from "../Components/Images"; // Import shared images array
import Navbar from "../Components/Navbar/Navbar";
import Filter from "../Components/Navbar/filter";

function ImagePlane({ textureUrl, position, onClick }) {
  const texture = useLoader(THREE.TextureLoader, textureUrl); // Dynamically load texture
  return (
    <mesh position={position} onClick={onClick} onPointerOver={(e) => (e.stopPropagation())}>
      <planeGeometry args={[4, 4]} /> {/* Plane size */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function CameraControls() {
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 11; // Normalize to range [-1, 1]
      mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 11; // Normalize to range [-1, 1]
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate camera based on mouse movement
  useFrame(({ camera }) => {
    const lerpFactor = 0.04; // Adjust the smoothness
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * lerpFactor;
    camera.position.y += (mouse.current.y * 2 - camera.position.y) * lerpFactor;
    camera.lookAt(0, 0, 0); // Keep the camera focused at the center
  });

  return null;
}

function ImageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mainImageIndex = parseInt(id, 10);
  const mainImage = images[mainImageIndex];

  if (!mainImage) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Image not found</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="image-details flex flex-col items-center gap-8 p-8 bg-gray-100 min-h-screen">
      {/* Main Image */}
      
     
      <div className="main-image w-full h-[80vh]">
        <Navbar/>
        <Filter/>
        <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} />
          <CameraControls />

          {/* Plane Geometries */}
          <ImagePlane
            textureUrl={mainImage["image-url"]}
            position={[0, 2, -4]}
            onClick={() => navigate(`/single-image/${mainImageIndex}`)} // Navigate to details page
          />
          {mainImage["rel-image1"] && (
            <ImagePlane
              textureUrl={mainImage["rel-image1"]}
              position={[-2.5, -0.4, -2]}
              onClick={() => navigate(`/single-image/${mainImageIndex}`)} // Adjust index as needed
            />
          )}
          {mainImage["rel-image2"] && (
            <ImagePlane
              textureUrl={mainImage["rel-image2"]}
              position={[2, -2, -1]}
              onClick={() => navigate(`/single-image/${mainImageIndex}`)} // Adjust index as needed
            />
          )}
          
            {mainImage["rel-image3"] && (
            <ImagePlane
              textureUrl={mainImage["rel-image3"]}
              position={[-4, 4, -3]}
              onClick={() => navigate(`/single-image/${mainImageIndex}`)} // Adjust index as needed
            />
          )}
        </Canvas>
      </div>
    </div>
  );
}

export default ImageDetails;
