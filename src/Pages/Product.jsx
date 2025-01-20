import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import images from "../Components/Images";
import Filter from "../Components/Navbar/filter";

function Scene({ activeRow, textures, navigate, setHoveredImage, onNavigate, setSelectedScreen, selectedScreen,filteredImages }) {
  const rowsRef = useRef([]);
  const cameraRef = useRef();
  const groupRef = useRef();
  const [hoveredPosition, setHoveredPosition] = useState(null);

  

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (cameraRef.current) {
        gsap.to(cameraRef.current.rotation, {
          x: y * 0.05,
          y: x * 0.05,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoveredPosition && cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: hoveredPosition.x,
        y: hoveredPosition.y,
        z: hoveredPosition.z,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [hoveredPosition]);

  useFrame(({ camera }) => {
    if (!cameraRef.current) cameraRef.current = camera;
  });

  const rows = 6;
  const columns = 7;
  const zSpacing = 4;

  const handleClick = (image) => {

    if (image.special === "yes") {
      console.log("Special image clicked. No action taken.");
      return; // Do nothing if the image is special
    }

    

    if (selectedScreen === null  ) {
      setSelectedScreen(image._id); // Set selectedScreen to the _id of the clicked image
      setTimeout(() => onNavigate(`/details/${image._id}`), 2000); // Use the _id to navigate
      console.log(image._id); // Log the selected image's _id
    }
  };

  const createRows = () => {
    const rowsArray = [];
    const lastRowIndex = rows - 1;
    const rowIndices = [...Array(rows).keys()];
    [rowIndices[0], rowIndices[lastRowIndex]] = [rowIndices[lastRowIndex], rowIndices[0]];
  
    for (let rowIndex = 1; rowIndex < rows; rowIndex++) {
      const imagesArray = [];
      const actualRowIndex = rowIndices[rowIndex];
  
      for (let i = 0; i < columns; i++) {
        const x = i * 3 - columns * 1.5;
        const textureIndex = (actualRowIndex * columns + i) % textures.length;
        const texture = textures[textureIndex];
        const image = filteredImages[actualRowIndex * columns + i]; // Get the image object based on rowIndex and column index
  
        const handlePointerOver = (e) => {
          setHoveredImage(rowIndex * columns + i);
          gsap.to(e.object.position, { y: 1, duration: 1, ease: "power3.out" });
        };
  
        const handlePointerOut = (e) => {
          setHoveredImage(null);
          gsap.to(e.object.position, { y: 0, duration: 1, ease: "power3.out" });
        };
  
        if (actualRowIndex === lastRowIndex) {
          const specialImage = (i === columns - 1)
            ? images.find((image) => image.description.toLowerCase().includes("news"))
            : (i === columns - 2)
            ? images.find((image) => image.description.toLowerCase().includes("about"))
            : null;
  
          imagesArray.push(
            <mesh
              key={`row-${rowIndex}-image-${i}-${specialImage ? "special" : "regular"}`}
              position={[x, 0, 0]}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              onClick={specialImage ? () => navigate(`/${specialImage.description.toLowerCase()}`) : () => handleClick(image)} // Pass the image object to handleClick
            >
              <planeGeometry args={[2.5, 2]} />
              <meshBasicMaterial map={specialImage ? textures[images.indexOf(specialImage)] : texture} />
            </mesh>
          );
        } else {
          imagesArray.push(
            <mesh
              key={`row-${rowIndex}-image-${i}`}
              position={[x, 0, 0]}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              onClick={() => handleClick(image)} // Pass the image object to handleClick
            >
              <planeGeometry args={[2.5, 2]} />
              <meshBasicMaterial map={texture} />
            </mesh>
          );
        }
      }
  
      rowsArray.push(
        <group
          key={`row-${rowIndex}`}
          ref={(el) => (rowsRef.current[rowIndex] = el)}
          position={[0, 0, rowIndex * zSpacing]}
        >
          {imagesArray}
        </group>
      );
    }
    return rowsArray;
  };

  useEffect(() => {
    if (selectedScreen !== null) {
      rowsRef.current.forEach((row, rowIndex) => {
        row.children.forEach((mesh, columnIndex) => {
          const screenIndex = rowIndex * columns + columnIndex;
          if (screenIndex !== selectedScreen) {
            const randomDelay = Math.random() * 2;
            gsap.to(mesh.position, {
              y: -30,
              duration: 1.5,
              delay: randomDelay,
              ease: "power3.out",
            },);
            gsap.to(mesh.material, {
              opacity: 0.5,
              duration: 1,
              delay: randomDelay,
            });
          } else {
            gsap.to(mesh.position, { y: 0, duration: 1.5, ease: "power3.out" });
            gsap.to(mesh.material, { opacity: 1, duration: 1 });
          }
        });
      });
    }
  }, [selectedScreen]);

  return <group position={[1, 16, 32]} rotation={[Math.PI / 12, 0, 0]}>{createRows()}</group>;
}

function Showcase({ onNavigate }) {
  const navigate = useNavigate();
  const [activeRow, setActiveRow] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  // const textures = useLoader(THREE.TextureLoader, images.map((img) => img["image-url"]));
  const [selectedScreen, setSelectedScreen] = useState(null);
  // const [activeFilter, setActiveFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [key, setKey] = useState(0);

  const handleActiveFilterChange = (filter) => {
    // Change the key to force remount
    setKey((prevKey) => prevKey + 1); // Increment key to trigger remount
    setActiveFilter(filter);
  };

  const filteredImages = React.useMemo(() => {
    return images.filter((img) =>
      activeFilter ? img.filter?.toLowerCase() === activeFilter.toLowerCase() : true
    );
  }, [activeFilter]);

 


  const textures = useLoader(
    THREE.TextureLoader,
    filteredImages.map((img) => img["image-url"])
  );
  return (
    <>
      <Navbar />
      <Filter key={key} setActiveFilter={handleActiveFilterChange} />
      <div
        className="w-screen h-screen"
        style={{ cursor: hoveredImage !== null ? "pointer" : "default" }}
      >
        <Canvas camera={{ position: [0, 12, 60], fov: 75 }} className="w-full h-full">
          <Scene
            activeRow={activeRow}
            textures={textures}
            onNavigate={onNavigate}
            navigate={navigate}
            setHoveredImage={setHoveredImage}
            setSelectedScreen={setSelectedScreen}
            selectedScreen={selectedScreen}
            filteredImages={filteredImages}
          />
        </Canvas>
      </div>
    </>
  );
}

export default Showcase;