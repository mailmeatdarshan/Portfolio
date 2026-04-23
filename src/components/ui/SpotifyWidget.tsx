"use client";
import React from "react";
import { useTheme } from "@/contexts/ThemeProvider";
import { Music } from "lucide-react";

export const SpotifyWidget = () => {
    const { isEarth } = useTheme();
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div className={`w-full max-w-md mx-auto overflow-hidden rounded-[2rem] border shadow-layered transition-all duration-1000 group hover:scale-[1.02] ${
            isEarth 
                ? "bg-white border-zinc-200" 
                : "bg-[#1e293b] border-white/10"
        }`}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#1DB954] rounded-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <Music className="h-5 w-5 text-black" />
                        </div>
                        <div>
                            <span className="block text-[#1DB954] text-[10px] font-black tracking-[0.2em] uppercase">Spotify</span>
                            <h4 className={`text-lg font-bold leading-tight transition-colors duration-1000 ${
                                isEarth ? "text-zinc-900" : "text-white"
                            }`}>
                                Coding Session
                            </h4>
                        </div>
                    </div>
                    <div className="flex gap-1.5 h-6 items-end pb-1">
                        {[0, 150, 300, 450, 200].map((delay, i) => (
                            <div 
                                key={i}
                                className="w-1.5 bg-[#1DB954] rounded-full animate-bounce" 
                                style={{ 
                                    animationDelay: `${delay}ms`,
                                    height: hasMounted ? `${Math.random() * 60 + 40}%` : "60%"
                                }} 
                            />
                        ))}
                    </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-black/5 dark:bg-black/20 p-2 border border-black/5 dark:border-white/5 shadow-inner">
                    <iframe 
                        data-testid="embed-iframe" 
                        style={{ borderRadius: "12px" }} 
                        src="https://open.spotify.com/embed/playlist/5BTb1k2cP2Nt7nMqbPqMeW?utm_source=generator" 
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="opacity-90 hover:opacity-100 transition-opacity duration-500"
                    ></iframe>
                </div>
            </div>
            
            <div className={`px-6 py-4 flex items-center justify-center gap-2 transition-colors duration-1000 ${
                isEarth ? "bg-zinc-50" : "bg-black/20"
            }`}>
                <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
                <p className={`text-[10px] uppercase font-black tracking-[0.2em] opacity-40 transition-colors duration-1000 ${
                    isEarth ? "text-zinc-900" : "text-white"
                }`}>
                    Now Streaming on Darshan&apos;s Setup
                </p>
            </div>
        </div>
    );
};
