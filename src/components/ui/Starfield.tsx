"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  opacity: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
}

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    const starCount = 200;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * (1.8 - 0.3) + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
          opacity: Math.random(),
        });
      }
    };

    const createMeteor = () => {
      const side = Math.random() > 0.5;
      meteors.push({
        x: side ? Math.random() * canvas.width : canvas.width,
        y: side ? 0 : Math.random() * canvas.height,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 10 + 5,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars
      stars.forEach((star) => {
        const alpha = (Math.sin(time * 0.001 * star.speed * 100 + star.phase) + 1) / 2;
        const currentOpacity = alpha * 0.8 + 0.2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        star.y -= star.radius * 0.05;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw Meteors
      if (Math.random() < 0.01) createMeteor();

      meteors.forEach((meteor, index) => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          meteor.x, meteor.y, 
          meteor.x - Math.cos(meteor.angle) * meteor.length,
          meteor.y + Math.sin(meteor.angle) * meteor.length
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(
          meteor.x - Math.cos(meteor.angle) * meteor.length,
          meteor.y + Math.sin(meteor.angle) * meteor.length
        );
        ctx.stroke();

        meteor.x -= Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.opacity -= 0.01;

        if (meteor.opacity <= 0 || meteor.x < -100 || meteor.y > canvas.height + 100) {
          meteors.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default Starfield;
