"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export const SketchyArrow: React.FC<{ className?: string }> = ({ className }) => {
  const { isEarth } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isEarth) {
      import("roughjs").then((mod) => {
        const Rough = mod.default || mod;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rc = Rough.canvas(canvas);
        const ctx = canvas.getContext("2d")!;
        
        canvas.width = 100;
        canvas.height = 100;
        ctx.clearRect(0, 0, 100, 100);
        
        // Hand-drawn arrow
        rc.curve([[10, 10], [40, 30], [20, 80]], {
          stroke: "#d97706",
          strokeWidth: 2,
          roughness: 2,
        });
        rc.line(20, 80, 5, 60, { stroke: "#d97706", strokeWidth: 2, roughness: 1.5 });
        rc.line(20, 80, 45, 65, { stroke: "#d97706", strokeWidth: 2, roughness: 1.5 });
      });
    }
  }, [isEarth]);

  return (
    <AnimatePresence>
      {isEarth && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className={className}
        >
          <canvas ref={canvasRef} />
          <p className="font-handwriting text-amber-700 text-sm -mt-4 ml-4 rotate-12">
            Scroll for magic!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SketchyScribble: React.FC<{ className?: string; text: string }> = ({ className, text }) => {
  const { isEarth } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isEarth) {
      import("roughjs").then((mod) => {
        const Rough = mod.default || mod;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rc = Rough.canvas(canvas);
        const ctx = canvas.getContext("2d")!;
        
        const w = text.length * 10 + 40;
        canvas.width = w;
        canvas.height = 40;
        ctx.clearRect(0, 0, w, 40);
        
        rc.ellipse(w/2, 20, w-10, 30, {
          stroke: "#059669",
          strokeWidth: 1.5,
          roughness: 2.5,
          fill: "rgba(5, 150, 105, 0.05)",
          fillStyle: "hachure"
        });
      });
    }
  }, [isEarth, text]);

  return (
    <AnimatePresence>
      {isEarth && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className={className}
        >
          <div className="relative inline-block">
            <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
            <span className="px-4 py-1 font-handwriting text-emerald-800 text-sm whitespace-nowrap">
              {text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
