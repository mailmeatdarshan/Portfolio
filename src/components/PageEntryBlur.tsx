'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * PageEntryBlur — Full-screen blur overlay that clears on page load.
 * Creates the armandev.space "page reveal" effect.
 * On mount: screen is blurred. After a short delay, blur dissolves to clear.
 */
export function PageEntryBlur() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Start dissolving after a tiny delay to ensure content is rendered
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
      )}
    </AnimatePresence>
  )
}
