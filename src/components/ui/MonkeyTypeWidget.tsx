"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, RotateCcw, Trophy, Timer, CheckCircle2 } from "lucide-react";

const SENTENCE = "I am a full stack developer who loves building creative web experiences that feel alive.";

export const MonkeyTypeWidget = () => {
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (input.length === 1 && !startTime) {
            setStartTime(Date.now());
        }

        if (input === SENTENCE && startTime && !isFinished) {
            const timeTakenInMinutes = (Date.now() - startTime) / 60000;
            const words = SENTENCE.split(" ").length;
            const calculatedWpm = Math.round(words / timeTakenInMinutes);
            setWpm(calculatedWpm);
            setIsFinished(true);
        }
    }, [input, startTime, isFinished]);

    const handleReset = () => {
        setInput("");
        setStartTime(null);
        setWpm(null);
        setIsFinished(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const isGold = wpm !== null && wpm >= 80;

    return (
        <motion.div 
            className={`w-full max-w-5xl mx-auto rounded-[32px] p-8 md:p-16 shadow-layered transition-all duration-700 border ${
                isGold 
                    ? "bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-600" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center justify-between mb-12">
                <span className="flex items-center gap-3 font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-1000">
                    <Keyboard className="w-6 h-6" /> Type Test
                </span>
                
                <div className="flex items-center gap-6">
                    {wpm !== null && (
                        <span className={`font-mono font-black text-2xl md:text-3xl ${isGold ? "text-amber-600 dark:text-amber-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {wpm} WPM
                        </span>
                    )}
                    <button 
                        onClick={handleReset}
                        className="p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="relative text-2xl md:text-4xl font-mono leading-[1.6] mb-16 tracking-tight min-h-[200px]" onClick={() => inputRef.current?.focus()}>
                {/* Background sentence (ghost text) */}
                <div className="absolute top-0 left-0 w-full text-zinc-300 dark:text-zinc-700 pointer-events-none whitespace-pre-wrap select-none transition-colors duration-1000">
                    {SENTENCE}
                </div>
                
                {/* Typed text */}
                <div className="relative z-10 whitespace-pre-wrap select-none break-words cursor-text pointer-events-none">
                    {input.split("").map((char, i) => {
                        const isCorrect = char === SENTENCE[i];
                        return (
                            <span 
                                key={i} 
                                className={`transition-colors duration-200 ${isCorrect ? "text-zinc-900 dark:text-zinc-100" : "text-red-500 bg-red-100 dark:bg-red-900/30"}`}
                            >
                                {SENTENCE[i] === " " && !isCorrect ? "_" : char}
                            </span>
                        );
                    })}
                    {!isFinished && (
                        <span className="inline-block w-[3px] h-8 bg-amber-500 ml-[1px] align-middle -mt-1 animate-pulse" />
                    )}
                </div>

                {/* Results Overlay */}
                <AnimatePresence>
                    {isFinished && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl"
                        >
                            <div className="text-center space-y-6">
                                <motion.div 
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    className="flex justify-center"
                                >
                                    <div className="p-4 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                                        <Trophy className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </motion.div>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black tracking-tighter uppercase italic text-zinc-900 dark:text-white">Test Complete!</h3>
                                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Your Performance</p>
                                </div>
                                <div className="flex gap-12 justify-center">
                                    <div className="text-center">
                                        <p className="text-5xl font-black text-amber-500 leading-none">{wpm}</p>
                                        <p className="text-[10px] uppercase font-black tracking-widest mt-2 opacity-50 text-zinc-900 dark:text-zinc-100">WPM</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-5xl font-black text-zinc-900 dark:text-zinc-100 leading-none">100%</p>
                                        <p className="text-[10px] uppercase font-black tracking-widest mt-2 opacity-50 text-zinc-900 dark:text-zinc-100">Accuracy</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleReset}
                                    className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                                >
                                    <RotateCcw className="w-4 h-4" /> Try Again
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hidden input field for mobile/desktop support */}
                <input 
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                        if (!isFinished && e.target.value.length <= SENTENCE.length) {
                            setInput(e.target.value);
                        }
                    }}
                    className="absolute inset-0 opacity-0 cursor-text outline-none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
            </div>
            
            <div className="flex justify-center border-t border-zinc-100 dark:border-zinc-800 pt-8 mt-4">
                <span className="text-xs uppercase font-black tracking-[0.2em] text-zinc-400">
                    Target: <span className="text-amber-500">80 WPM</span> for gold status
                </span>
            </div>
        </motion.div>
    );
};
