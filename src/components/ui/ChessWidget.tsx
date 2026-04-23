"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Trophy, RefreshCw } from "lucide-react";

// Load the entire wrapper only on the client
const ChessBoardWrapper = dynamic(() => import("./ChessBoardWrapper"), { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 w-full h-full rounded-lg" />
});

export const ChessWidget = () => {
    const [status, setStatus] = useState("White's turn");
    const [key, setKey] = useState(0);

    const resetGame = () => {
        setKey(prev => prev + 1);
        setStatus("White's turn");
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <motion.div 
                className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 shadow-layered border border-zinc-200 dark:border-zinc-800"
                whileHover={{ y: -5 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-500" /> Free Play
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">{status}</span>
                    </div>
                    <button 
                        onClick={resetGame}
                        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-all active:scale-90"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-inner border-4 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 aspect-square flex items-center justify-center">
                    <ChessBoardWrapper key={key} onStatusChange={setStatus} />
                </div>
                
                <div className="mt-4 flex justify-center">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400">
                        Analyzing like a Grandmaster
                    </span>
                </div>
            </motion.div>
        </div>
    );
};
