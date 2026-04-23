"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Tv } from "lucide-react";

export const CLIPS = [
    { id: 1, src: "/videos/sitcom/opt/tbbtclip1.mp4", title: "Bazinga!" },
    { id: 2, src: "/videos/sitcom/opt/tbbtclip2.mp4", title: "Anyone in?-No!-Not Yet!" },
    { id: 3, src: "/videos/sitcom/opt/tbbtclip3.mp4", title: "3D Chess Challenge" },
    { id: 4, src: "/videos/sitcom/opt/ttbtclip5.mp4", title: "Sheldon's Final Speech" },
];

export const VideoPlayer = ({ src, title, index }: { src: string, title: string, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.muted = false;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        if (e.name !== "AbortError") {
                            console.error("Sitcom video play failed:", e);
                        }
                    });
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                videoRef.current.muted = true;
            }
        }
    }, [isHovered]);

    return (
        <motion.div 
            className="flex flex-col bg-white dark:bg-zinc-800 p-2 pb-4 rounded-xl shadow-2xl border border-zinc-200 dark:border-white/10 cursor-pointer relative group w-full"
            initial={{ rotate: index % 2 === 0 ? -1 : 1 }}
            whileHover={{ 
                rotate: 0, 
                scale: 1.1,
                zIndex: 50,
                transition: { duration: 0.3 }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* TV Screen Container - Maximize the screen size */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border-[4px] border-[#1a1a1a] group-hover:border-[#333] transition-colors duration-500">
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                />
                
                <AnimatePresence>
                    {!isHovered && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="mt-2 px-1">
                <p className="font-['Caveat',serif] text-base font-bold text-zinc-800 dark:text-zinc-200 truncate">
                    {title}
                </p>
            </div>

            {/* Tape Piece */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/40 backdrop-blur-[1px] rotate-2 border border-amber-200/20 mix-blend-multiply" />
        </motion.div>
    );
};

export const SitcomWidget = () => {
    return (
        <div className="w-full py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
                {CLIPS.map((clip, index) => (
                    <VideoPlayer 
                        key={clip.id} 
                        src={clip.src} 
                        title={clip.title} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );
};
