import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Airavat(props) {
  const { nodes, materials } = useGLTF('/airavata1.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Assembly_para_airavata.geometry}
        material={nodes.Assembly_para_airavata.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
      />
    </group>
  )
}

useGLTF.preload('/airavata1.gltf')
