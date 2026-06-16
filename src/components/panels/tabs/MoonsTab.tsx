import { motion } from 'framer-motion'
import type { Planet } from '@/types'

interface MoonsTabProps {
  planet: Planet
}

export function MoonsTab({ planet }: MoonsTabProps) {
  if (planet.moons.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 text-center"
      >
        <div className="text-3xl mb-3 opacity-20">◌</div>
        <p className="text-[13px] text-white/35">
          {planet.name} has no natural satellites.
        </p>
        <p className="text-[11px] text-white/20 mt-1">
          It orbits the Sun alone.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-[10px] text-white/30 tracking-wide mb-4">
        {planet.stats.moonCount} known moon{planet.moons.length !== 1 ? 's' : ''} ·
        {' '}showing {planet.moons.length} notable
      </div>

      <div className="space-y-3">
        {planet.moons.map((moon, i) => (
          <motion.div
            key={moon.name}
            className="border border-white/6 bg-white/[0.015]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Moon header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-mono text-white/40">{i + 1}</span>
              </div>
              <div>
                <div className="text-[13px] text-white/85">{moon.name}</div>
                {moon.notable && (
                  <div className="text-[9px] tracking-[0.15em] uppercase text-nebula-cyan/60 font-mono mt-0.5">
                    Notable Moon
                  </div>
                )}
              </div>
              {moon.diameter && (
                <div className="ml-auto text-right">
                  <div className="text-[11px] font-mono text-white/40">{moon.diameter}</div>
                  <div className="text-[9px] text-white/20">diameter</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="px-4 py-3">
              <p className="text-[12px] leading-[1.8] text-white/55">{moon.description}</p>
              {moon.distanceFromPlanet && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-white/25 font-mono">
                    Distance
                  </span>
                  <span className="text-[11px] text-white/45 font-mono">
                    {moon.distanceFromPlanet}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
