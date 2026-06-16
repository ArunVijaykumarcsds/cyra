import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'
import { PLANETS, PLANET_MAP, MAX_BARS } from '@/data/planets'
import type { PlanetName } from '@/types'

interface CompareBarProps {
  label: string
  valueA: string | number
  valueB: string | number
  pctA: number
  pctB: number
  colorA: string
  colorB: string
  delay?: number
}

function CompareBar({
  label,
  valueA,
  valueB,
  pctA,
  pctB,
  colorA,
  colorB,
  delay = 0,
}: CompareBarProps) {
  return (
    <div className="mb-4">
      <div className="text-[9px] tracking-[0.18em] uppercase text-white/30 font-mono mb-2">
        {label}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* Planet A */}
        <div>
          <div className="text-[11px] text-white/55 font-mono mb-1 truncate">{valueA}</div>
          <div className="h-0.5 bg-white/6 overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: colorA }}
              initial={{ width: 0 }}
              animate={{ width: `${pctA}%` }}
              transition={{ duration: 0.9, ease: 'easeOut', delay }}
            />
          </div>
        </div>
        {/* Planet B */}
        <div>
          <div className="text-[11px] text-white/55 font-mono mb-1 truncate text-right">{valueB}</div>
          <div className="h-0.5 bg-white/6 overflow-hidden">
            <motion.div
              className="h-full ml-auto"
              style={{ background: colorB, transformOrigin: 'right' }}
              initial={{ width: 0 }}
              animate={{ width: `${pctB}%` }}
              transition={{ duration: 0.9, ease: 'easeOut', delay }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ComparePanel() {
  const {
    isCompareOpen,
    toggleCompare,
    comparePlanetA,
    comparePlanetB,
    setComparePlanetA,
    setComparePlanetB,
  } = useCyraStore()
  const { speakCompare } = useCyra()

  const pA = PLANET_MAP.get(comparePlanetA)
  const pB = PLANET_MAP.get(comparePlanetB)

  const selectStyle =
    'bg-deep-space/90 border border-white/12 text-white/70 text-[11px] px-2 py-1.5 font-mono focus:outline-none focus:border-nebula-cyan/40 cursor-pointer'

  return (
    <AnimatePresence>
      {isCompareOpen && pA && pB && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-25 bg-deep-space/96 border-t border-nebula-cyan/10 backdrop-blur-2xl"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="region"
          aria-label="Planet comparison panel"
        >
          {/* Top accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-nebula-cyan/30 to-transparent" />

          <div className="max-w-4xl mx-auto px-5 py-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <span className="text-[9px] tracking-[0.25em] uppercase text-nebula-cyan/60 font-mono">
                  Planet Comparison
                </span>

                {/* Planet selectors */}
                <div className="flex items-center gap-2">
                  <select
                    value={comparePlanetA}
                    onChange={(e) => {
                      setComparePlanetA(e.target.value as PlanetName)
                      speakCompare()
                    }}
                    className={selectStyle}
                    aria-label="Select first planet to compare"
                  >
                    {PLANETS.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>

                  <span className="text-white/20 text-xs">vs</span>

                  <select
                    value={comparePlanetB}
                    onChange={(e) => {
                      setComparePlanetB(e.target.value as PlanetName)
                      speakCompare()
                    }}
                    className={selectStyle}
                    aria-label="Select second planet to compare"
                  >
                    {PLANETS.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={toggleCompare}
                className="text-white/25 hover:text-white/60 transition-colors p-1.5"
                aria-label="Close comparison panel"
              >
                ✕
              </button>
            </div>

            {/* Planet name headers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ background: pA.color, boxShadow: `0 0 8px ${pA.glowColor}50` }}
                />
                <span className="text-base font-light" style={{ color: pA.color }}>
                  {pA.name}
                </span>
                <span className="text-[10px] text-white/30 font-mono">{pA.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ background: pB.color, boxShadow: `0 0 8px ${pB.glowColor}50` }}
                />
                <span className="text-base font-light" style={{ color: pB.color }}>
                  {pB.name}
                </span>
                <span className="text-[10px] text-white/30 font-mono">{pB.type}</span>
              </div>
            </div>

            {/* Comparison bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <CompareBar
                  label="Diameter"
                  valueA={pA.stats.diameter}
                  valueB={pB.stats.diameter}
                  pctA={(pA.bars.diameter / MAX_BARS.diameter) * 100}
                  pctB={(pB.bars.diameter / MAX_BARS.diameter) * 100}
                  colorA={pA.color}
                  colorB={pB.color}
                  delay={0.1}
                />
                <CompareBar
                  label="Surface Gravity"
                  valueA={pA.stats.gravity}
                  valueB={pB.stats.gravity}
                  pctA={(pA.bars.gravity / MAX_BARS.gravity) * 100}
                  pctB={(pB.bars.gravity / MAX_BARS.gravity) * 100}
                  colorA={pA.color}
                  colorB={pB.color}
                  delay={0.2}
                />
                <CompareBar
                  label="Moon Count"
                  valueA={pA.stats.moonCount}
                  valueB={pB.stats.moonCount}
                  pctA={(pA.bars.moons / MAX_BARS.moons) * 100}
                  pctB={(pB.bars.moons / MAX_BARS.moons) * 100}
                  colorA={pA.color}
                  colorB={pB.color}
                  delay={0.3}
                />
              </div>
              <div>
                <CompareBar
                  label="Mass (Earth = 1)"
                  valueA={`${pA.bars.mass}× Earth`}
                  valueB={`${pB.bars.mass}× Earth`}
                  pctA={Math.min(100, (pA.bars.mass / MAX_BARS.mass) * 100)}
                  pctB={Math.min(100, (pB.bars.mass / MAX_BARS.mass) * 100)}
                  colorA={pA.color}
                  colorB={pB.color}
                  delay={0.1}
                />
                <CompareBar
                  label="Day Length"
                  valueA={pA.stats.dayLength}
                  valueB={pB.stats.dayLength}
                  pctA={50}
                  pctB={50}
                  colorA={pA.color}
                  colorB={pB.color}
                  delay={0.2}
                />
                <CompareBar
                  label="Habitability"
                  valueA={`${pA.habitabilityScore}/100`}
                  valueB={`${pB.habitabilityScore}/100`}
                  pctA={pA.habitabilityScore}
                  pctB={pB.habitabilityScore}
                  colorA={pA.color}
                  colorB={pB.color}
                  delay={0.3}
                />
              </div>
            </div>

            {/* Temperature row */}
            <div className="border-t border-white/5 pt-3 mt-1 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[9px] tracking-[0.15em] uppercase text-white/25 font-mono">Temperature</span>
                <p className="text-[12px] text-white/55 mt-1">{pA.stats.temperature}</p>
              </div>
              <div>
                <span className="text-[9px] tracking-[0.15em] uppercase text-white/25 font-mono">Temperature</span>
                <p className="text-[12px] text-white/55 mt-1">{pB.stats.temperature}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
