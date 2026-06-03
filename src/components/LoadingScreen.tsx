import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const words = ["Engineering", "Craftsmanship", "Precision", "we build best"]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  // requestAnimationFrame counter from 0 to 100 over 2700ms
  useEffect(() => {
    const duration = 2700
    const startTime = performance.now()

    let animationFrameId: number

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentCount = Math.floor(progress * 100)

      setCount(currentCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter)
      } else {
        // Complete - trigger callback after 400ms delay
        setTimeout(() => {
          onComplete()
        }, 400) // Wait 400ms
      }
    }

    animationFrameId = requestAnimationFrame(updateCounter)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [onComplete])

  // Word cycler every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 900)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0B0E14] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none overflow-hidden text-white">
      
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xs text-slate-400 uppercase tracking-[0.3em] font-medium"
        >
          VPZ Builders • Vallapuzha
        </motion.div>
        <div className="text-xs text-slate-500 font-mono">
          Est. 2011
        </div>
      </div>

      {/* Center Section */}
      <div className="flex justify-center items-center h-40">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-white text-center"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="text-xs text-slate-400 uppercase tracking-[0.2em] font-light max-w-[200px] leading-relaxed">
            Building with precision and architectural excellence.
          </div>
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-white tabular-nums select-none leading-none">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-[3px] bg-white/10 w-full relative rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 accent-gradient rounded-full"
            style={{ 
              width: '100%',
              scaleX: count / 100,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)'
            }}
          />
        </div>
      </div>

    </div>
  )
}
