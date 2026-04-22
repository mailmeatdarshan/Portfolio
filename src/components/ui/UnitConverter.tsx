"use client";
import React, { useState } from "react";

interface UnitConverterProps {
    cm: number;
    ft: number;
    in: number;
}

export const UnitConverter = ({ cm, ft, in: inches }: UnitConverterProps) => {
    const [unit, setUnit] = useState<"metric" | "imperial">("imperial");

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700/50 cursor-pointer hover:scale-105 transition-transform" onClick={() => setUnit(unit === "imperial" ? "metric" : "imperial")}>
            <span className="font-mono text-blue-700 dark:text-blue-400">
                {unit === "imperial" ? `${ft}’${inches}”` : `${cm}cm`}
            </span>
            <span className="text-xs text-blue-500 uppercase font-bold tracking-tighter">
                Click to swap
            </span>
        </span>
    );
};
