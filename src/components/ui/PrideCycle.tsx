"use client";
import React, { useState } from "react";

const FLAGS = [
    { name: "Rainbow", color: "linear-gradient(to bottom, #FF0000 0%, #FF0000 16.6%, #FF8E00 16.6%, #FF8E00 33.3%, #FFF000 33.3%, #FFF000 50%, #008E00 50%, #008E00 66.6%, #00C0C0 66.6%, #00C0C0 83.3%, #400098 83.3%, #400098 100%)" },
    { name: "Progress", color: "linear-gradient(to bottom, #E40303 0%, #E40303 16.6%, #FF8C00 16.6%, #FF8C00 33.3%, #FFED00 33.3%, #FFED00 50%, #008026 50%, #008026 66.6%, #004DFF 66.6%, #004DFF 83.3%, #750787 83.3%, #750787 100%)" },
    { name: "Trans", color: "linear-gradient(to bottom, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%, #F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)" },
    { name: "Bi", color: "linear-gradient(to bottom, #D60270 0%, #D60270 40%, #9B4F96 40%, #9B4F96 60%, #0038A8 60%, #0038A8 100%)" },
    { name: "Pan", color: "linear-gradient(to bottom, #FF218C 0%, #FF218C 33.3%, #FFD800 33.3%, #FFD800 66.6%, #21B1FF 66.6%, #21B1FF 100%)" },
    { name: "Ace", color: "linear-gradient(to bottom, #000000 0%, #000000 25%, #A3A3A3 25%, #A3A3A3 50%, #FFFFFF 50%, #FFFFFF 75%, #800080 75%, #800080 100%)" },
];

export const PrideCycle = () => {
    const [index, setIndex] = useState(0);

    const nextFlag = () => {
        setIndex((prev) => (prev + 1) % FLAGS.length);
    };

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 rounded-full border border-pink-200 dark:border-pink-700/50 cursor-pointer hover:scale-105 transition-transform" onClick={nextFlag}>
            <div 
                className="w-4 h-4 rounded-full border border-pink-300 dark:border-pink-600"
                style={{ background: FLAGS[index].color }}
            />
            <span className="text-pink-700 dark:text-pink-400 font-medium">{FLAGS[index].name}</span>
            <span className="text-[10px] text-pink-500 uppercase font-bold">Click to cycle</span>
        </span>
    );
};
