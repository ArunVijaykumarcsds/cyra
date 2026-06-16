import { motion } from 'framer-motion'
import type { Planet } from '@/types'
import { MAX_BARS } from '@/data/planets'

interface StatsTabProps {
  planet: Planet
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.025] border border-white/6 px-3 py-3">
      <div className="text-[9px] tracking-[0.18em] uppercase text-white/30 font-mono mb-1.5">
        {label}
      </div>
      <div className="text-[13px] text-white/80 font-light leading-tight">{value}</div>
    </div>
  )
}

interface BarProps {
  label: string
  value: number
  max: number
  color: string
  unit: string
  delay?: number
}

function Bar({ label, value, max, color, unit, delay = 0 }: BarProps) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[11px] text-white/50">{label}</span>
        <span className="text-[11px] font-mono text-white/60">
          {value.toLocaleString()}
          <span className="text-white/30 ml-1">{unit}</span>
        </span>
      </div>
      <div className="h-0.5 bg-white/6 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay }}
        />
      </div>
      <div className="text-[9px] text-white/25 font-mono mt-1 text-right">
        {pct.toFixed(0)}% of Solar System max
      </div>
    </div>
  )
}

export function StatsTab({ planet }: StatsTabProps) {
  const s = planet.stats
  const b = planet.bars

  const statEntries = [
    { label: 'Diameter', value: s.diameter },
    { label: 'Mass', value: s.mass },
    { label: 'Surface Gravity', value: s.gravity },
    { label: 'Distance from Sun', value: s.distanceFromSun },
    { label: 'Day Length', value: s.dayLength },
    { label: 'Year Length', value: s.yearLength },
    { label: 'Moon Count', value: s.moonCount },
    { label: 'Temperature Range', value: s.temperature },
    { label: 'Axial Tilt', value: s.axialTilt },
    { label: 'Orbital Speed', value: s.orbitalSpeed },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-1.5 mb-6">
        {statEntries.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      {/* Relative bars */}
      <div className="border-t border-white/6 pt-5">
        <div className="text-[9px] tracking-[0.2em] uppercase text-nebula-cyan/60 font-mono mb-4">
          Relative Scale vs Solar System
        </div>
        <Bar
          label="Diameter"
          value={b.diameter}
          max={MAX_BARS.diameter}
          color="#00E5FF"
          unit="km"
          delay={0.1}
        />
        <Bar
          label="Gravity"
          value={b.gravity}
          max={MAX_BARS.gravity}
          color="#FFC107"
          unit="m/s²"
          delay={0.2}
        />
        <Bar
          label="Moon Count"
          value={b.moons}
          max={MAX_BARS.moons}
          color="#E03C31"
          unit="moons"
          delay={0.3}
        />
        <Bar
          label="Mass (Earth = 1)"
          value={b.mass}
          max={MAX_BARS.mass}
          color="#9C27B0"
          unit="× Earth"
          delay={0.4}
        />
      </div>
    </motion.div>
  )
}
