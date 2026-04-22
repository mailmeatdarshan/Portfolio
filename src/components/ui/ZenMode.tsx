"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeProvider";
import { Github, Play, Linkedin, FileText, Globe, Mail, Rocket, BookOpen } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { usePathname } from "next/navigation";

interface ZenPlanet {
  id: string;
  title: string;
  image: string;
  href: string;
  angle: number; 
  distance: number; 
  mobileDistance: number; 
  labelPos: "top" | "bottom" | "left" | "right";
  isExternal?: boolean;
}

const PLANETS: ZenPlanet[] = [
  { id: "resume", title: "RESUME", image: "/images/zen/planet.png", href: "https://drive.google.com/file/d/185Y4T_cXU0U3SpXBwx4ZztSiztA5U_hb/view?usp=sharing", angle: -140, distance: 400, mobileDistance: 145, labelPos: "top", isExternal: true },
  { id: "projects", title: "PROJECTS", image: "/images/zen/planet2.png", href: "#projects", angle: -90, distance: 440, mobileDistance: 160, labelPos: "top" },
  { id: "skills", title: "SKILLS", image: "/images/zen/planet3.png", href: "#skills", angle: -40, distance: 420, mobileDistance: 145, labelPos: "top" },
  { id: "contact", title: "CONTACT", image: "/images/zen/planet4.png", href: "#contact", angle: 10, distance: 460, mobileDistance: 155, labelPos: "right" },
  { id: "earth", title: "EARTH", image: "/images/zen/planet5.png", href: "earth", angle: 45, distance: 440, mobileDistance: 155, labelPos: "right" },
  { id: "github", title: "GITHUB", image: "/images/zen/planet6.png", href: "https://github.com/mailmeatdarshan", angle: 135, distance: 380, mobileDistance: 150, labelPos: "bottom", isExternal: true },
  { id: "linkedin", title: "LINKEDIN", image: "/images/zen/planet7.png", href: "https://linkedin.com/in/darshandubey25", angle: 175, distance: 400, mobileDistance: 145, labelPos: "bottom", isExternal: true },
];

