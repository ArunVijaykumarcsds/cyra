import { motion } from 'framer-motion'
import { useCyraStore } from '@/store'

export function ControlsHint() {
  const { isLandingVisible, isPlanetPanelOpen } = useCyraStore()

  if (isLandingVisible) return null

  return (
    <motion.div
      className="fixed bottom-16 right-5 z-10 text-right pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isPlanetPanelOpen ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {[
        ['Drag', 'Rotate'],
        ['Scroll', 'Zoom'],
        ['Click', 'Explore'],
        ['/ or F', 'Search'],
      ].map(([key, action]) => (
        <div key={key} className="flex items-center justify-end gap-2 mb-1">
          <span className="text-[9px] tracking-[0.15em] uppercase text-white/20 font-mono">
            {action}
          </span>
          <span className="text-[9px] tracking-[0.12em] uppercase text-white/12 font-mono border border-white/8 px-1.5 py-0.5">
            {key}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
