import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

function StarParticle({ x, y, size, delay, duration }: {
  x: number; y: number; size: number; delay: number; duration: number
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, Math.random() * 0.6 + 0.2, 0] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: Math.random() * 4, ease: 'easeInOut' }}
    />
  )
}

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.4,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
}))

export function LandingOverlay() {
  const { isLandingVisible, enterUniverse } = useCyraStore()
  const [showLoader, setShowLoader] = useState(true)
  const [loaderDone, setLoaderDone] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
    setLoaderDone(true)
  }, [])

  const handleEnter = useCallback(() => {
    enterUniverse()
  }, [enterUniverse])

  useEffect(() => {
    if (!loaderDone) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [loaderDone, handleEnter])

  if (!isLandingVisible && !showLoader) return null

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}

      <AnimatePresence>
        {isLandingVisible && loaderDone && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at center, #050D1E 0%, #000005 70%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
          >
            {/* Stars */}
            <div className="absolute inset-0 overflow-hidden">
              {STARS.map((s) => <StarParticle key={s.id} {...s} />)}
            </div>

            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.018]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.4) 2px,rgba(255,255,255,0.4) 4px)' }}
            />

            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,229,255,0.04) 0%,transparent 70%)' }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              {/* Orb */}
              <motion.div
                className="relative mb-10"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 38% 38%,rgba(0,229,255,0.9),rgba(0,80,180,0.5))',
                    border: '1px solid rgba(0,229,255,0.5)',
                  }}
                  animate={{ boxShadow: ['0 0 20px rgba(0,229,255,0.3)','0 0 60px rgba(0,229,255,0.6),0 0 120px rgba(0,229,255,0.15)','0 0 20px rgba(0,229,255,0.3)'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                />
                {[1.35, 1.65, 2.05].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-nebula-cyan/15"
                    style={{ transform: `scale(${scale})` }}
                    animate={{ opacity: [0.15, 0.45, 0.15], scale: [scale, scale * 1.05, scale] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.4, ease: 'easeInOut' }}
                  />
                ))}
                <div className="absolute inset-[42%] rounded-full bg-white" style={{ boxShadow: '0 0 12px rgba(255,255,255,0.8)' }} />
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-light tracking-[0.4em] text-starlight mb-3"
                style={{ textShadow: '0 0 60px rgba(0,229,255,0.4)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                CYRA
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-nebula-cyan/80 font-mono mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Your Intelligent Guide to the Universe
              </motion.p>

              {/* Prompt */}
              <motion.p
                className="text-sm sm:text-base text-white/40 font-light tracking-wide mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                Where would you like to travel today?
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.button
                  onClick={handleEnter}
                  className="relative px-10 py-4 border border-nebula-cyan/40 text-nebula-cyan text-xs tracking-[0.35em] uppercase font-mono focus:outline-none focus-visible:ring-1 focus-visible:ring-nebula-cyan/60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Begin exploring the Solar System"
                >
                  <motion.div className="absolute inset-0 bg-nebula-cyan/8" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                  <span className="absolute top-0 left-0 w-2 h-px bg-nebula-cyan" />
                  <span className="absolute top-0 left-0 w-px h-2 bg-nebula-cyan" />
                  <span className="absolute bottom-0 right-0 w-2 h-px bg-nebula-cyan" />
                  <span className="absolute bottom-0 right-0 w-px h-2 bg-nebula-cyan" />
                  <span className="relative z-10">Begin Exploration</span>
                </motion.button>
              </motion.div>

              <motion.p
                className="mt-4 text-[10px] tracking-widest uppercase text-white/15 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                Press Enter to begin
              </motion.p>
            </div>

            {/* Footer */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <p className="text-[9px] tracking-[0.25em] uppercase text-white/12 font-mono text-center">
                CYRA v1.0 · Cosmic Observatory Platform
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
