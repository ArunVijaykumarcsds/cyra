import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'

export function MobileMenu() {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    isCompareOpen,
    isLearnOpen,
    showOrbits,
    showLabels,
    toggleCompare,
    toggleLearn,
    toggleSearch,
    toggleOrbits,
    toggleLabels,
    resetCamera,
  } = useCyraStore()

  const { speakCompare, speakLearn, speakSearch, speakOverview } = useCyra()

  const close = () => toggleMobileMenu()

  const items = [
    {
      label: '⌕  Search',
      action: () => { toggleSearch(); speakSearch(); close() },
      active: false,
    },
    {
      label: 'Compare Planets',
      action: () => { toggleCompare(); speakCompare(); close() },
      active: isCompareOpen,
    },
    {
      label: 'Learning Mode',
      action: () => { toggleLearn(); speakLearn(); close() },
      active: isLearnOpen,
    },
    {
      label: showOrbits ? 'Hide Orbits' : 'Show Orbits',
      action: () => { toggleOrbits(); close() },
      active: showOrbits,
    },
    {
      label: showLabels ? 'Hide Labels' : 'Show Labels',
      action: () => { toggleLabels(); close() },
      active: showLabels,
    },
    {
      label: 'Overview',
      action: () => { resetCamera(); speakOverview(); close() },
      active: false,
    },
  ]

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-25 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.nav
            className="fixed top-12 right-3 z-30 bg-deep-space/98 border border-white/8 backdrop-blur-xl min-w-[180px] md:hidden"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className={`
                  w-full text-left px-4 py-3 text-[11px] tracking-[0.15em] uppercase font-mono
                  border-b border-white/5 last:border-0 transition-colors duration-150
                  focus:outline-none focus:bg-white/5
                  ${item.active
                    ? 'text-nebula-cyan bg-nebula-cyan/5'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/3'
                  }
                `}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
