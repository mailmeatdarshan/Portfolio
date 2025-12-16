"use client";
import React from "react";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="py-20 w-full max-w-7xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
                    My World
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto text-center mb-20 bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">About Me</h3>
                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-6 font-light">
                        I’m a computer science student with a strong interest in <span className="text-blue-400 font-medium">web development</span>, <span className="text-yellow-400 font-medium">cloud computing</span>, <span className="text-purple-400 font-medium">automation</span>, and <span className="text-green-400 font-medium">backend development</span>. I enjoy building efficient systems that solve real-world problems. I’m especially passionate about modern technologies and scalable system design.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["#Web Developer", "#Cloud Engineer", "#Backend Specialist", "#Automation Developer"].map((tag, i) => (
                            <span key={i} className="px-4 py-1.5 rounded-full bg-neutral-800 text-sm font-medium text-neutral-400 border border-neutral-700 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* What I Love Section */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
                            What I Love
                        </h3>
                        <div className="space-y-6">
                            {personalInfo.about.whatILove.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group"
                                >
                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-neutral-400">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Masterplan Section */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-8">
                            Masterplan Before 30
                        </h3>
                        <div className="space-y-4">
                            {personalInfo.about.masterplan.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 hover:border-yellow-500/30 transition-colors"
                                >
                                    <span className="text-yellow-500 font-mono text-lg">0{idx + 1}</span>
                                    <p className="text-neutral-300">
                                        {item}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 border-l-4 border-green-500">
                            <p className="font-mono text-green-400">
                                Status: Manifesting on full throttle. All or nothing.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
