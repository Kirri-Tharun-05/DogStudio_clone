import React from 'react'
import * as THREE from "three"
import { useEffect,useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

export const Dog = () => {

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

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

  const dogModel= useRef(model);
useGSAP(()=>{
  const tl= gsap.timeline({
    scrollTrigger:{
      trigger:"section1",
      endTrigger:"section3",
      start:"top top",
      end:"bottom bottom",
      markers:true,
      scrub:true
    }
  })

  tl.to(dogModel.current.scene.position,{
    z:"-=0.9",
    y:"+=0.1"
  })
  .to(dogModel.current.scene.rotation,{
    x:`+=${Math.PI/15}`
  })
  .to(dogModel.current.scene.rotation,{
    y:`-=${Math.PI}`
  },"third")
  .to(dogModel.current.scene.position,{
    x:"-=0.5",
    y:"-=0.2",
    z:"+=0.9"
  },"third")
},[])
  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
      <ambientLight intensity={0.5} />

      <directionalLight color={0xFFFFFF} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  )
}
