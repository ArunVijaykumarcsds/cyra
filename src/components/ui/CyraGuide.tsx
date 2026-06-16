import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCyra } from '@/hooks/useCyra'
import { useCyraStore } from '@/store'
import { cn } from '@/utils/cn'

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full bg-nebula-cyan"
          style={{
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

export function CyraGuide() {
  const { cyraMessage, cyraIsTyping, cyraIsVisible } = useCyra()
  const { isLandingVisible } = useCyraStore()
  const [isMinimized, setIsMinimized] = useState(false)

  if (isLandingVisible || !cyraIsVisible) return null

  return (
    <motion.div
      className="fixed bottom-6 left-6 w-72 z-30 select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {/* Orb */}
        <motion.div
          className="relative w-11 h-11 flex-shrink-0 cursor-pointer"
          onClick={() => setIsMinimized((m) => !m)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nebula-cyan/80 to-blue-600/60 border border-nebula-cyan/50" />
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-[-3px] rounded-full border border-nebula-cyan/20"
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-[-6px] rounded-full border border-nebula-cyan/10"
            animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
          />
          {/* Inner glow dot */}
          <div className="absolute inset-[35%] rounded-full bg-white/80 shadow-[0_0_8px_#00E5FF]" />
        </motion.div>

        <div>
          <div className="text-[10px] tracking-[0.25em] text-nebula-cyan uppercase font-mono">
            CYRA
          </div>
          <div className="text-[10px] text-white/30 tracking-wide mt-0.5">
            {cyraIsTyping ? 'Computing response…' : 'Cosmic Intelligence · Active'}
          </div>
        </div>

        <button
          className="ml-auto text-white/20 hover:text-white/50 transition-colors p-1"
          onClick={() => setIsMinimized((m) => !m)}
          aria-label={isMinimized ? 'Expand CYRA' : 'Minimize CYRA'}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            {isMinimized ? (
              <path d="M0 4h10v2H0z" />
            ) : (
              <path d="M0 8h10v2H0zM0 4h10v2H0z" />
            )}
          </svg>
        </button>
      </div>

      {/* Message bubble */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={cn(
                'relative bg-deep-space/90 border border-nebula-cyan/15 backdrop-blur-xl px-4 py-3',
                'before:absolute before:top-0 before:left-5 before:right-5 before:h-px',
                'before:bg-gradient-to-r before:from-transparent before:via-nebula-cyan/40 before:to-transparent'
              )}
            >
              <AnimatePresence mode="wait">
                {cyraIsTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 py-1"
                  >
                    <TypingDots />
                  </motion.div>
                ) : (
                  <motion.p
                    key={cyraMessage}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[13px] leading-[1.75] text-white/75 font-light"
                    dangerouslySetInnerHTML={{ __html: cyraMessage }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
