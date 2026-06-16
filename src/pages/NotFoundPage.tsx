import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-void text-center px-4">
      {/* Glitch-style 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[80px] font-light font-mono text-nebula-cyan/20 tracking-widest mb-2">
          404
        </div>
        <h1 className="text-xl font-light tracking-wide text-white/70 mb-3">
          Lost in Deep Space
        </h1>
        <p className="text-sm text-white/35 max-w-xs mb-10 leading-relaxed">
          The coordinates you entered don't exist in this sector of the universe.
        </p>

        <motion.button
          onClick={() => navigate('/')}
          className="border border-nebula-cyan/30 text-nebula-cyan text-xs tracking-[0.25em] uppercase font-mono px-8 py-3 hover:bg-nebula-cyan/8 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-nebula-cyan/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Return to CYRA
        </motion.button>
      </motion.div>

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
          }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}
