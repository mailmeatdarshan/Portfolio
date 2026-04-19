"use client";
import React from "react";
import { technicalArsenal } from "@/data/portfolio";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function TechnicalArsenal() {
    // Flatten skills for the marquee
    const row1 = technicalArsenal
        .filter(cat => cat.category === "Languages" || cat.category === "Frameworks")
        .flatMap(cat => cat.items.map(item => ({ name: item, category: cat.category })));

    const row2 = technicalArsenal
        .filter(cat => cat.category === "Tools" || cat.category === "Skills")
        .flatMap(cat => cat.items.map(item => ({ name: item, category: cat.category })));

    return (
        <div className="py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center transition-colors duration-1000"
                    style={{ color: "var(--theme-text-heading)" }}
                >
                    Technical Arsenal
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center mt-4 max-w-2xl mx-auto transition-colors duration-1000"
                    style={{ color: "var(--theme-text-muted)" }}
                >
                    A collection of technologies and tools I use to bring ideas to life.
                </motion.p>
            </div>

            <div className="flex flex-col gap-8 w-full">
                <InfiniteMovingCards
                    items={row1}
                    direction="right"
                    speed="slow"
                    className="w-full"
                />
                <InfiniteMovingCards
                    items={row2}
                    direction="left"
                    speed="slow"
                    className="w-full"
                />
            </div>
        </div>
    );
}
