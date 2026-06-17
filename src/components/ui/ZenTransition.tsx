"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { usePathname } from "next/navigation";
import { LottieAnimation } from "@/components/ui/LottieAnimation";

export default function ZenTransition() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isTransitioning = theme === "transitioning-to-zen";

  if (pathname === "/about") return null;

  const label = "ENTERING ZEN MODE";

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="zen-enter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          style={{ background: "#030508" }}
        >
          {/* ── Expanding ripple rings from center ─────────────────────────── */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: "220vmax", height: "220vmax", opacity: 0 }}
              transition={{
                duration: 2.8,
                delay: i * 0.55,
                ease: [0.1, 0.6, 0.4, 1],
                repeat: Infinity,
              }}
            />
          ))}

          {/* ── Center content ─────────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            
            {/* Lottie Loading Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Subtle back-glow */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[40px] rounded-full -z-10" />
              <LottieAnimation 
                animationPath="/ZenLoading.json" 
                className="w-48 h-48 md:w-64 md:h-64" 
              />
            </motion.div>

            {/* Top hairline — extends outward */}
            <motion.div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "180px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />

            {/* Modern clean text label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="text-white font-black tracking-[0.55em] text-xs md:text-sm uppercase"
              style={{ fontFamily: "var(--font-orbitron, monospace)" }}
            >
              {label}
            </motion.div>

            {/* Bottom hairline — shorter */}
            <motion.div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "90px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
