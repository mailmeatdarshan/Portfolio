"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    span?: "col-1" | "col-2" | "col-3" | "row-1" | "row-2";
}

export const BentoCard = ({ children, className, span = "col-1" }: BentoCardProps) => {
    const { isEarth } = useTheme();
    
    const spanClass = {
        "col-1": "md:col-span-1",
        "col-2": "md:col-span-2",
        "col-3": "md:col-span-3",
        "row-1": "md:row-span-1",
        "row-2": "md:row-span-2",
    }[span];

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-[2.5rem] p-8 shadow-layered transition-colors duration-1000 ${spanClass} ${className} ${
                isEarth 
                    ? "bg-white border border-zinc-200" 
                    : "bg-[#1e293b] border border-white/10"
            }`}
        >
            {children}
        </motion.div>
    );
};
