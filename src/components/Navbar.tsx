"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, RotateCcw, Orbit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isPhysicsEnabled, setIsPhysicsEnabled] = useState(false);

    useEffect(() => {
        const handleGravityState = (e: any) => {
            setIsPhysicsEnabled(e.detail.isEnabled);
        };
        window.addEventListener('clippy-gravity-state', handleGravityState as any);
        return () => window.removeEventListener('clippy-gravity-state', handleGravityState as any);
    }, []);

    const togglePhysics = () => {
        window.dispatchEvent(new CustomEvent('clippy-toggle-gravity'));
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Basic scrolled state for navbar styling
            setIsScrolled(currentScrollY > 20);

            // Logic for "Scroll Up" detection
            // We show the blur ONLY when scrolling up and NOT at the very top
            const isMovingUp = currentScrollY < lastScrollY;
            const isNotAtTop = currentScrollY > 20;

            if (isMovingUp && isNotAtTop) {
                setIsScrollingUp(true);
            } else {
                setIsScrollingUp(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Journey", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-6 pointer-events-none">
            {/* Dynamic Top Backdrop Blur Overlay - Only on Scroll Up */}
            <AnimatePresence>
                {isScrollingUp && (
                    <motion.div 
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md z-[45] pointer-events-none" 
                    />
                )}
            </AnimatePresence>

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                    pointer-events-auto
                    relative flex items-center justify-between 
                    px-8 h-14 md:h-16 rounded-full 
                    transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                    liquid-glass
                    ${isScrolled 
                        ? "w-full max-w-4xl translate-y-2" 
                        : "w-full max-w-5xl"
                    }
                    ${isScrollingUp 
                        ? "bg-black/95 border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] scale-[1.01] z-50 backdrop-blur-none" 
                        : "z-10"
                    }
                `}
            >
                {/* Logo */}
                <div className="flex-shrink-0 relative z-20">
                    <Link href="/" className="text-white font-bold text-lg md:text-xl tracking-tighter hover:opacity-80 transition-opacity">
                        DUBEY<span className="text-blue-500">.</span>G
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block relative z-20">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                className="relative text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-all group"
                            >
                                <span className="relative z-10">{link.name}</span>
                                
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            layoutId="nav-pill-simple"
                                            className="absolute inset-0 bg-white/[0.1] backdrop-blur-md border border-white/10 rounded-full -z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2 relative z-20">
                    <button
                        onClick={togglePhysics}
                        className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
                        aria-label={isPhysicsEnabled ? "Reset Layout" : "Start Floating"}
                    >
                        {isPhysicsEnabled ? (
                            <RotateCcw className="h-5 w-5" />
                        ) : (
                            <Orbit className="h-5 w-5" />
                        )}
                    </button>
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-4 p-4 rounded-[2rem] md:hidden overflow-hidden z-30 bg-black/90 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,1)]"
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-white hover:bg-white/10 block px-6 py-4 rounded-2xl text-lg font-semibold transition-all active:bg-white/20 border-b border-white/5 last:border-none"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
