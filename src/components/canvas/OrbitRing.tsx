import { useMemo } from 'react'
import * as THREE from 'three'

interface OrbitRingProps {
  radius: number
  color?: string
  opacity?: number
  segments?: number
  inclination?: number
}

export function OrbitRing({
  radius,
  color = '#ffffff',
  opacity = 0.12,
  segments = 180,
  inclination = 0,
}: OrbitRingProps) {
  const lineObj = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const incRad = (inclination * Math.PI) / 180
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(incRad) * radius * Math.sin(angle) * 0.05,
          Math.sin(angle) * radius
        )
      )
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      depthWrite: false,
    })
    return new THREE.Line(geometry, material)
  }, [radius, segments, inclination, color, opacity])

  return <primitive object={lineObj} />
}
