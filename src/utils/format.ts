export function formatNumber(n: number, decimals = 2): string {
  if (n >= 1e9) return (n / 1e9).toFixed(decimals) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(decimals) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(decimals) + 'K'
  return n.toFixed(decimals)
}

export function formatMass(earthMasses: number): string {
  if (earthMasses < 0.01) return `${(earthMasses * 100).toFixed(2)}% Earth`
  if (earthMasses < 1) return `${earthMasses.toFixed(3)}× Earth`
  if (earthMasses >= 100) return `${formatNumber(earthMasses, 0)}× Earth`
  return `${earthMasses.toFixed(1)}× Earth`
}

export function formatDistance(km: number): string {
  const au = km / 149_597_870.7
  if (au >= 1) return `${au.toFixed(2)} AU`
  return `${formatNumber(km, 0)} km`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function pluralise(n: number, singular: string, plural?: string): string {
  return n === 1 ? singular : (plural ?? singular + 's')
}

export function habitabilityLabel(score: number): string {
  if (score >= 80) return 'Highly Habitable'
  if (score >= 50) return 'Marginally Habitable'
  if (score >= 20) return 'Potentially Habitable'
  if (score >= 10) return 'Extremely Challenging'
  return 'Uninhabitable'
}

export function habitabilityColor(score: number): string {
  if (score >= 80) return '#4CAF50'
  if (score >= 50) return '#8BC34A'
  if (score >= 20) return '#FFC107'
  if (score >= 10) return '#FF9800'
  return '#E03C31'
}

export function missionTypeLabel(type: string): string {
  const map: Record<string, string> = {
    flyby: 'Flyby',
    orbiter: 'Orbiter',
    lander: 'Lander',
    rover: 'Rover',
    probe: 'Probe',
    crewed: 'Crewed',
    telescope: 'Telescope',
    planned: 'Planned',
  }
  return map[type] ?? type
}

export function missionStatusColor(status: string): string {
  switch (status) {
    case 'active': return '#00E5FF'
    case 'completed': return 'rgba(248,249,250,0.4)'
    case 'planned': return '#FFC107'
    default: return 'rgba(248,249,250,0.4)'
  }
}
