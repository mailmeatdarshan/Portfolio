"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ModeToggle() {
  const pathname = usePathname();
  const { theme, isEarth, isZen, isTransitioning, triggerTransition } = useTheme();

  const showEarthState = theme === "earth" || theme === "transitioning-to-earth";
  const showZenState = theme === "zen" || theme === "transitioning-to-zen";

  if (pathname === "/about") return null;

  return (
    <div className="fixed bottom-8 left-6 md:left-8 z-[101]">
      <motion.button
        onClick={triggerTransition}
        disabled={isTransitioning}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-white/20"
        style={{
          background: showZenState 
            ? "#1e2533" 
            : showEarthState
            ? "#1c1917"
            : "rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Icon container */}
        <div className="relative w-6 h-6 flex items-center justify-center z-10">
          {/* Rocket (Space state) */}
          <motion.div
            animate={{
              y: (showEarthState || showZenState) ? 32 : 0,
              opacity: (showEarthState || showZenState) ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
              <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
            </svg>
          </motion.div>

          {/* Sun (Earth state) */}
          <motion.div
            animate={{
              y: showEarthState ? 0 : (showZenState ? 32 : -32),
              opacity: showEarthState ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-400"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </motion.div>

          {/* Sparkles (Zen state) */}
          <motion.div
            animate={{
              y: showZenState ? 0 : -32,
              opacity: showZenState ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}
