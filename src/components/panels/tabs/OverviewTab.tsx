import { motion } from 'framer-motion'
import type { Planet } from '@/types'

interface OverviewTabProps {
  planet: Planet
}

export function OverviewTab({ planet }: OverviewTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-[13px] leading-[1.9] text-white/65 font-light">
        {planet.overview}
      </p>

      {/* Habitability score */}
      <div className="mt-6 p-4 border border-white/6 bg-white/2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 font-mono">
            Habitability Index
          </span>
          <span
            className="text-sm font-mono"
            style={{
              color:
                planet.habitabilityScore >= 50
                  ? '#4CAF50'
                  : planet.habitabilityScore >= 20
                  ? '#FFC107'
                  : '#E03C31',
            }}
          >
            {planet.habitabilityScore} / 100
          </span>
        </div>
        <div className="h-1 bg-white/6 overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              background:
                planet.habitabilityScore >= 50
                  ? '#4CAF50'
                  : planet.habitabilityScore >= 20
                  ? '#FFC107'
                  : '#E03C31',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${planet.habitabilityScore}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { label: 'Type', value: planet.type },
          { label: 'Moons', value: planet.stats.moonCount },
          { label: 'Day Length', value: planet.stats.dayLength },
          { label: 'Temperature', value: planet.stats.temperature },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/2 border border-white/6 px-3 py-2.5">
            <div className="text-[9px] tracking-[0.15em] uppercase text-white/30 font-mono mb-1">
              {label}
            </div>
            <div className="text-[12px] text-white/75">{value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
