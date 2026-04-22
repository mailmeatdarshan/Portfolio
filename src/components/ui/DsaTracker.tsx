"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Flame } from "lucide-react";

export const DsaTracker = () => {
    const [heatmap, setHeatmap] = useState<string[][]>([]);

    useEffect(() => {
        // Generate a heatmap pattern on the client to avoid hydration mismatch
        const weeks = 20;
        const daysPerWeek = 7;
        const data = [];
        
        for (let w = 0; w < weeks; w++) {
            const week = [];
            for (let d = 0; d < daysPerWeek; d++) {
                const rand = Math.random();
                let difficulty = "none";
                
                if (rand > 0.85) difficulty = "hard";
                else if (rand > 0.6) difficulty = "medium";
                else if (rand > 0.3) difficulty = "easy";
                
                week.push(difficulty);
            }
            data.push(week);
        }
        setHeatmap(data);
    }, []);

    const getColor = (diff: string) => {
        switch (diff) {
            case "easy": return "bg-green-400 dark:bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.4)]";
            case "medium": return "bg-yellow-400 dark:bg-yellow-500 shadow-[0_0_8px_rgba(250,204,21,0.4)]";
            case "hard": return "bg-red-500 dark:bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.4)]";
            default: return "bg-zinc-100 dark:bg-zinc-800";
        }
    };

    return (
        <motion.div 
            className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-[32px] p-6 shadow-layered border border-zinc-200 dark:border-zinc-800 transition-colors duration-1000"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block transition-colors duration-1000">DSA Journey</span>
                        <span className="text-xs text-zinc-500">Problem Solving</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full border border-orange-100 dark:border-orange-800/50">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">12 Day Streak</span>
                </div>
            </div>

            <div className="flex gap-1 mb-4 overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950 p-2 border border-zinc-100 dark:border-zinc-800/50 transition-colors duration-1000">
                {heatmap.length > 0 ? (
                    heatmap.map((week, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {week.map((day, j) => (
                                <div 
                                    key={j} 
                                    className={`w-3 h-3 rounded-sm ${getColor(day)} transition-all duration-300 hover:scale-125`}
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    // Placeholder skeleton
                    Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }).map((_, j) => (
                                <div key={j} className="w-3 h-3 rounded-sm bg-zinc-100 dark:bg-zinc-800/50" />
                            ))}
                        </div>
                    ))
                )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> Easy</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Med</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Hard</div>
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">300+ Solved</span>
            </div>
        </motion.div>
    );
};
