"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects, socialLinks } from "@/data/portfolio";
import Link from "next/link";
import { Github, ExternalLink, Download } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { cn } from "@/lib/utils";

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const githubLink = socialLinks.find(link => link.name === "GitHub")?.url || "https://github.com/mailmeatdarshan";

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
    ).filter(Boolean) as typeof projects;

    return (
        <div className="py-20 px-4">
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
                    // 4-column layout logic (no gaps)
                    let layoutClass = "md:col-span-1 md:row-span-1";
                    
                    if (project.title === "MyBhavans") {
                        layoutClass = "md:col-span-2 md:row-span-2"; // 2x2 Large
                    } else if (project.title === "HisabKitab") {
                        layoutClass = "md:col-span-2 md:row-span-1"; // 2x1 Wide
                    } else if (project.title === "Comfy" || project.title === "ShriHariEnterprises") {
                        layoutClass = "md:col-span-2 md:row-span-1"; // 2x1 Wide
                    }
                    
                    return (
                        <BentoGridItem
                            key={project.id}
                            title={<span className="text-xl font-bold">{project.title}</span>}
                            description={project.description}
                            header={
                                <div className="flex flex-[4] w-full h-full min-h-[14rem] rounded-2xl overflow-hidden relative group bg-neutral-100 dark:bg-neutral-800/50">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={cn(
                                            "object-contain transition-all duration-700",
                                            hoveredIndex === i ? "grayscale-0 scale-100" : "grayscale scale-100"
                                        )}
                                    />
                                    <div className={cn(
                                        "absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-6",
                                        hoveredIndex === i ? "opacity-100" : "opacity-0"
                                    )}>
                                        <h3 className="text-white text-xl font-bold md:hidden text-center drop-shadow-lg">
                                            {project.title}
                                        </h3>
                                        <p className="text-neutral-200 text-xs md:hidden text-center line-clamp-3 mb-2 px-2">
                                            {project.description}
                                        </p>
                                        <div className="flex gap-4">
                                            {project.liveUrl && project.liveUrl !== "#" && (
                                                <Link 
                                                    href={project.liveUrl} 
                                                    target="_blank"
                                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 hover:bg-white/40 transition-all hover:scale-110"
                                                >
                                                    {project.liveUrl.endsWith(".apk") ? <Download className="w-6 h-6 text-white" /> : <ExternalLink className="w-6 h-6 text-white" />}
                                                </Link>
                                            )}
                                            <Link 
                                                href={project.githubUrl} 
                                                target="_blank"
                                                className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 hover:bg-white/40 transition-all hover:scale-110"
                                            >
                                                <Github className="w-6 h-6 text-white" />
                                            </Link>
                                        </div>
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
