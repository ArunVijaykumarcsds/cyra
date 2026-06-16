import type { PlanetName } from '@/types'

export const CYRA_WELCOME_SEQUENCE = [
  'Initializing stellar cartography…',
  'Calibrating orbital mechanics…',
  'Loading planetary archives…',
  'CYRA online. Welcome, explorer.',
]

export const CYRA_MESSAGES: Record<string, string> = {
  welcome:
    'Welcome. I am CYRA — your Cosmic Yielded Research Assistant. The Solar System awaits your exploration. Click any planet to begin, or use the search to navigate directly to a world.',
  overview:
    'You are now viewing the full Solar System. Eight planets orbit our Sun, ranging from scorched Mercury to frozen Neptune. Each world holds billions of years of history. Where shall we begin?',
  Mercury:
    'Mercury — the swift messenger. Nearest to our Sun, yet not the hottest world. Its barren surface bears craters older than 4 billion years. A single day here lasts longer than its entire year.',
  Venus:
    "Venus — Earth's twin in size, but transformed beyond recognition. CO₂ clouds trap enough heat to melt lead. Surface pressure would crush a submarine. Yet at 55 km altitude, conditions are almost Earth-like.",
  Earth:
    "Earth — our home. The pale blue dot. Of all the worlds in our Solar System, only this one is confirmed to harbor life. Every ocean, mountain, and living thing exists on this fragile sphere. Treasure it.",
  Mars:
    "Mars — the Red Planet. Iron oxide dust gives it its crimson hue. The Solar System's tallest volcano rises 22 km here. Ancient rivers carved its surface billions of years ago. Perseverance searches its lake beds for life.",
  Jupiter:
    'Jupiter — sovereign of the Solar System. More massive than all other planets combined. Its Great Red Spot is a storm older than 350 years. Its moon Europa may harbor life in a hidden ocean.',
  Saturn:
    "Saturn — the jewel of our Solar System. Those magnificent rings extend 282,000 km but are thinner than a football field. Beneath Enceladus's ice, a warm ocean churns with organic chemistry.",
  Uranus:
    'Uranus — the tilted giant. A catastrophic collision billions of years ago knocked it sideways. Each pole alternately faces the Sun for 42 years. Deep within, scientists believe it rains diamonds.',
  Neptune:
    "Neptune — the windswept sovereign. Four and a half billion kilometers away. Its captured moon Triton orbits backwards, doomed — it will break apart into rings in 3.6 billion years. We've only visited once.",
  compare:
    'Comparison mode active. Select any two planets to examine their physical characteristics side by side. The differences — and surprising similarities — often reveal deep truths about planetary formation.',
  search:
    'Search active. You can find planets, moons, and historic missions. The Solar System contains hundreds of named worlds — our robotic explorers have visited most of them.',
  learn:
    'Learning mode active. Choose your level — Beginner for the essentials, Student for the mechanisms, Enthusiast for frontier science. Each card links directly to the relevant world in the Solar System.',
}

export const CYRA_CONTEXTUAL = {
  planet_focus: (name: PlanetName) =>
    `Camera locked on ${name}. Use the detail panel to explore its properties, moons, missions, and scientific analysis.`,
  comparison_ready: (a: PlanetName, b: PlanetName) =>
    `Comparing ${a} and ${b}. Notice the scale differences — the Solar System's diversity is extraordinary.`,
  search_result: (query: string) =>
    `Searching the planetary archives for "${query}"…`,
  no_results: (query: string) =>
    `No results found for "${query}". Try searching for a planet name, moon, or mission like "Cassini" or "Europa".`,
}

export const CYRA_FACTS_RANDOM = [
  'Light takes about 8 minutes to travel from the Sun to Earth.',
  'There are more stars in the observable universe than grains of sand on all of Earth\'s beaches.',
  'The Solar System is approximately 4.6 billion years old.',
  'Voyager 1, launched in 1977, is now over 23 billion kilometers from Earth.',
  "Sound cannot travel in space — there is no medium for pressure waves.",
  "The Sun contains 99.86% of all mass in the Solar System.",
  'A year on Mercury is shorter than a day on Mercury.',
  'Diamond rain may fall inside Neptune and Uranus.',
  'Europa has more liquid water than all of Earth\'s oceans combined.',
  'The Great Red Spot is slowly shrinking and may disappear within decades.',
]
