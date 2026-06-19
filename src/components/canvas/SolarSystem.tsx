import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { useCyraStore } from '@/store'
import { PLANETS } from '@/data/planets'
import { Starfield } from './Starfield'
import { SceneLighting } from './SceneLighting'
import { Sun } from './Sun'
import { PlanetMesh } from './Planet'
import { OrbitRing } from './OrbitRing'
import { CameraController, planetAngles } from './CameraController'

// Separate component so we can use useFrame inside Canvas
function AnimatedScene() {
  const anglesRef = useRef<Record<string, number>>({})
  // Track render tick so PlanetMesh re-renders each frame with fresh angles
  const tickRef = useRef(0)
  const { showOrbits, showLabels, timeScale, orbitSpeed } = useCyraStore()

  // Initialize angles evenly spread around the orbit
  useEffect(() => {
    PLANETS.forEach((p, i) => {
      anglesRef.current[p.name] = (i / PLANETS.length) * Math.PI * 2
      planetAngles[p.name] = anglesRef.current[p.name]
    })
  }, [])

  useFrame((_, delta) => {
    PLANETS.forEach((p) => {
      const speed = p.orbitSpeed * orbitSpeed * timeScale
      anglesRef.current[p.name] = (anglesRef.current[p.name] ?? 0) + speed * delta * 60
      planetAngles[p.name] = anglesRef.current[p.name]
    })
    tickRef.current += 1
  })

  return (
    <>
      <SceneLighting />
      <Starfield count={4000} depth={350} />
      <Sun />

      {PLANETS.map((planet) => (
        <group key={planet.name}>
          {showOrbits && (
            <OrbitRing
              radius={planet.orbitRadius}
              color={planet.color}
              opacity={0.30}
              inclination={planet.orbitInclination}
            />
          )}
          {/* PlanetMesh now reads its own angle from the shared planetAngles
              ref inside its own useFrame — no prop needed for position */}
          <PlanetMesh
            planet={planet}
            showLabel={showLabels}
          />
        </group>
      ))}

      <CameraController />
    </>
  )
}

export function SolarSystem() {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: 4, // THREE.ACESFilmicToneMapping
        toneMappingExposure: 1.4,
        alpha: false,
      }}
      camera={{ position: [0, 70, 120], fov: 58, near: 0.1, far: 1000 }}
      style={{ background: '#000005' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <AnimatedScene />
      </Suspense>
    </Canvas>
  )
}
