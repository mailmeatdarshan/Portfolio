"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "space" | "earth" | "zen" | "transitioning-to-earth" | "transitioning-to-space" | "transitioning-to-zen";

interface ThemeContextProps {
  theme: Theme;
  isEarth: boolean;
  isSpace: boolean;
  isZen: boolean;
  isTransitioning: boolean;
  triggerTransition: () => void;
  setZenMode: () => void;
  setEarthMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const TRANSITION_DURATION = 2500;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("space");

  const triggerTransition = useCallback(() => {
    if (theme === "space") {
      setTheme("transitioning-to-earth");
      setTimeout(() => {
        setTheme("earth");
        window.dispatchEvent(new CustomEvent("clippy-landed"));
      }, TRANSITION_DURATION);
    } else if (theme === "earth") {
      setTheme("transitioning-to-space");
      setTimeout(() => {
        setTheme("space");
        window.dispatchEvent(new CustomEvent("clippy-liftoff"));
      }, TRANSITION_DURATION);
    } else if (theme === "zen") {
      // If in zen mode, clicking the main toggle returns to space
      setTheme("transitioning-to-space");
      setTimeout(() => {
        setTheme("space");
        window.dispatchEvent(new CustomEvent("clippy-liftoff"));
      }, TRANSITION_DURATION);
    }
  }, [theme]);

  const setZenMode = useCallback(() => {
    if (theme !== "zen" && !theme.startsWith("transitioning")) {
      setTheme("transitioning-to-zen");
      setTimeout(() => {
        setTheme("zen");
      }, TRANSITION_DURATION);
    }
  }, [theme]);

  const setEarthMode = useCallback(() => {
    if (theme !== "earth" && !theme.startsWith("transitioning")) {
      setTheme("transitioning-to-earth");
      setTimeout(() => {
        setTheme("earth");
        window.dispatchEvent(new CustomEvent("clippy-landed"));
      }, TRANSITION_DURATION);
    }
  }, [theme]);

  // Sync theme classes on body
  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-space", "theme-earth", "theme-zen", "theme-transitioning-to-earth", "theme-transitioning-to-space", "theme-transitioning-to-zen");
    body.classList.add(`theme-${theme}`);
    
    // Lock scroll during transition OR when in zen mode
    if (theme.startsWith("transitioning") || theme === "zen") {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    // Dispatch for any external listeners
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme } }));
  }, [theme]);

  const isEarth = theme === "earth";
  const isSpace = theme === "space";
  const isZen = theme === "zen";
  const isTransitioning = theme.startsWith("transitioning");

  return (
    <ThemeContext.Provider value={{ theme, isEarth, isSpace, isZen, isTransitioning, triggerTransition, setZenMode, setEarthMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};