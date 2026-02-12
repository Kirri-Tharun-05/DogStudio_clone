import React from 'react'
import * as THREE from "three"
import { Canvas, useThree } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { color, normalMap } from 'three/tsl'

export const Dog = () => {
  const model = useGLTF("/dog.drc.glb");
  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.7;
  })

  const  texture  = useTexture({
    normalMap: "/dog_normals.jpg"
  })

  texture.normalMap.flipY=false;

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = new THREE.MeshStandardMaterial({
        normalMap: texture.normalMap
      })
    }
  })

  return (
    <>
      {/* For testing Cube Purpose*/}
      {/* <mesh>
        <meshBasicMaterial color={0x00FF00} />
        <boxGeometry args={[1, 1, 1]} />
      </mesh> 
      */}

      <primitive object={model.scene} position={[0.25, -0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
      <ambientLight intensity={0.5} />

      <directionalLight color={0xFFFFFF} intensity={10} />
      <OrbitControls />
    </>
  )
}

// import React, { useEffect } from "react";
// import * as THREE from "three";
// import { useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

// export const Dog = () => {
//   const model = useGLTF("/dog.drc.glb");
//   const { normalMap } = useTexture({
//     normalMap: "/dog_normals.jpg"
//   });

//   const { camera } = useThree();

//   useEffect(() => {
//     camera.position.set(0, 0, 0.7);

//     model.scene.traverse((child) => {
//       if (child.isMesh && child.name.includes("DOG")) {
//         child.material = new THREE.MeshStandardMaterial({
//           normalMap: normalMap
//         });
//       }
//     });
//   }, [model, normalMap]);

//   return (
//     <>
//       <primitive
//         object={model.scene}
//         position={[0.25, -0.5, 0]}
//         rotation={[0, Math.PI / 4, 0]}
//       />

//       <directionalLight intensity={2} />

//       <OrbitControls />
//     </>
//   );
// };
