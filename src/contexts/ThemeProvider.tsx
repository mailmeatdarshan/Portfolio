"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "space" | "earth" | "transitioning-to-earth" | "transitioning-to-space";

interface ThemeContextProps {
  theme: Theme;
  isEarth: boolean;
  isSpace: boolean;
  isTransitioning: boolean;
  triggerTransition: () => void;
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
        localStorage.setItem("portfolio-theme", "earth");
        window.dispatchEvent(new CustomEvent("clippy-landed"));
      }, TRANSITION_DURATION);
    } else if (theme === "earth") {
      setTheme("transitioning-to-space");
      setTimeout(() => {
        setTheme("space");
        localStorage.setItem("portfolio-theme", "space");
        window.dispatchEvent(new CustomEvent("clippy-liftoff"));
      }, TRANSITION_DURATION);
    }
  }, [theme]);

  // Sync theme classes on body
  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-space", "theme-earth", "theme-transitioning-to-earth", "theme-transitioning-to-space");
    body.classList.add(`theme-${theme}`);
    
    // Lock scroll during transition
    if (theme.startsWith("transitioning")) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    // Dispatch for any external listeners
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme } }));
  }, [theme]);

  const isEarth = theme === "earth";
  const isSpace = theme === "space";
  const isTransitioning = theme.startsWith("transitioning");

  return (
    <ThemeContext.Provider value={{ theme, isEarth, isSpace, isTransitioning, triggerTransition }}>
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