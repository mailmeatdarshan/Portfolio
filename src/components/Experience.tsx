"use client";
import React, { useRef, useState } from "react";
import { education, experience } from "@/data/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { BlurReveal } from '@/components/BlurReveal';

const COLORS_SPACE_EXP = [
    { border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.08)", accent: "#3b82f6" }, // TeachUS: Blue
    { border: "rgba(96,165,250,0.25)", glow: "rgba(96,165,250,0.08)", accent: "#60a5fa" }, // Bhavans CS: Blue (light)
];

const COLORS_SPACE_EDU = [
    { border: "rgba(34,197,94,0.25)", glow: "rgba(34,197,94,0.08)", accent: "#22c55e" }, // Divine Providence: Green
    { border: "rgba(16,185,129,0.25)", glow: "rgba(16,185,129,0.08)", accent: "#10b981" }, // Bhavans CS: Emerald Green
];


export default function Experience() {
    const { isEarth } = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hoveredExpIdx, setHoveredExpIdx] = useState<number | null>(null);
    const [hoveredEduIdx, setHoveredEduIdx] = useState<number | null>(null);
    const [hoveredResume, setHoveredResume] = useState(false);


    // Refs to track scroll progress for Experience and Education decks
    const expRef = useRef<HTMLDivElement>(null);
    const eduRef = useRef<HTMLDivElement>(null);

    // Experience Card 1 scroll transforms (blur and fade when Card 2 stacks on top)
    const { scrollYProgress: expProgress } = useScroll({
        target: expRef,
        offset: ["start 35%", "end 65%"]
    });
    const expScale1 = useTransform(expProgress, [0.1, 0.75], [1, 0.96]);
    const expOpacity1 = useTransform(expProgress, [0.1, 0.75], [1, 0.3]);
    const expFilter1 = useTransform(expProgress, [0.1, 0.75], ["blur(0px)", "blur(8px)"]);

    // Education Card 1 scroll transforms (blur and fade when Card 2 stacks on top)
    const { scrollYProgress: eduProgress } = useScroll({
        target: eduRef,
        offset: ["start 35%", "end 65%"]
    });
    const eduScale1 = useTransform(eduProgress, [0.1, 0.75], [1, 0.96]);
    const eduOpacity1 = useTransform(eduProgress, [0.1, 0.75], [1, 0.3]);
    const eduFilter1 = useTransform(eduProgress, [0.1, 0.75], ["blur(0px)", "blur(8px)"]);

    // ─── Space Mode ───
    if (!isEarth) {
        return (
            <div ref={sectionRef} className="py-20 w-full max-w-6xl mx-auto px-4 relative z-10">
                <BlurReveal>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-center mb-20 transition-colors duration-1000"
                        style={{ color: "var(--theme-text-heading)" }}
                    >
                        Journey
                    </h2>
                </BlurReveal>

                {/* ── Experience Section ── */}
                <div className="mb-32 relative">
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
                                Work Experience
                            </span>
                        </div>
                    </div>

                    <div ref={expRef} className="relative flex flex-col gap-16 md:gap-24 pb-[380px]">
                        {experience.map((item, idx) => {
                            const stickyTop = idx === 0 
                                ? "top-[80px] md:top-[100px]" 
                                : "top-[130px] md:top-[220px]";
                            const zIndex = idx === 0 ? "z-10" : "z-20";
                            const c = COLORS_SPACE_EXP[idx] || COLORS_SPACE_EXP[0];
                            const isHovered = hoveredExpIdx === idx;

                            return (
                                <motion.div
                                    key={item.id}
                                    className={`sticky ${stickyTop} ${zIndex} w-full`}
                                    initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    {/* Inner card that blurs when it is Card 1 (idx 0) and scrolling past */}
                                    <motion.div 
                                        onMouseEnter={() => setHoveredExpIdx(idx)}
                                        onMouseLeave={() => setHoveredExpIdx(null)}
                                        className="w-full rounded-[2rem] p-6 md:p-10 lg:p-12 cursor-default overflow-hidden transition-all duration-500 relative group"
                                        style={{
                                            background: isHovered
                                                ? `linear-gradient(135deg, ${c.glow}, rgba(255,255,255,0.02))`
                                                : "rgba(255,255,255,0.02)",
                                            border: `1px solid ${isHovered ? c.border : "rgba(255,255,255,0.06)"}`,
                                            boxShadow: isHovered
                                                ? `0 0 40px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                                                : "inset 0 1px 0 rgba(255,255,255,0.04)",
                                            filter: idx === 0 ? expFilter1 : "none",
                                            opacity: idx === 0 ? expOpacity1 : 1,
                                            scale: idx === 0 ? expScale1 : 1
                                        }}
                                    >
                                        {/* Dot Grid Backdrop */}
                                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch relative z-10">
                                            {/* Left side details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Top Meta info */}
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-zinc-500 uppercase px-2.5 py-1 rounded bg-white/[0.02] border border-white/5">
                                                            [ EXP // 0{idx + 1} ]
                                                        </span>
                                                        <span className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase" style={{ color: isHovered ? c.accent : "var(--theme-text-subtle)" }}>
                                                            [ {item.duration} ]
                                                        </span>
                                                    </div>

                                                    {/* Title and Company */}
                                                    <div className="mb-6">
                                                        <h4 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                                                            {item.title}
                                                        </h4>
                                                        <div className="text-sm md:text-base font-semibold font-mono flex items-center gap-2 mt-2" style={{ color: c.accent }}>
                                                            <span>{item.company}</span>
                                                            <span className="text-zinc-600">|</span>
                                                            <span className="text-zinc-400 font-normal">{item.location}</span>
                                                        </div>
                                                    </div>

                                                    {/* Divider */}
                                                    <div className="h-[1px] bg-white/[0.06] my-6" />

                                                    {/* Details */}
                                                    <ul className="space-y-4">
                                                        {item.description.map((desc, i) => (
                                                            <li key={i} className="text-sm md:text-[15px] text-zinc-400 leading-relaxed flex items-start gap-3">
                                                                <span className="font-mono text-xs select-none mt-1" style={{ color: c.accent }}>&gt;</span>
                                                                <span>{desc}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Right side image or placeholder */}
                                            <div className="w-full md:w-[40%] lg:w-[42%] min-h-[260px] md:min-h-[350px] lg:min-h-[400px] rounded-2xl overflow-hidden relative border border-white/5 bg-white/[0.01]">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.company} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                                                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/10 mb-3 shadow-inner transition-transform duration-500 group-hover:scale-110" style={{ color: c.accent }}>
                                                            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                                                            [ Media Slot ]
                                                        </span>
                                                        <span className="text-[10px] text-zinc-600 mt-1 font-sans">
                                                            Space reserved for {item.company} preview
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 opacity-10 blur-xl transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${c.accent} 0%, transparent 70%)` }} />
                                            </div>
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
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Education Section ── */}
                <div className="relative">
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
                                Education
                            </span>
                        </div>
                    </div>

                    <div ref={eduRef} className="relative flex flex-col gap-16 md:gap-24 pb-[380px]">
                        {[...education].reverse().map((item, idx) => {
                            const stickyTop = idx === 0 
                                ? "top-[80px] md:top-[100px]" 
                                : "top-[130px] md:top-[220px]";
                            const zIndex = idx === 0 ? "z-10" : "z-20";
                            const c = COLORS_SPACE_EDU[idx] || COLORS_SPACE_EDU[0];
                            const isHovered = hoveredEduIdx === idx;

                            return (
                                <motion.div
                                    key={item.id}
                                    className={`sticky ${stickyTop} ${zIndex} w-full`}
                                    initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    {/* Inner card that blurs when it is Card 1 (idx 0) and scrolling past */}
                                    <motion.div 
                                        onMouseEnter={() => setHoveredEduIdx(idx)}
                                        onMouseLeave={() => setHoveredEduIdx(null)}
                                        className="w-full rounded-[2rem] p-6 md:p-10 lg:p-12 cursor-default overflow-hidden transition-all duration-500 relative group"
                                        style={{
                                            background: isHovered
                                                ? `linear-gradient(135deg, ${c.glow}, rgba(255,255,255,0.02))`
                                                : "rgba(255,255,255,0.02)",
                                            border: `1px solid ${isHovered ? c.border : "rgba(255,255,255,0.06)"}`,
                                            boxShadow: isHovered
                                                ? `0 0 40px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                                                : "inset 0 1px 0 rgba(255,255,255,0.04)",
                                            filter: idx === 0 ? eduFilter1 : "none",
                                            opacity: idx === 0 ? eduOpacity1 : 1,
                                            scale: idx === 0 ? eduScale1 : 1
                                        }}
                                    >
                                         {/* Dot Grid Backdrop */}
                                         <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                                         <div className="relative z-10">
                                            {/* Top Meta info */}
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-zinc-500 uppercase px-2.5 py-1 rounded bg-white/[0.02] border border-white/5">
                                                    [ EDU // 0{idx + 1} ]
                                                </span>
                                                <span className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase" style={{ color: isHovered ? c.accent : "var(--theme-text-subtle)" }}>
                                                    [ {item.duration} ]
                                                </span>
                                            </div>

                                            {/* Title and Institution */}
                                            <div className="mb-6">
                                                <h4 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                                                    {item.degree}
                                                </h4>
                                                <div className="text-sm md:text-base font-semibold font-mono flex items-center gap-2 mt-2" style={{ color: c.accent }}>
                                                    <span>{item.institution}</span>
                                                    <span className="text-zinc-650">|</span>
                                                    <span className="text-zinc-400 font-normal">{item.location}</span>
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div className="h-[1px] bg-white/[0.06] my-6" />

                                            {/* Details */}
                                            <div className="space-y-4">
                                                <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed flex items-start gap-3">
                                                    <span className="font-mono text-xs select-none mt-1" style={{ color: c.accent }}>&gt;</span>
                                                    <span>
                                                        Successfully enrolled and completed academic curriculum at {item.institution} located in {item.location}.
                                                    </span>
                                                </p>
                                                {item.grade ? (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mt-2" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", color: c.accent }}>
                                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: c.accent }} />
                                                        <span>Grade / Standing: {item.grade}</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed flex items-start gap-3">
                                                        <span className="font-mono text-xs select-none mt-1" style={{ color: c.accent }}>&gt;</span>
                                                        <span>Built foundational expertise in computational models, design paradigms, and analytical structures.</span>
                                                    </p>
                                                )}
                                            </div>
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
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Resume Section ── */}
                <div className="mt-32 relative">
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse" />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
                                Download Resume
                            </span>
                        </div>
                    </div>

                    <BlurReveal>
                        <a
                            href="https://drive.google.com/file/d/185Y4T_cXU0U3SpXBwx4ZztSiztA5U_hb/view?usp=sharing"
                            download="Darshan_Dubey_Resume.pdf"
                            className="block w-full rounded-[2rem] p-6 md:p-10 lg:p-12 cursor-pointer overflow-hidden transition-all duration-500 relative group"
                            onMouseEnter={() => setHoveredResume(true)}
                            onMouseLeave={() => setHoveredResume(false)}
                            style={{
                                background: hoveredResume
                                    ? "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.1), rgba(255,255,255,0.02))"
                                    : "rgba(255,255,255,0.02)",
                                border: `1px solid ${hoveredResume ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.06)"}`,
                                boxShadow: hoveredResume
                                    ? "0 0 45px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.06)"
                                    : "inset 0 1px 0 rgba(255,255,255,0.04)"
                            }}
                        >
                            {/* Dot Grid Backdrop */}
                            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch relative z-10">
                                {/* Left side details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Top Meta info */}
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-zinc-500 uppercase px-2.5 py-1 rounded bg-white/[0.02] border border-white/5">
                                                [ RESUME // DOC ]
                                            </span>
                                            <span className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-zinc-400">
                                                [ PDF FORMAT ]
                                            </span>
                                        </div>

                                        {/* Title and Description */}
                                        <div className="mb-6">
                                            <h4 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                                                Download Offline Resume
                                            </h4>
                                            <p className="text-sm md:text-base text-zinc-400 mt-3 leading-relaxed">
                                                Get a structured, printer-friendly summary of my professional timeline, tech stacks, and academic qualifications.
                                            </p>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-[1px] bg-white/[0.06] my-6" />

                                        {/* Download Trigger Button inside Card */}
                                        <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-sm font-semibold text-white tracking-wide transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                                            <span>Get PDF Document</span>
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side document mockup placeholder */}
                                <div className="w-full md:w-[40%] lg:w-[42%] min-h-[200px] md:min-h-full rounded-2xl overflow-hidden relative border border-white/5 bg-white/[0.01] flex items-center justify-center">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/10 mb-3 shadow-inner transition-transform duration-500 group-hover:scale-110 text-blue-400 group-hover:text-emerald-400">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                                            darshan_dubey_resume.pdf
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 opacity-10 blur-xl transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-500 to-emerald-500" />
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div
                                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                                style={{
                                    width: hoveredResume ? "100%" : "0%",
                                    background: "linear-gradient(90deg, #3b82f6, #10b981)",
                                }}
                            />
                        </a>
                    </BlurReveal>
                </div>
            </div>
        );
    }

    // ─── Earth Mode ───
    return (
        <div ref={sectionRef} className="py-20 w-full max-w-5xl mx-auto px-4 relative z-10">
            <BlurReveal>
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-20 transition-colors duration-1000"
                    style={{ color: "var(--theme-text-heading)" }}
                >
                    Journey
                </h2>
            </BlurReveal>

            {/* ── Experience Section ── */}
            <div className="mb-32 relative">
                <div className="flex items-center gap-3 mb-12 border-b border-dashed border-amber-300/40 pb-4">
                    <span className="text-2xl">💼</span>
                    <h3
                        className="text-2xl md:text-3xl text-amber-700 font-bold"
                        style={{ fontFamily: "var(--font-handwriting)" }}
                    >
                        Experience
                    </h3>
                </div>

                <div ref={expRef} className="relative flex flex-col gap-16 md:gap-24 pb-[380px]">
                    {experience.map((item, idx) => {
                        const stickyTop = idx === 0 
                            ? "top-[80px] md:top-[100px]" 
                            : "top-[130px] md:top-[220px]";
                        const zIndex = idx === 0 ? "z-10" : "z-20";

                        return (
                            <motion.div
                                key={item.id}
                                className={`sticky ${stickyTop} ${zIndex} w-full`}
                                initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <motion.div 
                                    style={idx === 0 ? { filter: expFilter1, opacity: expOpacity1, scale: expScale1 } : {}}
                                    className="rounded-[2rem] p-6 md:p-10 lg:p-12 bg-white/90 border border-amber-200/40 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300 relative overflow-hidden group"
                                >
                                    {/* Notebook Line Pattern */}
                                    <div className="absolute inset-x-0 top-0 h-[2px] bg-red-400/20" />
                                    
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch relative z-10">
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-center text-xs text-amber-600 font-medium mb-3" style={{ fontFamily: "var(--font-handwriting)" }}>
                                                    <span>[ 0{idx + 1} // EXP ]</span>
                                                    <span>{item.duration}</span>
                                                </div>

                                                <h4
                                                    className="text-xl md:text-3xl text-stone-800 font-bold leading-tight"
                                                    style={{ fontFamily: "var(--font-handwriting)" }}
                                                >
                                                    {item.title}
                                                </h4>
                                                
                                                <p className="text-sm md:text-base text-stone-500 font-medium mt-2">
                                                    {item.company} · {item.location}
                                                </p>

                                                <div className="h-[1px] border-b border-dashed border-amber-200 my-4" />

                                                <ul className="space-y-3 pt-1">
                                                    {item.description.map((desc, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm md:text-[15px] text-stone-600 leading-relaxed"
                                                            style={{ fontFamily: "var(--font-handwriting)" }}
                                                        >
                                                            – {desc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Polaroid-style photo slot */}
                                        <div className="w-full md:w-[40%] lg:w-[42%] flex flex-col items-center justify-center p-4 pb-8 bg-stone-50 border border-stone-200 shadow-md rounded-xl relative transition-all duration-500 md:rotate-1 group-hover:rotate-0 select-none">
                                            <div className="aspect-[4/3] w-full bg-stone-150 border border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-stone-200/40 min-h-[220px] md:min-h-[260px] lg:min-h-[280px]">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.company} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                                        <span className="text-stone-400 text-3xl mb-1">📷</span>
                                                        <span className="text-xs text-stone-400 font-medium" style={{ fontFamily: "var(--font-handwriting)" }}>
                                                            sketch slot
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs text-stone-600 mt-4 font-semibold text-center select-none" style={{ fontFamily: "var(--font-handwriting)" }}>
                                                {item.company}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ── Education Section ── */}
            <div className="relative">
                <div className="flex items-center gap-3 mb-12 border-b border-dashed border-emerald-300/40 pb-4">
                    <span className="text-2xl">🎓</span>
                    <h3
                        className="text-2xl md:text-3xl text-emerald-700 font-bold"
                        style={{ fontFamily: "var(--font-handwriting)" }}
                    >
                        Education
                    </h3>
                </div>

                <div ref={eduRef} className="relative flex flex-col gap-16 md:gap-24 pb-[380px]">
                    {[...education].reverse().map((item, idx) => {
                        const stickyTop = idx === 0 
                            ? "top-[80px] md:top-[100px]" 
                            : "top-[130px] md:top-[220px]";
                        const zIndex = idx === 0 ? "z-10" : "z-20";

                        return (
                            <motion.div
                                key={item.id}
                                className={`sticky ${stickyTop} ${zIndex} w-full`}
                                initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <motion.div 
                                    style={idx === 0 ? { filter: eduFilter1, opacity: eduOpacity1, scale: eduScale1 } : {}}
                                    className="rounded-[2rem] p-6 md:p-10 lg:p-12 bg-white/90 border border-emerald-200/40 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300 relative overflow-hidden group"
                                >
                                    {/* Notebook Line Pattern */}
                                    <div className="absolute inset-x-0 top-0 h-[2px] bg-red-400/20" />
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-center text-xs text-emerald-600 font-medium mb-3" style={{ fontFamily: "var(--font-handwriting)" }}>
                                            <span>[ 0{idx + 1} // EDU ]</span>
                                            <span>{item.duration}</span>
                                        </div>

                                        <h4
                                            className="text-xl md:text-3xl text-stone-800 font-bold leading-tight"
                                            style={{ fontFamily: "var(--font-handwriting)" }}
                                        >
                                            {item.degree}
                                        </h4>
                                        
                                        <p className="text-sm md:text-base text-stone-500 font-medium mt-2">
                                            {item.institution} · {item.location}
                                        </p>

                                        <div className="h-[1px] border-b border-dashed border-emerald-200 my-4" />

                                        <div className="space-y-3 pt-1">
                                            <p
                                                className="text-sm md:text-[15px] text-stone-600 leading-relaxed"
                                                style={{ fontFamily: "var(--font-handwriting)" }}
                                            >
                                                – Enrolled and completed academic curriculum at {item.institution} in {item.location}.
                                            </p>
                                            {item.grade ? (
                                                <div className="pt-2">
                                                    <span
                                                        className="inline-block bg-amber-100/70 text-amber-800 text-xs px-3 py-1 rounded-full border border-amber-200/40"
                                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                                    >
                                                        Grade / Standing: {item.grade}
                                                    </span>
                                                </div>
                                            ) : (
                                                <p
                                                    className="text-sm md:text-[15px] text-stone-600 leading-relaxed"
                                                    style={{ fontFamily: "var(--font-handwriting)" }}
                                                >
                                                    – Gained core fundamentals in computer science theories and application development.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ── Resume Section ── */}
            <div className="mt-32 relative">
                <div className="flex items-center gap-3 mb-12 border-b border-dashed border-stone-300/40 pb-4">
                    <span className="text-2xl">📄</span>
                    <h3
                        className="text-2xl md:text-3xl text-stone-750 font-bold"
                        style={{ fontFamily: "var(--font-handwriting)" }}
                    >
                        Resume
                    </h3>
                </div>

                <BlurReveal>
                    <a
                        href="https://drive.google.com/file/d/185Y4T_cXU0U3SpXBwx4ZztSiztA5U_hb/view?usp=sharing"
                        download="Darshan_Dubey_Resume.pdf"
                        className="block w-full rounded-[2rem] p-6 md:p-10 lg:p-12 bg-white/90 border border-stone-200/60 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300 relative overflow-hidden group"
                    >
                        {/* Notebook Line Pattern */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-red-400/20" />

                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch relative z-10">
                            {/* Left side details */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center text-xs text-amber-600 font-medium mb-3" style={{ fontFamily: "var(--font-handwriting)" }}>
                                        <span>[ FILE // RESUME ]</span>
                                        <span>PDF FORMAT</span>
                                    </div>

                                    <h4
                                        className="text-xl md:text-3xl text-stone-800 font-bold leading-tight"
                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                    >
                                        Download My Resume
                                    </h4>

                                    <p
                                        className="text-sm md:text-base text-stone-500 font-medium mt-3 leading-relaxed"
                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                    >
                                        Click here to download a physical copy of my resume, featuring full details on my academic path and software development achievements.
                                    </p>

                                    <div className="h-[1px] border-b border-dashed border-stone-200 my-6" />

                                    {/* Action description */}
                                    <div 
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 bg-stone-50/50 text-xs font-semibold text-stone-800 tracking-wide transition-all duration-300 group-hover:bg-stone-100"
                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                    >
                                        <span>Download PDF Document 📄</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right side Polaroid mockup */}
                            <div className="w-full md:w-[40%] lg:w-[42%] flex flex-col items-center justify-center p-4 pb-8 bg-stone-50 border border-stone-200 shadow-md rounded-xl relative transition-all duration-500 md:rotate-1 group-hover:rotate-0 select-none">
                                <div className="aspect-[4/3] w-full bg-stone-150 border border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-stone-200/40 min-h-[200px]">
                                    <span className="text-stone-400 text-4xl mb-1">📄</span>
                                    <span className="text-xs text-stone-400 font-medium" style={{ fontFamily: "var(--font-handwriting)" }}>
                                        resume file
                                    </span>
                                </div>
                                <span className="text-xs text-stone-600 mt-4 font-semibold text-center select-none" style={{ fontFamily: "var(--font-handwriting)" }}>
                                    Darshan_Resume.pdf
                                </span>
                            </div>
                        </div>
                    </a>
                </BlurReveal>
            </div>
        </div>
    );
}
