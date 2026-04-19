"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { useTheme } from "@/contexts/ThemeProvider";

const sections = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "experience", label: "Journey", num: "03" },
  { id: "skills", label: "Skills", num: "04" },
  { id: "projects", label: "Projects", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

export default function DotNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const lenis = useLenis();
  const { isEarth } = useTheme();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (lenis) {
      const element = document.getElementById(id);
      if (element) {
        lenis.scrollTo(element, { duration: 1.2 });
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [lenis]);

  const accentColor = isEarth ? "#d97706" : "#3b82f6";

  return (
    <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-start gap-8">
      {/* Decorative vertical line with accent dash */}
      <div className="absolute left-[3px] top-[-20px] bottom-[-20px] w-[1px] bg-white/5 overflow-hidden">
        <motion.div 
          className="w-full h-20"
          style={{ background: accentColor }}
          animate={{
            y: sections.findIndex(s => s.id === activeSection) * 48
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative flex items-center gap-6 transition-all duration-300 py-1"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Minimalist Dot/Dash Indicator */}
            <div className="relative flex items-center justify-center w-[7px] h-[7px]">
              <div 
                className={cn(
                  "w-[3px] h-[3px] rounded-full transition-all duration-500 z-10",
                  isActive 
                    ? "scale-[1.5]" 
                    : isEarth
                      ? "bg-stone-800/20 group-hover:bg-stone-800/60"
                      : "bg-white/20 group-hover:bg-white/60"
                )}
                style={isActive ? { background: accentColor } : undefined}
              />
              {isActive && (
                <motion.div
                  layoutId="active-dot-glow"
                  className="absolute inset-0 blur-[4px] rounded-full"
                  style={{ background: `${accentColor}66` }}
                />
              )}
            </div>

            {/* Label */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[8px] font-bold tracking-[0.2em] transition-all duration-300 font-sans",
                )}
                style={{ color: isActive ? accentColor : isEarth ? "rgba(28,25,23,0.3)" : "rgba(255,255,255,0.3)" }}
              >
                {section.num}
              </span>
              <span
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 font-sans pointer-events-none",
                  isHovered 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-2"
                )}
                style={{ color: isEarth ? "#1c1917" : "#ffffff" }}
              >
                {section.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
