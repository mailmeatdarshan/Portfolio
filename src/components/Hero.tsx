"use client";
import React from "react";
import { Spotlight } from "./ui/spotlight";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { personalInfo } from "@/data/portfolio";
import { Button } from "./ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    // Flatten the array of strings into a single sentence or cycle them? 
    // The TypewriterEffect component takes an array of words objects to form a sentence.
    // personalInfo.typewriterStrings is an array of phrases.
    // The TypewriterEffect prints them sequentially as one long sentence? 
    // Actually Aceternity TypewriterEffect prints words in a sentence structure.
    // If I want to cycle phrases, I should use a different component (TypewriterEffectSmooth) or just one phrase.
    // Let's use the bio "I craft digital experiences..." or just "Full Stack Developer" + others.

    // Actually, user wants "how many stuff I know". 
    // Let's just use "I am a Full Stack Developer" or similar.
    // Or better, let's just make it dynamic based on the first string for now, or combine them.
    // Aceternity Typewriter is for a sentence. 
    // Let's construct a sentence: "I Build Scalable Web Applications"
    const heroWords = [
        {
            text: "Transforming",
            className: "text-white dark:text-white",
        },
        {
            text: "Ideas",
            className: "text-white dark:text-white",
        },
        {
            text: "into",
            className: "text-white dark:text-white",
        },
        {
            text: "Digital",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "Reality.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];

    return (
        <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    {personalInfo.name} <br />
                    <span className="text-xl md:text-3xl font-normal text-neutral-300">
                        {personalInfo.title}
                    </span>
                </h1>

                <div className="mt-4 text-center text-neutral-300 max-w-lg mx-auto">
                    {personalInfo.bio}
                </div>

                <div className="flex justify-center mt-8">
                    {/* Using Typewriter for a catchy phrase */}
                    <TypewriterEffect words={heroWords} />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full px-8">
                        <Link href="#projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-neutral-600 text-white hover:bg-neutral-800 hover:text-white bg-transparent">
                        <Link href="#contact">
                            Contact Me <Mail className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
