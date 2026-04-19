"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmplitude: number;
  color: string;
  opacity: number;
  type: "leaf" | "pollen" | "firefly" | "dandelion";
  glowPhase: number;
  // For rough-style variance
  seed: number;
}

const LEAF_COLORS = [
  "#c0392b",
  "#e67e22",
  "#f39c12",
  "#27ae60",
  "#8e6b3e",
  "#d35400",
  "#a93226",
];
const POLLEN_COLORS = ["#fef08a", "#fde68a", "#fff7ed", "#fffde7"];

const NatureField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let globalOpacity = 0;
    let roughCanvas: any = null;

    // Load rough.js dynamically
    import("roughjs").then((mod) => {
      const Rough = mod.default || mod;
      roughCanvas = Rough.canvas(canvas);
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const leafCount = isMobile ? 8 : 18;
      const pollenCount = isMobile ? 15 : 35;
      const fireflyCount = isMobile ? 6 : 14;
      const dandelionCount = isMobile ? 4 : 10;

      for (let i = 0; i < leafCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10 + 6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.025,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: Math.random() * 0.5 + 0.15,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.018 + 0.005,
          wobbleAmplitude: Math.random() * 1.8 + 0.5,
          color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
          opacity: Math.random() * 0.55 + 0.35,
          type: "leaf",
          glowPhase: 0,
          seed: Math.floor(Math.random() * 10000),
        });
      }

      for (let i = 0; i < pollenCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.8,
          rotation: 0,
          rotationSpeed: 0,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.18 - 0.1,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.025 + 0.008,
          wobbleAmplitude: Math.random() * 0.9 + 0.3,
          color: POLLEN_COLORS[Math.floor(Math.random() * POLLEN_COLORS.length)],
          opacity: Math.random() * 0.45 + 0.2,
          type: "pollen",
          glowPhase: 0,
          seed: Math.floor(Math.random() * 10000),
        });
      }

      for (let i = 0; i < fireflyCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.55 + Math.random() * canvas.height * 0.45,
          size: Math.random() * 2.5 + 1,
          rotation: 0,
          rotationSpeed: 0,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: (Math.random() - 0.5) * 0.3,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.02 + 0.008,
          wobbleAmplitude: Math.random() * 1.2 + 0.5,
          color: "#fbbf24",
          opacity: 0,
          type: "firefly",
          glowPhase: Math.random() * Math.PI * 2,
          seed: Math.floor(Math.random() * 10000),
        });
      }

      for (let i = 0; i < dandelionCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          size: Math.random() * 4 + 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          speedX: (Math.random() - 0.5) * 0.18,
          speedY: (Math.random() - 0.5) * 0.12 - 0.08,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.015 + 0.005,
          wobbleAmplitude: Math.random() * 0.6 + 0.3,
          color: "#fffde7",
          opacity: Math.random() * 0.6 + 0.3,
          type: "dandelion",
          glowPhase: 0,
          seed: Math.floor(Math.random() * 10000),
        });
      }
    };

    // ─── LEAF: hand-drawn via path with deterministic jitter ───────────
    const drawLeaf = (p: Particle) => {
      if (roughCanvas && p.size > 8) {
        // Use Rough.js for larger leaves for consistency
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity * globalOpacity;
        
        const s = p.size;
        roughCanvas.path(`M 0 ${-s} Q ${s*0.8} ${-s*0.2} 0 ${s} Q ${-s*0.8} ${-s*0.2} 0 ${-s} Z`, {
          fill: p.color,
          fillStyle: "hachure",
          hachureAngle: (p.seed % 180),
          hachureGap: 3.5,
          stroke: "rgba(0,0,0,0.2)",
          strokeWidth: 0.8,
          roughness: 1.5,
          seed: p.seed
        });
        
        // Central vein
        roughCanvas.line(0, -s * 0.7, 0, s * 0.7, {
            stroke: "rgba(0,0,0,0.15)",
            strokeWidth: 1,
            roughness: 2,
            seed: p.seed + 1
        });
        
        ctx.restore();
        return;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * globalOpacity;

      const s = p.size;
      // Deterministic jitter based on p.seed
      const j = (offset: number) => {
        const val = Math.sin(p.seed + offset) * 10000;
        return (val - Math.floor(val) - 0.5) * s * 0.18;
      };

      ctx.beginPath();
      ctx.moveTo(j(1), -s + j(2));
      ctx.bezierCurveTo(
        s * 0.6 + j(3), -s * 0.5 + j(4),
        s * 0.65 + j(5), s * 0.45 + j(6),
        j(7), s + j(8)
      );
      ctx.bezierCurveTo(
        -s * 0.6 + j(9), s * 0.5 + j(10),
        -s * 0.65 + j(11), -s * 0.45 + j(12),
        j(13), -s + j(14)
      );
      ctx.fillStyle = p.color;
      ctx.fill();

      // Sketchy vein
      ctx.beginPath();
      ctx.moveTo(j(15) * 0.2, -s * 0.7);
      ctx.lineTo(j(16) * 0.3, s * 0.7);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Outline (double stroke feel)
      ctx.beginPath();
      ctx.moveTo(j(17), -s + j(18));
      ctx.bezierCurveTo(
        s * 0.55 + j(19), -s * 0.45 + j(20),
        s * 0.6 + j(21), s * 0.4 + j(22),
        j(23), s + j(24)
      );
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.stroke();

      ctx.restore();
    };

    // ─── DANDELION WISP: deterministic ────────────────────────────────
    const drawDandelion = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * globalOpacity;

      const s = p.size;
      const arms = 8;

      for (let i = 0; i < arms; i++) {
        const angle = (i / arms) * Math.PI * 2;
        const j = (offset: number) => {
          const val = Math.sin(p.seed + i * 15 + offset) * 10000;
          return (val - Math.floor(val) - 0.5);
        };
        
        const len = s * (2.5 + j(1) * 0.6);

        ctx.beginPath();
        ctx.moveTo(j(2) * 0.6, j(3) * 0.6);
        ctx.bezierCurveTo(
            Math.cos(angle) * len * 0.5 + j(7) * 2,
            Math.sin(angle) * len * 0.5 + j(8) * 2,
            Math.cos(angle) * len * 0.8 + j(9) * 2,
            Math.sin(angle) * len * 0.8 + j(10) * 2,
            Math.cos(angle) * len + j(4),
            Math.sin(angle) * len + j(5)
        );
        ctx.strokeStyle = "rgba(255, 253, 231, 0.7)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Fluffy tip
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * len,
          Math.sin(angle) * len,
          0.6 + Math.abs(j(6)) * 0.8,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }

      ctx.restore();
    };

    const drawPollen = (p: Particle) => {
      ctx.globalAlpha = p.opacity * globalOpacity;
      ctx.shadowBlur = p.size * 5;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawFirefly = (p: Particle) => {
      p.glowPhase += 0.018;
      const pulse = (Math.sin(p.glowPhase) + 1) / 2;
      ctx.globalAlpha = pulse * 0.85 * globalOpacity;

      ctx.shadowBlur = p.size * 14;
      ctx.shadowColor = "#fbbf24";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "#fef3c7";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251,191,36,${pulse * 0.12})`;
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const animate = () => {
      const currentTheme = themeRef.current;

      if (currentTheme === "earth" || currentTheme === "transitioning-to-earth") {
        globalOpacity = Math.min(1, globalOpacity + 0.007);
      } else {
        globalOpacity = Math.max(0, globalOpacity - 0.012);
      }

      if (globalOpacity <= 0.01) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * p.wobbleAmplitude;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.type === "leaf") {
          if (p.y > canvas.height + p.size * 2) {
            p.y = -p.size * 2;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -p.size * 2) p.x = canvas.width + p.size;
          if (p.x > canvas.width + p.size * 2) p.x = -p.size;
        } else {
          if (p.y < -20) p.y = canvas.height + 20;
          if (p.y > canvas.height + 20) p.y = -20;
          if (p.x < -20) p.x = canvas.width + 20;
          if (p.x > canvas.width + 20) p.x = -20;
        }

        if (p.type === "leaf") drawLeaf(p);
        else if (p.type === "pollen") drawPollen(p);
        else if (p.type === "firefly") drawFirefly(p);
        else if (p.type === "dandelion") drawDandelion(p);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
};

export default NatureField;
