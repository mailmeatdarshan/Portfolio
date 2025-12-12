"use client";

import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Projects() {
    return (
        <div className="py-20 px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project) => (
                    <CardContainer key={project.id} className="inter-var w-full">
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                {project.title}
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                {project.description.slice(0, 100)}...
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <div className="relative w-full h-60 rounded-xl group-hover/card:shadow-xl overflow-hidden">
                                    <img /* Using img tag for generic URL, or next/image if configured */
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    />
                                </div>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    href={project.liveUrl}
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Visit Live →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    href={project.githubUrl}
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    GitHub
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </div>
    );
}
