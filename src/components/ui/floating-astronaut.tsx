"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FloatingAstronautProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  rotate?: number;
  width?: number;
  height?: number;
  parallaxSpeed?: number;
}

export const FloatingAstronaut = ({
  src,
  alt,
  className,
  delay = 0,
  duration = 5,
  distance = 20,
  rotate = 5,
  width = 500,
  height = 500,
  parallaxSpeed = 0.2,
}: FloatingAstronautProps) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { scrollY } = useScroll();
  const scrollYParallax = useTransform(scrollY, [0, 5000], [0, 5000 * parallaxSpeed]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, windowSize.height], [rotate, -rotate]);
  const rotateY = useTransform(springX, [0, windowSize.width], [-rotate, rotate]);
  const translateX = useTransform(springX, [0, windowSize.width], [-distance, distance]);
  const translateY = useTransform(springY, [0, windowSize.height], [-distance, distance]);

  // Combined parallax and mouse movement
  const finalY = useTransform([translateY, scrollYParallax], ([y, p]) => (y as number) - (p as number));

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: finalY,
      }}
      className={cn("relative z-10 select-none pointer-events-none perspective-1000", className)}
    >
      <motion.div
        animate={{
          y: [0, -distance / 2, 0],
          rotate: [-rotate / 2, rotate / 2, -rotate / 2],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain mix-blend-screen opacity-70 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
};
