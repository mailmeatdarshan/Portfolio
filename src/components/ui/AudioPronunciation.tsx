"use client";
import React, { useState } from "react";
import { Volume2 } from "lucide-react";

interface AudioPronunciationProps {
    name: string;
    phonetic: string;
    audioSrc?: string | null;
}

export const AudioPronunciation = ({ name, phonetic, audioSrc }: AudioPronunciationProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {
        if (isPlaying) return;
        
        setIsPlaying(true);
        
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.onended = () => setIsPlaying(false);
            audio.play().catch(() => setIsPlaying(false));
        } else {
            // Fallback to Speech Synthesis for "real" audio
            const utterance = new SpeechSynthesisUtterance(name);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <button 
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-700/50 cursor-pointer hover:scale-105 transition-all shadow-sm active:scale-95 group/audio" 
            onClick={playAudio}
            disabled={isPlaying}
        >
            <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">{phonetic}</span>
            <Volume2 className={`h-4 w-4 text-amber-600 dark:text-amber-300 ${isPlaying ? "animate-bounce" : "group-hover/audio:rotate-12 transition-transform"}`} />
        </button>
    );
};
