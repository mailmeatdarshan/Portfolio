"use client";
import React, { useRef } from "react";
import { education, experience } from "@/data/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

export default function Experience() {
    const { isEarth } = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const expFill = useTransform(scrollYProgress, [0.05, 0.65], ["0%", "100%"]);
    const eduFill = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

    // ─── Space Mode ───
    if (!isEarth) {
        return (
            <div ref={sectionRef} className="py-20 w-full max-w-7xl mx-auto px-4 relative z-10">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-20 transition-colors duration-1000"
                    style={{ color: "var(--theme-text-heading)" }}
                >
                    Journey
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {/* ── Experience ── */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm">
                                💼
                            </div>
                            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-400">
                                Experience
                            </span>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-blue-500/[0.08] rounded-full" />
                            <motion.div
                                className="absolute left-[5px] top-0 w-[2px] rounded-full origin-top"
                                style={{
                                    height: expFill,
                                    background: "linear-gradient(to bottom, #3b82f6, #06b6d4)",
                                    opacity: 0.5,
                                }}
                            />

                            <div className="space-y-6">
                                {experience.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ delay: idx * 0.1, duration: 0.45 }}
                                        className="relative group"
                                    >
                                        {/* Node */}
                                        <div className="absolute -left-[27px] top-5 w-4 h-4 rounded-full border-2 border-blue-500/30 bg-[#0a0f1e] group-hover:border-blue-500/60 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-500 z-10" />

                                        {/* Card */}
                                        <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm transition-all duration-500">
                                            <div
                                                className="h-[2px] w-full"
                                                style={{
                                                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6, transparent)",
                                                }}
                                            />
                                            <div className="p-5 md:p-6 space-y-2.5">
                                                <span className="font-mono text-xs text-blue-400/60">
                                                    {item.duration}
                                                </span>
                                                <h4 className="text-lg font-bold text-white">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-zinc-400">
                                                    {item.company} · {item.location}
                                                </p>
                                                <ul className="space-y-1.5 pt-1">
                                                    {item.description.map((desc, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-zinc-500 leading-relaxed flex items-start gap-2"
                                                        >
                                                            <span className="text-blue-500/40 mt-1.5 shrink-0 text-[8px]">●</span>
                                                            {desc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Education ── */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm">
                                🎓
                            </div>
                            <span className="text-sm font-bold uppercase tracking-[0.15em] text-purple-400">
                                Education
                            </span>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-purple-500/[0.08] rounded-full" />
                            <motion.div
                                className="absolute left-[5px] top-0 w-[2px] rounded-full origin-top"
                                style={{
                                    height: eduFill,
                                    background: "linear-gradient(to bottom, #8b5cf6, #ec4899)",
                                    opacity: 0.5,
                                }}
                            />

                            <div className="space-y-6">
                                {education.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ delay: idx * 0.1, duration: 0.45 }}
                                        className="relative group"
                                    >
                                        {/* Node */}
                                        <div className="absolute -left-[27px] top-5 w-4 h-4 rounded-full border-2 border-purple-500/30 bg-[#0a0f1e] group-hover:border-purple-500/60 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.25)] transition-all duration-500 z-10" />

                                        {/* Card */}
                                        <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm transition-all duration-500">
                                            <div
                                                className="h-[2px] w-full"
                                                style={{
                                                    background: "linear-gradient(90deg, #8b5cf6, #ec4899, transparent)",
                                                }}
                                            />
                                            <div className="p-5 md:p-6 space-y-2.5">
                                                <span className="font-mono text-xs text-purple-400/60">
                                                    {item.duration}
                                                </span>
                                                <h4 className="text-lg font-bold text-white">
                                                    {item.institution}
                                                </h4>
                                                <p className="text-sm text-zinc-400">
                                                    {item.degree}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {item.location}
                                                </p>
                                                {item.grade && (
                                                    <span className="inline-block bg-purple-500/15 text-purple-300 text-xs px-3 py-1 rounded-full font-medium mt-1 border border-purple-500/20">
                                                        {item.grade}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Resume */}
                <div className="flex justify-center mt-16">
                    <a
                        href="https://drive.google.com/file/d/185Y4T_cXU0U3SpXBwx4ZztSiztA5U_hb/view?usp=sharing"
                        download="Darshan_Dubey_Resume.pdf"
                        className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium backdrop-blur-3xl transition-colors bg-slate-950 text-white group-hover:bg-slate-900">
                            Download Resume 📄
                        </span>
                    </a>
                </div>
            </div>
        );
    }

    // ─── Earth Mode ───
    return (
        <div ref={sectionRef} className="py-20 w-full max-w-7xl mx-auto px-4 relative z-10">
            <h2
                className="text-4xl md:text-5xl font-bold text-center mb-20 transition-colors duration-1000"
                style={{ color: "var(--theme-text-heading)" }}
            >
                Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {/* ── Experience ── */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-2xl">💼</span>
                        <h3
                            className="text-2xl text-amber-700"
                            style={{ fontFamily: "var(--font-handwriting)" }}
                        >
                            Experience
                        </h3>
                    </div>

                    <div className="relative pl-8">
                        <div className="absolute left-[5px] top-2 bottom-2 w-0 border-l-[2px] border-dashed border-amber-300/40" />
                        <motion.div
                            className="absolute left-[5px] top-2 w-0 border-l-[2px] border-amber-500/50 origin-top"
                            style={{ height: expFill }}
                        />

                        <div className="space-y-6">
                            {experience.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-[24px] top-5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white z-10 group-hover:scale-125 transition-transform" />

                                    <div className="rounded-xl p-5 md:p-6 bg-white/70 border border-amber-200/30 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-300 space-y-2">
                                        <span
                                            className="text-xs text-amber-600"
                                            style={{ fontFamily: "var(--font-handwriting)" }}
                                        >
                                            {item.duration}
                                        </span>
                                        <h4
                                            className="text-lg text-stone-800 font-bold leading-snug"
                                            style={{ fontFamily: "var(--font-handwriting)" }}
                                        >
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-stone-500">
                                            {item.company} · {item.location}
                                        </p>
                                        <ul className="space-y-1 pt-1">
                                            {item.description.map((desc, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm text-stone-600 leading-relaxed"
                                                >
                                                    – {desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Education ── */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-2xl">🎓</span>
                        <h3
                            className="text-2xl text-emerald-700"
                            style={{ fontFamily: "var(--font-handwriting)" }}
                        >
                            Education
                        </h3>
                    </div>

                    <div className="relative pl-8">
                        <div className="absolute left-[5px] top-2 bottom-2 w-0 border-l-[2px] border-dashed border-emerald-300/40" />
                        <motion.div
                            className="absolute left-[5px] top-2 w-0 border-l-[2px] border-emerald-500/50 origin-top"
                            style={{ height: eduFill }}
                        />

                        <div className="space-y-6">
                            {education.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="absolute -left-[24px] top-5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white z-10 group-hover:scale-125 transition-transform" />

                                    <div className="rounded-xl p-5 md:p-6 bg-white/70 border border-emerald-200/30 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-300 space-y-2">
                                        <span
                                            className="text-xs text-emerald-600"
                                            style={{ fontFamily: "var(--font-handwriting)" }}
                                        >
                                            {item.duration}
                                        </span>
                                        <h4
                                            className="text-lg text-stone-800 font-bold leading-snug"
                                            style={{ fontFamily: "var(--font-handwriting)" }}
                                        >
                                            {item.institution}
                                        </h4>
                                        <p className="text-sm text-stone-500">
                                            {item.degree}
                                        </p>
                                        <p className="text-xs text-stone-400">
                                            {item.location}
                                        </p>
                                        {item.grade && (
                                            <span
                                                className="inline-block bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full mt-1"
                                                style={{ fontFamily: "var(--font-handwriting)" }}
                                            >
                                                {item.grade}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Resume */}
            <div className="flex justify-center mt-16">
                <a
                    href="https://drive.google.com/file/d/185Y4T_cXU0U3SpXBwx4ZztSiztA5U_hb/view?usp=sharing"
                    download="Darshan_Dubey_Resume.pdf"
                    className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                    <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fde68a_0%,#d97706_50%,#fde68a_100%)]`} />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium backdrop-blur-3xl transition-colors bg-white text-stone-800 group-hover:bg-amber-50">
                        Download Resume 📄
                    </span>
                </a>
            </div>
        </div>
    );
}
