'use client'

import { motion } from 'framer-motion'

interface BlurRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** Override blur amount (px). Default: 8 */
  blur?: number
  /** Override Y offset (px). Default: 24 */
  yOffset?: number
  /** Override duration (s). Default: 0.7 */
  duration?: number
  /** Viewport margin — negative values trigger later. Default: '-60px' */
  margin?: string
}

export function BlurReveal({
  children,
  delay = 0,
  className,
  blur = 8,
  yOffset = 24,
  duration = 0.7,
  margin = '-60px',
}: BlurRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Apple standard easing — the armandev feel
      }}
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  )
}
