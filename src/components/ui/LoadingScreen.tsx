import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CYRA_WELCOME_SEQUENCE } from '@/data/cyra'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    CYRA_WELCOME_SEQUENCE.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setStep(i)
        }, i * 600)
      )
    })
    timers.push(
      setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 800)
      }, CYRA_WELCOME_SEQUENCE.length * 600 + 400)
    )
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated orb */}
          <motion.div
            className="relative w-20 h-20 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-nebula-cyan/30 to-transparent animate-pulse" />
            <div className="absolute inset-2 rounded-full border border-nebula-cyan/40" />
            <div className="absolute inset-4 rounded-full border border-nebula-cyan/20" />
            <div className="absolute inset-[38%] rounded-full bg-nebula-cyan shadow-[0_0_20px_#00E5FF]" />
          </motion.div>

          {/* Sequence text */}
          <div className="h-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                className="text-xs tracking-[0.3em] uppercase text-nebula-cyan/70 font-mono"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {CYRA_WELCOME_SEQUENCE[step]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-48 h-px bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-nebula-cyan/60"
              animate={{
                width: `${((step + 1) / CYRA_WELCOME_SEQUENCE.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
