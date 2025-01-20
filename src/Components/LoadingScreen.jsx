import React, { useEffect } from "react";
import { gsap } from "gsap";
import logo from "/logo/Threads & Beams.png";

const LoadingScreen = ({ isTransitioning }) => {
  useEffect(() => {
   
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          onComplete: () => isLoaded(),
        });

        timeline
          .to(".loading-upper", {
            x: "0%",
            duration: 1,
            ease: "power4.inOut",
          })
          .to(
            ".loading-lower",
            {
              x: "0%",
              duration: 1,
              ease: "power4.inOut",
            },
            "<"
          )
         
          
          .to(
            ".loading-upper",
            {
              x: "-100%",
              duration: 1,
              delay:1,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            ".loading-lower",
            {
              x: "-100%",
              duration: 1,
              delay:1,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(".loading-screen", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => gsap.set(".loading-screen", { display: "none" }),
          });
      });

      return () => ctx.revert();
    
  }, [isTransitioning]);

  return (
    <div className="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="loading-upper fixed top-0 left-0 w-full h-full bg-black transform translate-x-full"></div>
      <div className="loading-lower fixed bottom-0 left-0 w-full h-full bg-black transform translate-x-full"></div>
      <div className="loading-logo fixed z-50">
        {/* <img src={logo} alt="Threads & Beams" className="w-80" /> */}
      </div>
    </div>
  );
};

export default LoadingScreen;
