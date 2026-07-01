"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { sciFiAudio } from "@/lib/audio";
import { useTheme } from "@/contexts/ThemeProvider";
import { usePathname } from "next/navigation";

export default function AudioToggle() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMuted, setIsMuted] = useState(true); // Default muted initially for SSR, resolved on mount

  useEffect(() => {
    // Read preference on mount
    const muted = sciFiAudio.getMuted();
    setIsMuted(muted);

    // If they already saw the splash screen, initialize the audio context on first click/touch
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash === "true") {
      const handleFirstInteraction = () => {
        sciFiAudio.resume();
        if (!muted) {
          sciFiAudio.startAmbientHum();
        }
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction, { passive: true });
      window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
      return () => {
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      };
    }
  }, []);

  const handleToggle = () => {
    const nextMuted = !isMuted;
    sciFiAudio.setMute(nextMuted);
    setIsMuted(nextMuted);
    
    // Play a click confirmation sound if unmuting
    if (!nextMuted) {
      sciFiAudio.playUIClick();
      sciFiAudio.startAmbientHum();
    } else {
      sciFiAudio.stopAmbientHum();
    }
  };

  if (pathname === "/about") return null;

  const showEarthState = theme === "earth" || theme === "transitioning-to-earth";
  const showZenState = theme === "zen" || theme === "transitioning-to-zen";

  return (
    <div className="fixed bottom-8 left-20 md:left-24 z-[101]">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => {
          if (!isMuted) sciFiAudio.playUIHover();
        }}
        className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all duration-300 border border-white/20"
        style={{
          background: showZenState 
            ? "#1e2533" 
            : showEarthState
            ? "#1c1917"
            : "rgba(255, 255, 255, 0.1)",
        }}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        <motion.div
          key={isMuted ? "muted" : "unmuted"}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-red-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
