"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { subscribeToEntries, GuestbookEntry } from "@/lib/guestbook";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { BlurReveal } from "@/components/BlurReveal";

export default function GuestbookPreview() {
  const { isEarth } = useTheme();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to all entries, but we'll slice the top 5 for the preview
    const unsubscribe = subscribeToEntries((latestEntries) => {
      setEntries(latestEntries.slice(0, 5));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // HSL avatar color hashing
  const getAvatarColor = (nameStr: string) => {
    let hash = 0;
    const s = nameStr || "Anonymous";
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hues = [200, 220, 240, 260, 280, 300, 320, 340, 10, 35, 145, 165];
    const index = Math.abs(hash) % hues.length;
    return `hsl(${hues[index]}, 65%, 55%)`;
  };

  const getInitials = (nameStr: string) => {
    const parts = (nameStr || "A").trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0][0] || "A").toUpperCase();
  };

  const timeAgo = (timestamp: number) => {
    if (!timestamp) return "Just now";
    const diff = Date.now() - timestamp;
    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (secs < 10) return "Just now";
    if (secs < 60) return `${secs}s ago`;
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  return (
    <div className="py-20 w-full max-w-7xl mx-auto px-4 relative overflow-hidden">
      
      {/* Header section */}
      <div className="mb-16">
        <BlurReveal>
          <h2
            className="text-4xl md:text-5xl font-bold text-center transition-colors duration-1000"
            style={{ color: "var(--theme-text-heading)" }}
          >
            Guestbook
          </h2>
        </BlurReveal>
        <BlurReveal delay={0.1}>
          <p 
            className="text-center mt-4 max-w-2xl mx-auto transition-colors duration-1000"
            style={{ color: "var(--theme-text-muted)" }}
          >
            What visitors and friends are saying about my work and journey.
          </p>
        </BlurReveal>
      </div>

      {/* Main Preview Slider/Row */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className={`w-6 h-6 border-b-2 rounded-full animate-spin ${
            isEarth ? "border-amber-600" : "border-blue-500"
          }`} />
        </div>
      ) : entries.length === 0 ? (
        <div className={`max-w-xl mx-auto p-8 text-center rounded-[2rem] border ${
          isEarth ? "bg-white/40 border-stone-200/50" : "bg-white/[0.01] border-white/5"
        }`}>
          <p className={`text-sm ${isEarth ? "font-handwriting text-base text-stone-500" : "text-zinc-500"}`}>
            No messages received yet. Be the first to transmit one!
          </p>
        </div>
      ) : (
        <div className="relative w-full max-w-2xl mx-auto py-4">
          {/* Vertical flex list container */}
          <div className="flex flex-col gap-6 w-full">
            {entries.map((entry, idx) => {
              const isRight = idx % 2 === 1;
              const rotation = isEarth 
                ? (idx % 2 === 0 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]") 
                : "";

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`flex items-end gap-3 max-w-[85%] md:max-w-[75%] ${
                    isRight ? "self-end flex-row-reverse" : "self-start flex-row"
                  }`}
                >
                  {/* Initials Avatar */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner flex-shrink-0 select-none"
                    style={{ backgroundColor: getAvatarColor(entry.name) }}
                  >
                    {getInitials(entry.name)}
                  </div>

                  {/* Bubble Container */}
                  <div className={`p-4 rounded-2xl relative overflow-hidden transition-all duration-300 ${rotation} ${
                    isRight 
                      ? (isEarth ? "bg-amber-100/90 border border-amber-200/55 rounded-tr-none shadow-sm" : "bg-blue-600/[0.08] border border-blue-500/15 backdrop-blur-md rounded-tr-none shadow-lg")
                      : (isEarth ? "bg-yellow-50/95 border border-amber-200/60 rounded-tl-none shadow-sm" : "bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-tl-none shadow-lg")
                  }`}>
                    {/* Notebook line pattern for earth mode */}
                    {isEarth && (
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-red-400/10" />
                    )}

                    <div className="flex flex-col gap-1 min-w-0">
                      <div className={`flex items-center gap-2 flex-wrap ${isRight ? "justify-end" : "justify-start"}`}>
                        <span className={`text-xs font-bold truncate ${
                          isEarth ? "font-sans text-stone-850" : "text-white"
                        }`}>
                          {entry.name}
                        </span>
                        {(entry as any).handle && (
                          <span className={`text-[10px] truncate font-mono ${
                            isEarth ? "text-stone-400" : "text-zinc-500"
                          }`}>
                            {(entry as any).handle}
                          </span>
                        )}
                        <span className={`text-[9px] font-mono flex-shrink-0 opacity-70 ${
                          isEarth ? "text-stone-400" : "text-zinc-500"
                        }`}>
                          {timeAgo(entry.createdAt)}
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed break-words whitespace-pre-wrap ${
                        isEarth ? "font-handwriting text-sm text-stone-700" : "text-zinc-300"
                      }`}>
                        {entry.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sign Guestbook CTA */}
      <div className="flex justify-center mt-6">
        <Link 
          href="/guestbook"
          className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wide px-6 py-3 rounded-full border transition-all duration-300 active:scale-95 hover:scale-105 ${
            isEarth 
              ? "bg-amber-600 border-amber-600/20 text-white hover:bg-amber-700 shadow-md hover:shadow-lg" 
              : "bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          }`}
        >
          <MessageSquare className="w-4.5 h-4.5" />
          <span>Say Hello</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </Link>
      </div>

    </div>
  );
}
