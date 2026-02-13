
import { Canvas } from '@react-three/fiber'
import './App.css'
import { Dog } from './components/Dog'

function App() {

  return (
    <>
      <main>
      <Canvas style={{
        height:'100vh',
        width:'100vw',
        position:'fixed',
        top:'0',
        left:'0',
        zIndex:'1px',
        backgroundImage:"URL(/background-1.png)",
        backgroundSize:"cover"
      }}>
        <Dog />
      </Canvas>
      <section id="section2"></section>
      <section id="section3"></section>
      <section id="section4"></section>

      </main>
    </>
  )
}

export default App