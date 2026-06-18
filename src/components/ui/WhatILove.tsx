"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/contexts/ThemeProvider";
import { LottieAnimation } from "@/components/ui/LottieAnimation";

const LOTTIE_MAP: Record<string, string> = {
    "Anime is my escape": "/anime.json",
    "Japanese culture and language": "/Japan.json",
    "Night coding sessions": "/nightcoding.json",
    "Designing UI with feel": "/designUI.json",
    "Shitposting": "/shitposting.json",
    "Reading Masterpieces": "/books_stack.json",
};


const COLORS_SPACE = [
    { border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.08)", accent: "#3b82f6" },
    { border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.08)", accent: "#8b5cf6" },
    { border: "rgba(236,72,153,0.25)", glow: "rgba(236,72,153,0.08)", accent: "#ec4899" },
    { border: "rgba(6,182,212,0.25)", glow: "rgba(6,182,212,0.08)", accent: "#06b6d4" },
    { border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.08)", accent: "#f59e0b" },
    { border: "rgba(16,185,129,0.25)", glow: "rgba(16,185,129,0.08)", accent: "#10b981" },
];

const EARTH_ACCENTS = [
    "border-amber-300/40",
    "border-orange-300/40",
    "border-yellow-300/40",
    "border-lime-300/40",
    "border-teal-300/40",
    "border-rose-300/40",
];

export const WhatILove: React.FC = () => {
    const { isEarth } = useTheme();
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const items = personalInfo.about.whatILove;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // ─── Space Mode ───
    if (!isEarth) {
        return (
            <div className="space-y-8">
                <h3
                    className="text-3xl font-bold bg-clip-text text-transparent transition-all duration-1000"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, var(--theme-gradient-text-from), var(--theme-gradient-text-to))",
                    }}
                >
                    What I Love
                </h3>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {items.map((item, idx) => {
                        const c = COLORS_SPACE[idx];
                        const isHovered = hoveredIdx === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.07, duration: 0.5 }}
                                onHoverStart={() => setHoveredIdx(idx)}
                                onHoverEnd={() => setHoveredIdx(null)}
                                className="relative group rounded-2xl p-5 md:p-6 cursor-default overflow-hidden transition-all duration-500"
                                style={{
                                    background: isHovered
                                        ? `linear-gradient(135deg, ${c.glow}, rgba(255,255,255,0.02))`
                                        : "rgba(255,255,255,0.02)",
                                    border: `1px solid ${isHovered ? c.border : "rgba(255,255,255,0.06)"}`,
                                    boxShadow: isHovered
                                        ? `0 0 40px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                                        : "inset 0 1px 0 rgba(255,255,255,0.04)",
                                }}
                            >
                                {/* Lottie watermark */}
                                <div
                                    className="absolute -right-4 -bottom-4 w-28 h-28 md:w-32 md:h-32 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700 select-none pointer-events-none"
                                >
                                    {LOTTIE_MAP[item.title] ? (
                                        <LottieAnimation
                                            animationPath={LOTTIE_MAP[item.title]}
                                            className="w-full h-full"
                                            autoplay={false}
                                        />
                                    ) : (
                                        <span className="text-6xl md:text-7xl">{item.emoji}</span>
                                    )}
                                </div>

                                <div className="relative z-10">
                                    <motion.div
                                        className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-start"
                                        animate={isHovered ? { scale: [1, 1.15, 1] } : {}}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {LOTTIE_MAP[item.title] ? (
                                            <LottieAnimation
                                                animationPath={LOTTIE_MAP[item.title]}
                                                className="w-full h-full"
                                                autoplay={isMobile || isHovered}
                                            />
                                        ) : (
                                            <span className="text-2xl md:text-3xl">{item.emoji}</span>
                                        )}
                                    </motion.div>
                                    <h4 className="text-white font-bold text-base md:text-lg mb-1.5 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                                    style={{
                                        width: isHovered ? "100%" : "0%",
                                        background: `linear-gradient(90deg, ${c.accent}, transparent)`,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ─── Earth Mode ───
    return (
        <div className="space-y-8">
            <h3
                className="text-3xl font-bold bg-clip-text text-transparent transition-all duration-1000"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, var(--theme-gradient-text-from), var(--theme-gradient-text-to))",
                }}
            >
                What I Love
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {items.map((item, idx) => {
                    const isHovered = hoveredIdx === idx;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.07 }}
                            whileHover={{ y: -4 }}
                            onHoverStart={() => setHoveredIdx(idx)}
                            onHoverEnd={() => setHoveredIdx(null)}
                            className={`relative rounded-2xl p-5 md:p-6 bg-white/70 border ${EARTH_ACCENTS[idx]} shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm cursor-default`}
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-start">
                                {LOTTIE_MAP[item.title] ? (
                                    <LottieAnimation
                                        animationPath={LOTTIE_MAP[item.title]}
                                        className="w-full h-full"
                                        autoplay={isMobile || isHovered}
                                    />
                                ) : (
                                    <span className="text-2xl md:text-3xl">{item.emoji}</span>
                                )}
                            </div>
                            <h4
                                className="text-stone-800 font-bold text-base md:text-lg mb-1.5 leading-snug"
                                style={{ fontFamily: "var(--font-handwriting)" }}
                            >
                                {item.title}
                            </h4>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
