"use client";
import React from "react";
import { skills } from "@/data/portfolio";
import { motion } from "framer-motion";

const SkillBadge = ({ name, icon, color }: { name: string; icon: string; color: string }) => {
    return (
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors`}>
            <span className="text-xl">{icon}</span>
            <span className="text-neutral-200 font-medium">{name}</span>
        </div>
    );
};

export default function Skills() {
    return (
        <div className="py-20 relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
                Skills & Technologies
            </h2>

            <div className="flex flex-col gap-8">
                {/* Marquee effect 1 */}
                <div className="flex overflow-hidden group">
                    <motion.div
                        className="flex gap-4 animate-scroll whitespace-nowrap min-w-full"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        {[...skills, ...skills].map((skill, idx) => ( // Duplicate for seamless loop
                            <SkillBadge key={`${skill.name}-${idx}`} name={skill.name} icon={skill.icon} color={skill.color} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
