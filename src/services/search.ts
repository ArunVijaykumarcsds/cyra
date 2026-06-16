import { PLANETS } from '@/data/planets'
import type { SearchResult, PlanetName } from '@/types'

export function searchPlanetary(query: string): SearchResult[] {
  if (!query || query.trim().length < 1) return []
  const q = query.toLowerCase().trim()
  const results: SearchResult[] = []

  for (const planet of PLANETS) {
    // Planet name match
    if (planet.name.toLowerCase().includes(q)) {
      results.push({
        id: `planet-${planet.name}`,
        type: 'planet',
        title: planet.name,
        subtitle: planet.type,
        planetName: planet.name as PlanetName,
        planetColor: planet.color,
      })
    }

    // Moon matches
    for (const moon of planet.moons) {
      if (moon.name.toLowerCase().includes(q)) {
        results.push({
          id: `moon-${moon.name}`,
          type: 'moon',
          title: moon.name,
          subtitle: `Moon of ${planet.name}`,
          planetName: planet.name as PlanetName,
          planetColor: planet.color,
        })
      }
    }

    // Mission matches
    for (const mission of planet.missions) {
      if (
        mission.name.toLowerCase().includes(q) ||
        mission.agency.toLowerCase().includes(q)
      ) {
        results.push({
          id: `mission-${mission.name}`,
          type: 'mission',
          title: mission.name,
          subtitle: `${mission.agency} · ${mission.year} · ${planet.name}`,
          planetName: planet.name as PlanetName,
          planetColor: planet.color,
        })
      }
    }

    // Fact matches (partial)
    for (const fact of planet.facts) {
      if (fact.toLowerCase().includes(q) && results.length < 12) {
        // avoid duplicates for same planet
        const already = results.find(
          (r) => r.type === 'fact' && r.planetName === planet.name
        )
        if (!already) {
          results.push({
            id: `fact-${planet.name}-${fact.slice(0, 20)}`,
            type: 'fact',
            title: `Fact: ${planet.name}`,
            subtitle: fact.length > 60 ? fact.slice(0, 60) + '…' : fact,
            planetName: planet.name as PlanetName,
            planetColor: planet.color,
          })
        }
      }
    }
  }

  // Deduplicate and limit
  const seen = new Set<string>()
  return results
    .filter((r) => {
      if (seen.has(r.id)) return false
      seen.add(r.id)
      return true
    })
    .slice(0, 10)
}

export function getSearchResultTab(result: SearchResult): string {
  switch (result.type) {
    case 'moon': return 'moons'
    case 'mission': return 'missions'
    case 'fact': return 'facts'
    default: return 'overview'
  }
}
