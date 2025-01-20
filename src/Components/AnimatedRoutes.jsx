import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { AnimatePresence } from "framer-motion";
import Scene from "../Scene/Scene";
import News from "../Pages/News";
import About from "../Pages/About";
import SingleImagePage from "../Pages/SingleImageDetails";
import ImageDetails from "../Pages/Details";
import Showcase from './../Pages/Product';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (target) => {
    setIsTransitioning(true);
    
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 3000); // Duration 
    setTimeout(() => {
      navigate(target);
      
    }, 1000); // Duration 
  };

  return (
    <>
      {isTransitioning && <LoadingScreen isTransitioning={isTransitioning} onComplete={() => setIsTransitioning(false)} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Scene onNavigate={handleNavigation} />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/Categories"
            element={
             
                <Showcase   onNavigate={handleNavigation} />
             
            }
          />
           <Route
            path="/details/:id"
            element={
             
                <ImageDetails onNavigate={handleNavigation} />
             
            }
          />
           <Route
            path="/single-image/:id"
            element={
             
                <SingleImagePage onNavigate={handleNavigation} />
             
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