export default function ZenMode() {
  const pathname = usePathname();
  const { theme, triggerTransition, setEarthMode } = useTheme();
  const isZen = theme === "zen" || theme === "transitioning-to-zen";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleReturnToEarth = useCallback(() => {
    setEarthMode(); 
  }, [setEarthMode]);

  const handleGetStarted = useCallback(() => {
    triggerTransition();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [triggerTransition]);

  useEffect(() => {
    if (!isZen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; z: number; o: number; speed: number }[] = [];
    const numStars = isMobile ? 800 : 1500; // Increased massively

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * w,
        o: 0.3 + Math.random() * 0.7,
        speed: 1.5 + Math.random() * 4.5, // Faster speed
      });
    }

    const draw = () => {
      ctx.fillStyle = "#030508"; // Even darker
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2, h / 2);

      const time = performance.now() * 0.0003;
      const beamCount = isMobile ? 60 : 600;
      for (let i = 0; i < beamCount; i++) {
        const angle = (i * Math.PI * 2) / beamCount + Math.sin(time + i * 0.1) * 0.05;
        const len = Math.max(w, h) * (0.9 + Math.sin(i * 2 + time) * 0.1);
        const opacity = 0.02 + Math.pow(Math.sin(i * 0.5 + time * 3), 4) * 0.04;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
        ctx.stroke();
      }

      stars.forEach((star) => {
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = w;
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
        }

        const px = star.x / (star.z / w);
        const py = star.y / (star.z / w);

        if (px < -w / 2 || px > w / 2 || py < -h / 2 || py > h / 2) return;

        const progress = 1 - star.z / w;
        const size = progress * 2.5; // Bigger stars
        const opacity = progress * star.o;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        const streakLen = 1.03 + (progress * 0.1); // Longer streaks
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.lineWidth = size / 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px * streakLen, py * streakLen);
        ctx.stroke();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isZen, isMobile]);

  if (!mounted || pathname === "/about") return null;

  return (
    <AnimatePresence>
      {isZen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-[200] bg-[#030508] overflow-hidden select-none touch-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Orbits */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {[300, 500, 750].map((size) => (
                <div 
                    key={size}
                    className="absolute border border-white/10 rounded-full" 
                    style={{ width: `${isMobile ? size / 1.5 : size}px`, height: `${isMobile ? size / 1.5 : size}px` }}
                />
            ))}
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
          </div>

          {/* Central Astronaut */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-[150px] h-[150px] md:w-[420px] md:h-[420px] z-20"
            >
              <div className="absolute inset-0 bg-blue-400/[0.1] blur-[80px] rounded-full" />
              <Image
                src="/images/zen/astronaut.png"
                alt="Zen Astronaut"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                priority
              />
              
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[140%] h-[40px] md:h-[80px] flex items-center justify-center -z-10 pointer-events-none">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 border-[2px] md:border-[4px] border-white/[0.2] rounded-[100%] blur-[1px]" 
                />
              </div>
            </motion.div>
          </div>

          {/* Planets */}
          {PLANETS.map((planet, idx) => {
            const distance = isMobile ? planet.mobileDistance : planet.distance;
            const x = Math.cos((planet.angle * Math.PI) / 180) * distance;
            // Spreading them out vertically much more on mobile to cover the screen
            const y = Math.sin((planet.angle * Math.PI) / 180) * distance * (isMobile ? 1.6 : 0.65); 

            const isEarthPlanet = planet.id === "earth";
            
            return (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{ delay: 0.8 + idx * 0.03, duration: 0.6, type: "spring", stiffness: 80 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group z-[110]"
              >
                {planet.isExternal ? (
                  <a href={planet.href} target="_blank" rel="noopener noreferrer" className="relative cursor-pointer block">
                    <PlanetItem planet={planet} isMobile={isMobile} />
                  </a>
                ) : isEarthPlanet ? (
                    <div onClick={handleReturnToEarth} className="relative cursor-pointer">
                        <PlanetItem planet={planet} isMobile={isMobile} />
                    </div>
                ) : (
                  <Link href={planet.href} onClick={() => triggerTransition()} className="relative cursor-pointer">
                    <PlanetItem planet={planet} isMobile={isMobile} />
                  </Link>
                )}
              </motion.div>
            );
          })}

          {/* Bottom UI */}
          <div className="absolute bottom-[5vh] md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 md:gap-10 px-6 text-center z-[100] pointer-events-none">
            <div className="space-y-1 md:space-y-4 pointer-events-auto">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-3xl md:text-6xl font-bold text-white tracking-tighter"
              >
                {personalInfo.name}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-white/70 text-[11px] md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
              >
                {personalInfo.title} & Open Source Contributor
              </motion.p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-3 md:gap-6 pointer-events-auto"
            >
              <button 
                onClick={handleGetStarted}
                className="group flex items-center gap-2 md:gap-3 px-6 py-3 md:px-12 md:py-5 bg-[#1e2533] border border-white/10 hover:bg-[#2a3245] text-white rounded-full font-bold transition-all shadow-2xl active:scale-95"
              >
                <Rocket className="w-4 h-4 md:w-6 md:h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-xs md:text-base">Cosmos</span>
              </button>
              <Link 
                href="https://github.com/mailmeatdarshan" 
                target="_blank"
                className="flex items-center gap-2 md:gap-3 px-8 py-3 md:px-12 md:py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold transition-all active:scale-95"
              >
                <Github className="w-4 h-4 md:w-6 md:h-6" />
                <span className="text-xs md:text-base">GitHub</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlanetItem({ planet, isMobile }: { planet: ZenPlanet; isMobile: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center">
            {/* ENHANCED PERMANENT LABEL */}
            <div className={`whitespace-nowrap text-white font-black tracking-widest bg-black/95 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 transition-all duration-300 group-hover:border-blue-500/50 group-hover:text-blue-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10
                ${isMobile ? 'text-[9px] mb-1' : 'text-xs mb-3 px-4 py-1.5 rounded-full'}
            `}>
                {planet.title}
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 group-hover:bg-blue-500/50 transition-all duration-500 group-hover:scale-[3.5]" />
                
                {/* DYNAMIC PLANET SIZE */}
                <div className={`relative transition-transform duration-500 group-hover:scale-110 ${isMobile ? 'w-[75px] h-[75px]' : 'w-[110px] h-[110px]'}`}>
                    <Image
                    src={planet.image}
                    alt={planet.title}
                    fill
                    className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
