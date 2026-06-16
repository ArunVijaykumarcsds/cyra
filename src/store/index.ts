import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { PlanetName, PanelTab, LearnLevel, SearchResult } from '@/types'

// ─── UI State ─────────────────────────────────────────────────────────────────

interface UIState {
  isLandingVisible: boolean
  isPlanetPanelOpen: boolean
  isCompareOpen: boolean
  isLearnOpen: boolean
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  activeTab: PanelTab
  learnLevel: LearnLevel
  reducedMotion: boolean
}

// ─── Planet State ─────────────────────────────────────────────────────────────

interface PlanetState {
  selectedPlanet: PlanetName | null
  hoveredPlanet: PlanetName | null
  comparePlanetA: PlanetName
  comparePlanetB: PlanetName
  focusedPlanet: PlanetName | null
}

// ─── CYRA State ───────────────────────────────────────────────────────────────

interface CyraState {
  cyraMessage: string
  cyraIsTyping: boolean
  cyraIsVisible: boolean
}

// ─── Camera State ─────────────────────────────────────────────────────────────

interface CameraState {
  cameraMode: 'overview' | 'focus' | 'orbit'
  orbitSpeed: number
  showOrbits: boolean
  showLabels: boolean
  timeScale: number
}

// ─── Search State ─────────────────────────────────────────────────────────────

interface SearchState {
  searchQuery: string
  searchResults: SearchResult[]
}

// ─── Combined Store ───────────────────────────────────────────────────────────

interface CyraStore
  extends UIState,
    PlanetState,
    CyraState,
    CameraState,
    SearchState {
  // UI Actions
  enterUniverse: () => void
  openPlanetPanel: (planet: PlanetName) => void
  closePlanetPanel: () => void
  setActiveTab: (tab: PanelTab) => void
  toggleCompare: () => void
  toggleLearn: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
  setLearnLevel: (level: LearnLevel) => void
  setReducedMotion: (val: boolean) => void
  toggleMobileMenu: () => void

  // Planet Actions
  selectPlanet: (planet: PlanetName | null) => void
  hoverPlanet: (planet: PlanetName | null) => void
  setComparePlanetA: (planet: PlanetName) => void
  setComparePlanetB: (planet: PlanetName) => void
  setFocusedPlanet: (planet: PlanetName | null) => void

  // CYRA Actions
  setCyraMessage: (msg: string, delay?: number) => void
  setCyraTyping: (typing: boolean) => void
  setCyraVisible: (visible: boolean) => void

  // Camera Actions
  setCameraMode: (mode: 'overview' | 'focus' | 'orbit') => void
  setOrbitSpeed: (speed: number) => void
  toggleOrbits: () => void
  toggleLabels: () => void
  setTimeScale: (scale: number) => void
  resetCamera: () => void

  // Search Actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: SearchResult[]) => void
  clearSearch: () => void
}

let cyraTypingTimer: ReturnType<typeof setTimeout> | null = null

