import { motion } from 'framer-motion'
import type { Planet } from '@/types'

interface AtmosphereTabProps {
  planet: Planet
}

const COMP_COLORS: Record<string, string> = {
  Hydrogen: '#6BB4E8',
  Helium: '#FFD54F',
  Oxygen: '#81C784',
  Nitrogen: '#4FC3F7',
  'Carbon Dioxide': '#EF9A9A',
  Methane: '#CE93D8',
  Argon: '#80CBC4',
  Sodium: '#FFCC80',
  default: '#90A4AE',
}

function getColor(component: string): string {
  for (const [key, color] of Object.entries(COMP_COLORS)) {
    if (component.includes(key)) return color
  }
  return COMP_COLORS.default
}

function parsePercent(comp: string): number {
  const match = comp.match(/([\d.]+)%/)
  return match ? parseFloat(match[1]) : 0
}

export function AtmosphereTab({ planet }: AtmosphereTabProps) {
  const { atmosphereComposition, atmosphereDescription, atmosphereLayers } = planet

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Description */}
      <p className="text-[13px] leading-[1.9] text-white/65 font-light mb-6">
        {atmosphereDescription}
      </p>

      {/* Composition */}
      {atmosphereComposition.length > 0 && (
        <>
          <div className="text-[9px] tracking-[0.2em] uppercase text-nebula-cyan/60 font-mono mb-3">
            Composition
          </div>
          <div className="space-y-2.5 mb-6">
            {atmosphereComposition.map((comp, i) => {
              const pct = parsePercent(comp)
              const color = getColor(comp)
              return (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-white/55">{comp.split(' ')[0]}</span>
                    <span className="text-[11px] font-mono text-white/50">{comp.match(/[\d.]+%/)?.[0] ?? '—'}</span>
                  </div>
                  <div className="h-0.5 bg-white/6 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: pct > 0 ? `${Math.min(pct, 100)}%` : '2%' }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.08 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* No atmosphere note */}
      {atmosphereComposition.length === 0 && (
        <div className="border border-white/6 bg-white/2 px-4 py-3 mb-6">
          <p className="text-[12px] text-white/40 italic">
            {planet.name} has no significant atmosphere.
          </p>
        </div>
      )}

      {/* Layers */}
      {atmosphereLayers && atmosphereLayers.length > 0 && (
        <>
          <div className="text-[9px] tracking-[0.2em] uppercase text-nebula-cyan/60 font-mono mb-3">
            Atmospheric Layers
          </div>
          <div className="space-y-2">
            {atmosphereLayers.map((layer, i) => (
              <motion.div
                key={layer.name}
                className="border border-white/6 px-3 py-2.5"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-white/75">{layer.name}</span>
                  <span className="text-[10px] font-mono text-nebula-cyan/60">
                    {layer.altitude}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  {layer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
