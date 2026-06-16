import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { SolarSystem } from '@/components/canvas/SolarSystem'
import { CyraGuide } from '@/components/ui/CyraGuide'
import { SearchBar } from '@/components/ui/SearchBar'
import { PlanetPills } from '@/components/ui/PlanetPills'
import { ControlsHint } from '@/components/ui/ControlsHint'
import { PlanetPanel } from '@/components/panels/PlanetPanel'
import { ComparePanel } from '@/components/panels/ComparePanel'
import { LearnPanel } from '@/components/panels/LearnPanel'

export default function ExplorePage() {
  const { isLandingVisible } = useCyraStore()

  return (
    <div className="relative w-full h-full">
      {/* 3D Solar System Canvas — always mounted so Three.js initialises early */}
      <div className="absolute inset-0">
        <SolarSystem />
      </div>

      {/* UI overlay — only visible after landing */}
      <AnimatePresence>
        {!isLandingVisible && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* All interactive UI layers have pointer-events re-enabled individually */}

            {/* Search overlay */}
            <div className="pointer-events-auto">
              <SearchBar />
            </div>

            {/* Planet detail panel */}
            <div className="pointer-events-auto">
              <PlanetPanel />
            </div>

            {/* Compare panel */}
            <div className="pointer-events-auto">
              <ComparePanel />
            </div>

            {/* Learn panel */}
            <div className="pointer-events-auto">
              <LearnPanel />
            </div>

            {/* CYRA guide */}
            <div className="pointer-events-auto">
              <CyraGuide />
            </div>

            {/* Planet pills */}
            <div className="pointer-events-auto">
              <PlanetPills />
            </div>

            {/* Controls hint */}
            <ControlsHint />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
