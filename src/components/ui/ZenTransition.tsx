"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

export default function ZenTransition() {
  const { theme } = useTheme();
  const isTransitioning = theme === "transitioning-to-zen";

  const label = "ENTERING ZEN MODE";

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="zen-enter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          style={{ background: "#030508" }}
        >
          {/* ── Expanding ripple rings from center ─────────────────────────── */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              initial={{ width: 0, height: 0, opacity: 0.7 }}
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
          <div className="relative z-10 flex flex-col items-center gap-5">

            {/* Breathing dot */}
            <motion.div
              className="w-[6px] h-[6px] rounded-full bg-white"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.5, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Top hairline — extends outward */}
            <motion.div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "180px", opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            />

            {/* Letter-by-letter text reveal */}
            <div
              className="flex overflow-hidden"
              style={{
                fontFamily: "var(--font-orbitron, monospace)",
                fontSize: "clamp(13px, 2.5vw, 18px)",
                letterSpacing: "0.45em",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 700,
              }}
            >
              {label.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -6] }}
                  transition={{
                    duration: 2.3,
                    delay: 0.3 + i * 0.045,
                    times: [0, 0.12, 0.72, 1],
                    ease: "easeOut",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Bottom hairline — shorter */}
            <motion.div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "90px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            />

            {/* Thin progress line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: 2.3, times: [0, 0.1, 0.75, 1] }}
              className="relative w-24 md:w-40 h-px overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.1, delay: 0.15, ease: "linear" }}
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.6), rgba(255,255,255,0.1))",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
