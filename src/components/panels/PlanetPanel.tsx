import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { PLANET_MAP } from '@/data/planets'
import { OverviewTab } from './tabs/OverviewTab'
import { StatsTab } from './tabs/StatsTab'
import { AtmosphereTab } from './tabs/AtmosphereTab'
import { MoonsTab } from './tabs/MoonsTab'
import { MissionsTab } from './tabs/MissionsTab'
import { FactsTab } from './tabs/FactsTab'
import { HabitabilityTab } from './tabs/HabitabilityTab'
import type { PanelTab } from '@/types'

const TABS: { id: PanelTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'stats', label: 'Stats' },
  { id: 'atmosphere', label: 'Atmosphere' },
  { id: 'moons', label: 'Moons' },
  { id: 'missions', label: 'Missions' },
  { id: 'facts', label: 'Facts' },
  { id: 'habitability', label: 'Habitability' },
]

export function PlanetPanel() {
  const {
    isPlanetPanelOpen,
    selectedPlanet,
    activeTab,
    setActiveTab,
    closePlanetPanel,
    setFocusedPlanet,
    setCameraMode,
  } = useCyraStore()

  const planet = selectedPlanet ? PLANET_MAP.get(selectedPlanet) : null

  const handleFocus = () => {
    if (selectedPlanet) {
      setFocusedPlanet(selectedPlanet)
      setCameraMode('focus')
    }
  }

  return (
    <AnimatePresence>
      {isPlanetPanelOpen && planet && (
        <motion.aside
          className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-deep-space/95 border-l border-nebula-cyan/10 backdrop-blur-2xl z-30 flex flex-col overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="complementary"
          aria-label={`${planet.name} detail panel`}
        >
          {/* Top accent line */}
          <div
            className="h-px w-full flex-shrink-0"
            style={{
              background: `linear-gradient(to right, transparent, ${planet.color}66, transparent)`,
            }}
          />

          {/* Header */}
          <div className="flex-shrink-0 px-5 pt-5 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Planet icon */}
                <motion.div
                  className="w-14 h-14 rounded-full flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${planet.color}dd, ${planet.color}55)`,
                    boxShadow: `0 0 24px ${planet.glowColor}44`,
                    border: `1px solid ${planet.color}40`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 16px ${planet.glowColor}30`,
                      `0 0 32px ${planet.glowColor}50`,
                      `0 0 16px ${planet.glowColor}30`,
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <div>
                  <h2 className="text-2xl font-light tracking-wide text-starlight">
                    {planet.name}
                  </h2>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-nebula-cyan/70 font-mono mt-1">
                    {planet.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Focus button */}
                <button
                  onClick={handleFocus}
                  className="text-[9px] tracking-[0.15em] uppercase text-white/30 hover:text-nebula-cyan transition-colors px-2 py-1 border border-white/8 hover:border-nebula-cyan/30 font-mono"
                  title="Focus camera on planet"
                  aria-label="Focus camera on planet"
                >
                  Focus
                </button>
                {/* Close */}
                <button
                  onClick={closePlanetPanel}
                  className="text-white/30 hover:text-white/70 transition-colors p-1.5 hover:bg-white/5"
                  aria-label="Close planet panel"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex-shrink-0 border-b border-white/6 px-2 overflow-x-auto">
            <div className="flex">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-3 py-2.5 text-[10px] tracking-[0.12em] uppercase font-mono whitespace-nowrap
                    border-b transition-all duration-200 focus:outline-none
                    ${
                      activeTab === tab.id
                        ? 'text-nebula-cyan border-nebula-cyan'
                        : 'text-white/30 border-transparent hover:text-white/55'
                    }
                  `}
                  style={{ marginBottom: '-1px' }}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-5 py-5 scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}>
                {activeTab === 'overview' && <OverviewTab planet={planet} />}
                {activeTab === 'stats' && <StatsTab planet={planet} />}
                {activeTab === 'atmosphere' && <AtmosphereTab planet={planet} />}
                {activeTab === 'moons' && <MoonsTab planet={planet} />}
                {activeTab === 'missions' && <MissionsTab planet={planet} />}
                {activeTab === 'facts' && <FactsTab planet={planet} />}
                {activeTab === 'habitability' && <HabitabilityTab planet={planet} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
