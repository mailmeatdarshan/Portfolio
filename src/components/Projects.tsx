"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { projects, socialLinks, Project } from "@/data/portfolio";
import Link from "next/link";
import { Github, ExternalLink, Download, X, Calendar, User, Code2 } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const githubLink = socialLinks.find(link => link.name === "GitHub")?.url || "https://github.com/mailmeatdarshan";
    const { isEarth } = useTheme();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedProject]);

    // Precise ordering as requested
    const orderedTitles = [
        "MyBhavans", 
        "HisabKitab", 
        "BhavansPracbuddy", 
        "Chitti-The Robot", 
        "Comfy", 
        "ShriHariEnterprises"
    ];
    
    const orderedProjects = orderedTitles.map(title => 
        projects.find(p => p.title === title)
    ).filter(Boolean) as Project[];

    return (
        <div className="py-20 px-4 relative">
            <div className="max-w-7xl mx-auto mb-16">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center transition-colors duration-1000"
                    style={{ color: "var(--theme-text-heading)" }}
                >
                    Featured Work
                </h2>
                <p
                    className="text-center mt-4 max-w-2xl mx-auto transition-colors duration-1000"
                    style={{ color: "var(--theme-text-muted)" }}
                >
                    A selection of my best projects, combining design thinking with robust engineering.
                </p>
            </div>

            <BentoGrid className="max-w-7xl mx-auto">
                {orderedProjects.map((project, i) => {
                    let layoutClass = "md:col-span-1 md:row-span-1";
                    
                    if (project.title === "MyBhavans") {
                        layoutClass = "md:col-span-2 md:row-span-2";
                    } else if (project.title === "HisabKitab") {
                        layoutClass = "md:col-span-2 md:row-span-1";
                    } else if (project.title === "Comfy" || project.title === "ShriHariEnterprises") {
                        layoutClass = "md:col-span-2 md:row-span-1";
                    }
                    
                    const isLarge = project.title === "MyBhavans";
                    
                    return (
                        <BentoGridItem
                            key={project.id}
                            layoutId={`project-${project.id}`}
                            onClick={() => setSelectedProject(project)}
                            title={<span className="text-xl font-bold">{project.title}</span>}
                            description={project.description}
                            header={
                                <div className={cn(
                                    "w-full rounded-2xl overflow-hidden relative group",
                                    isLarge ? "flex-[25] min-h-[40rem]" : "flex-[4] min-h-[14rem]",
                                    isEarth ? "bg-stone-100" : "bg-neutral-100 dark:bg-neutral-800/50"
                                )}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain transition-all duration-700"
                                    />
                                    <div className={cn(
                                        "absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6",
                                        hoveredIndex === i ? "opacity-100" : "opacity-0"
                                    )}>
                                        <h3 className="text-white text-xl font-bold md:hidden text-center drop-shadow-lg">
                                            {project.title}
                                        </h3>
                                        <p className="text-neutral-200 text-xs md:hidden text-center line-clamp-3 mb-2 px-2">
                                            {project.description}
                                        </p>
                                        <motion.div 
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="px-4 py-2 bg-white text-black rounded-full font-bold text-sm shadow-xl"
                                        >
                                            Explore Project
                                        </motion.div>
                                    </div>
                                </div>
                            }
                            className={layoutClass}
                            icon={
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.tech.slice(0, 4).map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2 py-0.5 rounded-full transition-colors duration-1000"
                                            style={{
                                                background: "var(--theme-accent-bg)",
                                                color: "var(--theme-accent)",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "var(--theme-accent-border)",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            }
                            isHovered={hoveredIndex === i}
                            isAnyHovered={hoveredIndex !== null}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    );
                })}
            </BentoGrid>

            {/* Expanded Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className={cn(
                                "fixed inset-0 backdrop-blur-md",
                                isEarth ? "bg-stone-900/80" : "bg-black/90"
                            )}
                        />
                        
                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                            className={cn(
                                "border w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row transition-colors duration-1000",
                                isEarth
                                    ? "bg-white border-stone-200"
                                    : "bg-neutral-900 border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className={cn(
                                    "absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-colors z-30 backdrop-blur-md border",
                                    isEarth
                                        ? "bg-stone-100/60 text-stone-800 hover:bg-stone-200/80 border-stone-200"
                                        : "bg-black/60 text-white hover:bg-white/10 border-white/10"
                                )}
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            {/* Left: Image Section */}
                            <div className={cn(
                                "w-full md:w-1/2 h-72 md:h-auto relative shrink-0 min-h-[300px]",
                                isEarth ? "bg-stone-50/50" : "bg-neutral-800/30"
                            )}>
                                <div className="absolute inset-0 p-6 md:p-12">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        priority
                                        className="object-contain drop-shadow-2xl z-20"
                                    />
                                </div>
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-t via-transparent to-transparent md:hidden z-10",
                                    isEarth ? "from-white" : "from-neutral-900"
                                )} />
                            </div>

                            {/* Right: Content Section */}
                            <div className={cn(
                                "w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto custom-scrollbar transition-colors duration-1000",
                            )}
                            style={{ background: "var(--theme-card-bg)" }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors duration-1000"
                                            style={{
                                                background: "var(--theme-accent-bg)",
                                                color: "var(--theme-accent)",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "var(--theme-accent-border)",
                                            }}
                                        >
                                            Featured Project
                                        </span>
                                    </div>
                                    <h2
                                        className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight transition-colors duration-1000"
                                        style={{ color: "var(--theme-text-heading)" }}
                                    >
                                        {selectedProject.title}
                                    </h2>
                                    
                                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                                        <div className="flex items-center gap-3" style={{ color: "var(--theme-text-muted)" }}>
                                            <div className="p-2 rounded-xl transition-colors duration-1000"
                                                style={{ background: isEarth ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--theme-card-border)" }}
                                            >
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--theme-text-subtle)" }}>Year</span>
                                                <span className="text-xs md:text-sm" style={{ color: "var(--theme-text-body)" }}>2024</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3" style={{ color: "var(--theme-text-muted)" }}>
                                            <div className="p-2 rounded-xl transition-colors duration-1000"
                                                style={{ background: isEarth ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--theme-card-border)" }}
                                            >
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--theme-text-subtle)" }}>Role</span>
                                                <span className="text-xs md:text-sm" style={{ color: "var(--theme-text-body)" }}>{selectedProject.role || "Lead Developer"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 flex-grow">
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
                                                style={{ color: "var(--theme-text-subtle)" }}
                                            >
                                                <Code2 className="w-3 h-3" style={{ color: "var(--theme-accent)" }} /> Technology Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech.map((t, idx) => (
                                                    <span key={idx} className="px-2 py-1 rounded-lg text-xs transition-colors duration-1000"
                                                        style={{
                                                            background: isEarth ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                                                            borderWidth: "1px",
                                                            borderStyle: "solid",
                                                            borderColor: "var(--theme-card-border)",
                                                            color: "var(--theme-text-body)",
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-3"
                                                style={{ color: "var(--theme-text-subtle)" }}
                                            >About the project</h4>
                                            <p className="text-sm md:text-base leading-relaxed transition-colors duration-1000"
                                                style={{ color: "var(--theme-text-body)" }}
                                            >
                                                {selectedProject.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-10 pb-2">
                                        {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                            <Link 
                                                href={selectedProject.liveUrl} 
                                                target="_blank"
                                                className={cn(
                                                    "flex-1 flex items-center justify-center gap-2 px-6 py-3 md:py-4 font-bold rounded-xl md:rounded-2xl transition-all active:scale-95 text-sm",
                                                    isEarth
                                                        ? "bg-amber-600 text-white hover:bg-amber-700"
                                                        : "bg-white text-black hover:bg-neutral-200"
                                                )}
                                            >
                                                {selectedProject.liveUrl.endsWith(".apk") ? (
                                                    <><Download className="w-4 h-4 md:w-5 md:h-5" /> Download App</>
                                                ) : (
                                                    <><ExternalLink className="w-4 h-4 md:w-5 md:h-5" /> Live Preview</>
                                                )}
                                            </Link>
                                        )}
                                        <Link 
                                            href={selectedProject.githubUrl} 
                                            target="_blank"
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-2 px-6 py-3 md:py-4 font-bold rounded-xl md:rounded-2xl transition-all active:scale-95 text-sm border",
                                                isEarth
                                                    ? "bg-stone-100 border-stone-200 text-stone-800 hover:bg-stone-200"
                                                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                            )}
                                        >
                                            <Github className="w-4 h-4 md:w-5 md:h-5" /> Source Code
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="mt-20 flex justify-center">
                <Link 
                    href={githubLink} 
                    target="_blank"
                    className={cn(
                        "group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg",
                        isEarth
                            ? "bg-stone-800 text-white shadow-stone-900/20"
                            : "bg-white text-black shadow-white/10"
                    )}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Discover more on GitHub <Github className="h-5 w-5" />
                    </span>
                    <div className={cn(
                        "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300",
                        isEarth ? "bg-stone-700" : "bg-neutral-100"
                    )} />
                </Link>
            </div>
        </div>
    );
}
