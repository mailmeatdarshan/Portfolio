"use client";
import React from "react";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

import { RoughCard } from "./ui/rough-card";

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
                <h2 className={`text-4xl md:text-5xl font-bold text-center mb-10 transition-colors duration-1000`}
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
                    <p className="text-lg md:text-xl leading-relaxed mb-6 font-light transition-colors duration-1000"
                        style={{ color: "var(--theme-text-body)" }}
                    >
                        I&apos;m a computer science student with a strong interest in{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-amber-600" : "text-blue-400"}`}>web development</span>,{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-emerald-600" : "text-yellow-400"}`}>cloud computing</span>,{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-orange-600" : "text-purple-400"}`}>automation</span>, and{" "}
                        <span className={`font-medium transition-colors duration-1000 ${isEarth ? "text-teal-600" : "text-green-400"}`}>backend development</span>.
                        I enjoy building efficient systems that solve real-world problems. I&apos;m especially passionate about modern technologies and scalable system design.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["#Web Developer", "#Cloud Engineer", "#Backend Specialist", "#Automation Developer"].map((tag, i) => (
                            <span
                                key={i}
                                className="px-4 py-1.5 rounded-full text-sm font-medium cursor-default transition-all duration-1000"
                                style={{
                                    background: "var(--theme-tag-bg)",
                                    color: "var(--theme-tag-text)",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "var(--theme-tag-border)",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </RoughCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* What I Love Section */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold mb-8 bg-clip-text text-transparent transition-all duration-1000"
                            style={{
                                backgroundImage: `linear-gradient(to right, var(--theme-gradient-text-from), var(--theme-gradient-text-to))`,
                            }}
                        >
                            What I Love
                        </h3>
                        <div className="space-y-6">
                            {personalInfo.about.whatILove.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group"
                                >
                                    <h4 className="text-xl font-bold mb-1 transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-heading)" }}
                                    >
                                        {item.title}
                                    </h4>
                                    <p className="transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-muted)" }}
                                    >
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Masterplan Section */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold mb-8 bg-clip-text text-transparent transition-all duration-1000"
                            style={{
                                backgroundImage: `linear-gradient(to right, var(--theme-gradient-text-alt-from), var(--theme-gradient-text-alt-to))`,
                            }}
                        >
                            Masterplan Before 30
                        </h3>
                        <div className="space-y-4">
                            {personalInfo.about.masterplan.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-1000"
                                    style={{
                                        background: isEarth ? "rgba(255,255,255,0.3)" : "rgba(23,23,23,0.3)",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderColor: "var(--theme-card-border)",
                                    }}
                                >
                                    <span className={`font-mono text-lg transition-colors duration-1000 ${isEarth ? "text-amber-600" : "text-yellow-500"}`}>
                                        0{idx + 1}
                                    </span>
                                    <p style={{ color: "var(--theme-text-body)" }} className="transition-colors duration-1000">
                                        {item}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                        <div className={`mt-8 p-6 rounded-2xl border-l-4 transition-all duration-1000 ${
                            isEarth
                                ? "bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-500"
                                : "bg-gradient-to-r from-neutral-900 to-neutral-800 border-green-500"
                        }`}>
                            <p className={`font-mono transition-colors duration-1000 ${isEarth ? "text-emerald-700" : "text-green-400"}`}>
                                Status: Manifesting on full throttle. All or nothing.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