export const useCyraStore = create<CyraStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // ── Initial UI State ──────────────────────────────────────────────────
      isLandingVisible: true,
      isPlanetPanelOpen: false,
      isCompareOpen: false,
      isLearnOpen: false,
      isSearchOpen: false,
      isMobileMenuOpen: false,
      activeTab: 'overview',
      learnLevel: 'beginner',
      reducedMotion: false,

      // ── Initial Planet State ──────────────────────────────────────────────
      selectedPlanet: null,
      hoveredPlanet: null,
      comparePlanetA: 'Earth',
      comparePlanetB: 'Mars',
      focusedPlanet: null,

      // ── Initial CYRA State ────────────────────────────────────────────────
      cyraMessage:
        'Welcome. I am CYRA — your Cosmic Yielded Research Assistant. The Solar System awaits your exploration. Click any planet to begin.',
      cyraIsTyping: false,
      cyraIsVisible: true,

      // ── Initial Camera State ──────────────────────────────────────────────
      cameraMode: 'overview',
      orbitSpeed: 1,
      showOrbits: true,
      showLabels: true,
      timeScale: 1,

      // ── Initial Search State ──────────────────────────────────────────────
      searchQuery: '',
      searchResults: [],

      // ── UI Actions ────────────────────────────────────────────────────────
      enterUniverse: () =>
        set({ isLandingVisible: false }, false, 'enterUniverse'),

      openPlanetPanel: (planet) =>
        set(
          {
            selectedPlanet: planet,
            isPlanetPanelOpen: true,
            activeTab: 'overview',
            isCompareOpen: false,
            isLearnOpen: false,
          },
          false,
          'openPlanetPanel'
        ),

      closePlanetPanel: () =>
        set(
          {
            isPlanetPanelOpen: false,
            selectedPlanet: null,
            focusedPlanet: null,
            cameraMode: 'overview',
          },
          false,
          'closePlanetPanel'
        ),

      setActiveTab: (tab) => set({ activeTab: tab }, false, 'setActiveTab'),

      toggleCompare: () =>
        set(
          (s) => ({
            isCompareOpen: !s.isCompareOpen,
            isLearnOpen: false,
            isPlanetPanelOpen: false,
          }),
          false,
          'toggleCompare'
        ),

      toggleLearn: () =>
        set(
          (s) => ({
            isLearnOpen: !s.isLearnOpen,
            isCompareOpen: false,
            isPlanetPanelOpen: !s.isLearnOpen ? false : s.isPlanetPanelOpen,
          }),
          false,
          'toggleLearn'
        ),

      openSearch: () => set({ isSearchOpen: true }, false, 'openSearch'),
      closeSearch: () =>
        set(
          { isSearchOpen: false, searchQuery: '', searchResults: [] },
          false,
          'closeSearch'
        ),
      toggleSearch: () =>
        set(
          (s) => ({
            isSearchOpen: !s.isSearchOpen,
            searchQuery: '',
            searchResults: [],
          }),
          false,
          'toggleSearch'
        ),

      setLearnLevel: (level) =>
        set({ learnLevel: level }, false, 'setLearnLevel'),

      setReducedMotion: (val) =>
        set({ reducedMotion: val }, false, 'setReducedMotion'),

      toggleMobileMenu: () =>
        set(
          (s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen }),
          false,
          'toggleMobileMenu'
        ),

      // ── Planet Actions ────────────────────────────────────────────────────
      selectPlanet: (planet) => {
        if (planet) {
          get().openPlanetPanel(planet)
        } else {
          get().closePlanetPanel()
        }
      },

      hoverPlanet: (planet) =>
        set({ hoveredPlanet: planet }, false, 'hoverPlanet'),

      setComparePlanetA: (planet) =>
        set({ comparePlanetA: planet }, false, 'setComparePlanetA'),

      setComparePlanetB: (planet) =>
        set({ comparePlanetB: planet }, false, 'setComparePlanetB'),

      setFocusedPlanet: (planet) =>
        set({ focusedPlanet: planet }, false, 'setFocusedPlanet'),

      // ── CYRA Actions ──────────────────────────────────────────────────────
      setCyraMessage: (msg, delay = 800) => {
        if (cyraTypingTimer) clearTimeout(cyraTypingTimer)
        set({ cyraIsTyping: true }, false, 'cyraTyping:start')
        cyraTypingTimer = setTimeout(() => {
          set(
            { cyraMessage: msg, cyraIsTyping: false },
            false,
            'cyraTyping:end'
          )
        }, delay)
      },

      setCyraTyping: (typing) =>
        set({ cyraIsTyping: typing }, false, 'setCyraTyping'),

      setCyraVisible: (visible) =>
        set({ cyraIsVisible: visible }, false, 'setCyraVisible'),

      // ── Camera Actions ────────────────────────────────────────────────────
      setCameraMode: (mode) =>
        set({ cameraMode: mode }, false, 'setCameraMode'),

      setOrbitSpeed: (speed) =>
        set({ orbitSpeed: speed }, false, 'setOrbitSpeed'),

      toggleOrbits: () =>
        set((s) => ({ showOrbits: !s.showOrbits }), false, 'toggleOrbits'),

      toggleLabels: () =>
        set((s) => ({ showLabels: !s.showLabels }), false, 'toggleLabels'),

      setTimeScale: (scale) =>
        set({ timeScale: scale }, false, 'setTimeScale'),

      resetCamera: () =>
        set(
          {
            cameraMode: 'overview',
            focusedPlanet: null,
            selectedPlanet: null,
            isPlanetPanelOpen: false,
          },
          false,
          'resetCamera'
        ),

      // ── Search Actions ────────────────────────────────────────────────────
      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, 'setSearchQuery'),

      setSearchResults: (results) =>
        set({ searchResults: results }, false, 'setSearchResults'),

      clearSearch: () =>
        set(
          { searchQuery: '', searchResults: [] },
          false,
          'clearSearch'
        ),
    })),
    { name: 'cyra-store' }
  )
)
