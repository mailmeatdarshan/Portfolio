"use client";
import React, { useEffect, useState } from "react";
import { Keyboard, Flame, Trophy, Timer, BarChart3 } from "lucide-react";

interface MonkeyTypeResult {
    wpm: number;
    acc: number;
    timestamp: number;
    mode: string;
}

export const MonkeyTypeActivityLog = () => {
    const [activity, setActivity] = useState<{ level: number; date: string, count: number }[]>([]);
    const [stats, setStats] = useState({
        totalTests: 0,
        avgWpm: 0,
        avgAcc: 0,
        bestWpm: 0
    });
    const [loading, setLoading] = useState(true);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const APE_KEY = "NjllOGZiOTZiMzkyZjBiNWM5MGU2MjQ0LmhJZ1NXOXFvOXJLZktXd0gzLUIxU2kyeHBPV3lnMlNn";

    useEffect(() => {
        if (!loading && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [loading, activity]);

    useEffect(() => {
        const fetchMonkeyTypeData = async () => {
            try {
                const response = await fetch("https://api.monkeytype.com/results", {
                    headers: {
                        "Authorization": `ApeKey ${APE_KEY}`
                    }
                });
                const result = await response.json();
                
                if (result && result.data && Array.isArray(result.data)) {
                    const data: MonkeyTypeResult[] = result.data;
                    
                    // Stats calculation from results
                    const total = data.length;
                    const avgWpm = total > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.wpm, 0) / total) : 0;
                    const avgAcc = total > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.acc, 0) / total) : 0;
                    const bestWpm = total > 0 ? Math.max(...data.map(d => d.wpm)) : 0;
                    
                    setStats({
                        totalTests: total,
                        avgWpm,
                        avgAcc,
                        bestWpm
                    });

                    // Activity aggregation (last 52 weeks)
                    const days = 52 * 7;
                    const activityMap: Record<string, number> = {};
                    
                    data.forEach(test => {
                        const ts = test.timestamp > 10000000000 ? test.timestamp : test.timestamp * 1000;
                        const date = new Date(ts);
                        const dateStr = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
                        activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
                    });

                    const activityData = Array.from({ length: days }, (_, i) => {
                        const d = new Date();
                        d.setUTCDate(d.getUTCDate() - (days - 1 - i));
                        const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
                        const count = activityMap[dateStr] || 0;
                        
                        let level = 0;
                        if (count > 0 && count <= 2) level = 1;
                        else if (count > 2 && count <= 5) level = 2;
                        else if (count > 5 && count <= 10) level = 3;
                        else if (count > 10) level = 4;
                        
                        return { level, date: dateStr, count };
                    });

                    setActivity(activityData);
                }
            } catch (error) {
                console.error("Error fetching MonkeyType data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMonkeyTypeData();
    }, []);

    const getLevelColor = (level: number) => {
        const colors = [
            "bg-zinc-100 dark:bg-zinc-800/50",
            "bg-amber-100 dark:bg-amber-900/40",
            "bg-amber-200 dark:bg-amber-800/60",
            "bg-amber-400 dark:bg-amber-600/80",
            "bg-amber-500 dark:bg-amber-500"
        ];
        return colors[level] || colors[0];
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-layered transition-all duration-1000">
            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100">
                            <Keyboard className="h-6 w-6 text-amber-500" />
                            <span className="text-2xl font-black tracking-tight">MonkeyType Activity</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">Daily typing practice consistency</p>
                    </div>
                    <a 
                        href="https://monkeytype.com/profile/im_monkeyman" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-100 dark:border-amber-800/50 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                    >
                        <Flame className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-300">View Full Profile</span>
                    </a>
                </div>

                <div className="relative">
                    <div 
                        ref={scrollRef}
                        className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 custom-scrollbar scroll-smooth"
                    >
                        {loading ? (
                            Array.from({ length: 52 * 7 }).map((_, i) => (
                                <div key={i} className="w-3.5 h-3.5 rounded-sm bg-zinc-100 dark:bg-zinc-800/50 animate-pulse" />
                            ))
                        ) : (
                            activity.map((day, i) => (
                                <div 
                                    key={i} 
                                    className={`w-3.5 h-3.5 rounded-sm transition-colors duration-500 ${getLevelColor(day.level)}`}
                                    title={`${day.date}: ${day.count || 0} tests`}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-2 mb-2 opacity-50 text-zinc-600 dark:text-zinc-400">
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Total Tests</span>
                        </div>
                        <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats.totalTests}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-2 mb-2 opacity-50 text-zinc-600 dark:text-zinc-400">
                            <Trophy className="h-4 w-4" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Best WPM</span>
                        </div>
                        <p className="text-2xl font-black text-amber-500">{stats.bestWpm}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-2 mb-2 opacity-50 text-zinc-600 dark:text-zinc-400">
                            <Timer className="h-4 w-4" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Avg WPM</span>
                        </div>
                        <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats.avgWpm}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-2 mb-2 opacity-50 text-zinc-600 dark:text-zinc-400">
                            <Flame className="h-4 w-4" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Avg Acc</span>
                        </div>
                        <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stats.avgAcc}%</p>
                    </div>
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
