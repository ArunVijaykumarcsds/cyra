import { motion } from 'framer-motion'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'
import { PLANETS } from '@/data/planets'
import { cn } from '@/utils/cn'
import type { PlanetName } from '@/types'

export function PlanetPills() {
  const { selectedPlanet, selectPlanet, isLandingVisible } = useCyraStore()
  const { speakPlanet } = useCyra()

  if (isLandingVisible) return null

  const handleSelect = (name: PlanetName) => {
    selectPlanet(name)
    speakPlanet(name)
  }

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-1.5 px-4 max-w-[90vw]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {PLANETS.map((planet, i) => {
        const isActive = selectedPlanet === planet.name
        return (
          <motion.button
            key={planet.name}
            onClick={() => handleSelect(planet.name as PlanetName)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md',
              'text-[10px] tracking-[0.15em] uppercase font-sans transition-all duration-200',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-nebula-cyan/50',
              isActive
                ? 'border-nebula-cyan/60 text-nebula-cyan bg-nebula-cyan/8'
                : 'border-white/10 text-white/45 bg-black/40 hover:border-white/25 hover:text-white/75'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.05 }}
            aria-label={`Select ${planet.name}`}
            aria-pressed={isActive}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: planet.color }}
            />
            {planet.name}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
