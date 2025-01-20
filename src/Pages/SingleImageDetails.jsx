import React, { useEffect, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import images from "../Components/Images";
import Navbar from "../Components/Navbar/Navbar";
import Filter from "../Components/Navbar/filter";

function ImagePlane({ imageUrl , onClick}) {
  // Load the texture using Three.js TextureLoader
  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <mesh position={[0, 0.7, 0]} onClick={onClick}>
      {/* Plane geometry for the image */}
      <planeGeometry args={[4, 3]} /> {/* Adjust width and height as needed */}
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

// CameraControls component for mouse-based camera movement
function CameraControls() {
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 5; // Normalize to range [-1, 1]
      mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 5; // Normalize to range [-1, 1]
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate camera based on mouse movement
  useFrame(({ camera }) => {
    const lerpFactor = 0.05; // Adjust the smoothness
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * lerpFactor;
    camera.position.y += (mouse.current.y * 2 - camera.position.y) * lerpFactor;
    camera.lookAt(0, 0, 0); // Keep the camera focused at the center
  });

  return null;
}

function SingleImagePage({ onNavigate }) {
  const { id } = useParams(); // Get the ID of the clicked image from the URL
  const imageIndex = parseInt(id, 10); // Parse the ID to an integer
  const image = images[imageIndex]; // Find the image in your shared `images` array
  
  if (!image) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Image not found</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => Navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const relImage = Image["rel-image"] || Image["rel-image1"] || Image["rel-image2"] || Image["rel-image3"];

  return (
    <>
      <Navbar />
      <Filter />
      <div className="single-image-page flex flex-col items-center gap-8 p-8 min-h-screen">
        {/* Canvas for React Three Fiber */}
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }} // Adjust camera position and field of view
          style={{ width: "100%", height: "100vh" }} // Set canvas dimensions
        >
        
<CameraControls/>
          {/* Add the Plane with the texture */}
        <ImagePlane imageUrl={image["image-url"]}  />
        </Canvas>

        {/* Image description */}
        <p className="mt-4 text-xxl absolute w-2/5 top-2/3 left-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati minima iusto veniam quis
          molestiae est, ad doloribus aut harum autem in ducimus sapiente, impedit sed fugit pariatur? Quia, voluptatibus doloribus.
        </p>

        {/* Go Back Button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onNavigate("/")} // Navigate back to the homepage
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default SingleImagePage;
