import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useCyraStore } from '@/store'
import { PLANET_MAP } from '@/data/planets'
import { planetCameraDistance } from '@/utils/math'

// Shared orbital angle ref — written by SolarSystem, read by Planet + here
export const planetAngles: Record<string, number> = {}

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const isAnimating = useRef(false)
  const animProgress = useRef(0)
  const animStart = useRef(new THREE.Vector3())
  const animEnd = useRef(new THREE.Vector3())

  // Track the last values we acted on so we re-trigger even if value didn't change
  const lastMode = useRef<string>('')
  const lastPlanet = useRef<string | null>(null)
  const overviewCounter = useRef(0)

  const { cameraMode, focusedPlanet, overviewTrigger } = useCyraStore()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 70, 120)
    camera.lookAt(0, 0, 0)
  }, [camera])

  // React to focus changes
  useEffect(() => {
    if (cameraMode === 'focus' && focusedPlanet) {
      const planet = PLANET_MAP.get(focusedPlanet)
      if (!planet) return

      const angle = planetAngles[focusedPlanet] ?? 0
      const x = Math.cos(angle) * planet.orbitRadius
      const z = Math.sin(angle) * planet.orbitRadius
      const incRad = (planet.orbitInclination * Math.PI) / 180
      const y = Math.sin(angle) * planet.orbitRadius * Math.sin(incRad) * 0.1

      const planetPos = new THREE.Vector3(x, y, z)
      const dist = planetCameraDistance(planet.size)

      const camTarget = new THREE.Vector3(
        x + dist * 0.6,
        y + dist * 0.4,
        z + dist * 0.8
      )

      animStart.current.copy(camera.position)
      animEnd.current.copy(camTarget)
      targetPosition.current.copy(planetPos)
      isAnimating.current = true
      animProgress.current = 0

      if (controlsRef.current) {
        controlsRef.current.target.copy(planetPos)
        controlsRef.current.enabled = false
      }

      lastMode.current = 'focus'
      lastPlanet.current = focusedPlanet
    }
  }, [cameraMode, focusedPlanet, camera])

  // React to overview — uses overviewTrigger counter so clicking Overview
  // twice in a row (when already in overview mode) still fires the animation
  useEffect(() => {
    if (cameraMode !== 'overview') return

    const overviewPos = new THREE.Vector3(0, 70, 120)
    animStart.current.copy(camera.position)
    animEnd.current.copy(overviewPos)
    targetPosition.current.set(0, 0, 0)
    currentLookAt.current.copy(camera.position) // reset smooth look-at origin
    isAnimating.current = true
    animProgress.current = 0

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.enabled = false
    }

    lastMode.current = 'overview'
    lastPlanet.current = null
  // overviewTrigger is a counter in the store incremented every time resetCamera is called
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewTrigger])

  useFrame((_, delta) => {
    if (isAnimating.current) {
      animProgress.current = Math.min(animProgress.current + delta * 0.8, 1)
      const t = easeInOutCubic(animProgress.current)

      camera.position.lerpVectors(animStart.current, animEnd.current, t)

      currentLookAt.current.lerp(targetPosition.current, delta * 3)
      camera.lookAt(currentLookAt.current)

      if (animProgress.current >= 1) {
        isAnimating.current = false
        if (controlsRef.current) {
          controlsRef.current.enabled = true
          controlsRef.current.target.copy(targetPosition.current)
          controlsRef.current.update()
        }
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={3}
      maxDistance={200}
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={Math.PI * 0.05}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      panSpeed={0.5}
    />
  )
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
