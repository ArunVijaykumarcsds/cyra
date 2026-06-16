import { useMemo } from 'react'
import * as THREE from 'three'

interface SaturnRingsProps {
  innerRadius?: number
  outerRadius?: number
}

export function SaturnRings({
  innerRadius = 1.4,
  outerRadius = 2.6,
}: SaturnRingsProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, 128, 8)
    // UV remap for radial gradient appearance
    const pos = geo.attributes.position as THREE.BufferAttribute
    const uv = geo.attributes.uv as THREE.BufferAttribute
    const v3 = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i)
      const normalized = (v3.length() - innerRadius) / (outerRadius - innerRadius)
      uv.setXY(i, normalized, 0.5)
    }
    return geo
  }, [innerRadius, outerRadius])

  const material = useMemo(() => {
    // Create a radial gradient texture
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 4
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createLinearGradient(0, 0, 256, 0)
    grad.addColorStop(0.0, 'rgba(210,190,150,0.0)')
    grad.addColorStop(0.1, 'rgba(210,190,150,0.5)')
    grad.addColorStop(0.3, 'rgba(230,210,170,0.8)')
    grad.addColorStop(0.45, 'rgba(245,225,185,0.9)')
    grad.addColorStop(0.5, 'rgba(200,180,140,0.6)')
    grad.addColorStop(0.6, 'rgba(230,210,170,0.75)')
    grad.addColorStop(0.75, 'rgba(210,190,150,0.5)')
    grad.addColorStop(0.85, 'rgba(190,170,130,0.35)')
    grad.addColorStop(1.0, 'rgba(190,170,130,0.0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 4)

    const texture = new THREE.CanvasTexture(canvas)
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })
  }, [])

  return (
    <mesh geometry={geometry} rotation={[Math.PI * 0.42, 0, 0]}>
      <primitive object={material} attach="material" />
    </mesh>
  )
}
