/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Github, Flame, CalendarDays, TrendingUp } from "lucide-react";

interface Contribution {
    level: number;
    date: string;
    count: number;
}

interface GithubStats {
    total: number;
    thisMonth: number;
    currentStreak: number;
    longestStreak: number;
}

function computeStats(contributions: Contribution[]): GithubStats {
    const total = contributions.reduce((sum, d) => sum + d.count, 0);

    // This month (by current UTC month)
    const now = new Date();
    const monthPrefix = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
    const thisMonth = contributions
        .filter(d => d.date.startsWith(monthPrefix))
        .reduce((sum, d) => sum + d.count, 0);

    // Current streak — walk backwards from today
    let currentStreak = 0;
    const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date));
    for (const day of sorted) {
        if (day.count > 0) currentStreak++;
        else break;
    }

    // Longest streak
    let longest = 0;
    let running = 0;
    for (const day of contributions) {
        if (day.count > 0) {
            running++;
            longest = Math.max(longest, running);
        } else {
            running = 0;
        }
    }

    return { total, thisMonth, currentStreak, longestStreak: longest };
}

export const GithubActivityLog = () => {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [stats, setStats] = useState<GithubStats | null>(null);
    const [loading, setLoading] = useState(true);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch(
                    "https://github-contributions-api.jogruber.de/v4/mailmeatdarshan?y=last"
                );
                const data = await response.json();

                if (data && data.contributions) {
                    const mapped: Contribution[] = data.contributions.map((day: any) => ({
                        level: day.level,
                        date: day.date,
                        count: day.count,
                    }));
                    setContributions(mapped);
                    setStats(computeStats(mapped));
                }
            } catch (error) {
                console.error("Error fetching GitHub contributions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    // Auto-scroll to the rightmost (most recent) column after data loads
    useEffect(() => {
        if (contributions.length > 0 && gridRef.current) {
            gridRef.current.scrollLeft = gridRef.current.scrollWidth;
        }
    }, [contributions]);

    const getLevelColor = (level: number) => {
        const colors = [
            "bg-zinc-100 dark:bg-zinc-800/50",
            "bg-emerald-100 dark:bg-emerald-900/40",
            "bg-emerald-300 dark:bg-emerald-800/60",
            "bg-emerald-500 dark:bg-emerald-600/80",
            "bg-emerald-600 dark:bg-emerald-500",
        ];
        return colors[level] || colors[0];
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-layered transition-colors duration-1000">
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100 transition-colors duration-1000">
                        <Github className="h-6 w-6" />
                        <span className="text-xl font-black tracking-tight">GitHub Activity</span>
                    </div>
                    <a
                        href="https://github.com/mailmeatdarshan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-500 font-mono hover:text-emerald-500 transition-colors"
                    >
                        @mailmeatdarshan
                    </a>
                </div>

                {/* Heatmap */}
                <div ref={gridRef} className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 custom-scrollbar">
                    {loading ? (
                        Array.from({ length: 52 * 7 }).map((_, i) => (
                            <div key={i} className="w-3.5 h-3.5 rounded-sm bg-zinc-100 dark:bg-zinc-800/50 animate-pulse" />
                        ))
                    ) : contributions.length > 0 ? (
                        contributions.map((day, i) => (
                            <div
                                key={i}
                                className={`w-3.5 h-3.5 rounded-sm transition-colors duration-500 ${getLevelColor(day.level)}`}
                                title={`${day.date}: ${day.count} contributions`}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-zinc-500 font-medium">
                            Unable to load GitHub data.
                        </div>
                    )}
                </div>

                {/* Stat Cards — computed from real API data */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">This Month</p>
                            <p className="text-sm text-zinc-500 leading-tight mt-1">
                                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                                    {loading ? "—" : stats?.thisMonth ?? 0}
                                </span>{" "}contributions so far
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                        <div className="mt-1 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                            <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Current Streak</p>
                            <p className="text-sm text-zinc-500 leading-tight mt-1">
                                <span className="font-mono font-bold text-orange-500 dark:text-orange-400">
                                    {loading ? "—" : stats?.currentStreak ?? 0}
                                </span>{" "}consecutive days
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                        <div className="mt-1 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Longest Streak</p>
                            <p className="text-sm text-zinc-500 leading-tight mt-1">
                                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                                    {loading ? "—" : stats?.longestStreak ?? 0}
                                </span>{" "}days best run
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer — real total from API */}
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 flex justify-around border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-1000">
                <div className="text-center">
                    <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                        {loading ? "—" : stats?.total ?? 0}
                    </p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Total Contributions</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-orange-500">
                        {loading ? "—" : stats?.currentStreak ?? 0}
                    </p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Day Streak</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-emerald-500">
                        {loading ? "—" : stats?.thisMonth ?? 0}
                    </p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">This Month</p>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d4d4d8;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                }
            `}</style>
        </div>
    );
};
