import { useCallback, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCyraStore } from '@/store'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

// Floating star particle for the landing background
function StarParticle({ x, y, size, delay, duration }: {
  x: number; y: number; size: number; delay: number; duration: number
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, Math.random() * 0.7 + 0.3, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function LandingPage() {
  const { enterUniverse } = useCyraStore()
  const [showLoader, setShowLoader] = useState(true)
  const [loaderDone, setLoaderDone] = useState(false)
  const [stars] = useState(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }))
  )

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
    setLoaderDone(true)
  }, [])

  const handleEnter = useCallback(() => {
    enterUniverse()
  }, [enterUniverse])

  // Keyboard enter
  useEffect(() => {
    if (!loaderDone) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [loaderDone, handleEnter])

  return (
    <>
      {/* Loading sequence */}
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}

      {/* Landing page */}
      <AnimatePresence>
        {loaderDone && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at center, #050D1E 0%, #000005 70%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Star field */}
            <div className="absolute inset-0 overflow-hidden">
              {stars.map((s) => (
                <StarParticle key={s.id} {...s} />
              ))}
            </div>

            {/* Scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)',
              }}
            />

            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)',
              }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              {/* Animated orb */}
              <motion.div
                className="relative mb-10"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 38% 38%, rgba(0,229,255,0.9), rgba(0,80,180,0.5))',
                    border: '1px solid rgba(0,229,255,0.5)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0,229,255,0.3)',
                      '0 0 60px rgba(0,229,255,0.6), 0 0 120px rgba(0,229,255,0.15)',
                      '0 0 20px rgba(0,229,255,0.3)',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                />
                {/* Rings */}
                {[1.3, 1.6, 2.0].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-nebula-cyan/20"
                    style={{ transform: `scale(${scale})`, top: 0, left: 0 }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [scale, scale * 1.04, scale],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: i * 0.4,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
                {/* Center dot */}
                <div
                  className="absolute inset-[42%] rounded-full bg-white"
                  style={{ boxShadow: '0 0 12px rgba(255,255,255,0.8)' }}
                />
              </motion.div>

              {/* CYRA title */}
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

              {/* Prompt text */}
              <motion.p
                className="text-sm sm:text-base text-white/40 font-light tracking-wide mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                Where would you like to travel today?
              </motion.p>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.button
                  onClick={handleEnter}
                  className="relative px-10 py-4 border border-nebula-cyan/40 text-nebula-cyan text-xs tracking-[0.35em] uppercase font-mono overflow-hidden group focus:outline-none focus-visible:ring-1 focus-visible:ring-nebula-cyan/60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'transparent',
                  }}
                  aria-label="Begin exploring the Solar System"
                >
                  {/* Hover fill */}
                  <motion.div
                    className="absolute inset-0 bg-nebula-cyan/8"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  {/* Corner accents */}
                  <span className="absolute top-0 left-0 w-2 h-px bg-nebula-cyan" />
                  <span className="absolute top-0 left-0 w-px h-2 bg-nebula-cyan" />
                  <span className="absolute bottom-0 right-0 w-2 h-px bg-nebula-cyan" />
                  <span className="absolute bottom-0 right-0 w-px h-2 bg-nebula-cyan" />
                  <span className="relative z-10">Begin Exploration</span>
                </motion.button>
              </motion.div>

              {/* Keyboard hint */}
              <motion.p
                className="mt-4 text-[10px] tracking-widest uppercase text-white/15 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                Press Enter to begin
              </motion.p>
            </div>

            {/* Bottom attribution */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <p className="text-[9px] tracking-[0.25em] uppercase text-white/15 font-mono text-center">
                CYRA v1.0 · Cosmic Observatory Platform
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
