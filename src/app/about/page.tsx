"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, MapPin, Heart, Share2, Headphones, Github, Star, Coffee, Code, User, Info, ExternalLink, Tv, Clapperboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AudioPronunciation } from "@/components/ui/AudioPronunciation";
import { UnitConverter } from "@/components/ui/UnitConverter";
import { PrideCycle } from "@/components/ui/PrideCycle";
import { DistanceTracker } from "@/components/ui/DistanceTracker";
import { PetWidget } from "@/components/ui/PetWidget";
import { SpotifyWidget } from "@/components/ui/SpotifyWidget";
import { GithubActivityLog } from "@/components/ui/GithubActivityLog";
import { ChessWidget } from "@/components/ui/ChessWidget";
import { MonkeyTypeWidget } from "@/components/ui/MonkeyTypeWidget";
import { MonkeyTypeActivityLog } from "@/components/ui/MonkeyTypeActivityLog";
import { DsaTracker } from "@/components/ui/DsaTracker";
import { SitcomWidget, VideoPlayer, CLIPS } from "@/components/ui/SitcomWidget";
import { CloudDivider } from "@/components/ui/CloudDivider";
import { BentoCard } from "@/components/ui/BentoCard";
import { WavingFlag } from "@/components/ui/WavingFlag";
import { useTheme } from "@/contexts/ThemeProvider";

