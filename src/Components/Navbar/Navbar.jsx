import React from "react";
import logo from  "/logo/Threads & Beams.png"
import { Link } from "react-router-dom";
import '../../App.css'
const Navbar = () => {
  return (
    <nav className="w-full   flex justify-between -mt-1 items-center pb-4 md:px-12 py-4">
      {/* Left Section */} 

      <div className="text-lg md:text-lg nav-items  ">

      <div className="text-lg md:text-lg nav-items ">

        <span className="text-black cursor-pointer">en</span>
        <span className="mx-2 text-black ">|</span>
        <span className="text-black cursor-pointer ">عربي</span>
        <span className="mx-2 text-black">|</span>
        <span className="text-black cursor-pointer">اردو</span>
      </div>
      </div>
      {/* Center Logo */}
      <div className=" bg-slate-600 h-10 -mt-1 ">
      <Link to="/" >
      <img className="w-64 h-auto absolute -top-20 left-1/3 ml-20 mt-1   " src={logo} alt="" />
      </Link>
      </div>

      {/* Right Section */}
      <div className="gap-10 flex justify-between text-lg md:text-xl nav-items ">
        <Link to="/news" className="text-black hover:text-gray-600">
          NEWS
        </Link>
        <Link to="/about" className="text-black hover:text-gray-600">
          ABOUT
        </Link>
      </div>
      
    </nav>
  );
};

export default Navbar;
