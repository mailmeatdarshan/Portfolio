"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function BackToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (pathname === "/about") return;
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [pathname]);

  useLenis((lenisInstance) => {
    if (lenisInstance && isBlurring && lenisInstance.scroll <= 20) {
      setIsBlurring(false);
    }
  });

  if (pathname === "/about") return null;

  const scrollToTop = () => {
    // Activate full-screen blur overlay
    setIsBlurring(true);

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.0,
        onComplete: () => {
          setIsBlurring(false);
        },
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Fallback: remove blur after estimated scroll time
      setTimeout(() => setIsBlurring(false), 1000);
    }
  };

  return (
    <>
      {/* Full-screen blur overlay during scroll-to-top */}
      <AnimatePresence>
        {isBlurring && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[45] pointer-events-none"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
          />
        )}
      </AnimatePresence>

      {/* BackToTop button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            className="group fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg ring-1 ring-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
