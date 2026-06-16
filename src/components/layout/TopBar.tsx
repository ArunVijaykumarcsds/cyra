import { motion } from 'framer-motion'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function TopBar() {
  const {
    isLandingVisible,
    isCompareOpen,
    isLearnOpen,
    isSearchOpen,
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

  if (isLandingVisible) return null

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,5,0.9) 0%, transparent 100%)',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Logo */}
      <button
        onClick={() => {
          resetCamera()
          speakOverview()
        }}
        className="flex items-center gap-2 group focus:outline-none"
        aria-label="CYRA - Return to overview"
      >
        {/* Mini orb */}
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nebula-cyan/80 to-blue-700/60 group-hover:shadow-[0_0_16px_rgba(0,229,255,0.6)] transition-shadow duration-300" />
          <div className="absolute inset-[35%] rounded-full bg-white/80" />
        </div>
        <span className="text-sm font-light tracking-[0.4em] text-starlight/90 group-hover:text-starlight transition-colors duration-200">
          CY<span className="text-nebula-cyan">R</span>A
        </span>
      </button>

      {/* Center nav */}
      <nav className="hidden md:flex items-center gap-1.5" role="navigation" aria-label="Main navigation">
        <Button
          variant="ghost"
          size="sm"
          active={isSearchOpen}
          onClick={() => { toggleSearch(); speakSearch() }}
          aria-label="Search planets and moons (press /)"
        >
          <span className="mr-1.5 opacity-60">⌕</span>
          Search
        </Button>

        <Button
          variant="ghost"
          size="sm"
          active={isCompareOpen}
          onClick={() => { toggleCompare(); speakCompare() }}
          aria-label="Compare two planets"
        >
          Compare
        </Button>

        <Button
          variant="ghost"
          size="sm"
          active={isLearnOpen}
          onClick={() => { toggleLearn(); speakLearn() }}
          aria-label="Open learning mode"
        >
          Learn
        </Button>

        <div className="w-px h-4 bg-white/8 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          active={showOrbits}
          onClick={toggleOrbits}
          aria-label={showOrbits ? 'Hide orbit paths' : 'Show orbit paths'}
          aria-pressed={showOrbits}
        >
          Orbits
        </Button>

        <Button
          variant="ghost"
          size="sm"
          active={showLabels}
          onClick={toggleLabels}
          aria-label={showLabels ? 'Hide planet labels' : 'Show planet labels'}
          aria-pressed={showLabels}
        >
          Labels
        </Button>

        <div className="w-px h-4 bg-white/8 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => { resetCamera(); speakOverview() }}
          aria-label="Reset camera to overview"
        >
          Overview
        </Button>
      </nav>

      {/* Mobile menu trigger */}
      <MobileNavTrigger />
    </motion.header>
  )
}

function MobileNavTrigger() {
  const { isMobileMenuOpen, toggleMobileMenu } = useCyraStore()

  return (
    <button
      className="md:hidden flex flex-col gap-1 p-2 focus:outline-none"
      onClick={toggleMobileMenu}
      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isMobileMenuOpen}
    >
      <span className={cn(
        'block w-5 h-px bg-white/60 transition-all duration-200',
        isMobileMenuOpen && 'rotate-45 translate-y-1.5'
      )} />
      <span className={cn(
        'block w-5 h-px bg-white/60 transition-all duration-200',
        isMobileMenuOpen && 'opacity-0'
      )} />
      <span className={cn(
        'block w-5 h-px bg-white/60 transition-all duration-200',
        isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
      )} />
    </button>
  )
}
