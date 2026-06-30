"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LottieAnimation } from "@/components/ui/LottieAnimation";

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
  const [isReadyToOpen, setIsReadyToOpen] = useState(false);
  const [meteors, setMeteors] = useState<{ duration: number; delay: number; top: string; left: string }[]>([]);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const touchStartDistRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize meteors with random values on client side only
    const initialMeteors = [...Array(5)].map(() => ({
      duration: 1.5 + Math.random(),
      delay: Math.random() * 5,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`
    }));
    setMeteors(initialMeteors);

    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setIsVisible(true);
      window.dispatchEvent(new CustomEvent("splash-started"));

      const animateProgress = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        
        // Non-linear progress simulation (faster timings)
        let simulatedProgress = 0;
        if (elapsed < 400) {
            simulatedProgress = (elapsed / 400) * 40;
        } else if (elapsed < 900) {
            simulatedProgress = 40 + ((elapsed - 400) / 500) * 35;
        } else if (elapsed < 1400) {
            simulatedProgress = 75 + ((elapsed - 900) / 500) * 15;
        } else if (elapsed < 1800) {
            simulatedProgress = 90 + ((elapsed - 1400) / 400) * 10;
        } else {
            simulatedProgress = 100;
        }

        setProgress(Math.min(simulatedProgress, 100));

        if (simulatedProgress < 100) {
          requestRef.current = requestAnimationFrame(animateProgress);
        } else {
          setProgress(100);
          setIsReadyToOpen(true);
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

  const handleOpen = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenSplash", "true");
    window.dispatchEvent(new CustomEvent("splash-finished"));
  }, []);

  // Listen to interactive zoom/pinch and scroll gestures once ready
  useEffect(() => {
    if (!isReadyToOpen) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Prevent default browser viewport zoom
        if (e.cancelable) e.preventDefault();
        
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        touchStartDistRef.current = dist;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Prevent default browser viewport zoom
        if (e.cancelable) e.preventDefault();
        
        if (touchStartDistRef.current !== null) {
          const t1 = e.touches[0];
          const t2 = e.touches[1];
          const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
          
          // If pinched outwards (zoom-in gesture, distance increases by 15%)
          if (dist > touchStartDistRef.current * 1.15) {
            handleOpen();
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Trackpad pinch zoom out (zoom-in gesture has deltaY < 0 with ctrlKey)
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleOpen();
        }
      } else if (e.deltaY < 0) {
        // Standard scroll wheel up
        handleOpen();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isReadyToOpen, handleOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            filter: "blur(40px)",
            transition: { duration: 1.8, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden pointer-events-auto select-none"
          onClick={isReadyToOpen ? handleOpen : undefined}
        >
          {/* Minimalist Meteor Shower */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {meteors.map((meteor, i) => (
              <motion.div
                key={i}
                initial={{ x: "120%", y: "-20%", opacity: 0 }}
                animate={{ 
                  x: "-20%", 
                  y: "120%", 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: meteor.duration, 
                  repeat: Infinity, 
                  delay: meteor.delay,
                  ease: "linear"
                }}
                className="absolute h-[1px] w-[150px] bg-gradient-to-l from-white/40 to-transparent rotate-[45deg]"
                style={{ top: meteor.top, left: meteor.left }}
              />
            ))}
          </div>

          <div className="relative w-full max-w-5xl px-10 flex flex-col items-center">
            {!isReadyToOpen ? (
              <div className="w-full flex flex-col items-center">
                {/* Massive Boxy Percentage */}
                <div className="relative mb-12">
                  <div className="text-[12rem] md:text-[18rem] font-bold text-white leading-none font-orbitron tracking-tighter">
                    {Math.floor(progress)}
                    <span className="text-4xl md:text-6xl text-blue-500">.</span>
                  </div>
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
            ) : (
              <motion.div 
                key="gesture-view"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 text-center cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
              >
                {/* Lottie pinch animation with 3D zoom exit */}
                <motion.div
                  exit={{ 
                    scale: 6.0, 
                    opacity: 0, 
                    filter: "blur(20px)",
                    transition: { duration: 1.5, ease: [0.1, 0.8, 0.2, 1] }
                  }}
                >
                  <LottieAnimation
                    animationPath="/pinch.json"
                    className="w-32 h-32 text-blue-400 mb-2 pointer-events-none"
                    loop={true}
                    autoplay={true}
                  />
                </motion.div>

                <motion.span 
                  exit={{ 
                    y: 80, 
                    opacity: 0, 
                    filter: "blur(15px)",
                    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
                  }}
                  className="text-xs md:text-sm font-bold text-white uppercase tracking-[0.35em] animate-pulse"
                >
                  Pinch to Open
                </motion.span>
                
                <motion.span 
                  exit={{ 
                    y: 120, 
                    opacity: 0, 
                    filter: "blur(10px)",
                    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
                  }}
                  className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono"
                >
                  (Or scroll up / click anywhere)
                </motion.span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
