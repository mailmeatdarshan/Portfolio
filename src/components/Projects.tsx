"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { projects, socialLinks, Project } from "@/data/portfolio";
import Link from "next/link";
import { Github, ExternalLink, Download, X, Calendar, User, Code2 } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const githubLink = socialLinks.find(link => link.name === "GitHub")?.url || "https://github.com/mailmeatdarshan";

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
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
                    Featured Work
                </h2>
                <p className="text-neutral-400 text-center mt-4 max-w-2xl mx-auto">
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
                    
                    return (
                        <BentoGridItem
                            key={project.id}
                            layoutId={`project-${project.id}`}
                            onClick={() => setSelectedProject(project)}
                            title={<span className="text-xl font-bold">{project.title}</span>}
                            description={project.description}
                            header={
                                <div className="flex flex-[4] w-full h-full min-h-[14rem] rounded-2xl overflow-hidden relative group bg-neutral-100 dark:bg-neutral-800/50">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={cn(
                                            "object-contain transition-all duration-700 will-change-transform",
                                            hoveredIndex === i ? "grayscale-0 scale-100" : "grayscale scale-100"
                                        )}
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
                                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
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
                            className="fixed inset-0 bg-black/90 backdrop-blur-md"
                        />
                        
                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                            className="bg-neutral-900 border border-white/10 w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row will-change-transform"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/60 text-white hover:bg-white/10 transition-colors z-30 backdrop-blur-md border border-white/10"
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            {/* Left: Image Section */}
                            <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative bg-neutral-800/50 shrink-0">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    priority
                                    className="object-contain p-6 md:p-12 drop-shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:hidden" />
                            </div>

                            {/* Right: Content Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto bg-neutral-900 custom-scrollbar">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                            Featured Project
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                    
                                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                                        <div className="flex items-center gap-3 text-neutral-400">
                                            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Year</span>
                                                <span className="text-xs md:text-sm text-neutral-200">2024</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-neutral-400">
                                            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Role</span>
                                                <span className="text-xs md:text-sm text-neutral-200">{selectedProject.role || "Lead Developer"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 flex-grow">
                                        <div>
                                            <h4 className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Code2 className="w-3 h-3 text-blue-500" /> Technology Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech.map((t, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-neutral-300">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-3">About the project</h4>
                                            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                                                {selectedProject.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-10 pb-2">
                                        {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                            <Link 
                                                href={selectedProject.liveUrl} 
                                                target="_blank"
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-white text-black font-bold rounded-xl md:rounded-2xl hover:bg-neutral-200 transition-all active:scale-95 text-sm"
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
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl md:rounded-2xl hover:bg-white/10 transition-all active:scale-95 text-sm"
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
                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Discover more on GitHub <Github className="h-5 w-5" />
                    </span>
                    <div className="absolute inset-0 bg-neutral-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
}
