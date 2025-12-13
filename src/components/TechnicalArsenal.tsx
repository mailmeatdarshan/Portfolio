"use client";
import React from "react";
import { technicalArsenal } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function TechnicalArsenal() {
    return (
        <div className="py-20 w-full max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
                Technical Arsenal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {technicalArsenal.map((category, idx) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors"
                    >
                        <h3 className="text-2xl font-bold text-blue-500 mb-6 border-b border-neutral-800 pb-2">
                            {category.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
