"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from "@react-three/drei"
import type { Mesh } from "three"
import Airavat from "@/components/model/airavat.js"

/*function RocketModel3D() {
  const rocketRef = useRef<Mesh>(null)
  const { scene } = useGLTF("C:\\Users\\singh\\OneDrive\\summer\\react_sum\\newweb\\public\\assets\\3d\\agneya.glb")

  // This is a placeholder using the duck model
  // In a real implementation, you would use an actual rocket model

  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return <primitive ref={rocketRef} object={scene} position={[0, -1, 0]} scale={2} />
}*/

export default function RocketModel() {
  return (
    <Canvas>
       <OrbitControls/>
      <Airavat/>
    </Canvas>
  )
}

