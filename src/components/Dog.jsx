import React from 'react'
import * as THREE from "three"
import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'


export const Dog = () => {
  const model = useGLTF("/dog.drc.glb"); // to load the model
  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.7;
    gl.toneMapping = THREE.ReinhardToneMapping  // fixing the renderer for good colors
    gl.outputColorSpace = THREE.SRGBColorSpace // fixing the renderer for good colors
  })
  const {actions}=useAnimations(model.animations,model.scene);
  useEffect(()=>{
    actions["Take 001"].play()
  },[actions])

  const [normalMap, sampleMapCap,branchNormalMap,branchMap] = (useTexture(["/dog_normals.jpg", "/2.jpg","/branches_normals.jpg","/branches_diffuse.jpg"])).map(texture => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })

  const dogMaterial = new THREE.MeshMatcapMaterial({  // adding the normal map for each objext related to Dog
    normalMap: normalMap,
    matcap: sampleMapCap // appling the color that reflect according to the light
  })
  
  const branchMaterial= new THREE.MeshMatcapMaterial({
    normalMap:branchNormalMap,
    map:branchMap
  })

  model.scene.traverse((child) => {  // to traverse each object of the model 
    if (child.name.includes("DOG")) {
      child.material = dogMaterial
    }
    else{
      child.material=branchMaterial
    }
  })
  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
      <ambientLight intensity={0.5} />

      <directionalLight color={0xFFFFFF} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  )
}
