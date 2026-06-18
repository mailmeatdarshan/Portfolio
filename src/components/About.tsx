"use client";
import React from "react";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

import { RoughCard } from "./ui/rough-card";
import { WhatILove } from "./ui/WhatILove";
import { MasterplanTimeline } from "./ui/MasterplanTimeline";

export default function About() {
    const { isEarth } = useTheme();

    return (
        <div className="py-20 w-full max-w-7xl mx-auto px-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 id="my-world" className={`text-4xl md:text-5xl font-bold text-center mb-10 transition-colors duration-1000`}
                    style={{ color: "var(--theme-text-heading)" }}
                >
                    My World
                </h2>

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
                </RoughCard>

                {/* What I Love — Full-width immersive section */}
                <div id="what-i-love" className="mb-20">
                    <WhatILove />
                </div>

                {/* Masterplan Before 30 — Full-width immersive section */}
                <div id="masterplan">
                    <MasterplanTimeline />
                </div>
            </motion.div>
        </div>
    );
}
