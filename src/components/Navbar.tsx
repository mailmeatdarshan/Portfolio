/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, RotateCcw, Orbit, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isPhysicsEnabled, setIsPhysicsEnabled] = useState(false);
    const { isEarth, setZenMode, setTerminalMode } = useTheme();

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
            
            setIsScrolled(currentScrollY > 20);

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

    if (pathname === "/about" || pathname?.startsWith("/guestbook")) return null;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Journey", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Guestbook", href: "/guestbook" },
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
                        className={`fixed top-0 left-0 right-0 h-32 backdrop-blur-md z-[45] pointer-events-none transition-colors duration-1000 ${
                            isEarth
                                ? "bg-gradient-to-b from-amber-50/80 via-amber-50/40 to-transparent"
                                : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
                        }`}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Drawer Backdrop */}
            <div 
                className={`fixed inset-0 h-screen w-screen z-[80] pointer-events-auto transition-opacity duration-500 ease-out md:hidden ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)"
                }}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Drawer Panel */}
            <div
                className={`fixed inset-0 h-screen w-screen z-[90] pointer-events-auto flex flex-col justify-between p-8 md:hidden transition-transform duration-700`}
                style={{
                    transform: isOpen ? "translateX(0)" : "translateX(100%)",
                    transitionTimingFunction: "cubic-bezier(0.77, 0, 0.18, 1)",
                    fontFamily: isEarth ? "var(--font-handwriting)" : "var(--font-satoshi), sans-serif",
                    backgroundImage: isEarth ? "repeating-linear-gradient(transparent, transparent 39px, rgba(59,130,246,0.06) 39px, rgba(59,130,246,0.06) 40px)" : "none",
                    backgroundPosition: "0 24px",
                    backgroundColor: isEarth ? "#fefcf3" : "#000000",
                }}
            >
                {/* Red notebook margin line for Earth mode */}
                {isEarth && (
                    <div 
                        className="absolute left-10 top-0 bottom-0 w-[1px] pointer-events-none"
                        style={{
                            backgroundColor: "rgba(239, 68, 68, 0.25)"
                        }}
                    />
                )}

                {/* Staggered Links */}
                <div className="flex flex-col items-center justify-center gap-8 my-auto w-full z-10">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`transition-all duration-300 block text-center select-none ${
                                isEarth 
                                    ? "text-3xl md:text-4xl font-medium text-stone-700 hover:text-amber-900 active:scale-95" 
                                    : "text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:tracking-[0.25em] active:scale-95"
                            }`}
                            style={{
                                transform: isOpen ? "translateY(0)" : "translateY(25px)",
                                opacity: isOpen ? 1 : 0,
                                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                                transitionDelay: isOpen ? `${index * 60 + 150}ms` : "0ms"
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

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
                    ${isOpen ? "" : "liquid-glass"}
                    ${isScrolled 
                        ? "w-full max-w-4xl translate-y-2" 
                        : "w-full max-w-5xl"
                    }
                    ${isOpen 
                        ? "z-[100] !bg-transparent !border-transparent !shadow-none" 
                        : isScrollingUp 
                            ? isEarth
                                ? "bg-white/90 border-stone-300/40 shadow-[0_0_30px_rgba(0,0,0,0.1)] scale-[1.01] z-50 backdrop-blur-none"
                                : "bg-black/95 border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] scale-[1.01] z-50 backdrop-blur-none"
                            : "z-10"
                    }
                `}
            >
                {/* Logo */}
                <div className={`flex-shrink-0 relative z-20 transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <Link
                        href="/"
                        className={`font-bold text-lg md:text-xl tracking-tighter hover:opacity-80 transition-all duration-1000 ${
                            isEarth ? "text-stone-800" : "text-white"
                        }`}
                    >
                        DUBEY<span className={`transition-colors duration-1000 ${isEarth ? "text-amber-600" : "text-blue-500"}`}>.</span>G
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
                                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all group ${
                                    isEarth
                                        ? "text-stone-500 hover:text-stone-800"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            layoutId="nav-pill-simple"
                                            className={`absolute inset-0 backdrop-blur-md border rounded-full -z-0 ${
                                                isEarth
                                                    ? "bg-stone-800/[0.06] border-stone-800/10"
                                                    : "bg-white/[0.1] border-white/10"
                                            }`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                        
                        <button
                            onClick={setZenMode}
                            className={`ml-2 p-2 rounded-full transition-all group relative overflow-hidden ${
                                isEarth
                                    ? "text-stone-500 hover:text-amber-600 bg-stone-800/5 hover:bg-amber-50"
                                    : "text-gray-300 hover:text-blue-400 bg-white/5 hover:bg-white/10"
                            }`}
                            title="Zen Mode"
                        >
                            <Sparkles className="h-4 w-4 relative z-10" />
                            <span className="sr-only">Zen Mode</span>
                        </button>
                        
                        <button
                            onClick={setTerminalMode}
                            className={`ml-1 p-2 rounded-full transition-all group relative overflow-hidden ${
                                isEarth
                                    ? "text-stone-500 hover:text-green-600 bg-stone-800/5 hover:bg-green-50"
                                    : "text-gray-300 hover:text-green-400 bg-white/5 hover:bg-white/10"
                            }`}
                            title="Terminal Mode"
                        >
                            <Terminal className="h-4 w-4 relative z-10" />
                            <span className="sr-only">Terminal Mode</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2 relative z-20">
                    <button
                        onClick={setTerminalMode}
                        className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                            isEarth
                                ? "text-stone-500 hover:text-green-600 hover:bg-stone-800/10"
                                : "text-gray-300 hover:text-green-400 hover:bg-white/10"
                        } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        aria-label="Terminal Mode"
                    >
                        <Terminal className="h-5 w-5" />
                    </button>
                    <button
                        onClick={setZenMode}
                        className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                            isEarth
                                ? "text-stone-500 hover:text-stone-800 hover:bg-stone-800/10"
                                : "text-gray-300 hover:text-white hover:bg-white/10"
                        } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        aria-label="Zen Mode"
                    >
                        <Sparkles className="h-5 w-5" />
                    </button>
                    <button
                        onClick={togglePhysics}
                        className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                            isEarth
                                ? "text-stone-500 hover:text-stone-800 hover:bg-stone-800/10"
                                : "text-gray-300 hover:text-white hover:bg-white/10"
                        } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
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
                        className="relative z-[100] flex h-10 w-10 items-center justify-center focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <div className="relative h-[14px] w-5">
                            <span 
                                className={`absolute left-0 top-0 h-[2px] w-5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                                    isEarth ? "bg-stone-800" : "bg-white"
                                }`}
                                style={{
                                    transform: isOpen ? "translateY(6px) rotate(45deg)" : "none",
                                }}
                            />
                            <span 
                                className={`absolute left-0 top-[6px] h-[2px] w-5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                                    isEarth ? "bg-stone-800" : "bg-white"
                                }`}
                                style={{
                                    opacity: isOpen ? 0 : 1,
                                    transform: isOpen ? "scale(0)" : "none",
                                }}
                            />
                            <span 
                                className={`absolute left-0 bottom-0 h-[2px] w-5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                                    isEarth ? "bg-stone-800" : "bg-white"
                                }`}
                                style={{
                                    transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                                }}
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>
        </div>
    );
}
