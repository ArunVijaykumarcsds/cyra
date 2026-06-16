import { motion } from 'framer-motion'
import type { Planet } from '@/types'
import { habitabilityLabel, habitabilityColor } from '@/utils/format'

interface HabitabilityTabProps {
  planet: Planet
}

const LEVEL_LABELS = {
  beginner: 'Beginner',
  student: 'Student',
  enthusiast: 'Enthusiast',
} as const

const LEVEL_COLORS = {
  beginner: 'text-nebula-cyan border-nebula-cyan/20 bg-nebula-cyan/5',
  student: 'text-apollo-gold border-apollo-gold/20 bg-apollo-gold/5',
  enthusiast: 'text-martian-rust border-martian-rust/20 bg-martian-rust/5',
} as const

export function HabitabilityTab({ planet }: HabitabilityTabProps) {
  const color = habitabilityColor(planet.habitabilityScore)
  const label = habitabilityLabel(planet.habitabilityScore)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Score display */}
      <div className="border border-white/6 bg-white/2 p-5 mb-5 text-center">
        <motion.div
          className="text-4xl font-light font-mono mb-1"
          style={{ color }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {planet.habitabilityScore}
          <span className="text-xl text-white/30">/100</span>
        </motion.div>
        <div className="text-[11px] tracking-[0.2em] uppercase font-mono" style={{ color }}>
          {label}
        </div>
        <div className="mt-3 h-1 bg-white/6 mx-4 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${planet.habitabilityScore}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
      </div>

      {/* Analysis text */}
      <p className="text-[13px] leading-[1.9] text-white/65 font-light mb-6">
        {planet.habitability}
      </p>

      {/* Perspective levels */}
      <div className="text-[9px] tracking-[0.2em] uppercase text-nebula-cyan/60 font-mono mb-3">
        Scientific Perspectives
      </div>

      <div className="space-y-3">
        {Object.entries(planet.levelContent).map(([level, content]) => (
          <div
            key={level}
            className={`border px-4 py-3 ${LEVEL_COLORS[level as keyof typeof LEVEL_COLORS]}`}
          >
            <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-2 opacity-70">
              {LEVEL_LABELS[level as keyof typeof LEVEL_LABELS]}
            </div>
            <p className="text-[12px] leading-[1.8] text-white/60">{content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
