import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

import AnimatedRoutes from "./Components/AnimatedRoutes";
import LoadingScreen from "./Components/LoadingScreen";
import Loading from "./Components/Loading";




const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);


  // useEffect(() => {
  //   const excludedPaths = ["/about", "/news"];
  //   if (!excludedPaths.includes(location.pathname)) {
  //     setShowLoading(true);
  //     setIsLoaded(false);
  //   } else {
  //     setShowLoading(false);
  //   }
  // }, [location.pathname]);


  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoaded(true), 3500); // Match with Loading duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed h-screen w-full">
    
     <Router>
        {!isLoaded && <Loading onLoaded={() => setIsLoaded(true)} isLoaded={isLoaded} />}
        {isLoaded && <AnimatedRoutes />}
      </Router>
      
    </div>
  );
};
export default App;
