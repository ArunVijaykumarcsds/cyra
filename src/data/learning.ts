import type { LearningCard, PlanetName } from '@/types'

export const LEARNING_CARDS: LearningCard[] = [
  // ── BEGINNER ──────────────────────────────────────────────────────────────
  {
    id: 'b-01',
    title: 'What Is a Planet?',
    description:
      'A planet is a large round ball of rock or gas that orbits a star. Our Solar System has 8 planets, all orbiting our Sun. They range from tiny rocky Mercury to colossal Jupiter.',
    level: 'beginner',
    planetName: 'Earth',
    icon: '🌍',
    tags: ['planets', 'basics', 'solar system'],
  },
  {
    id: 'b-02',
    title: 'Why Is Mercury Not the Hottest?',
    description:
      'Even though Mercury is closest to the Sun, Venus is actually hotter! Venus has a thick blanket of gas that traps heat — like a greenhouse — while Mercury has almost no atmosphere at all.',
    level: 'beginner',
    planetName: 'Mercury',
    icon: '☿',
    tags: ['temperature', 'atmosphere', 'mercury', 'venus'],
  },
  {
    id: 'b-03',
    title: 'The Red Color of Mars',
    description:
      'Mars looks red because its surface is covered in iron oxide — which is just rust! The same chemical reaction that makes metal go rusty on Earth gives Mars its famous crimson color.',
    level: 'beginner',
    planetName: 'Mars',
    icon: '🔴',
    tags: ['mars', 'color', 'surface'],
  },
  {
    id: 'b-04',
    title: "Saturn's Incredible Rings",
    description:
      "Saturn's rings are made of billions of pieces of ice and rock — from tiny grains to chunks the size of a house. They extend hundreds of thousands of kilometers but are surprisingly thin.",
    level: 'beginner',
    planetName: 'Saturn',
    icon: '🪐',
    tags: ['saturn', 'rings', 'ice'],
  },
  {
    id: 'b-05',
    title: 'Jupiter, the Giant',
    description:
      'Jupiter is so huge that all other planets combined could fit inside it — twice over. Its famous Great Red Spot is a storm bigger than Earth that has lasted for hundreds of years.',
    level: 'beginner',
    planetName: 'Jupiter',
    icon: '🌀',
    tags: ['jupiter', 'size', 'storms'],
  },
  {
    id: 'b-06',
    title: "Earth's Goldilocks Position",
    description:
      "Earth sits in the habitable zone — not too hot, not too cold. This 'just right' distance from the Sun means liquid water can exist on our surface, making life possible.",
    level: 'beginner',
    planetName: 'Earth',
    icon: '💧',
    tags: ['earth', 'habitability', 'water'],
  },
  {
    id: 'b-07',
    title: 'Why Uranus Spins Sideways',
    description:
      "Uranus rotates on its side — its axis is tilted almost 98 degrees! Scientists believe a large object crashed into Uranus billions of years ago, knocking it over like a bowling pin.",
    level: 'beginner',
    planetName: 'Uranus',
    icon: '🌀',
    tags: ['uranus', 'tilt', 'collision'],
  },
  {
    id: 'b-08',
    title: 'Neptune: Found by Math',
    description:
      "Neptune was discovered in 1846 without anyone ever seeing it first. Scientists noticed Uranus wasn't moving quite right and used math to predict exactly where an unseen planet must be hiding.",
    level: 'beginner',
    planetName: 'Neptune',
    icon: '🔭',
    tags: ['neptune', 'discovery', 'history'],
  },

  // ── STUDENT ───────────────────────────────────────────────────────────────
  {
    id: 's-01',
    title: "Mercury's Strange Day",
    description:
      "Mercury has a 3:2 spin-orbit resonance — it rotates exactly 3 times for every 2 orbits around the Sun. This creates a peculiar double-sunrise: from certain spots, the Sun appears to rise, reverse, and rise again.",
    level: 'student',
    planetName: 'Mercury',
    icon: '☀️',
    tags: ['mercury', 'rotation', 'orbital mechanics'],
  },
  {
    id: 's-02',
    title: "Venus's Runaway Greenhouse",
    description:
      "Venus demonstrates what happens when CO₂ spirals out of control. CO₂ traps heat → planet warms → more CO₂ released from rocks → more heat trapped. This feedback loop transformed Venus from a potentially ocean-covered world into a 465°C hellscape.",
    level: 'student',
    planetName: 'Venus',
    icon: '♀️',
    tags: ['venus', 'greenhouse effect', 'climate'],
  },
  {
    id: 's-03',
    title: "Mars Lost Its Magnetic Shield",
    description:
      'Mars had a global magnetic field 4 billion years ago. When its core solidified and the field collapsed, solar wind gradually stripped away the atmosphere — ending surface liquid water and transforming a potentially habitable world into the desert we see today.',
    level: 'student',
    planetName: 'Mars',
    icon: '🧲',
    tags: ['mars', 'magnetosphere', 'atmosphere'],
  },
  {
    id: 's-04',
    title: 'Jupiter as Gravitational Shepherd',
    description:
      "Jupiter's enormous gravity has shaped the entire Solar System. The 'Grand Tack' hypothesis suggests early Jupiter migrated inward, sculpted the asteroid belt, and may have scattered water-bearing asteroids toward early Earth — potentially enabling life here.",
    level: 'student',
    planetName: 'Jupiter',
    icon: '🌌',
    tags: ['jupiter', 'gravity', 'solar system formation'],
  },
  {
    id: 's-05',
    title: "Saturn's Rings Are Young",
    description:
      "Saturn's rings are only about 100 million years old — they formed during the age of dinosaurs on Earth. They're likely debris from a destroyed moon, and at their current rate of loss they'll be gone in another 100 million years.",
    level: 'student',
    planetName: 'Saturn',
    icon: '💫',
    tags: ['saturn', 'rings', 'formation'],
  },
  {
    id: 's-06',
    title: 'Uranus Has Extreme Seasons',
    description:
      "Because Uranus is tilted 98°, each pole experiences 42 years of continuous sunlight followed by 42 years of complete darkness. Despite this extreme seasonal variation, temperature differences between poles are surprisingly small — the atmosphere equalizes heat efficiently.",
    level: 'student',
    planetName: 'Uranus',
    icon: '🌞',
    tags: ['uranus', 'seasons', 'tilt'],
  },
  {
    id: 's-07',
    title: 'Le Verrier and the Math Discovery',
    description:
      "Neptune's discovery by French astronomer Urbain Le Verrier is a landmark in science. By analyzing deviations in Uranus's orbit, he calculated Neptune's exact position. Johann Galle found it within 1° of the prediction — the first planet found by pure mathematics.",
    level: 'student',
    planetName: 'Neptune',
    icon: '📐',
    tags: ['neptune', 'discovery', 'mathematics'],
  },
  {
    id: 's-08',
    title: "Earth's Stabilizing Moon",
    description:
      "The Moon stabilizes Earth's axial tilt to within a few degrees over millions of years. Without the Moon, Earth's tilt could oscillate chaotically between 0° and 85°, causing catastrophic climate swings that might have prevented complex life from evolving.",
    level: 'student',
    planetName: 'Earth',
    icon: '🌕',
    tags: ['earth', 'moon', 'habitability'],
  },

  // ── ENTHUSIAST ────────────────────────────────────────────────────────────
  {
    id: 'e-01',
    title: "Mercury's Anomalous Core",
    description:
      "MESSENGER revealed Mercury's iron core spans 85% of the planet's radius — far larger than expected for such a small body. The leading hypothesis: a giant impact stripped away most of the silicate mantle. The off-center magnetic field suggests a unique asymmetric dynamo in the partially solidified core.",
    level: 'enthusiast',
    planetName: 'Mercury',
    icon: '⚛️',
    tags: ['mercury', 'core', 'magnetic field', 'dynamo'],
  },
  {
    id: 'e-02',
    title: 'Phosphine and Venus Cloud Life',
    description:
      "At 50-60 km altitude, Venus has Earth-like temperature and pressure. The 2020 phosphine detection (PH₃ at ~20 ppb) — a molecule typically associated with biology — sparked debate. Though the detection was partially retracted, the atmospheric chemistry remains unexplained and drives continued exploration.",
    level: 'enthusiast',
    planetName: 'Venus',
    icon: '🦠',
    tags: ['venus', 'astrobiology', 'atmosphere', 'phosphine'],
  },
  {
    id: 'e-03',
    title: "Perseverance's Organic Finds",
    description:
      "SHERLOC on Perseverance detected aromatic organic molecules in Jezero Crater's fine-grained sedimentary layers — exactly the material expected to preserve biosignatures. Whether biological, geological, or meteoritic in origin is the central question of the Mars Sample Return program.",
    level: 'enthusiast',
    planetName: 'Mars',
    icon: '🧬',
    tags: ['mars', 'organics', 'biosignatures', 'perseverance'],
  },
  {
    id: 'e-04',
    title: "Juno's Interior Revelations",
    description:
      "Juno's gravity data revealed Jupiter's interior has a 'fuzzy' dilute core — not a compact rock-ice center — surrounded by a region where heavy elements gradually mix with metallic hydrogen. Atmospheric dynamics extend thousands of km deep with differential rotation that decouples below the weather layer.",
    level: 'enthusiast',
    planetName: 'Jupiter',
    icon: '🌊',
    tags: ['jupiter', 'interior', 'juno', 'metallic hydrogen'],
  },
  {
    id: 'e-05',
    title: "Cassini's Grand Finale Discoveries",
    description:
      "Cassini's final 22 dives between Saturn and its rings revealed ring material raining into the atmosphere at thousands of kg/s, an unexpectedly complex dust environment, and that the rings impart angular momentum to Saturn. The interior shows differential rotation with an enigmatic deep jet structure.",
    level: 'enthusiast',
    planetName: 'Saturn',
    icon: '🛸',
    tags: ['saturn', 'cassini', 'rings', 'atmosphere'],
  },
  {
    id: 'e-06',
    title: "Uranus's Thermal Mystery",
    description:
      "Uranus emits almost no internal heat — uniquely among giant planets. A proposed 'stably stratified layer' of high-density material may insulate the interior, preventing convective heat escape. This could be a compositional gradient created by impacts or differentiation, fundamentally distinct from Neptune's convective interior.",
    level: 'enthusiast',
    planetName: 'Uranus',
    icon: '🌡️',
    tags: ['uranus', 'interior', 'heat flow', 'convection'],
  },
  {
    id: 'e-07',
    title: "Triton's Destined Destruction",
    description:
      "Triton orbits Neptune retrograde (backwards), proving it's a captured Kuiper Belt Object. This capture violently disrupted Neptune's original moon system. Tidal deceleration gradually lowers Triton's orbit — in 3.6 billion years it will cross the Roche limit and fragment into a spectacular ring system.",
    level: 'enthusiast',
    planetName: 'Neptune',
    icon: '💥',
    tags: ['neptune', 'triton', 'kuiper belt', 'tidal forces'],
  },
  {
    id: 'e-08',
    title: 'Europa and the Search for Life',
    description:
      "Europa's subsurface ocean contains twice Earth's total ocean volume. Cassini's Europa flybys and Hubble observations of plumes confirm liquid water. The Europa Clipper will measure ice shell thickness, ocean salinity, and search for organic molecules — assessing whether hydrothermal vents could power life as they do in Earth's deep oceans.",
    level: 'enthusiast',
    planetName: 'Jupiter',
    icon: '🔬',
    tags: ['europa', 'ocean', 'astrobiology', 'life'],
  },
]
