"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

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

  return (
    <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-start gap-8">
      {/* Decorative vertical line with accent dash */}
      <div className="absolute left-[3px] top-[-20px] bottom-[-20px] w-[1px] bg-white/5 overflow-hidden">
        <motion.div 
          className="w-full bg-blue-500 h-20"
          animate={{
            y: sections.findIndex(s => s.id === activeSection) * 48 // matches the gap + height
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
                    ? "bg-blue-500 scale-[1.5]" 
                    : "bg-white/20 group-hover:bg-white/60"
                )}
              />
              {isActive && (
                <motion.div
                  layoutId="active-dot-glow"
                  className="absolute inset-0 bg-blue-500/40 blur-[4px] rounded-full"
                />
              )}
            </div>

            {/* Label - Dashboard/Terminal Style */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[8px] font-bold tracking-[0.2em] transition-all duration-300 font-sans",
                  isActive ? "text-blue-500" : "text-white/30"
                )}
              >
                {section.num}
              </span>
              <span
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 font-sans pointer-events-none",
                  isHovered 
                    ? "text-white opacity-100 translate-x-0" 
                    : "text-white opacity-0 -translate-x-2"
                )}
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