export default function AboutPage() {
    const { isEarth } = useTheme();
    const [isCm, setIsCm] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isProfileHovered, setIsProfileHovered] = React.useState(false);
    const [isMagnusPlaying, setIsMagnusPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const profileVideoRef = React.useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProfileHover = (hovering: boolean) => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) return;
        
        setIsProfileHovered(hovering);
        if (profileVideoRef.current) {
            if (hovering) {
                const playPromise = profileVideoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        // Auto-play was prevented or interrupted
                        if (e.name !== "AbortError") {
                            console.error("Video play failed:", e);
                        }
                    });
                }
            } else {
                profileVideoRef.current.pause();
                profileVideoRef.current.currentTime = 0;
            }
        }
    };

    const playMagnusVideo = () => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) return;
        setIsMagnusPlaying(true);
    };

    return (
        <div className={`min-h-screen selection:bg-amber-200 selection:text-amber-900 font-sans transition-colors duration-1000 overflow-x-hidden relative z-[50] ${
            isEarth 
                ? "bg-white text-zinc-900" 
                : "bg-[#0f172a] text-zinc-100"
        }`}>
            {/* ═══ NAVIGATION ═══ */}
            <nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md transition-colors duration-1000 ${
                isEarth ? "bg-white/70 border-b border-zinc-100" : "bg-black/70 border-b border-white/5"
            }`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className={`font-black text-2xl tracking-tighter hover:opacity-80 transition-all duration-300 ${
                        isEarth ? "text-[#1e293b]" : "text-white"
                    }`}>
                        DUBEY<span className={isEarth ? "text-amber-600" : "text-blue-500"}>.</span>G
                    </Link>
                    <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-[0.2em]">
                        <Link href="/" className="hover:text-amber-600 transition-colors">Portfolio</Link>
                        <span className="opacity-40">About Me</span>
                    </div>
                    <Link href="/" className="md:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Link>
                </div>
            </nav>

            {/* ═══ HERO SECTION ═══ */}
            <section className={`relative pt-48 pb-24 transition-colors duration-1000 overflow-hidden ${
                isEarth ? "bg-[#e3f2fd]" : "bg-black"
            }`}>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1
                    lg:grid-cols-2 gap-12 items-center min-h-[75vh] relative z-10">
                    <div className="z-10 text-center lg:text-left py-12">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-7xl md:text-[10rem] font-black tracking-tighter mb-12 leading-[0.8] ${
                                isEarth ? "text-[#1e293b]" : "text-white"
                            }`}
                        >
                            Hi there!<br /> I&apos;m Darshan.
                        </motion.h1>
                        <div className={`space-y-8 text-2xl md:text-3xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                            isEarth ? "text-[#334155]" : "text-zinc-400"
                        }`}>
                            <p>
                                I started building on the web in 2021 and never stopped.
                            </p>
                            <p>
                                I&apos;m a CS student focused on building digital products that feel more like companions than tools.
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative flex justify-center lg:justify-end h-full">
                        <div className="drop-shadow-2xl transition-all duration-700">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative w-72 h-72 md:w-[650px] md:h-[650px] lg:-mb-16 lg:translate-x-20 overflow-hidden rounded-b-[5rem]"
                                onMouseEnter={() => handleProfileHover(true)}
                                onMouseLeave={() => handleProfileHover(false)}
                            >
                                <Image 
                                    src="/images/profile/avatar.png" 
                                    alt="Darshan Dubey" 
                                    fill 
                                    className={`object-cover transition-opacity duration-500 pointer-events-none ${isProfileHovered ? "lg:opacity-0" : "opacity-100"}`}
                                />
                                <video
                                    ref={profileVideoRef}
                                    src="/videos/meself.mp4"
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 hidden lg:block ${isProfileHovered ? "opacity-100" : "opacity-0"}`}
                                    muted
                                    loop
                                    playsInline
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ BENTO IDENTITY SECTION ═══ */}
            <section className="max-w-7xl mx-auto px-6 py-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
                    
                    {/* Location Card - Large & Impactful */}
                    <div className={`md:col-span-2 flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <div className="relative h-[350px] bg-[#0b0e14] overflow-hidden">
                            <Image 
                                src="/images/widgets/dubey0nIndia.png" 
                                alt="I'm from Mumbai" 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Base of Operations</p>
                                <h3 className="text-5xl font-black tracking-tighter uppercase italic">Mumbai, India</h3>
                            </div>
                        </div>
                    </div>

                    {/* Identity Card (Gender) - Compact & Sophisticated with Background */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <Image 
                            src="/images/widgets/Hetero.png" 
                            alt="Identity" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 dark:opacity-30" 
                        />
                        {/* Gradient overlay for text readability */}
                        <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-1000 ${
                            isEarth ? "from-white/80 via-white/20 to-transparent" : "from-[#1e293b]/90 via-[#1e293b]/40 to-transparent"
                        }`} />
                        
                        <div className="p-8 h-full flex flex-col justify-end relative z-10">
                            <div className="space-y-4">
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                                        isEarth ? "text-zinc-500" : "text-zinc-300"
                                    }`}>Identity</p>
                                    <p className={`text-xl font-bold leading-tight ${
                                        isEarth ? "text-zinc-900" : "text-white"
                                    }`}>
                                        Straight Male <span className="text-sm font-medium opacity-40 ml-1">he/him</span>
                                    </p>
                                </div>
                                <p className={`text-xs font-bold leading-relaxed italic ${
                                    isEarth ? "text-zinc-700" : "text-zinc-200"
                                }`}>
                                    &ldquo;mostly heterosexual, selectively sapiosexual&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tall Card (Height) - Compact with Toggle */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <div 
                            className="p-8 h-full flex flex-col justify-between cursor-default relative"
                            onMouseEnter={() => setIsCm(true)}
                            onMouseLeave={() => setIsCm(false)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center border border-zinc-100 dark:border-zinc-700/50">
                                    <ArrowLeft className="w-4 h-4 rotate-90 text-zinc-400" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Stat</span>
                            </div>

                            <div className="flex-1 flex items-center justify-center gap-10 px-4">
                                <div className="relative z-10 text-right">
                                    <h3 className="text-6xl md:text-7xl font-black tracking-tighter mb-1 transition-all duration-300">
                                        {isCm ? "188" : "6'2\""}
                                        <span className="text-base font-medium tracking-normal text-zinc-400 ml-2">
                                            {isCm ? "cm" : "tall"}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-zinc-500 font-bold italic opacity-80 whitespace-nowrap">
                                        Still down to earth.
                                    </p>
                                </div>

                                <motion.div 
                                    whileHover={{ scale: 1.1, x: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="opacity-20 group-hover:opacity-100 transition-all duration-500"
                                >
                                    <svg
                                        width="70"
                                        height="140"
                                        viewBox="0 0 50 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className={isEarth ? "stroke-zinc-900" : "stroke-white"}
                                    >
                                        <g
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="25" cy="20" r="10"></circle>
                                            <line x1="25" y1="30" x2="25" y2="65"></line>
                                            <line x1="25" y1="65" x2="15" y2="90"></line>
                                            <line x1="25" y1="65" x2="35" y2="90"></line>
                                            <line x1="25" y1="40" x2="10" y2="55"></line>
                                            <line x1="25" y1="40" x2="40" y2="55"></line>
                                        </g>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Pronunciation Card - Clean & Functional with Background */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <Image 
                            src="/images/widgets/pronounciation.jpg" 
                            alt="Pronunciation" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 dark:opacity-30" 
                        />
                        {/* Gradient overlay for text readability */}
                        <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-1000 ${
                            isEarth ? "from-white/80 via-white/20 to-transparent" : "from-[#1e293b]/90 via-[#1e293b]/40 to-transparent"
                        }`} />
                        
                        <div className="p-8 h-full flex flex-col justify-between relative z-10">
                            <div className="flex items-center justify-between">
                                <h3 className={`text-3xl font-black tracking-tighter uppercase italic ${
                                    isEarth ? "text-zinc-900" : "text-white"
                                }`}>Darshan</h3>
                                <AudioPronunciation name="Darshan" phonetic="dər-shən" audioSrc={null} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-amber-600 dark:text-blue-400 mb-2 font-mono">/ dər-shən /</p>
                                <p className={`text-xs font-bold leading-relaxed ${
                                    isEarth ? "text-zinc-700" : "text-zinc-200"
                                }`}>
                                    Sanskrit for <span className={`${isEarth ? "text-zinc-900" : "text-white"} font-bold`}>&quot;Vision&quot;</span> or <span className={`${isEarth ? "text-zinc-900" : "text-white"} font-bold`}>&quot;To See.&quot;</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Adventures Card - Cinematic Small */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <div className="relative h-full min-h-[220px] bg-[#0f172a] overflow-hidden">
                             <Image 
                                src="/images/widgets/Uttarakhand.jpg" 
                                alt="Uttarakhand Adventure" 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white text-left">
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">Next Trip</p>
                                <h4 className="text-xl font-black tracking-tighter uppercase italic">Uttarakhand</h4>
                                <p className="text-[10px] font-bold text-amber-500">Chandrashila Peak</p>
                            </div>
                        </div>
                    </div>

                    {/* Zodiac Card - Sagittarius with Background */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <Image 
                            src="/images/widgets/Sagittarius.jpeg" 
                            alt="Sagittarius" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 dark:opacity-30" 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-1000 ${
                            isEarth ? "from-white/90 via-white/40 to-transparent" : "from-[#1e293b]/95 via-[#1e293b]/60 to-transparent"
                        }`} />

                        <div className="p-8 h-full flex flex-col justify-end relative z-10">
                            <div className="flex justify-between items-start absolute top-8 left-8 right-8">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right w-full ${isEarth ? "text-zinc-900" : "text-white"}`}>Zodiac</span>
                            </div>
                            <div>
                                <h3 className={`text-3xl font-black tracking-tighter uppercase mb-1 italic ${isEarth ? "text-zinc-900" : "text-white"}`}>Sagittarius</h3>
                                <p className={`text-xs font-bold leading-relaxed ${isEarth ? "text-zinc-700" : "text-zinc-200"}`}>
                                    Adventurous, optimistic, and eternally curious.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Personality Card - Introvert/Extrovert Scale Widget */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <div className="p-8 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Personality</span>
                                <div className="flex gap-2">
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Intro</span>
                                    <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-700">/</span>
                                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Extro</span>
                                </div>
                            </div>
                            
                            <div className="relative h-24 flex items-end justify-center pb-4">
                                {/* Lever (See-saw) */}
                                <motion.div 
                                    initial={{ rotate: -15 }}
                                    whileHover={{ rotate: -20 }}
                                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full relative origin-center"
                                >
                                    {/* Introvert Weight (Green) - Solid */}
                                    <div className="absolute -top-10 left-4 w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-110">
                                        <span className="text-lg font-black text-white leading-none">I</span>
                                    </div>
                                    {/* Extrovert Weight (Red) - Solid */}
                                    <div className="absolute -top-6 right-4 w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/10 opacity-60">
                                        <span className="text-sm font-black text-white leading-none">E</span>
                                    </div>
                                </motion.div>
                                {/* Fulcrum */}
                                <div className="absolute bottom-1 w-6 h-6 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-zinc-300 dark:border-b-zinc-700" />
                            </div>

                            <p className="text-xs text-zinc-500 font-bold italic text-center mt-4 opacity-80">
                                &ldquo;Not shy, just selective.&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Future City Card - Japan with Background */}
                    <div className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <Image 
                            src="/images/widgets/japan.jpeg" 
                            alt="Japan" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 dark:opacity-40" 
                        />
                        {/* High-contrast dark layer for text visibility */}
                        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 group-hover:bg-black/50 transition-colors duration-1000" />
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                                    <MapPin className="w-5 h-5 text-red-500 group-hover:animate-bounce" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Endgame</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-2">Future City</p>
                                <h4 className="text-5xl font-black tracking-tighter uppercase italic leading-none drop-shadow-lg">Japan</h4>
                                <p className="text-sm font-black opacity-90 mt-3 tracking-widest text-zinc-300">TOKYO / KYOTO / OSAKA</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══ THE STORY SECTIONS ═══ */}
            <div className="max-w-7xl mx-auto px-6 pb-40 space-y-48 relative z-10">
                
                <section className="space-y-16">
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <User className="w-4 h-4" />
                        <span>Profile Narrative</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">The Story So Far.</h2>
                    <div className="text-2xl md:text-4xl font-medium leading-[1.3] space-y-12 text-zinc-600 dark:text-zinc-400">
                        <p>
                            My relationship with computers started as a mystery. I wanted to know how a bunch of electronic components could create entire worlds.
                        </p>
                        <p>
                            Today, I&apos;m a Computer Science student at <strong>Bhavan&apos;s College</strong>, where I translate that curiosity into lines of code. I believe the web is the ultimate canvas for creativity.
                        </p>
                        <p>
                            When I build, I don&apos;t just think about logic. I think about <strong>motion</strong>, <strong>sound</strong>, and <strong>satisfaction</strong>. If a button doesn&apos;t feel good to click, it shouldn&apos;t exist.
                        </p>
                    </div>
                </section>

                <section className="space-y-16">
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <Code className="w-4 h-4" />
                        <span>Development Flow</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Deep in the Trenches.</h2>
                    <div className="text-2xl md:text-4xl font-medium leading-[1.3] space-y-10 text-zinc-600 dark:text-zinc-400">
                        <p>
                            I live in the terminal. Whether it&apos;s pushing commits to <strong className={isEarth ? "text-amber-600" : "text-blue-500"}>Chitti-the-Robot</strong> or architecting <strong className={isEarth ? "text-amber-600" : "text-blue-500"}>HisabKitab</strong>, open source is where I find my tribe.
                        </p>
                        <p>
                            I obsession over DX (Developer Experience). I build tools that I would want to use myself—fast, intuitive, and occasionally a bit magical.
                        </p>
                    </div>
                    <div className="pt-8">
                        <GithubActivityLog />
                    </div>
                </section>

                <section className="space-y-16 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <Sparkles className="w-4 h-4" />
                        <span>Performance Test</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Fast Hands.</h2>
                    <p className="text-2xl md:text-4xl font-medium text-zinc-600 dark:text-zinc-400 max-w-3xl leading-snug">
                        Code is a language, and like any language, fluency matters. I treat my keyboard as an instrument.
                    </p>
                    <div className="pt-12">
                        <MonkeyTypeActivityLog />
                    </div>
                    <div className="pt-12">
                        <MonkeyTypeWidget />
                    </div>
                </section>

                <section className="space-y-16 min-h-[600px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isMagnusPlaying ? (
                            <motion.div 
                                key="content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full"
                            >
                                <div className="space-y-12">
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                                        <Info className="w-4 h-4" />
                                        <span>Mental Framework</span>
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Strategic Mind.</h2>
                                    <div className="space-y-8">
                                        <p className="text-2xl md:text-4xl font-medium text-zinc-600 dark:text-zinc-400 leading-[1.3]">
                                            For me, chess is more than just a game—it&apos;s a mental gym where every move demands foresight and precision. I spend my quiet hours analyzing positions and competing on the global stage.
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <a 
                                                href="https://www.chess.com/member/d4-darshan" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#81b64c] text-white font-bold hover:scale-105 transition-transform shadow-sm"
                                            >
                                                Chess.com <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <a 
                                                href="https://lichess.org/@/Aaron_Swartz" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-white font-bold hover:scale-105 transition-transform shadow-sm"
                                            >
                                                Lichess <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-12">
                                    <ChessWidget />
                                    <button 
                                        onClick={playMagnusVideo}
                                        className="hidden lg:block group"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 group-hover:text-amber-500 transition-all duration-300 border-b border-zinc-200 dark:border-zinc-800 pb-1 group-hover:border-amber-500/50 group-hover:tracking-[0.8em]">
                                            play
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="video"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full aspect-video lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl relative"
                            >
                                <video 
                                    src="/videos/magnus.mp4" 
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    onEnded={() => setIsMagnusPlaying(false)}
                                />
                                <button 
                                    onClick={() => setIsMagnusPlaying(false)}
                                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
                                >
                                    <Sparkles className="h-4 w-4" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <section className="space-y-16">
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <Headphones className="w-4 h-4" />
                        <span>Sensory Inputs</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Culture & Beats.</h2>
                    
                    {/* Wide Desktop Layout: Spotify Left | Text Center | 2x2 Videos Right */}
                    <div className="hidden lg:grid grid-cols-12 gap-12 items-center -mx-20 max-w-[1600px]">
                        {/* Column 1: Spotify Left */}
                        <div className="col-span-4 flex justify-start">
                            <div className="w-full max-w-md">
                                <SpotifyWidget />
                            </div>
                        </div>

                        {/* Column 2: Original Text Style Centered - New Music & TBBT content */}
                        <div className="col-span-3 space-y-12 text-center">
                            <p className="text-2xl font-medium leading-[1.4] text-zinc-600 dark:text-zinc-400">
                                Music is the rhythm I code to. Whether it&apos;s deep house or a mellow chill-out playlist, the right beat transforms a simple session into a focused flow state where time just disappears.
                            </p>
                            <p className="text-2xl font-medium leading-[1.4] text-zinc-600 dark:text-zinc-400">
                                When I&apos;m not grinding, <strong className="text-red-600 underline decoration-4 underline-offset-8 decoration-red-600/30">The Big Bang Theory</strong> is my ultimate escape. There&apos;s something incredibly relatable about Sheldon and the crew—it&apos;s the perfect mix of genius, awkwardness, and &quot;Bazinga!&quot; moments that never gets old.
                            </p>
                        </div>

                        {/* Column 3: 2x2 Videos Right - Large and slightly shifted right */}
                        <div className="col-span-5 grid grid-cols-2 gap-6 scale-105 translate-x-12">
                            {CLIPS.map((clip, index) => (
                                <VideoPlayer key={clip.id} src={clip.src} title={clip.title} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Mobile/Tablet Layout: Original Stacked */}
                    <div className="lg:hidden grid grid-cols-1 gap-20 items-center">
                        <div className="space-y-12 text-2xl md:text-4xl font-medium leading-[1.3] text-zinc-600 dark:text-zinc-400">
                            <p>
                                Music is the rhythm I code to. Whether it&apos;s deep house or a mellow chill-out playlist, the right beat transforms a simple session into a focused flow state where time just disappears.
                            </p>
                            <p>
                                When I&apos;m not grinding, <strong className="text-red-600 underline decoration-4 underline-offset-8 decoration-red-600/30">The Big Bang Theory</strong> is my ultimate escape. There&apos;s something incredibly relatable about Sheldon and the crew—it&apos;s the perfect mix of genius, awkwardness, and &quot;Bazinga!&quot; moments that never gets old.
                            </p>
                        </div>
                        <div className="flex flex-col gap-16">
                            <SpotifyWidget />
                            
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-zinc-900 dark:text-zinc-100 p-4 bg-zinc-100/50 dark:bg-white/5 rounded-2xl border border-zinc-200 dark:border-white/5 backdrop-blur-sm">
                                    <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-xl shadow-sm">
                                        <Clapperboard className="h-6 w-6 text-red-600 dark:text-red-400" /> 
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">
                                        The Big Bang <span className="text-red-600 block text-sm tracking-[0.2em] mt-1">Theory</span>
                                    </h3>
                                </div>
                                <div className="flex justify-center">
                                    <SitcomWidget />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* ═══ FOOTER ═══ */}
            <footer className={`relative pt-64 pb-32 transition-all duration-1000 overflow-hidden flex flex-col justify-center ${
                isEarth ? "bg-[#e3f2fd]" : "bg-[#0b0e14]"
            } ${isPlaying ? "min-h-screen" : "min-h-[600px]"}`}>
                {/* Background Video - Max Visibility */}
                <video 
                    ref={videoRef}
                    src="/videos/Idontlose.mp4"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                    loop
                    playsInline
                />

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div
                                initial={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className={`text-6xl md:text-[11rem] font-black mb-20 tracking-tighter leading-[0.8] ${
                                    isEarth ? "text-[#1e293b]" : "text-white"
                                }`}>
                                    Have a<br /> wonderful day!
                                </h2>
                                
                                <div className="flex flex-wrap justify-center gap-8 mb-48">
                                    <Link href="/#contact" className="px-14 py-7 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-full transition-transform hover:scale-105 shadow-layered text-2xl tracking-wider uppercase">
                                        Get in Touch
                                    </Link>
                                    <a href="mailto:mailmeatdarshan@gmail.com" className={`px-14 py-7 font-black rounded-full transition-all border shadow-sm text-2xl tracking-wider uppercase ${
                                        isEarth 
                                            ? "bg-white hover:bg-zinc-100 text-[#1e293b] border-zinc-200" 
                                            : "bg-[#1e293b] hover:bg-zinc-800 text-white border-white/10"
                                    }`}>
                                        Send an Email
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={`flex flex-col items-center gap-8 transition-all duration-1000 ${isPlaying ? "mt-0" : ""}`}>
                        {!isPlaying && (
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30">
                                &copy; 2026 Darshan Dubey
                            </p>
                        )}
                        
                        <button 
                            onClick={togglePlay}
                            className={`text-[10px] font-black uppercase tracking-[0.6em] transition-all duration-300 hover:tracking-[0.8em] py-3 px-8 rounded-full border ${
                                isPlaying 
                                    ? "text-amber-500 border-amber-500/50 bg-black/40 backdrop-blur-md" 
                                    : (isEarth ? "text-[#1e293b]/40 border-[#1e293b]/10" : "text-white/40 border-white/10")
                            }`}
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
