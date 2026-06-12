/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Code2, CheckCircle2, Trophy, Target } from "lucide-react";

const LEETCODE_USERNAME = "Darshan_Dubey";
const API_URL = `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`;

interface Stats {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: number;
}

export const LeetcodeActivityLog = () => {
    const [heatmap, setHeatmap] = useState<{ date: string; count: number }[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("API error");
                const data = await res.json();

                // Parse stats
                setStats({
                    solved: data.totalSolved ?? 0,
                    easy: data.easySolved ?? 0,
                    medium: data.mediumSolved ?? 0,
                    hard: data.hardSolved ?? 0,
                    ranking: data.ranking ?? 0,
                });

                // Parse submission calendar — keys are Unix timestamps at UTC midnight
                const raw = data.submissionCalendar;
                const calendar: Record<string, number> =
                    typeof raw === "string" ? JSON.parse(raw) : raw ?? {};

                // Build exactly 52 weeks (364 days) ending today, all at UTC midnight
                const days: { date: string; count: number }[] = [];
                const todayUtc = new Date();
                todayUtc.setUTCHours(0, 0, 0, 0);

                for (let i = 363; i >= 0; i--) {
                    const d = new Date(todayUtc);
                    d.setUTCDate(todayUtc.getUTCDate() - i);
                    const ts = Math.floor(d.getTime() / 1000).toString();
                    const dateStr = d.toISOString().split("T")[0];
                    days.push({ date: dateStr, count: calendar[ts] ?? 0 });
                }

                setHeatmap(days);
            } catch (err) {
                console.error("LeetCode fetch error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Auto-scroll to rightmost (most recent) column once heatmap loads
    useEffect(() => {
        if (heatmap.length > 0 && gridRef.current) {
            gridRef.current.scrollLeft = gridRef.current.scrollWidth;
        }
    }, [heatmap]);

    // LeetCode's actual green palette (matches their submission heatmap)
    const getColor = (count: number) => {
        if (count === 0) return "bg-zinc-100 dark:bg-[#1a1a1a]";
        if (count === 1) return "bg-emerald-200 dark:bg-[#1e3a2a]";
        if (count <= 3) return "bg-emerald-400 dark:bg-[#216e39]";
        if (count <= 6) return "bg-emerald-500 dark:bg-[#2ea44f]";
        return "bg-emerald-600 dark:bg-[#39d353]";
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-layered transition-colors duration-1000">
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100 transition-colors duration-1000">
                        <Code2 className="h-6 w-6 text-orange-500" />
                        <span className="text-xl font-black tracking-tight">LeetCode Activity</span>
                    </div>
                    <a
                        href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-500 font-mono hover:text-orange-500 transition-colors"
                    >
                        @{LEETCODE_USERNAME}
                    </a>
                </div>

                {/* Heatmap — identical sizing to GitHub heatmap */}
                <div ref={gridRef} className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 custom-scrollbar-lc">
                    {loading ? (
                        Array.from({ length: 364 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-3.5 h-3.5 rounded-sm bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
                            />
                        ))
                    ) : error || heatmap.length === 0 ? (
                        <div className="col-span-full py-10 text-center text-zinc-500 font-medium">
                            Unable to load LeetCode data.
                        </div>
                    ) : (
                        heatmap.map((day, i) => (
                            <div
                                key={i}
                                className={`w-3.5 h-3.5 rounded-sm transition-colors duration-300 ${getColor(day.count)}`}
                                title={`${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                            />
                        ))
                    )}
                </div>

                {/* Stat Cards */}
                {stats && (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                            <div className="mt-1 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Easy</p>
                                <p className="text-sm text-zinc-500 leading-tight mt-1">
                                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{stats.easy}</span> problems solved
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                            <div className="mt-1 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Medium</p>
                                <p className="text-sm text-zinc-500 leading-tight mt-1">
                                    <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">{stats.medium}</span> problems solved
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                            <div className="mt-1 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                <Trophy className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Hard</p>
                                <p className="text-sm text-zinc-500 leading-tight mt-1">
                                    <span className="font-mono text-red-600 dark:text-red-400 font-bold">{stats.hard}</span> problems solved
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer stats bar */}
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 flex justify-around border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-1000">
                <div className="text-center">
                    <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{stats?.solved ?? "—"}</p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Total Solved</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-orange-500">{stats?.medium ?? "—"}</p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Medium</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-red-500">{stats?.hard ?? "—"}</p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Hard</p>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar-lc::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar-lc::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-lc::-webkit-scrollbar-thumb {
                    background: #d4d4d8;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar-lc::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                }
            `}</style>
        </div>
    );
};
