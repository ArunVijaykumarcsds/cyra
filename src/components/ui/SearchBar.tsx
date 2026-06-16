import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearch } from '@/hooks/useSearch'
import { useCyraStore } from '@/store'
import { useCyra } from '@/hooks/useCyra'
import { getSearchResultTab } from '@/services/search'
import type { PlanetName, PanelTab } from '@/types'

const TYPE_ICONS: Record<string, string> = {
  planet: '◉',
  moon: '◌',
  mission: '◈',
  fact: '◆',
}

export function SearchBar() {
  const { searchQuery, searchResults, isSearchOpen, handleQueryChange, closeSearch } = useSearch()
  const { openPlanetPanel, setActiveTab } = useCyraStore()
  const { speakPlanet, speakSearch } = useCyra()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSelect = (result: { planetName: PlanetName; type: string }) => {
    const tab = getSearchResultTab(result as Parameters<typeof getSearchResultTab>[0]) as PanelTab
    openPlanetPanel(result.planetName)
    setActiveTab(tab)
    speakPlanet(result.planetName)
    closeSearch()
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
          />

          {/* Search panel */}
          <motion.div
            className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nebula-cyan/50 text-sm select-none">
                ⌕
              </span>
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => {
                  handleQueryChange(e.target.value)
                  if (e.target.value) speakSearch()
                }}
                onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                placeholder="Search planets, moons, missions…"
                className="w-full bg-deep-space/95 border border-nebula-cyan/25 text-starlight pl-9 pr-10 py-3 text-sm font-light tracking-wide placeholder:text-white/25 focus:outline-none focus:border-nebula-cyan/50 backdrop-blur-xl"
                aria-label="Search the Solar System"
                role="combobox"
                aria-expanded={searchResults.length > 0}
                aria-haspopup="listbox"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  onClick={() => handleQueryChange('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  className="bg-deep-space/98 border border-nebula-cyan/12 border-t-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  role="listbox"
                  aria-label="Search results"
                >
                  {searchResults.map((result, i) => (
                    <motion.button
                      key={result.id}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-nebula-cyan/5 transition-colors border-b border-white/4 last:border-0 focus:outline-none focus:bg-nebula-cyan/5"
                      onClick={() => handleSelect(result)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      role="option"
                    >
                      {/* Color dot */}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: result.planetColor }}
                      />
                      {/* Type icon */}
                      <span className="text-white/25 text-xs font-mono w-3">
                        {TYPE_ICONS[result.type]}
                      </span>
                      {/* Text */}
                      <span className="flex-1 min-w-0">
                        <span className="text-sm text-white/85 block truncate">
                          {result.title}
                        </span>
                        <span className="text-xs text-white/35 block truncate mt-0.5">
                          {result.subtitle}
                        </span>
                      </span>
                      {/* Type badge */}
                      <span className="text-[10px] tracking-widest uppercase text-white/25 font-mono flex-shrink-0">
                        {result.type}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="bg-deep-space/98 border border-nebula-cyan/12 border-t-0 px-4 py-3">
                  <p className="text-xs text-white/35 tracking-wide">
                    No results for "{searchQuery}"
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Keyboard hint */}
            <p className="text-center text-[10px] text-white/20 tracking-widest uppercase mt-2">
              ESC to close · ↑↓ navigate · Enter to select
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
