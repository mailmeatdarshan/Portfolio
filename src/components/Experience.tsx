"use client";
import React from "react";
import { education, experience } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function Experience() {
    return (
        <div className="py-20 w-full max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">
                Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Experience Section */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-sm">💼</span>
                        Experience
                    </h3>
                    <div className="space-y-8 pl-4 border-l-2 border-neutral-800">
                        {experience.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8"
                            >
                                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-black bg-blue-500" />
                                <div className="space-y-2">
                                    <span className="text-sm text-blue-400 font-mono">{item.duration}</span>
                                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                    <h5 className="text-lg text-neutral-400">{item.company}</h5>
                                    <p className="text-sm text-neutral-500 mb-4">{item.location}</p>
                                    <ul className="list-disc list-inside space-y-1 text-neutral-300">
                                        {item.description.map((desc, i) => (
                                            <li key={i} className="text-sm leading-relaxed text-neutral-400">
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-sm">🎓</span>
                        Education
                    </h3>
                    <div className="space-y-8 pl-4 border-l-2 border-neutral-800">
                        {education.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8"
                            >
                                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-black bg-purple-500" />
                                <div className="space-y-2">
                                    <span className="text-sm text-purple-400 font-mono">{item.duration}</span>
                                    <h4 className="text-xl font-bold text-white">{item.institution}</h4>
                                    <h5 className="text-lg text-neutral-400">{item.degree}</h5>
                                    <p className="text-sm text-neutral-500">{item.location}</p>
                                    {item.grade && (
                                        <p className="text-sm text-yellow-500 mt-2 font-medium">
                                            {item.grade}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Download Resume Button */}
            <div className="flex justify-center mt-16">
                {/* Manually styled button since I don't want to import Button component if not needed, 
                    but easier to just use Button if I knew where it was. 
                    I'll use a standard HTML/Tailwind button to avoid import issues or just match the style. 
                    Actually, I'll match the Hero button style.
                 */}
                <a
                    href="https://drive.google.com/uc?export=download&id=1WPCzCoJktoxk5GtOdkbn1G22OCSyL0xL"
                    download="Darshan_Dubey_Resume.pdf"
                    className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-slate-900">
                        Download Resume 📄
                    </span>
                </a>
            </div>
        </div>
    );
}
