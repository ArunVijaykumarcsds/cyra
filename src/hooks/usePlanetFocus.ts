import { useRef, useCallback } from 'react'
import * as THREE from 'three'
import { useCyraStore } from '@/store'
import { PLANET_MAP } from '@/data/planets'
import type { PlanetName } from '@/types'

interface PlanetRefs {
  [name: string]: THREE.Mesh | null
}

export function usePlanetFocus() {
  const planetRefs = useRef<PlanetRefs>({})
  const { setFocusedPlanet, setCameraMode } = useCyraStore()

  const registerPlanet = useCallback(
    (name: PlanetName, mesh: THREE.Mesh | null) => {
      planetRefs.current[name] = mesh
    },
    []
  )

  const focusPlanet = useCallback(
    (name: PlanetName) => {
      setFocusedPlanet(name)
      setCameraMode('focus')
    },
    [setFocusedPlanet, setCameraMode]
  )

  const getPlanetWorldPosition = useCallback(
    (name: PlanetName): THREE.Vector3 | null => {
      const mesh = planetRefs.current[name]
      if (!mesh) return null
      const pos = new THREE.Vector3()
      mesh.getWorldPosition(pos)
      return pos
    },
    []
  )

  const getPlanetSize = useCallback((name: PlanetName): number => {
    const planet = PLANET_MAP.get(name)
    return planet?.size ?? 1
  }, [])

  return {
    planetRefs,
    registerPlanet,
    focusPlanet,
    getPlanetWorldPosition,
    getPlanetSize,
  }
}
