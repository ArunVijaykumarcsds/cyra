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
  const { showOrbits, showLabels, timeScale, orbitSpeed } = useCyraStore()

  // Initialize angles
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
              opacity={0.1}
              inclination={planet.orbitInclination}
            />
          )}
          <PlanetMesh
            planet={planet}
            angle={anglesRef.current[planet.name] ?? 0}
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
        toneMappingExposure: 0.9,
        alpha: false,
      }}
      camera={{ position: [0, 45, 90], fov: 55, near: 0.1, far: 1000 }}
      style={{ background: '#000005' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <AnimatedScene />
      </Suspense>
    </Canvas>
  )
}
