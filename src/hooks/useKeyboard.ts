import { useEffect } from 'react'
import { useCyraStore } from '@/store'
import { PLANETS } from '@/data/planets'
import type { PlanetName } from '@/types'

export function useKeyboard() {
  const {
    toggleSearch,
    closeSearch,
    closePlanetPanel,
    toggleCompare,
    toggleLearn,
    resetCamera,
    isSearchOpen,
    isPlanetPanelOpen,
    selectPlanet,
    selectedPlanet,
  } = useCyraStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'

      if (e.key === 'Escape') {
        if (isSearchOpen) { closeSearch(); return }
        if (isPlanetPanelOpen) { closePlanetPanel(); return }
      }

      if (isInput) return

      switch (e.key) {
        case '/':
        case 'f':
          e.preventDefault()
          toggleSearch()
          break
        case 'c':
          e.preventDefault()
          toggleCompare()
          break
        case 'l':
          e.preventDefault()
          toggleLearn()
          break
        case 'o':
          e.preventDefault()
          resetCamera()
          break
        case 'ArrowRight':
        case 'ArrowLeft': {
          e.preventDefault()
          const names = PLANETS.map(p => p.name as PlanetName)
          const idx = selectedPlanet ? names.indexOf(selectedPlanet) : -1
          const next =
            e.key === 'ArrowRight'
              ? names[(idx + 1) % names.length]
              : names[(idx - 1 + names.length) % names.length]
          selectPlanet(next)
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [
    toggleSearch,
    closeSearch,
    closePlanetPanel,
    toggleCompare,
    toggleLearn,
    resetCamera,
    isSearchOpen,
    isPlanetPanelOpen,
    selectPlanet,
    selectedPlanet,
  ])
}
