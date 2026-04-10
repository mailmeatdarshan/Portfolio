"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomRocket = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-6 h-6 text-blue-500"
    style={{ transform: 'rotate(45deg)' }}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
  </svg>
);

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setIsVisible(true);
      window.dispatchEvent(new CustomEvent("splash-started"));

      const animateProgress = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        
        // Non-linear progress simulation
        // Slows down at 40%, 75%, and 90%
        let simulatedProgress = 0;
        if (elapsed < 800) {
            simulatedProgress = (elapsed / 800) * 40;
        } else if (elapsed < 1800) {
            simulatedProgress = 40 + ((elapsed - 800) / 1000) * 35;
        } else if (elapsed < 2800) {
            simulatedProgress = 75 + ((elapsed - 1800) / 1000) * 15;
        } else if (elapsed < 3500) {
            simulatedProgress = 90 + ((elapsed - 2800) / 700) * 10;
        } else {
            simulatedProgress = 100;
        }

        setProgress(Math.min(simulatedProgress, 100));

        if (simulatedProgress < 100) {
          requestRef.current = requestAnimationFrame(animateProgress);
        } else {
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("hasSeenSplash", "true");
            window.dispatchEvent(new CustomEvent("splash-finished"));
          }, 800);
        }
      };

      requestRef.current = requestAnimationFrame(animateProgress);

      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    } else {
      window.dispatchEvent(new CustomEvent("splash-finished"));
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Minimalist Meteor Shower */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "120%", y: "-20%", opacity: 0 }}
                animate={{ 
                  x: "-20%", 
                  y: "120%", 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 1.5 + Math.random(), 
                  repeat: Infinity, 
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
                className="absolute h-[1px] w-[150px] bg-gradient-to-l from-white/40 to-transparent rotate-[45deg]"
                style={{ top: `${Math.random() * 50}%`, left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>

          <div className="relative w-full max-w-5xl px-10 flex flex-col items-center">
            {/* Massive Boxy Percentage */}
            <div className="relative mb-12">
              <motion.div 
                className="text-[12rem] md:text-[18rem] font-bold text-white leading-none font-orbitron tracking-tighter"
              >
                {Math.floor(progress)}
                <span className="text-4xl md:text-6xl text-blue-500">.</span>
              </motion.div>
              <div className="absolute -bottom-4 right-4 flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
                <span>System Load</span>
              </div>
            </div>

            {/* Sleek Rocket Progress Line */}
            <div className="w-full h-[2px] bg-white/5 relative mt-8">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
              
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2"
                animate={{ left: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                <div className="relative flex items-center">
                   <div className="-translate-x-full pr-1 flex items-center">
                     <CustomRocket />
                   </div>
                   {/* Rocket Engine Flame Effect */}
                   <motion.div 
                    animate={{ 
                      width: [15, 40, 15],
                      opacity: [0.6, 1, 0.6],
                      scaleY: [1, 1.2, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 0.05 }}
                    className="absolute right-[calc(100%+20px)] h-[3px] bg-gradient-to-l from-blue-400 to-transparent blur-[1px] rounded-full"
                    style={{ transformOrigin: 'right center' }}
                   />
                </div>
              </motion.div>
            </div>

            {/* Minimalist Data Labels */}
            <div className="mt-12 w-full flex justify-between items-center text-[10px] uppercase tracking-[0.5em] text-white/20 font-mono">
              <div className="flex flex-col gap-1">
                <span>Coord: 23.0225° N, 72.5714° E</span>
                <span>Velo: {Math.floor(progress * 280)} km/h</span>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span className="text-blue-500/50">Status: {progress < 100 ? 'IGNITION' : 'STABLE'}</span>
                <span>DARSHAN_PORTFOLIO_V2.0</span>
              </div>
            </div>
          </div>

          {/* Snellenberg-style Curved Exit Overlay */}
          <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none">
             <motion.path 
                initial={{ d: "M0 0 L100 0 L100 100 Q50 100 0 100 Z" }}
                exit={{ d: "M0 0 L100 0 L100 100 Q50 50 0 100 Z" }}
                fill="#0a0a0a"
             />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
