"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeProvider";

function LenisManager() {
  const lenis = useLenis();
  const { theme, isTransitioning } = useTheme();
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);

  useEffect(() => {
    const handleGravityState = (e: CustomEvent<{ isEnabled: boolean }>) => {
      setIsPhysicsActive(e.detail.isEnabled);
    };

    window.addEventListener('clippy-gravity-state', handleGravityState as EventListener);
    return () => {
      window.removeEventListener('clippy-gravity-state', handleGravityState as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const shouldStop = isTransitioning || theme === "zen" || theme === "terminal" || isPhysicsActive;
    
    if (shouldStop) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, theme, isTransitioning, isPhysicsActive]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // expo ease-out
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0, // compensate for halved touch delta on 120fps
        infinite: false,
      }}
    >
      <LenisManager />
      {children}
    </ReactLenis>
  );
}
