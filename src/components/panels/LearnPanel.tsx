import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'
import { LEARNING_CARDS } from '@/data/learning'
import { PLANET_MAP } from '@/data/planets'
import type { LearnLevel, PlanetName } from '@/types'
import { cn } from '@/utils/cn'

const LEVELS: { id: LearnLevel; label: string; desc: string }[] = [
  { id: 'beginner', label: 'Beginner', desc: 'The essentials of our Solar System' },
  { id: 'student', label: 'Student', desc: 'Mechanisms and scientific principles' },
  { id: 'enthusiast', label: 'Enthusiast', desc: 'Frontier research and open questions' },
]

const LEVEL_STYLE = {
  beginner: {
    tab: 'text-nebula-cyan border-nebula-cyan',
    card: 'hover:border-nebula-cyan/30',
    badge: 'text-nebula-cyan bg-nebula-cyan/8 border-nebula-cyan/25',
  },
  student: {
    tab: 'text-apollo-gold border-apollo-gold',
    card: 'hover:border-apollo-gold/30',
    badge: 'text-apollo-gold bg-apollo-gold/8 border-apollo-gold/25',
  },
  enthusiast: {
    tab: 'text-martian-rust border-martian-rust',
    card: 'hover:border-martian-rust/30',
    badge: 'text-martian-rust bg-martian-rust/8 border-martian-rust/25',
  },
}

export function LearnPanel() {
  const { isLearnOpen, toggleLearn, learnLevel, setLearnLevel, selectPlanet } = useCyraStore()
  const { speakLearn, speakPlanet } = useCyra()

  const cards = LEARNING_CARDS.filter((c) => c.level === learnLevel)
  const style = LEVEL_STYLE[learnLevel]

  const handleCardClick = (planetName: PlanetName) => {
    selectPlanet(planetName)
    speakPlanet(planetName)
    toggleLearn()
  }

  return (
    <AnimatePresence>
      {isLearnOpen && (
        <motion.div
          className="fixed inset-0 z-35 bg-black/92 backdrop-blur-xl overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Learning mode"
        >
          <div className="max-w-5xl mx-auto px-5 py-8">
            {/* Header */}
            <motion.div
              className="flex items-start justify-between mb-8"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <h2 className="text-2xl font-light tracking-wide mb-1">Learning Mode</h2>
                <p className="text-sm text-white/35 tracking-wide">
                  Explore the cosmos at your own pace
                </p>
              </div>
              <button
                onClick={toggleLearn}
                className="border border-white/12 text-white/40 hover:text-white/70 hover:border-white/25 transition-all px-4 py-2 text-xs tracking-widest uppercase font-mono"
                aria-label="Close learning mode"
              >
                Exit
              </button>
            </motion.div>

            {/* Level tabs */}
            <motion.div
              className="flex gap-0 border-b border-white/6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {LEVELS.map((level) => {
                const isActive = learnLevel === level.id
                const s = LEVEL_STYLE[level.id]
                return (
                  <button
                    key={level.id}
                    onClick={() => {
                      setLearnLevel(level.id)
                      speakLearn()
                    }}
                    className={cn(
                      'px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-mono border-b-2 transition-all',
                      isActive
                        ? s.tab
                        : 'text-white/30 border-transparent hover:text-white/55'
                    )}
                    style={{ marginBottom: '-1px' }}
                    aria-selected={isActive}
                    role="tab"
                  >
                    {level.label}
                  </button>
                )
              })}
            </motion.div>

            {/* Level description */}
            <motion.p
              key={learnLevel}
              className="text-xs text-white/35 tracking-wide mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {LEVELS.find((l) => l.id === learnLevel)?.desc}
            </motion.p>

            {/* Cards grid */}
            <motion.div
              key={learnLevel + '-grid'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {cards.map((card, i) => {
                const planet = PLANET_MAP.get(card.planetName)
                return (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.planetName)}
                    className={cn(
                      'text-left border border-white/6 bg-white/[0.015] p-4 transition-all duration-200',
                      'focus:outline-none focus-visible:ring-1 focus-visible:ring-nebula-cyan/40',
                      style.card
                    )}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    {/* Planet indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{
                          background: planet
                            ? `radial-gradient(circle at 35% 35%, ${planet.color}cc, ${planet.color}44)`
                            : '#333',
                          border: planet ? `1px solid ${planet.color}40` : 'none',
                        }}
                      />
                      <div>
                        <div
                          className={cn(
                            'text-[9px] tracking-[0.15em] uppercase font-mono border px-1.5 py-0.5 inline-block',
                            style.badge
                          )}
                        >
                          {learnLevel}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-[13px] text-white/85 mb-2 leading-snug">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] leading-[1.75] text-white/40">
                      {card.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                      <span
                        className="text-[9px] tracking-[0.12em] uppercase font-mono"
                        style={{ color: planet?.color ?? '#666' }}
                      >
                        Explore {card.planetName}
                      </span>
                      <span className="text-white/20 text-xs ml-auto">→</span>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
