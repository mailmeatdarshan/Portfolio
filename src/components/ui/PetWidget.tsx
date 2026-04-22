"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

export const PetWidget = () => {
    const [pets, setPets] = useState(0);
    const [isPetted, setIsPetted] = useState(false);

    const handlePet = () => {
        setPets(prev => prev + 1);
        setIsPetted(true);
        setTimeout(() => setIsPetted(false), 300);
    };

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-700/50 cursor-pointer hover:scale-105 transition-transform" onClick={handlePet}>
            <span className={`text-xl transition-transform ${isPetted ? "scale-125 rotate-12" : ""}`}>
                🐈
            </span>
            <span className="text-purple-700 dark:text-purple-400 font-medium">Pet the cat</span>
            <span className="flex items-center gap-1 bg-white/50 dark:bg-black/20 px-2 rounded-full text-xs font-bold text-purple-600 dark:text-purple-300">
                <Heart className={`h-3 w-3 fill-current ${isPetted ? "animate-ping" : ""}`} />
                {pets}
            </span>
        </span>
    );
};
