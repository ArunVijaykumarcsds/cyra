import { motion } from 'framer-motion'
import type { Planet } from '@/types'

interface FactsTabProps {
  planet: Planet
}

export function FactsTab({ planet }: FactsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-[10px] text-white/30 tracking-wide mb-4">
        {planet.facts.length} curated facts about {planet.name}
      </div>

      <div className="space-y-0">
        {planet.facts.map((fact, i) => (
          <motion.div
            key={i}
            className="flex gap-4 py-4 border-b border-white/5 last:border-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="font-mono text-[11px] text-nebula-cyan/50 pt-0.5 w-6 flex-shrink-0">
              {String(i + 1).padStart(2, '0')}
            </div>
            <p className="text-[13px] leading-[1.8] text-white/65 font-light">{fact}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
