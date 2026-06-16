import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

export function Sun() {
  const coronaRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FFF5E0',
        emissive: '#FFD54F',
        emissiveIntensity: 3.5,
        roughness: 1,
        metalness: 0,
      }),
    []
  )

  const coronaMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#FF8C00',
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#FFC107',
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (coronaRef.current) {
      coronaRef.current.rotation.y = t * 0.05
      coronaRef.current.rotation.z = t * 0.03
      const scale = 1 + Math.sin(t * 0.8) * 0.04
      coronaRef.current.scale.setScalar(scale)
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.03
      const scale = 1 + Math.sin(t * 0.5 + 1) * 0.06
      glowRef.current.scale.setScalar(scale)
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.02
    }
  })

  return (
    <group>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[4.2, 32, 32]}>
        <primitive object={glowMaterial} attach="material" />
      </Sphere>
      {/* Corona */}
      <Sphere ref={coronaRef} args={[3.6, 32, 32]}>
        <primitive object={coronaMaterial} attach="material" />
      </Sphere>
      {/* Sun core */}
      <Sphere ref={coreRef} args={[2.8, 64, 64]}>
        <primitive object={coreMaterial} attach="material" />
      </Sphere>
    </group>
  )
}
