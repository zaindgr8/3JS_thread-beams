import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Cube } from './Cube'

const MyCanvas = ({onNavigate}) => {
  return (
    
    <Canvas className="w-screen h-screen " >
          <ambientLight intensity={10} color={"white"} />
         
          <Cube onNavigate={onNavigate} />
          <OrbitControls 
           enablePan={false} 
           enableZoom={false}
           target={[0, 0, 0]}
           enableRotate={true}
          maxPolarAngle={Math.PI/2}  
            minAzimuthAngle={-Math.PI * (3 / 4)}
          maxAzimuthAngle={Math.PI * (1/ 6)}
          minDistance={5} // Prevent moving closer
          maxDistance={5}
          />
          <Environment preset='city'/>
        </Canvas>
  )
}

export default MyCanvas