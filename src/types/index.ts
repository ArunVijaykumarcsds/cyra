// ─── Planet Types ────────────────────────────────────────────────────────────

export type PlanetName =
  | 'Mercury'
  | 'Venus'
  | 'Earth'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'

export type PlanetType =
  | 'Terrestrial Planet'
  | 'Gas Giant'
  | 'Ice Giant'
  | 'Dwarf Planet'

export type LearnLevel = 'beginner' | 'student' | 'enthusiast'

export type PanelTab =
  | 'overview'
  | 'stats'
  | 'atmosphere'
  | 'moons'
  | 'missions'
  | 'facts'
  | 'habitability'

export interface PlanetStats {
  diameter: string
  mass: string
  gravity: string
  distanceFromSun: string
  dayLength: string
  yearLength: string
  moonCount: string
  temperature: string
  axialTilt: string
  orbitalSpeed: string
}

export interface PlanetBars {
  diameter: number     // raw km
  mass: number         // relative (Earth = 1)
  gravity: number      // m/s²
  moons: number        // count
}

export interface Moon {
  name: string
  description: string
  diameter?: string
  distanceFromPlanet?: string
  notable?: boolean
}

export interface Mission {
  name: string
  agency: string
  year: string
  type: 'flyby' | 'orbiter' | 'lander' | 'rover' | 'probe' | 'crewed' | 'telescope' | 'planned'
  description: string
  status: 'completed' | 'active' | 'planned'
}

export interface AtmosphereLayer {
  name: string
  altitude: string
  description: string
}

export interface LevelContent {
  beginner: string
  student: string
  enthusiast: string
}

export interface Planet {
  name: PlanetName
  type: PlanetType
  color: string
  glowColor: string
  ringColor?: string
  hasRings: boolean
  orbitRadius: number       // Three.js scene units
  orbitSpeed: number        // radians per frame
  rotationSpeed: number     // radians per frame
  size: number              // Three.js sphere radius
  orbitInclination: number  // degrees
  overview: string
  stats: PlanetStats
  bars: PlanetBars
  atmosphereComposition: string[]
  atmosphereDescription: string
  atmosphereLayers?: AtmosphereLayer[]
  moons: Moon[]
  missions: Mission[]
  facts: string[]
  habitability: string
  habitabilityScore: number  // 0-100
  levelContent: LevelContent
  cyraIntro: string
  textureColor: string      // CSS color for procedural texture
  bumpIntensity: number     // 0-1
}

// ─── Search Types ─────────────────────────────────────────────────────────────

export type SearchResultType = 'planet' | 'moon' | 'mission' | 'fact'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  subtitle: string
  planetName: PlanetName
  planetColor: string
}

// ─── Learning Types ───────────────────────────────────────────────────────────

export interface LearningCard {
  id: string
  title: string
  description: string
  level: LearnLevel
  planetName: PlanetName
  icon: string
  tags: string[]
}

// ─── Compare Types ────────────────────────────────────────────────────────────

export interface CompareMetric {
  label: string
  unit: string
  valueA: string | number
  valueB: string | number
  percentA: number  // 0-100
  percentB: number  // 0-100
  colorA: string
  colorB: string
}

// ─── UI State Types ───────────────────────────────────────────────────────────

export interface CameraState {
  targetX: number
  targetY: number
  targetZ: number
  zoom: number
  following: PlanetName | null
}

export interface NotificationMessage {
  id: string
  message: string
  type: 'info' | 'success' | 'warning'
  duration?: number
}
