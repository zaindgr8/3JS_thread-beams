import React from 'react'
import MyCanvas from './MyCanvas'
import Navbar from '../Components/Navbar/Navbar'
import {motion} from 'framer-motion'
const Scene = ({onNavigate}) => {
  return (
    <>
   
    <Navbar/>
    <MyCanvas onNavigate={onNavigate} />
    
    </>
  )
}

export default Scene