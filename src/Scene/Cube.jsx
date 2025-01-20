import React, { useEffect, useRef, useState } from "react";
import { Text, PerspectiveCamera } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

export const Cube = ({ onNavigate }) => {
  const navigate = useNavigate();
  const cubeRef = useRef(); // Reference for cube
  const cameraRef = useRef(); // Reference for camera
  const mouse = useRef({ x: 0, y: 0 }); // Store mouse position
  const isDraggingRef = useRef(false); // Track if the cube is being dragged
  const textRefs = useRef({});
  const [hoveredFace, setHoveredFace] = useState(null);

  // Handle mouse movement for camera rotation
  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     if (isDraggingRef.current) return; // Skip if dragging
  //     mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  // Update cube and camera rotation based on mouse position
  useFrame(() => {
    if (cubeRef.current) {
      // Smooth rotation with GSAP on the cube (optional)
      gsap.to(cubeRef.current.rotation, {
        y: mouse.current.x * Math.PI, // Rotate cube on the Y-axis based on mouse x position
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (cameraRef.current) {
      // Smoothly update the camera's rotation based on mouse movement
      const rotationSpeed = 0.5; // Speed of camera rotation
      gsap.to(cameraRef.current.rotation, {
        x: mouse.current.y * rotationSpeed, // Pitch (up and down)
        y: mouse.current.x * rotationSpeed, // Yaw (left and right)
        duration: 0.5,
        ease: "power3.out",
      });
    }
  });
   // Handle face hover

   const handlePointerOver = (face) => {
    setHoveredFace(face);
    if (textRefs.current[face]) {
      gsap.to(textRefs.current[face].material, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
    document.body.style.cursor = "pointer"; // Change cursor to pointer
  };

  const handlePointerOut = (face) => {
    setHoveredFace(null);
    if (textRefs.current[face]) {
      gsap.to(textRefs.current[face].material, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
    document.body.style.cursor = "default"; // Reset cursor to default
  };


  // Handle face click
  const handleClick = () => {
   
              onNavigate("/Categories"); // Navigate to next page
   
  };


  return (
    <>
      
      <group ref={cubeRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        {/* Cube Geometry */}
        <mesh>
          <boxGeometry args={[2.5, 2.5, 2.5, 8, 8, 8]} />
          <meshLambertMaterial color="#000000" wireframe />
        </mesh>

        {/* Manufacturing Face */}
        <mesh
          position={[0, 0, 1.26]}
          onClick={() => handleClick("Manufacturing", [0, 0, 0])}
          onPointerOver={() => handlePointerOver("Manufacturing")}
          onPointerOut={() => handlePointerOut("Manufacturing")}
        >
          <planeGeometry args={[2.5, 2.5]} />
          <meshStandardMaterial color="white" transparent opacity={0.5} />
          <Text
            ref={(el) => (textRefs.current["Manufacturing"] = el)}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0}
          >
           { "Manufacturing".toUpperCase() }
          </Text>
        </mesh>
     {/* Design Face */}
     <mesh
          position={[0, 1.26, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={() => handleClick("Design", [Math.PI / 2, 0, 0])}
          onPointerOver={() => handlePointerOver("Design")}
          onPointerOut={() => handlePointerOut("Design")}
        >
          <planeGeometry args={[2.5, 2.5]} />
          <meshStandardMaterial color="white" transparent opacity={0.5} />
          <Text
            ref={(el) => (textRefs.current["Design"] = el)}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0}
          >
            { "Design".toUpperCase() }
          </Text>
        </mesh>

        {/* Sourcing Face */}
        <mesh
          position={[-1.26, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          onClick={() => handleClick("Sourcing", [0, -Math.PI / 2, 0])}
          onPointerOver={() => handlePointerOver("Sourcing")}
          onPointerOut={() => handlePointerOut("Sourcing")}
        >
          <planeGeometry args={[2.5, 2.5]} />
          <meshStandardMaterial color="white" transparent opacity={0.5} />
          <Text
            ref={(el) => (textRefs.current["Sourcing"] = el)}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0}
          >
            { "sourcing".toUpperCase() }
          </Text>
        </mesh>

        {/* Quality Face */}
        <mesh
          position={[0, 0, -1.26]}
          rotation={[0, Math.PI, 0]}
          onClick={() => handleClick("Quality", [0, Math.PI, 0])}
          onPointerOver={() => handlePointerOver("Quality")}
          onPointerOut={() => handlePointerOut("Quality")}
        >
          <planeGeometry args={[2.5, 2.5]} />
          <meshStandardMaterial color="white" transparent opacity={0.5} />
          <Text
            ref={(el) => (textRefs.current["Quality"] = el)}
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0}
          >
           { "quality".toUpperCase() }
          </Text>
        </mesh>
  





        {/* Add other faces similarly... */}
      </group>

      {/* Camera Reference */}
      <perspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} default />
    </>
  );
};
