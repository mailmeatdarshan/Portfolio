"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, MapPin, Headphones, Code, User, Info, ExternalLink, Clapperboard, ChevronRight, Play, Pause, Languages, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AudioPronunciation } from "@/components/ui/AudioPronunciation";
import { UnitConverter } from "@/components/ui/UnitConverter";
import { PrideCycle } from "@/components/ui/PrideCycle";
import { DistanceTracker } from "@/components/ui/DistanceTracker";
import { PetWidget } from "@/components/ui/PetWidget";
import { SpotifyWidget } from "@/components/ui/SpotifyWidget";
import { GithubActivityLog } from "@/components/ui/GithubActivityLog";
import { LeetcodeActivityLog } from "@/components/ui/LeetcodeActivityLog";
import { ChessWidget } from "@/components/ui/ChessWidget";
import { MonkeyTypeWidget } from "@/components/ui/MonkeyTypeWidget";
import { MonkeyTypeActivityLog } from "@/components/ui/MonkeyTypeActivityLog";
import { DsaTracker } from "@/components/ui/DsaTracker";
import { SitcomWidget, VideoPlayer, CLIPS } from "@/components/ui/SitcomWidget";
import { CloudDivider } from "@/components/ui/CloudDivider";
import { BentoCard } from "@/components/ui/BentoCard";
import { WavingFlag } from "@/components/ui/WavingFlag";
import { BookStack } from "@/components/ui/BookStack";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { useTheme } from "@/contexts/ThemeProvider";
import { aboutTranslations } from "@/data/aboutTranslations";
import { BlurReveal } from "@/components/BlurReveal";

const FOOTER_VIDEOS = ["/videos/Idontlose.mp4", "/videos/tyson.mp4"];

