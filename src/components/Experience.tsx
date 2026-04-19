"use client";
import React from "react";
import { education, experience } from "@/data/portfolio";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

import { RoughCard } from "./ui/rough-card";

export default function Experience() {
    const { isEarth } = useTheme();

    return (
        <div className="py-20 w-full max-w-7xl mx-auto px-4">
            <h2
                className="text-4xl md:text-5xl font-bold text-center mb-20 transition-colors duration-1000"
                style={{ color: "var(--theme-text-heading)" }}
            >
                Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Experience Section */}
                <RoughCard
                    className="p-6 md:p-8"
                    fillColor={isEarth ? "rgba(255,255,255,0.4)" : "rgba(23,23,23,0.3)"}
                    strokeColor={isEarth ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)"}
                >
                    <h3
                        className="text-2xl font-bold mb-8 flex items-center gap-2 transition-colors duration-1000"
                        style={{ color: "var(--theme-text-heading)" }}
                    >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-1000 ${
                            isEarth ? "bg-amber-500/20 text-amber-600" : "bg-blue-500/20 text-blue-500"
                        }`}>💼</span>
                        Experience
                    </h3>
                    <div
                        className="space-y-8 pl-4 border-l-2 transition-colors duration-1000"
                        style={{ borderColor: "var(--theme-timeline-border)" }}
                    >
                        {experience.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8"
                            >
                                <div
                                    className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 transition-colors duration-1000 ${
                                        isEarth ? "bg-amber-500 border-amber-50" : "bg-blue-500 border-black"
                                    }`}
                                />
                                <div className="space-y-2">
                                    <span className={`text-sm font-mono transition-colors duration-1000 ${
                                        isEarth ? "text-amber-600" : "text-blue-400"
                                    }`}>
                                        {item.duration}
                                    </span>
                                    <h4
                                        className="text-xl font-bold transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-heading)" }}
                                    >
                                        {item.title}
                                    </h4>
                                    <h5
                                        className="text-lg transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-muted)" }}
                                    >
                                        {item.company}
                                    </h5>
                                    <p
                                        className="text-sm mb-4 transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-subtle)" }}
                                    >
                                        {item.location}
                                    </p>
                                    <ul className="list-disc list-inside space-y-1">
                                        {item.description.map((desc, i) => (
                                            <li
                                                key={i}
                                                className="text-sm leading-relaxed transition-colors duration-1000"
                                                style={{ color: "var(--theme-text-muted)" }}
                                            >
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </RoughCard>

                {/* Education Section */}
                <RoughCard
                    className="p-6 md:p-8"
                    fillColor={isEarth ? "rgba(255,255,255,0.4)" : "rgba(23,23,23,0.3)"}
                    strokeColor={isEarth ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)"}
                >
                    <h3
                        className="text-2xl font-bold mb-8 flex items-center gap-2 transition-colors duration-1000"
                        style={{ color: "var(--theme-text-heading)" }}
                    >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-1000 ${
                            isEarth ? "bg-emerald-500/20 text-emerald-600" : "bg-purple-500/20 text-purple-500"
                        }`}>🎓</span>
                        Education
                    </h3>
                    <div
                        className="space-y-8 pl-4 border-l-2 transition-colors duration-1000"
                        style={{ borderColor: "var(--theme-timeline-border)" }}
                    >
                        {education.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8"
                            >
                                <div
                                    className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 transition-colors duration-1000 ${
                                        isEarth ? "bg-emerald-500 border-emerald-50" : "bg-purple-500 border-black"
                                    }`}
                                />
                                <div className="space-y-2">
                                    <span className={`text-sm font-mono transition-colors duration-1000 ${
                                        isEarth ? "text-emerald-600" : "text-purple-400"
                                    }`}>
                                        {item.duration}
                                    </span>
                                    <h4
                                        className="text-xl font-bold transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-heading)" }}
                                    >
                                        {item.institution}
                                    </h4>
                                    <h5
                                        className="text-lg transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-muted)" }}
                                    >
                                        {item.degree}
                                    </h5>
                                    <p
                                        className="text-sm transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-subtle)" }}
                                    >
                                        {item.location}
                                    </p>
                                    {item.grade && (
                                        <p className={`text-sm mt-2 font-medium transition-colors duration-1000 ${
                                            isEarth ? "text-amber-600" : "text-yellow-500"
                                        }`}>
                                            {item.grade}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </RoughCard>
            </div>

            {/* Download Resume Button */}
            <div className="flex justify-center mt-16">
                <a
                    href="https://drive.google.com/file/d/185Y4T_cXU0U3SpXBwx4ZztSiztA5U_hb/view?usp=sharing"
                    download="Darshan_Dubey_Resume.pdf"
                    className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                    <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${
                        isEarth
                            ? "bg-[conic-gradient(from_90deg_at_50%_50%,#fde68a_0%,#d97706_50%,#fde68a_100%)]"
                            : "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                    }`} />
                    <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium backdrop-blur-3xl transition-colors ${
                        isEarth
                            ? "bg-white text-stone-800 group-hover:bg-amber-50"
                            : "bg-slate-950 text-white group-hover:bg-slate-900"
                    }`}>
                        Download Resume 📄
                    </span>
                </a>
            </div>
        </div>
    );
}
