import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StarfieldProps {
  count?: number
  depth?: number
}

export function Starfield({ count = 4000, depth = 400 }: StarfieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const op = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distribute on a sphere surface
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const r = depth * (0.5 + Math.random() * 0.5)
      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)
      sz[i] = Math.random() * 2.0 + 0.3
      op[i] = Math.random() * 0.8 + 0.2
    }
    return [pos, sz, op]
  }, [count, depth])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))
    return geo
  }, [positions, sizes, opacities])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xf8f9fa,
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        fog: false,
      }),
    []
  )

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.002) * 0.02
    }
  })

  return <points ref={meshRef} geometry={geometry} material={material} />
}
