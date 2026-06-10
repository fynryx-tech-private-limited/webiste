import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'


// --- Dust Particles System (reacting to cursor) ---
function InteractiveDustParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particleCount = 280
  
  // Build particles positions and initial random vectors
  const [positions, initialPositions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const initPos = new Float32Array(particleCount * 3)
    const spd = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Position inside a sphere/ellipsoid box
      const x = (Math.random() - 0.5) * 12
      const y = (Math.random() - 0.5) * 7
      const z = (Math.random() - 0.5) * 5
      
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      
      initPos[i * 3] = x
      initPos[i * 3 + 1] = y
      initPos[i * 3 + 2] = z
      
      // Floating speed values
      spd[i * 3] = (Math.random() - 0.5) * 0.15
      spd[i * 3 + 1] = (Math.random() * 0.2) + 0.05 // Mostly float upwards
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.1
    }
    
    return [pos, initPos, spd]
  }, [particleCount])

  // Custom vertex buffer updating inside frame loop
  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    const geo = pointsRef.current.geometry
    const arr = geo.attributes.position.array as Float32Array
    
    const worldMouseX = mouse.current.x * 6
    const worldMouseY = mouse.current.y * 3.5

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3
      
      // Float upwards over time, loop back to bottom if off screen
      arr[idx + 1] += speeds[idx + 1] * 0.02
      if (arr[idx + 1] > 4.5) {
        arr[idx + 1] = -4.5
        arr[idx] = initialPositions[idx]
      }
      
      // Subtle horizontal sway based on sine wave
      arr[idx] += Math.sin(time * 0.8 + i) * 0.002
      
      // React to cursor spotlight: push particles within cursor spotlight radius
      const dx = arr[idx] - worldMouseX
      const dy = arr[idx + 1] - worldMouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 2.5) {
        const force = (2.5 - dist) * 0.18 // Spring physics force
        arr[idx] += (dx / dist) * force * 0.1
        arr[idx + 1] += (dy / dist) * force * 0.1
      }
    }
    
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#14B8A6" 
        transparent={true} 
        opacity={0.7} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// --- Volumetric Light Rays ---
function VolumetricLightRays() {
  const groupRef = useRef<THREE.Group>(null)

  const rays = useMemo(() => [
    { position: [-2.5, 3.5, -4] as [number, number, number], rotation: [0, 0, -0.6] as [number, number, number], scale: [1.2, 8, 1] as [number, number, number], opacity: 0.11 },
    { position: [2.5, 3.5, -3.5] as [number, number, number], rotation: [0, 0, 0.4] as [number, number, number], scale: [1.8, 9, 1] as [number, number, number], opacity: 0.08 },
    { position: [0, 4.0, -5] as [number, number, number], rotation: [0, 0, -0.1] as [number, number, number], scale: [2.2, 10, 1] as [number, number, number], opacity: 0.14 },
    { position: [-4, 3, -3] as [number, number, number], rotation: [0, 0, -0.8] as [number, number, number], scale: [1.0, 7, 1] as [number, number, number], opacity: 0.06 },
  ], [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Sway the rays slowly
    groupRef.current.children.forEach((child, index) => {
      const ray = rays[index]
      if (!ray) return
      child.rotation.z = ray.rotation[2] + Math.sin(time * 0.4 + index) * 0.04
      child.scale.x = ray.scale[0] * (1 + Math.sin(time * 0.6 + index) * 0.08)
    })
  })

  // Create a canvas-drawn vertical gradient for soft light ray look
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 256)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.3, 'rgba(20, 184, 166, 0.4)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 16, 256)
    }
    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [])

  return (
    <group ref={groupRef}>
      {rays.map((ray, idx) => (
        <mesh 
          key={idx} 
          position={ray.position} 
          rotation={ray.rotation} 
          scale={ray.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            map={gradientTexture} 
            transparent={true} 
            opacity={ray.opacity} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  )
}

// --- Inner Scene Loader ---
function CanvasInnerScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Suspense fallback={
      <Html center>
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          <span className="text-xs font-semibold tracking-wider text-teal-400 uppercase">Loading Fynryx 3D...</span>
        </div>
      </Html>
    }>
      {/* Volumetric light rays drifting in background */}
      <VolumetricLightRays />

      {/* Floating particles */}
      <InteractiveDustParticles mouse={mouse} />
    </Suspense>
  )
}

// --- Main Canvas Component export ---
interface ShowcaseCanvasProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export function ShowcaseCanvas({ mouse }: ShowcaseCanvasProps) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="pointer-events-auto"
      >
        <CanvasInnerScene mouse={mouse} />
      </Canvas>
    </div>
  )
}
