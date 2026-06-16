import * as THREE from 'three'

export function getPlanetPosition(
  orbitRadius: number,
  angle: number,
  inclination = 0
): THREE.Vector3 {
  const incRad = (inclination * Math.PI) / 180
  const x = Math.cos(angle) * orbitRadius
  const z = Math.sin(angle) * orbitRadius
  const y = Math.sin(incRad) * orbitRadius * 0.1
  return new THREE.Vector3(x, y, z)
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function sphericalToCartesian(
  radius: number,
  phi: number,
  theta: number
): THREE.Vector3 {
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

export function lerpVector3(
  a: THREE.Vector3,
  b: THREE.Vector3,
  t: number
): THREE.Vector3 {
  return new THREE.Vector3(
    a.x + (b.x - a.x) * t,
    a.y + (b.y - a.y) * t,
    a.z + (b.z - a.z) * t
  )
}

export function planetCameraDistance(planetSize: number): number {
  return planetSize * 6 + 3
}
