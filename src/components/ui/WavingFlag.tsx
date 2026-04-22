"use client";
import React from "react";
import { motion } from "framer-motion";

export const WavingFlag = () => {
    return (
        <div className="relative w-12 h-8 overflow-hidden rounded-sm shadow-md flex flex-col group border border-zinc-200 dark:border-white/10">
            {/* Saffron */}
            <div className="h-1/3 bg-[#FF9933] w-full" />
            {/* White + Ashoka Chakra */}
            <div className="h-1/3 bg-white w-full flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full border-[0.5px] border-[#000080] flex items-center justify-center">
                    <div className="w-[0.5px] h-full bg-[#000080] absolute rotate-0" />
                    <div className="w-[0.5px] h-full bg-[#000080] absolute rotate-45" />
                    <div className="w-[0.5px] h-full bg-[#000080] absolute rotate-90" />
                    <div className="w-[0.5px] h-full bg-[#000080] absolute rotate-135" />
                </div>
            </div>
            {/* Green */}
            <div className="h-1/3 bg-[#138808] w-full" />

            {/* Waving Animation Overlay */}
            <motion.div
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[200%] -skew-x-12"
            />
            
            {/* Subtle shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.1)]" />
        </div>
    );
};
