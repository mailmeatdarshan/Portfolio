"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/lib/utils";

interface RoughCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  roughness?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  fillStyle?: "hachure" | "solid" | "zigzag" | "cross-hatch" | "dots" | "sunburst" | "dashed";
  hachureAngle?: number;
  hachureGap?: number;
}

export const RoughCard: React.FC<RoughCardProps> = ({
  children,
  className,
  roughness = 1.5,
  strokeWidth = 1.5,
  strokeColor = "rgba(0,0,0,0.2)",
  fillColor = "rgba(255,255,255,0.4)",
  fillStyle = "hachure",
  hachureAngle = -41,
  hachureGap = 4,
  ...props
}) => {
  const { isEarth } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roughCanvas, setRoughCanvas] = useState<any>(null);

  useEffect(() => {
    if (isEarth) {
      import("roughjs").then((mod) => {
        const Rough = mod.default || mod;
        if (canvasRef.current) {
          setRoughCanvas(Rough.canvas(canvasRef.current));
        }
      });
    }
  }, [isEarth]);

  const [isHovered, setIsHovered] = useState(false);

  const draw = (hovered = false) => {
    if (!roughCanvas || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    
    roughCanvas.rectangle(2, 2, width - 4, height - 4, {
      roughness: hovered ? roughness + 0.5 : roughness,
      stroke: strokeColor,
      strokeWidth,
      fill: fillColor,
      fillStyle,
      hachureAngle,
      hachureGap: hovered ? Math.max(2, hachureGap - 1) : hachureGap,
      seed: 42 // Constant seed for stability
    });
  };

  useEffect(() => {
    if (roughCanvas && isEarth) {
      draw(isHovered);
    }
  }, [roughCanvas, isEarth, isHovered]);

  useEffect(() => {
    if (roughCanvas && isEarth) {
      const resizeObserver = new ResizeObserver(() => draw(isHovered));
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => resizeObserver.disconnect();
    }
  }, [roughCanvas, isEarth, isHovered]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative transition-all duration-1000",
        !isEarth && "liquid-glass rounded-3xl",
        isEarth && "bg-transparent border-none shadow-none",
        className
      )}
      {...props}
    >
      {isEarth && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none z-0" 
        />
      )}
      <div className={cn("relative z-10", isEarth && "p-1")}>
        {children}
      </div>
    </div>
  );
};
