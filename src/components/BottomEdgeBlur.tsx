'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeProvider'

/**
 * BottomEdgeBlur — fixed gradient at the bottom of the viewport.
 * Creates a "peek" effect showing that more content exists below.
 * Fades out when user reaches the bottom of the page.
 */
export function BottomEdgeBlur() {
  const [isVisible, setIsVisible] = useState(true)
  const { isEarth } = useTheme()

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY
    const clientHeight = window.innerHeight
    // Hide when near bottom (within 100px of the end)
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 100
    setIsVisible(!nearBottom)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const gradientColor = isEarth ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.96)'
  const overlayOpacity = isEarth ? 0.35 : 0.45

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-[40] pointer-events-none"
          style={{ height: '120px' }}
        >
          {/* Blurred backdrop layer - 120px height with 16px blur */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              maskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.85) 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.85) 40%, transparent 100%)',
            }}
          />
          {/* Subtle color gradient layer - shorter (80px) and lower opacity for frosted look */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: `linear-gradient(to top, ${gradientColor} 0%, transparent 100%)`,
              opacity: overlayOpacity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
