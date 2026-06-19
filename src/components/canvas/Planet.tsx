import { useRef, useMemo, useCallback } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'
import { SaturnRings } from './SaturnRings'
import type { Planet, PlanetName } from '@/types'

interface PlanetMeshProps {
  planet: Planet
  angle: number
  showLabel: boolean
}

function createPlanetTexture(planet: Planet): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')!

  // Base gradient
  const grad = ctx.createLinearGradient(0, 0, 256, 128)
  const c = planet.color

  if (planet.name === 'Earth') {
    grad.addColorStop(0, '#1a6b9a')
    grad.addColorStop(0.3, '#2d8a4e')
    grad.addColorStop(0.5, '#4B9CD3')
    grad.addColorStop(0.7, '#3a7a40')
    grad.addColorStop(1, '#1a5c8a')
  } else if (planet.name === 'Jupiter') {
    grad.addColorStop(0, '#C88B3A')
    grad.addColorStop(0.15, '#D4A060')
    grad.addColorStop(0.3, '#A06030')
    grad.addColorStop(0.45, '#C8803A')
    grad.addColorStop(0.6, '#D09050')
    grad.addColorStop(0.75, '#A06828')
    grad.addColorStop(1, '#B87830')
  } else if (planet.name === 'Saturn') {
    grad.addColorStop(0, '#E8D5A3')
    grad.addColorStop(0.3, '#D4BC80')
    grad.addColorStop(0.5, '#E0C890')
    grad.addColorStop(0.7, '#C8A870')
    grad.addColorStop(1, '#D8C090')
  } else if (planet.name === 'Mars') {
    grad.addColorStop(0, '#C1440E')
    grad.addColorStop(0.4, '#8B2A08')
    grad.addColorStop(0.6, '#D4561A')
    grad.addColorStop(1, '#9E3A10')
  } else if (planet.name === 'Venus') {
    grad.addColorStop(0, '#E8C26E')
    grad.addColorStop(0.3, '#C8A050')
    grad.addColorStop(0.6, '#D4AE60')
    grad.addColorStop(1, '#B88840')
  } else {
    grad.addColorStop(0, c)
    grad.addColorStop(0.5, planet.textureColor)
    grad.addColorStop(1, c)
  }

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 128)

  // Add surface detail noise
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 128
    const r = Math.random() * 3 + 0.5
    const alpha = Math.random() * 0.15
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0,0,0,${alpha})`
    ctx.fill()
  }

  // Jupiter bands
  if (planet.name === 'Jupiter') {
    const bands = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85]
    bands.forEach((b) => {
      ctx.fillStyle = 'rgba(160,96,48,0.3)'
      ctx.fillRect(0, b * 128 - 4, 256, 8)
    })
    // Great Red Spot
    ctx.beginPath()
    ctx.ellipse(80, 64, 20, 12, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(200,80,40,0.5)'
    ctx.fill()
  }

  // Saturn bands
  if (planet.name === 'Saturn') {
    const bands = [0.2, 0.4, 0.6, 0.8]
    bands.forEach((b) => {
      ctx.fillStyle = 'rgba(180,160,120,0.2)'
      ctx.fillRect(0, b * 128 - 3, 256, 6)
    })
  }

  // Earth cloud patches
  if (planet.name === 'Earth') {
    for (let i = 0; i < 15; i++) {
      ctx.beginPath()
      ctx.ellipse(
        Math.random() * 256,
        Math.random() * 128,
        Math.random() * 25 + 5,
        Math.random() * 10 + 3,
        Math.random() * Math.PI,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

export function PlanetMesh({ planet, angle, showLabel }: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const { selectedPlanet, hoveredPlanet, hoverPlanet, selectPlanet } = useCyraStore()
  const { speakPlanet } = useCyra()

  const isSelected = selectedPlanet === planet.name
  const isHovered = hoveredPlanet === planet.name

  const texture = useMemo(() => createPlanetTexture(planet), [planet])

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.75,
        metalness: 0.05,
        // Subtle self-emission keeps night-side readable at overview distance
        emissive: new THREE.Color(planet.color),
        emissiveIntensity: 0.12,
      }),
    [texture, planet.color]
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: planet.glowColor,
        transparent: true,
        opacity: isSelected ? 0.18 : isHovered ? 0.12 : 0.0,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [planet.glowColor, isSelected, isHovered]
  )

  // Planet world position based on orbit
  const x = Math.cos(angle) * planet.orbitRadius
  const z = Math.sin(angle) * planet.orbitRadius
  const incRad = (planet.orbitInclination * Math.PI) / 180
  const y = Math.sin(angle) * planet.orbitRadius * Math.sin(incRad) * 0.1

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05
      glowRef.current.scale.setScalar(pulse)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = isSelected ? 0.18 : isHovered ? 0.12 : 0.0
    }
  })

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      selectPlanet(planet.name as PlanetName)
      speakPlanet(planet.name as PlanetName)
    },
    [selectPlanet, speakPlanet, planet.name]
  )

  const handlePointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      hoverPlanet(planet.name as PlanetName)
      document.body.style.cursor = 'pointer'
    },
    [hoverPlanet, planet.name]
  )

  const handlePointerOut = useCallback(
    (_e: ThreeEvent<PointerEvent>) => {
      hoverPlanet(null)
      document.body.style.cursor = 'auto'
    },
    [hoverPlanet]
  )

  const labelScale = Math.max(0.8, planet.size * 0.6)

  return (
    <group position={[x, y, z]}>
      {/* Glow halo */}
      <Sphere ref={glowRef} args={[planet.size * 1.35, 32, 32]}>
        <primitive object={glowMaterial} attach="material" />
      </Sphere>

      {/* Planet body */}
      <Sphere
        ref={meshRef}
        args={[planet.size, 64, 32]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <primitive object={bodyMaterial} attach="material" />
      </Sphere>

      {/* Saturn rings */}
      {planet.name === 'Saturn' && (
        <SaturnRings
          innerRadius={planet.size * 1.4}
          outerRadius={planet.size * 2.6}
        />
      )}

      {/* Uranus thin rings */}
      {planet.name === 'Uranus' && (
        <mesh rotation={[Math.PI * 0.48, 0, 0]}>
          <ringGeometry args={[planet.size * 1.3, planet.size * 1.65, 128]} />
          <meshBasicMaterial
            color="#7DE8E8"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Label */}
      {showLabel && (
        <Html
          position={[0, -(planet.size + 0.6 * labelScale), 0]}
          center
          distanceFactor={18}
          zIndexRange={[0, 10]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              color: isSelected
                ? '#00E5FF'
                : isHovered
                ? '#F8F9FA'
                : 'rgba(248,249,250,0.45)',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              transition: 'color 0.2s ease',
              userSelect: 'none',
            }}
          >
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  )
}