export default function AboutPage() {
    const { isEarth } = useTheme();
    const [lang, setLang] = React.useState<"en" | "hi">("en");
    const t = aboutTranslations[lang];
    const [isCm, setIsCm] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [footerVideoIndex, setFooterVideoIndex] = React.useState(0);
    const [isProfileHovered, setIsProfileHovered] = React.useState(false);
    const [isMagnusPlaying, setIsMagnusPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const ambientVideoRef = React.useRef<HTMLVideoElement>(null);
    const profileVideoRef = React.useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                if (ambientVideoRef.current) {
                    ambientVideoRef.current.pause();
                }
            } else {
                videoRef.current.play();
                if (ambientVideoRef.current) {
                    ambientVideoRef.current.play();
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextVideo = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextIndex = (footerVideoIndex + 1) % FOOTER_VIDEOS.length;
        setFooterVideoIndex(nextIndex);
    };

    React.useEffect(() => {
        if (isPlaying) {
            if (videoRef.current) {
                videoRef.current.play();
            }
            if (ambientVideoRef.current) {
                ambientVideoRef.current.play();
            }
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            if (ambientVideoRef.current) {
                ambientVideoRef.current.pause();
            }
        }
    }, [footerVideoIndex, isPlaying]);

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
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setLang(lang === "en" ? "hi" : "en")}
                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                                isEarth 
                                    ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900" 
                                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                            }`}
                            title={lang === "en" ? "Switch to Hinglish" : "Switch to English"}
                        >
                            <Languages className="w-5 h-5" />
                        </button>
                        <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-[0.2em]">
                            <Link href="/" className="hover:text-amber-600 transition-colors">{t.nav.portfolio}</Link>
                            <span className="opacity-40">{t.nav.aboutMe}</span>
                        </div>
                        <Link href="/" className="md:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            <ArrowLeft className="h-4 w-4" /> {t.nav.back}
                        </Link>
                    </div>
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
                            className={`text-7xl md:text-[10rem] font-black tracking-tighter mb-12 leading-[0.8] relative z-10 ${
                                isEarth ? "text-[#1e293b]" : "text-white"
                            }`}
                        >
                            <span className="relative inline-block overflow-visible">
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 dark:opacity-20 pointer-events-none">
                                    <LottieAnimation 
                                        key={lang}
                                        animationPath="/hand wave.json" 
                                        className="w-[360px] h-[360px] md:w-[750px] md:h-[750px]" 
                                    />
                                </span>
                                <span className="relative z-10">
                                    {t.hero.hi}
                                    <br />
                                    {t.hero.im}
                                </span>
                            </span>
                        </motion.h1>
                        <div className={`space-y-8 text-2xl md:text-3xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                            isEarth ? "text-[#334155]" : "text-zinc-400"
                        }`}>
                            <p>
                                {t.hero.subtitle1}
                            </p>
                            <p>
                                {t.hero.subtitle2}
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
                    <BlurReveal className={`md:col-span-2 flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
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
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">{t.bento.location.label}</p>
                                <h3 className="text-5xl font-black tracking-tighter uppercase italic">{t.bento.location.value}</h3>
                            </div>
                        </div>
                    </BlurReveal>

                    {/* Identity Card (Gender) - Compact & Sophisticated with Background */}
                    <BlurReveal delay={0.05} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
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
                                    }`}>{t.bento.identity.label}</p>
                                    <p className={`text-xl font-bold leading-tight ${
                                        isEarth ? "text-zinc-900" : "text-white"
                                    }`}>
                                        {t.bento.identity.value} <span className="text-sm font-medium opacity-40 ml-1">{t.bento.identity.pronouns}</span>
                                    </p>
                                </div>
                                <p className={`text-xs font-bold leading-relaxed italic ${
                                    isEarth ? "text-zinc-700" : "text-zinc-200"
                                }`}>
                                    &ldquo;{t.bento.identity.quote}&rdquo;
                                </p>
                            </div>
                        </div>
                    </BlurReveal>

                    {/* Tall Card (Height) - Compact with Toggle */}
                    <BlurReveal delay={0.1} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
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
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{t.bento.height.label}</span>
                            </div>

                            <div className="flex-1 flex items-center justify-center gap-10 px-4">
                                <div className="relative z-10 text-right">
                                    <h3 className="text-6xl md:text-7xl font-black tracking-tighter mb-1 transition-all duration-300">
                                        {isCm ? "188" : "6'2\""}
                                        <span className="text-base font-medium tracking-normal text-zinc-400 ml-2">
                                            {isCm ? "cm" : t.bento.height.value}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-zinc-500 font-bold italic opacity-80 whitespace-nowrap">
                                        {t.bento.height.quote}
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
                    </BlurReveal>

                    {/* Pronunciation Card - Clean & Functional with Background */}
                    <BlurReveal delay={0.05} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
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
                            <div className="flex justify-between items-start">
                                <h3 className={`text-3xl font-black tracking-tighter uppercase italic ${
                                    isEarth ? "text-zinc-900" : "text-white"
                                }`}>Darshan</h3>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isEarth ? "text-zinc-900" : "text-white"}`}>{t.bento.pronunciation.label}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <AudioPronunciation name="Darshan" phonetic="dər-shən" audioSrc={null} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-amber-600 dark:text-blue-400 mb-2 font-mono">/ dər-shən /</p>
                                <p className={`text-xs font-bold leading-relaxed ${
                                    isEarth ? "text-zinc-700" : "text-zinc-200"
                                }`}>
                                    {t.bento.pronunciation.meaning1} <span className={`${isEarth ? "text-zinc-900" : "text-white"} font-bold`}>&quot;{t.bento.pronunciation.meaning2}&quot;</span> {t.bento.pronunciation.meaning3} <span className={`${isEarth ? "text-zinc-900" : "text-white"} font-bold`}>&quot;{t.bento.pronunciation.meaning4}&quot;</span>
                                </p>
                            </div>
                        </div>
                    </BlurReveal>

                    {/* Adventures Card - Cinematic Small */}
                    <BlurReveal delay={0.1} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
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
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">{t.bento.adventures.label}</p>
                                <h4 className="text-xl font-black tracking-tighter uppercase italic">Uttarakhand</h4>
                                <p className="text-[10px] font-bold text-amber-500">{t.bento.adventures.peak}</p>
                            </div>
                        </div>
                    </BlurReveal>

                    {/* Zodiac Card - Sagittarius with Background */}
                    <BlurReveal delay={0.15} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative ${
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
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right w-full ${isEarth ? "text-zinc-900" : "text-white"}`}>{t.bento.zodiac.label}</span>
                            </div>
                            <div>
                                <h3 className={`text-3xl font-black tracking-tighter uppercase mb-1 italic ${isEarth ? "text-zinc-900" : "text-white"}`}>{t.bento.zodiac.value}</h3>
                                <p className={`text-xs font-bold leading-relaxed ${isEarth ? "text-zinc-700" : "text-zinc-200"}`}>
                                    {t.bento.zodiac.description}
                                </p>
                            </div>
                        </div>
                    </BlurReveal>

                    {/* Personality Card - Introvert/Extrovert Scale Widget */}
                    <BlurReveal delay={0.1} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 ${
                        isEarth ? "bg-white border-zinc-200" : "bg-[#1e293b] border-white/10"
                    }`}>
                        <div className="p-8 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{t.bento.personality.label}</span>
                                <div className="flex gap-2">
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t.bento.personality.intro}</span>
                                    <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-700">/</span>
                                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{t.bento.personality.extro}</span>
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
                                &ldquo;{t.bento.personality.quote}&rdquo;
                            </p>
                        </div>
                    </BlurReveal>

                    {/* Future City Card - Japan with Background */}
                    <BlurReveal delay={0.15} className={`flex flex-col group overflow-hidden rounded-[2.5rem] border shadow-layered transition-all duration-1000 relative min-h-[400px] ${
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
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{t.bento.futureCity.label}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-2">{t.bento.futureCity.tag}</p>
                                <h4 className="text-5xl font-black tracking-tighter uppercase italic leading-none drop-shadow-lg">{t.bento.futureCity.value}</h4>
                                <p className="text-sm font-black opacity-90 mt-3 tracking-widest text-zinc-300">TOKYO / KYOTO / OSAKA</p>
                            </div>
                        </div>
                    </BlurReveal>

                </div>
            </section>

            {/* ═══ THE STORY SECTIONS ═══ */}
            <div className="max-w-7xl mx-auto px-6 pb-40 space-y-48 relative z-10">
                
                <section className="space-y-16">
                    <BlurReveal>
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <User className="w-4 h-4" />
                        <span>{t.story.label}</span>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.05}>
                    <div className="flex items-center justify-center md:justify-start overflow-visible w-full">
                        <div className="relative inline-flex items-center justify-center overflow-visible">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 dark:opacity-20 pointer-events-none md:left-full md:-translate-x-24 md:top-1/2 md:-translate-y-1/2">
                                <LottieAnimation key={lang} animationPath="/story.json" className="w-72 h-72 md:w-[450px] md:h-[450px]" />
                            </div>
                            <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                {t.story.title}
                            </h2>
                        </div>
                    </div>
                    </BlurReveal>
                    <div className="text-2xl md:text-4xl font-medium leading-[1.3] space-y-12 text-zinc-600 dark:text-zinc-400">
                        <BlurReveal delay={0.1}>
                        <p>
                            {t.story.p1}
                        </p>
                        </BlurReveal>
                        <BlurReveal delay={0.15}>
                        <p>
                            {t.story.p2}
                        </p>
                        </BlurReveal>
                        <BlurReveal delay={0.2}>
                        <p>
                            {t.story.p3}
                        </p>
                        </BlurReveal>
                    </div>
                </section>

                <section className="space-y-16">
                    <BlurReveal>
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <Code className="w-4 h-4" />
                        <span>{t.development.label}</span>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.05}>
                    <div className="flex items-center justify-center md:justify-start overflow-visible w-full">
                        <div className="relative inline-flex items-center justify-center overflow-visible">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 dark:opacity-20 pointer-events-none md:left-full md:-translate-x-24 md:top-1/2 md:-translate-y-1/2">
                                <LottieAnimation key={lang} animationPath="/deepinthetrenches.json" className="w-72 h-72 md:w-[450px] md:h-[450px]" />
                            </div>
                            <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                {t.development.title}
                            </h2>
                        </div>
                    </div>
                    </BlurReveal>
                    <div className="text-2xl md:text-4xl font-medium leading-[1.3] space-y-10 text-zinc-600 dark:text-zinc-400">
                        <BlurReveal delay={0.1}>
                        <p>
                            {t.development.p1}
                        </p>
                        </BlurReveal>
                        <BlurReveal delay={0.15}>
                        <p>
                            {t.development.p2}
                        </p>
                        </BlurReveal>
                    </div>
                    <BlurReveal delay={0.1}>
                    <div className="pt-8">
                        <GithubActivityLog />
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.15}>
                    <div className="pt-4">
                        <LeetcodeActivityLog />
                    </div>
                    </BlurReveal>
                </section>

                <section className="space-y-16 text-center md:text-left">
                    <BlurReveal>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <Sparkles className="w-4 h-4" />
                        <span>{t.performance.label}</span>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.05}>
                    <div className="flex items-center justify-center md:justify-start overflow-visible w-full">
                        <div className="relative inline-flex items-center justify-center overflow-visible">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-35 dark:opacity-25 pointer-events-none md:left-full md:-translate-x-8 md:top-1/2 md:-translate-y-[58%]">
                                <LottieAnimation key={lang} animationPath="/Typing.json" className="w-72 h-72 md:w-[450px] md:h-[450px]" />
                            </div>
                            <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                {t.performance.title}
                            </h2>
                        </div>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.1}>
                    <p className="text-2xl md:text-4xl font-medium text-zinc-600 dark:text-zinc-400 max-w-3xl leading-snug">
                        {t.performance.p1}
                    </p>
                    </BlurReveal>
                    <BlurReveal delay={0.15}>
                    <div className="pt-12">
                        <MonkeyTypeActivityLog />
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.2}>
                    <div className="pt-12">
                        <MonkeyTypeWidget />
                    </div>
                    </BlurReveal>
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
                                    <BlurReveal>
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                                        <Info className="w-4 h-4" />
                                        <span>{t.strategic.label}</span>
                                    </div>
                                    </BlurReveal>
                                    <BlurReveal delay={0.05}>
                                    <div className="flex items-center justify-center md:justify-start overflow-visible w-full">
                                        <div className="relative inline-flex items-center justify-center overflow-visible">
                                            <div className="absolute left-1/2 top-1/2 -translate-x-[25%] -translate-y-1/2 z-0 opacity-30 dark:opacity-20 pointer-events-none md:left-full md:-translate-x-128 md:top-1/2 md:-translate-y-1/2">
                                                <LottieAnimation key={lang} animationPath="/Chess.json" className="w-[420px] h-[420px] md:w-[900px] md:h-[900px]" />
                                            </div>
                                            <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                                {t.strategic.title}
                                            </h2>
                                        </div>
                                    </div>
                                    </BlurReveal>
                                    <div className="space-y-8">
                                        <BlurReveal delay={0.1}>
                                        <p className="text-2xl md:text-4xl font-medium text-zinc-600 dark:text-zinc-400 leading-[1.3]">
                                            {t.strategic.p1}
                                        </p>
                                        </BlurReveal>
                                        <BlurReveal delay={0.15}>
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
                                        </BlurReveal>
                                    </div>
                                </div>
                                <BlurReveal className="flex flex-col items-center gap-12" delay={0.15}>
                                    <ChessWidget />
                                    <button 
                                        onClick={playMagnusVideo}
                                        className="hidden lg:block group"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 group-hover:text-amber-500 transition-all duration-300 border-b border-zinc-200 dark:border-zinc-800 pb-1 group-hover:border-amber-500/50 group-hover:tracking-[0.8em]">
                                            {lang === "en" ? "play" : "shuru"}
                                        </span>
                                    </button>
                                </BlurReveal>
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
                    <BlurReveal>
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <BookOpen className="w-4 h-4" />
                        <span>{t.literary.label}</span>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.05}>
                    <div className="flex items-center justify-center md:justify-start overflow-visible w-full">
                        <div className="relative inline-flex items-center justify-center overflow-visible">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 dark:opacity-20 pointer-events-none md:left-full md:-translate-x-20 md:top-1/2 md:-translate-y-[45%]">
                                <LottieAnimation key={lang} animationPath="/Books.json" className="w-72 h-72 md:w-[450px] md:h-[450px]" />
                            </div>
                            <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                {t.literary.title}
                            </h2>
                        </div>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.1}>
                    <p className="text-2xl md:text-4xl font-medium text-zinc-600 dark:text-zinc-400 max-w-3xl leading-snug">
                        {t.literary.p1}
                    </p>
                    </BlurReveal>
                    <BlurReveal delay={0.15}>
                    <div className="pt-12">
                        <BookStack isEarth={isEarth} lang={lang} />
                    </div>
                    </BlurReveal>
                </section>

                <section className="space-y-16">
                    <BlurReveal>
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        <Headphones className="w-4 h-4" />
                        <span>{t.culture.label}</span>
                    </div>
                    </BlurReveal>
                    <BlurReveal delay={0.05}>
                    <div className="flex items-center justify-center md:justify-start overflow-visible w-full">
                        <div className="relative inline-flex items-center justify-center overflow-visible">
                            <div className="absolute left-1/2 top-1/2 -translate-x-[25%] -translate-y-1/2 z-0 opacity-30 dark:opacity-20 pointer-events-none md:left-full md:-translate-x-11 md:top-1/2 md:-translate-y-[64%]">
                                <LottieAnimation key={lang} animationPath="/music.json" className="w-72 h-72 md:w-[450px] md:h-[450px]" />
                            </div>
                            <h2 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter leading-none">
                                {t.culture.title}
                            </h2>
                        </div>
                    </div>
                    </BlurReveal>
                    
                    {/* Wide Desktop Layout: Spotify Left | Text Center | 2x2 Videos Right */}
                    <BlurReveal delay={0.1}>
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
                                {t.culture.p1}
                            </p>
                            <p className="text-2xl font-medium leading-[1.4] text-zinc-600 dark:text-zinc-400">
                                {lang === "en" ? (
                                    <>When I&apos;m not grinding, <strong className="text-red-600 underline decoration-4 underline-offset-8 decoration-red-600/30">The Big Bang Theory</strong> is my ultimate escape. There&apos;s something incredibly relatable about Sheldon and the crew—it&apos;s the perfect mix of genius, awkwardness, and &quot;Bazinga!&quot; moments that never gets old.</>
                                ) : (
                                    <>Jab main kaam nahi kar raha hota, toh <strong className="text-red-600 underline decoration-4 underline-offset-8 decoration-red-600/30">The Big Bang Theory</strong> mera ultimate escape hai. Sheldon aur uski team mein kuch bahut hi relatable hai—genius, awkwardness aur wahi purane &quot;Bazinga!&quot; moments jo kabhi purane nahi hote.</>
                                )}
                            </p>
                        </div>

                        {/* Column 3: 2x2 Videos Right - Large and slightly shifted right */}
                        <div className="col-span-5 grid grid-cols-2 gap-6 scale-105 translate-x-12">
                            {CLIPS.map((clip, index) => (
                                <VideoPlayer key={clip.id} src={clip.src} title={clip.title} index={index} />
                            ))}
                        </div>
                    </div>
                    </BlurReveal>

                    {/* Mobile/Tablet Layout: Original Stacked */}
                    <BlurReveal delay={0.1}>
                    <div className="lg:hidden grid grid-cols-1 gap-20 items-center">
                        <div className="space-y-12 text-2xl md:text-4xl font-medium leading-[1.3] text-zinc-600 dark:text-zinc-400">
                            <p>
                                {t.culture.p1}
                            </p>
                            <p>
                                {lang === "en" ? (
                                    <>When I&apos;m not grinding, <strong className="text-red-600 underline decoration-4 underline-offset-8 decoration-red-600/30">The Big Bang Theory</strong> is my ultimate escape. There&apos;s something incredibly relatable about Sheldon and the crew—it&apos;s the perfect mix of genius, awkwardness, and &quot;Bazinga!&quot; moments that never gets old.</>
                                ) : (
                                    <>Jab main kaam nahi kar raha hota, toh <strong className="text-red-600 underline decoration-4 underline-offset-8 decoration-red-600/30">The Big Bang Theory</strong> mera ultimate escape hai. Sheldon aur uski team mein kuch bahut hi relatable hai—genius, awkwardness aur wahi purane &quot;Bazinga!&quot; moments jo kabhi purane nahi hote.</>
                                )}
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
                    </BlurReveal>
                </section>

            </div>

            {/* ═══ FOOTER ═══ */}
            <footer className={`relative py-24 md:py-36 transition-all duration-1000 overflow-hidden flex flex-col justify-center ${
                isEarth ? "bg-[#e3f2fd]" : "bg-[#0b0e14]"
            } ${isPlaying ? "min-h-screen" : "min-h-[600px]"}`}>
                {/* Video Container (Ambient background on desktop, sharp container centered on desktop, full screen on mobile) */}
                <div className={`absolute inset-0 transition-opacity duration-1000 z-0 ${isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"} flex items-center justify-center`}>
                    {/* On Desktop: Blurred ambient background video to fill the screen */}
                    <div className="hidden md:block absolute inset-0 w-full h-full bg-black/60 z-0" />
                    <video 
                        ref={ambientVideoRef}
                        src={FOOTER_VIDEOS[footerVideoIndex]}
                        className="hidden md:block absolute inset-0 w-full h-full object-cover blur-3xl opacity-45 scale-105 z-0"
                        muted
                        loop
                        playsInline
                    />

                    {/* Sharp Video Player Frame (Full screen on mobile, styled vertical frame on desktop) */}
                    <div className="relative w-full h-full md:w-auto md:h-[70vh] md:max-h-[640px] md:aspect-[9/16] z-10 flex items-center justify-center group/player">
                        <div className="relative w-full h-full md:rounded-[2rem] md:border-[6px] md:border-zinc-800/80 md:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden bg-black flex items-center justify-center">
                            <video 
                                ref={videoRef}
                                src={FOOTER_VIDEOS[footerVideoIndex]}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={togglePlay}
                                loop
                                playsInline
                            />
                            
                            {/* Control Bar Overlay at the bottom-left of the video card (Desktop only, shown on hover) */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/player:opacity-100 transition-all duration-300 z-20 flex items-center justify-start gap-4 pointer-events-none">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePlay();
                                    }}
                                    className="pointer-events-auto p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center"
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-4 h-4 fill-current" />
                                    ) : (
                                        <Play className="w-4 h-4 fill-current" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Next Video button right next to the video on desktop, or inside on mobile */}
                        {isPlaying && (
                            <motion.button 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={nextVideo}
                                className="absolute right-4 md:-right-24 top-1/2 -translate-y-1/2 z-20 p-3.5 md:p-5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 group/btn shadow-lg"
                                title="Next Video"
                            >
                                <ChevronRight className="w-5 h-5 md:w-8 md:h-8 group-hover/btn:translate-x-1 transition-transform" />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Ground-level waving hands at the absolute edge of the screen */}
                {!isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none overflow-hidden h-72 md:h-[480px]">
                        <LottieAnimation 
                            key={lang}
                            animationPath="/bye.json" 
                            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] -translate-y-4 md:-translate-y-8 flex-shrink-0" 
                        />
                    </div>
                )}

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
                                    {t.footer.title1}<br /> {t.footer.title2}
                                </h2>
                                
                                <div className="flex flex-wrap justify-center gap-8 mb-48">
                                    <Link href="/#contact" className="min-w-[320px] px-10 py-7 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-full transition-transform hover:scale-105 shadow-layered text-2xl tracking-wider uppercase text-center">
                                        {t.footer.getInTouch}
                                    </Link>
                                    <Link href="/guestbook" className={`min-w-[320px] px-10 py-7 font-black rounded-full transition-transform hover:scale-105 shadow-layered text-2xl tracking-wider uppercase text-center ${
                                        isEarth 
                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}>
                                        {t.footer.writeMessage}
                                    </Link>
                                    <a href="mailto:mailmeatdarshan@gmail.com" className={`min-w-[320px] px-10 py-7 font-black rounded-full transition-all border shadow-sm text-2xl tracking-wider uppercase text-center ${
                                        isEarth 
                                            ? "bg-white hover:bg-zinc-100 text-[#1e293b] border-zinc-200" 
                                            : "bg-[#1e293b] hover:bg-zinc-800 text-white border-white/10"
                                    }`}>
                                        {t.footer.sendEmail}
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isPlaying && (
                        <div className="flex flex-col items-center gap-8 mt-12">
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30">
                                &copy; {t.footer.copyright}
                            </p>
                        </div>
                    )}
                </div>

                <button 
                    onClick={togglePlay}
                    className={`z-20 p-2.5 md:p-5 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
                        isPlaying 
                            ? "absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 border-white/20 text-white" 
                            : (isEarth 
                                ? "mx-auto mt-8 block bg-white/10 border-zinc-200 text-zinc-900 shadow-sm" 
                                : "mx-auto mt-8 block bg-white/5 border-white/10 text-white")
                    }`}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                    ) : (
                        <Play className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                    )}
                </button>
            </footer>
        </div>
    );
}
