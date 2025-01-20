
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import logo from "/logo/Threads & Beams.png";

const Loading = ({ isLoaded, }) => {
    useEffect(() => {
      
        const ctx = gsap.context(() => {
          const timeline = gsap.timeline({
            onComplete: () => isLoaded(),
          });
  
          timeline
            .to(".loading-upper", {
              y: "0%",
              duration: 1,
              ease: "power4.inOut",
            })
            .to(
              ".loading-lower",
              {
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
              },
              "<"
            )
            .from(
              ".loading-logo",
              {
                x: "300%",
                duration: 1.5,
                ease: "power4.out",
              },
              "-=0.5"
            )
            .to(
              ".loading-logo",
              {
                y: "-160%",
                duration: 1.5,
                ease: "power4.inOut",
              },
              "+=0.5"
            )
            .to(
              ".loading-upper",
              {
                y: "-100%",
                duration: 1.7,
                ease: "power4.inOut",
              },
              "<"
            )
            .to(
              ".loading-lower",
              {
                y: "100%",
                duration: 1.7,
                ease: "power4.inOut",
              },
               "<"
            )
            .to(".loading-screen", {
              opacity: 0,
              duration: 0.3,
              onComplete: () => gsap.set(".loading-screen", { display: "none" }),
            });
        });
  
        return () => ctx.revert();
      
    }, [isLoaded]);
  
    return (
      <div className="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center">
        <div className="loading-upper fixed top-0 left-0 w-full h-1/2 bg-black transform -translate-y-full"></div>
        <div className="loading-lower fixed bottom-0 left-0 w-full h-1/2 bg-black transform translate-y-full"></div>
        <div className="loading-logo fixed z-50">
          <img src={logo} alt="Threads & Beams" className="w-80" />
        </div>
      </div>
    );
  };
  
export default Loading;  