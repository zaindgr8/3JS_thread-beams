import React from 'react'
import {motion} from 'framer-motion'
import Navbar from '../Components/Navbar/Navbar'
const News = () => {

  const pageVariants = {
    initial: { rotateZ: 90, x: "-100%", y: "300%" },
    animate: { rotateZ: 0, x: 0, y: 0 },
    exit: {   rotateZ: 90, x: "-100%", y: "100%",  },
  };

  return (
    <motion.div className="page bg-black h-screen flex justify-center items-center"
    variants={pageVariants}
     initial="initial"
      animate="animate"
       exit="exit"
      transition={{ duration: 0.3, onComplete: () => console.log("Exit animation finished"),  }} // Duration of the transition
    
    >
      <Navbar/>
      <h1 className="text-4xl text-white font-bold">Welcome to News</h1>
    </motion.div>
  )
}

export default News