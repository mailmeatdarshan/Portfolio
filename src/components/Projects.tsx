"use client";

import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Projects() {
    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);

    return (
        <div className="py-20 px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Featured Project - Spans full width */}
                <CardContainer
                    key={featuredProject.id}
                    containerClassName="py-0 col-span-1 md:col-span-2 lg:col-span-3 w-full h-full"
                    className="w-full h-full"
                >
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col lg:flex-row gap-8">

                        <CardItem translateZ="100" className="w-full lg:w-[65%] h-64 lg:h-[28rem] relative rounded-xl overflow-hidden">
                            <Image
                                src={featuredProject.image}
                                alt={featuredProject.title}
                                fill
                                className="object-cover rounded-xl group-hover/card:shadow-xl transform transition-transform duration-500 hover:scale-105"
                            />
                        </CardItem>

                        <div className="flex flex-col justify-between w-full lg:w-[35%] py-4">
                            <div>
                                <CardItem
                                    translateZ="50"
                                    className="text-4xl font-bold text-neutral-600 dark:text-white leading-tight"
                                >
                                    {featuredProject.title}
                                </CardItem>

                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-lg mt-6 dark:text-neutral-300 leading-relaxed"
                                >
                                    {featuredProject.description}
                                </CardItem>
                            </div>

                            <div className="mt-8">
                                <CardItem translateZ="80" className="w-full mb-8">
                                    <div className="flex flex-wrap gap-2">
                                        {featuredProject.tech.map((t, i) => (
                                            <span key={i} className="text-sm px-3 py-1 bg-neutral-900 rounded-lg text-neutral-400 border border-neutral-800">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </CardItem>

                                <div className="flex justify-between items-center gap-4">
                                    <CardItem
                                        translateZ={20}
                                        as={Link}
                                        href={featuredProject.liveUrl}
                                        target="_blank"
                                        className="flex-1 px-4 py-3 rounded-xl text-center text-sm font-normal dark:text-white hover:text-blue-400 transition-colors border border-transparent hover:border-neutral-700"
                                    >
                                        Visit Live →
                                    </CardItem>
                                    <CardItem
                                        translateZ={20}
                                        as={Link}
                                        href={featuredProject.githubUrl}
                                        target="_blank"
                                        className="flex-1 px-4 py-3 rounded-xl bg-black dark:bg-white dark:text-black text-white text-sm font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-center"
                                    >
                                        GitHub
                                    </CardItem>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                {/* Other Projects */}
                {otherProjects.map((project) => (
                    <CardContainer key={project.id} className="inter-var w-full h-full">
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                {project.title}
                            </CardItem>

                            {project.role && (
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-blue-500 text-xs font-semibold mt-1"
                                >
                                    {project.role}
                                </CardItem>
                            )}

                            <CardItem
                                as="div"
                                translateZ="60"
                                className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 flex-grow h-24 overflow-y-auto"
                            >
                                {project.description}
                            </CardItem>

                            <CardItem translateZ="100" className="w-full mt-4">
                                <div className="relative w-full h-48 rounded-xl group-hover/card:shadow-xl overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover rounded-xl group-hover/card:shadow-xl"
                                    />
                                </div>
                            </CardItem>

                            <CardItem translateZ="80" className="w-full mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 bg-neutral-900 rounded-lg text-neutral-400 border border-neutral-800">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </CardItem>

                            <div className="flex justify-between items-center mt-8">
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:text-blue-400 transition-colors"
                                >
                                    Visit Live →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-neutral-200 transition-colors"
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
