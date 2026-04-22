"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { usePathname } from "next/navigation";
import Starfield from "./Starfield";
import NatureField from "./NatureField";

// ─── types ────────────────────────────────────────────────────────────────────
interface Bird {
  ox: number;   // normalised x offset [0-1]
  oy: number;   // normalised y [0-1]
  speed: number;
  size: number;
  phase: number;
}

// ─── component ────────────────────────────────────────────────────────────────
export default function Atmosphere() {
  const pathname = usePathname();
  const { theme, isEarth } = useTheme();
  const showEarth = theme === "earth" || theme === "transitioning-to-earth";

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null); // static bg cache
  const paperRef     = useRef<HTMLCanvasElement | null>(null); // paper texture cache

  const rafRef       = useRef<number>(0);
  const timeRef      = useRef(0);
  const birdsRef     = useRef<Bird[]>([]);
  const scrollYRef   = useRef(0);

  useEffect(() => {
    if (pathname === "/about") return;
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!showEarth || pathname === "/about") {
      cancelAnimationFrame(rafRef.current);
      const c = canvasRef.current;
      if (c) c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
      return;
    }

    import("roughjs").then((mod) => {
      const Rough = (mod as any).default ?? mod;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // ── init birds ──────────────────────────────────────────────────────────
      birdsRef.current = Array.from({ length: 5 }, (_, i) => ({
        ox: Math.random(),
        oy: 0.05 + Math.random() * 0.15,
        speed: 0.015 + Math.random() * 0.01,
        size:  7 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
      }));

      // ── resize helper ────────────────────────────────────────────────────────
      const resize = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        buildPaperTexture(canvas.width, canvas.height);
        buildOffscreen(Rough, canvas.width, canvas.height);
      };

      const buildPaperTexture = (W: number, H: number) => {
        if (!paperRef.current) paperRef.current = document.createElement("canvas");
        const pc = paperRef.current;
        pc.width = W;
        pc.height = H;
        const pctx = pc.getContext("2d")!;
        
        // Base paper color (slightly off-white/cream)
        pctx.fillStyle = "#fdfcf0";
        pctx.fillRect(0, 0, W, H);
        
        // Add some noise/grain
        pctx.save();
        for (let i = 0; i < W * H * 0.015; i++) {
          const x = Math.random() * W;
          const y = Math.random() * H;
          const val = Math.random() * 15;
          pctx.fillStyle = `rgba(0,0,0,${val / 255})`;
          pctx.fillRect(x, y, 1, 1);
        }
        
        // Subtle fiber lines
        pctx.strokeStyle = "rgba(0,0,0,0.02)";
        pctx.lineWidth = 0.5;
        for (let i = 0; i < 150; i++) {
          pctx.beginPath();
          const x = Math.random() * W;
          const y = Math.random() * H;
          pctx.moveTo(x, y);
          pctx.lineTo(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
          pctx.stroke();
        }
        pctx.restore();
      };

      const buildOffscreen = (rough: any, W: number, H: number) => {
        if (!offscreenRef.current) offscreenRef.current = document.createElement("canvas");
        const oc  = offscreenRef.current;
        oc.width  = W;
        oc.height = H;
        const oct = oc.getContext("2d")!;
        const rc  = rough.canvas(oc);

        oct.clearRect(0, 0, W, H);

        // ── SKY GRADIENT (Watercolour style) ──────────────────────────────────
        const sky = oct.createLinearGradient(0, 0, 0, H * 0.85);
        sky.addColorStop(0.00, "#64b5f6");
        sky.addColorStop(0.35, "#bbdefb");
        sky.addColorStop(0.65, "#e3f2fd");
        sky.addColorStop(0.85, "#fff9c4");
        sky.addColorStop(1.00, "#ffecb3");
        oct.fillStyle = sky;
        oct.fillRect(0, 0, W, H * 0.85);

        // Subtle cloud-like texture in sky
        oct.save();
        oct.globalAlpha = 0.1;
        for(let i=0; i<30; i++) {
            const tx = Math.random() * W;
            const ty = Math.random() * H * 0.5;
            const tr = 50 + Math.random() * 150;
            const grad = oct.createRadialGradient(tx, ty, 0, tx, ty, tr);
            grad.addColorStop(0, "rgba(255,255,255,0.8)");
            grad.addColorStop(1, "rgba(255,255,255,0)");
            oct.fillStyle = grad;
            oct.beginPath();
            oct.arc(tx, ty, tr, 0, Math.PI * 2);
            oct.fill();
        }
        oct.restore();

        // ── SUN (Static Glow) ────────────────────────────────────────────────
        const sx = W * 0.82, sy = H * 0.16, sr = 52;
        oct.save();
        const sunGlow = oct.createRadialGradient(sx, sy, 0, sx, sy, sr * 4);
        sunGlow.addColorStop(0, "rgba(255, 236, 179, 0.4)");
        sunGlow.addColorStop(0.5, "rgba(255, 193, 7, 0.1)");
        sunGlow.addColorStop(1, "rgba(255, 193, 7, 0)");
        oct.fillStyle = sunGlow;
        oct.fillRect(0, 0, W, H * 0.6);
        oct.restore();

        // Sun disc - refined sketch
        rc.circle(sx, sy, sr * 2, {
          fill: "#ffca28", fillStyle: "hachure",
          hachureAngle: -25, hachureGap: 2.2, fillWeight: 1.5,
          stroke: "#f57c00", strokeWidth: 2,
          roughness: 1.2, seed: 99,
        });
        
        // Inner spot
        rc.circle(sx - sr * 0.2, sy - sr * 0.2, sr * 0.7, {
          fill: "#fffde7", fillStyle: "solid",
          stroke: "none", roughness: 0.5,
        });

        // ── WINDING PATH (Sketchy) ───────────────────────────────────────────
        const pathPts: [number, number][] = [
          [W * 0.42, H],
          [W * 0.44, H * 0.94],
          [W * 0.48, H * 0.88],
          [W * 0.47, H * 0.83],
          [W * 0.50, H * 0.78],
        ];
        rc.curve(pathPts, {
          stroke: "#795548", strokeWidth: 22,
          roughness: 2.5, seed: 777,
        });
        rc.curve(pathPts, {
          stroke: "#a1887f", strokeWidth: 14,
          roughness: 1.8, seed: 778,
        });

        // ── FENCE ─────────────────────────────────────────────────────────────
        drawFence(rc, oct, W, H * 0.82);

        // ── GROUND FILL ──────────────────────────────────────────────────────
        const gnd = oct.createLinearGradient(0, H * 0.9, 0, H);
        gnd.addColorStop(0,   "#388e3c");
        gnd.addColorStop(0.5, "#2e7d32");
        gnd.addColorStop(1,   "#1b5e20");
        oct.fillStyle = gnd;
        oct.fillRect(0, H * 0.9, W, H * 0.1);
      };

      resize();
      window.addEventListener("resize", resize);

      // ─── main animation loop ────────────────────────────────────────────────
      const loop = () => {
        const c   = canvasRef.current;
        const oc  = offscreenRef.current;
        const pc  = paperRef.current;
        if (!c || !oc || !pc) return;
        const ctx = c.getContext("2d")!;
        
        timeRef.current += 0.006;
        const t  = timeRef.current;
        const sc = scrollYRef.current;
        const W  = c.width;
        const H  = c.height;

        ctx.clearRect(0, 0, W, H);

        // 1. Paper Texture Base
        ctx.drawImage(pc, 0, 0);

        // 2. Parallax Layers
        const rc = Rough.canvas(c);

        // LAYER 0: Distant Mountains (Very slow parallax)
        ctx.save();
        ctx.translate(0, sc * 0.05);
        const m0pts = generateHillPath(W, H, 0.45, 0.09, 2.5, 101);
        ctx.globalAlpha = 0.35;
        rc.polygon(m0pts, {
          fill: "#90caf9", fillStyle: "solid",
          stroke: "#64b5f6", strokeWidth: 0.8,
          roughness: 0.6, seed: 101,
        });
        ctx.restore();

        // LAYER 1: Forest Hills
        ctx.save();
        ctx.translate(0, sc * 0.1);
        const m1pts = generateHillPath(W, H, 0.56, 0.07, 4.5, 201);
        rc.polygon(m1pts, {
          fill: "#66bb6a", fillStyle: "hachure",
          hachureAngle: -45, hachureGap: 5, fillWeight: 1.1,
          stroke: "#43a047", strokeWidth: 1.2,
          roughness: 1.2, seed: 201,
        });
        ctx.restore();

        // LAYER 2: Rolling Hills
        ctx.save();
        ctx.translate(0, sc * 0.18);
        const m2pts = generateHillPath(W, H, 0.68, 0.05, 3.5, 301);
        rc.polygon(m2pts, {
          fill: "#8bc34a", fillStyle: "hachure",
          hachureAngle: 60, hachureGap: 4, fillWeight: 1.3,
          stroke: "#689f38", strokeWidth: 1.8,
          roughness: 1.5, seed: 301,
        });
        ctx.restore();

        // LAYER 3: Near Ground
        ctx.save();
        ctx.translate(0, sc * 0.25);
        const m3pts = generateHillPath(W, H, 0.78, 0.04, 2.8, 401);
        rc.polygon(m3pts, {
          fill: "#4caf50", fillStyle: "hachure",
          hachureAngle: 85, hachureGap: 3.5, fillWeight: 1.5,
          stroke: "#388e3c", strokeWidth: 2.2,
          roughness: 1.3, seed: 401,
        });
        
        // Grass swaying on near ground
        const tuftsY = H * 0.78;
        const wind = Math.sin(t * 1.2) * 4;
        for (let i = 0; i < W; i += 28) {
          const bx = i + (((i * 137) % 18) - 9);
          const bh = 12 + ((i * 31) % 18);
          const lean = wind + (((i * 73) % 14) - 7);
          rc.line(bx, tuftsY, bx + lean, tuftsY - bh, {
            stroke: i % 3 === 0 ? "#2e7d32" : i % 3 === 1 ? "#43a047" : "#66bb6a",
            strokeWidth: 1.5 + ((i * 11) % 6) / 10,
            roughness: 1.8, seed: i,
          });
        }
        ctx.restore();

        // 3. Draw Static Cache (Sky Gradient, Sun, Path, Fence, Ground)
        ctx.drawImage(oc, 0, 0);

        // 4. Dynamic Clouds (Drifting)
        const cloudDrift = (t * 20) % (W + 400);
        drawCloud(rc, ctx, (W * 0.12 + cloudDrift) % (W + 400) - 200, H * 0.15, 110, 1, 10);
        drawCloud(rc, ctx, (W * 0.45 + cloudDrift * 0.8) % (W + 400) - 200, H * 0.10, 85, 2, 20);
        drawCloud(rc, ctx, (W * 0.75 + cloudDrift * 1.2) % (W + 400) - 200, H * 0.22, 70, 3, 30);

        // 5. Sun Rays
        const sx = W * 0.82, sy = H * 0.16, sr = 52;
        const rayCount = 14;
        for (let i = 0; i < rayCount; i++) {
          const angle = (i / rayCount) * Math.PI * 2 + t * 0.12;
          const inner = sr + 10;
          const isLong = i % 2 === 0;
          const outer = sr + (isLong ? 38 : 24) + Math.sin(t * 1.4 + i) * 4;
          rc.line(
            sx + Math.cos(angle) * inner, sy + Math.sin(angle) * inner,
            sx + Math.cos(angle) * outer, sy + Math.sin(angle) * outer,
            { stroke: isLong ? "#ffa000" : "#ffc107", strokeWidth: isLong ? 2.5 : 1.4, roughness: 1.5, seed: i * 5 }
          );
        }

        // 6. Trees (Swaying)
        const treeSway = Math.sin(t * 0.8) * 1.5;
        ctx.save();
        ctx.translate(0, sc * 0.25);
        if (W > 550) {
            drawTree(rc, ctx, W * 0.08, H * 0.80, 85, 501, treeSway);
            drawTree(rc, ctx, W * 0.88, H * 0.79, 72, 502, -treeSway * 0.8);
            if (W > 900) {
                drawTree(rc, ctx, W * 0.16, H * 0.82, 58, 504, treeSway * 1.2);
            }
        }
        ctx.restore();

        // 7. Birds
        birdsRef.current.forEach((b) => {
          const bx = ((b.ox + t * b.speed) % 1.2) * W - (W * 0.1);
          const by = H * b.oy + Math.sin(t * 1.5 + b.phase) * 6;
          const flap = Math.sin(t * 5 + b.phase) * b.size * 0.55;
          // Sketchy bird (V-shape)
          rc.line(bx, by, bx - b.size, by - flap, { stroke: "#263238", strokeWidth: 1.6, roughness: 1.4, seed: b.phase | 0 });
          rc.line(bx, by, bx + b.size, by - flap, { stroke: "#263238", strokeWidth: 1.6, roughness: 1.4, seed: (b.phase + 5) | 0 });
        });

        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(rafRef.current);
      };
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [showEarth, pathname]);

  if (pathname === "/about") return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ═══ SPACE: BLACK BG ═══ */}
      <AnimatePresence>
        {!showEarth && (
          <motion.div
            key="space-bg"
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* ═══ EARTH: ROUGH.JS CANVAS ═══ */}
      <AnimatePresence>
        {showEarth && (
          <motion.canvas
            key="earth-canvas"
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* ═══ STARFIELD (space) ═══ */}
      <div className="absolute inset-0 z-[1]">
        <Starfield />
      </div>

      {/* ═══ NATURE PARTICLES (earth) ═══ */}
      <div className="absolute inset-0 z-[6]">
        <NatureField />
      </div>

      {/* ═══ TRANSITION FLASH ═══ */}
      <AnimatePresence>
        {theme === "transitioning-to-earth" && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.05, 0.12, 0] }}
            transition={{ duration: 2.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0 bg-amber-50 z-[3] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   HELPER FUNCTIONS
═══════════════════════════════════════════════════════════════════════════ */

function generateHillPath(W: number, H: number, baselineY: number, amplitude: number, frequency: number, seed: number) {
  const points: [number, number][] = [];
  const segments = 32;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * W;
    const variance = 
      Math.sin(i * frequency * 0.4 + seed) * H * amplitude +
      Math.sin(i * frequency * 0.9 + seed * 2) * H * amplitude * 0.4 +
      Math.sin(i * frequency * 1.8 + seed * 3) * H * amplitude * 0.15;
    const y = H * baselineY + variance;
    points.push([x, y]);
  }
  points.push([W, H * 1.5]);
  points.push([0, H * 1.5]);
  return points;
}

function drawCloud(rc: any, ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, seed: number, seedBase: number) {
  const puffs: [number, number, number, number][] = [
    [0,             0,          size * 0.65, seedBase],
    [-size * 0.5,  size * 0.1,  size * 0.45, seedBase + 1],
    [ size * 0.5,  size * 0.12, size * 0.48, seedBase + 2],
    [-size * 0.25, -size * 0.18, size * 0.38, seedBase + 3],
    [ size * 0.28, -size * 0.15, size * 0.42, seedBase + 4],
  ];
  
  puffs.forEach(([rx, ry, r, s]) => {
    rc.circle(cx + rx, cy + ry, r * 2, {
      fill: "rgba(255, 255, 255, 0.9)", fillStyle: "solid",
      stroke: "none", roughness: 1.2, seed: s,
    });
    rc.circle(cx + rx, cy + ry, r * 2.1, {
      stroke: "rgba(189, 189, 189, 0.4)", strokeWidth: 1,
      roughness: 1.8, seed: s + 100,
    });
  });
}

function drawTree(rc: any, ctx: CanvasRenderingContext2D, x: number, groundY: number, size: number, seedBase: number, sway: number) {
  const trunkH = size * 1.2;
  const trunkW = size * 0.16;
  
  const trunkPts: [number, number][] = [
    [x - trunkW * 0.5, groundY],
    [x + trunkW * 0.5, groundY],
    [x + trunkW * 0.25 + sway, groundY - trunkH],
    [x - trunkW * 0.25 + sway, groundY - trunkH],
  ];
  
  rc.polygon(trunkPts, {
    fill: "#5d4037", fillStyle: "hachure",
    hachureAngle: 80, hachureGap: 3, fillWeight: 1.5,
    stroke: "#3e2723", strokeWidth: 1.8,
    roughness: 1.5, seed: seedBase,
  });

  const canopyY = groundY - trunkH;
  const r = size * 0.85;
  const blobs: [number, number, number, number, string][] = [
    [x + sway,          canopyY,        r,        seedBase + 10, "#2e7d32"],
    [x - r * 0.6 + sway, canopyY + r * 0.4, r * 0.75, seedBase + 11, "#1b5e20"],
    [x + r * 0.5 + sway, canopyY + r * 0.3, r * 0.75, seedBase + 12, "#388e3c"],
    [x - r * 0.3 + sway, canopyY - r * 0.5, r * 0.55, seedBase + 13, "#2e7d32"],
    [x + r * 0.3 + sway, canopyY - r * 0.4, r * 0.55, seedBase + 14, "#43a047"],
  ];
  
  blobs.forEach(([bx, by, br, s, color]) => {
    rc.circle(bx, by, br * 2, {
      fill: color, fillStyle: "hachure",
      hachureAngle: -50, hachureGap: 4, fillWeight: 1.2,
      stroke: "#1b5e20", strokeWidth: 1.2,
      roughness: 2.2, seed: s,
    });
  });
}

function drawFence(rc: any, ctx: CanvasRenderingContext2D, W: number, y: number) {
  rc.line(-20, y - 20, W + 20, y - 22, { stroke: "#8d6e63", strokeWidth: 2.5, roughness: 1.8, seed: 900 });
  rc.line(-20, y - 8,  W + 20, y - 10, { stroke: "#8d6e63", strokeWidth: 2.5, roughness: 1.8, seed: 901 });

  const postSpacing = 110;
  const count = Math.ceil(W / postSpacing) + 1;
  for (let i = 0; i <= count; i++) {
    const px   = i * postSpacing + ((i * 13) % 18 - 9);
    const h    = 45 + ((i * 19) % 12);
    const lean = ((i * 41) % 10) - 5;
    
    rc.rectangle(px, y - h + 18, 7, h, {
      fill: "#795548", fillStyle: "solid",
      stroke: "#4e342e", strokeWidth: 2,
      roughness: 1.5, seed: 950 + i,
    });
    
    rc.line(px - 3, y - h + 18, px + 10, y - h + 18, {
      stroke: "#4e342e", strokeWidth: 1.8, roughness: 1, seed: 980 + i
    });
  }
}
