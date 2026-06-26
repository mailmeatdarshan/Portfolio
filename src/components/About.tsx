"use client";
import React from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { BlurReveal } from '@/components/BlurReveal';

import { RoughCard } from "./ui/rough-card";
import { WhatILove } from "./ui/WhatILove";
import { MasterplanTimeline } from "./ui/MasterplanTimeline";

export default function About() {
    const { isEarth } = useTheme();

    return (
        <div className="py-20 w-full max-w-7xl mx-auto px-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 id="my-world" className={`text-4xl md:text-5xl font-bold text-center mb-10 transition-colors duration-1000`}
                    style={{ color: "var(--theme-text-heading)" }}
                >
                    My World
                </h2>

                <BlurReveal delay={0.1}>
                <RoughCard
                    className="max-w-4xl mx-auto text-center mb-20 p-8 rounded-3xl"
                    fillColor={isEarth ? "rgba(255,255,255,0.4)" : "rgba(23,23,23,0.5)"}
                    strokeColor={isEarth ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)"}
                    roughness={isEarth ? 2.5 : 0}
                >
                    <h3 className="text-2xl font-bold mb-6 transition-colors duration-1000"
                        style={{ color: "var(--theme-text-heading)" }}
                    >
                        About Me
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed font-light transition-colors duration-1000"
                        style={{ color: "var(--theme-text-body)" }}
                    >
                        I&apos;m a computer science student with a strong interest in{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-amber-600" : "text-blue-400"}`}>web development</span>,{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-emerald-600" : "text-yellow-400"}`}>cloud computing</span>,{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-orange-600" : "text-purple-400"}`}>automation</span>, and{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-teal-600" : "text-green-400"}`}>backend development</span>.
                        I enjoy building efficient systems that solve real-world problems. I&apos;m especially passionate about modern technologies and scalable system design.
                    </p>
                    <div className="flex justify-center mt-6">
                        <Link 
                            href="/about"
                            className={`inline-flex items-center gap-1 text-sm font-semibold tracking-wide px-5 py-2 rounded-full border transition-all duration-300 active:scale-95 hover:scale-105 ${
                                isEarth 
                                    ? "bg-amber-600/5 border-amber-600/20 text-amber-700 hover:bg-amber-600/10 hover:text-amber-900 shadow-[2px_2px_0px_rgba(180,83,9,0.15)]" 
                                    : "bg-blue-500/5 border-blue-500/20 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                            }`}
                        >
                            Know me better
                        </Link>
                    </div>
                </RoughCard>
                </BlurReveal>

                {/* What I Love — Full-width immersive section */}
                <BlurReveal delay={0.15}>
                <div id="what-i-love" className="mb-20">
                    <WhatILove />
                </div>
                </BlurReveal>

                {/* Masterplan Before 30 — Full-width immersive section */}
                <BlurReveal delay={0.2}>
                <div id="masterplan">
                    <MasterplanTimeline />
                </div>
                </BlurReveal>
            </motion.div>
        </div>
    );
}
