"use client";
import React, { useEffect, useState } from "react";
import { Github, GitCommit, GitPullRequest, Star } from "lucide-react";

export const GithubActivityLog = () => {
    const [contributions, setContributions] = useState<{ level: number, date: string, count: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch("https://github-contributions-api.jogruber.de/v4/mailmeatdarshan?y=last");
                const data = await response.json();
                
                if (data && data.contributions) {
                    const mappedData = data.contributions.map((day: any) => ({
                        level: day.level,
                        date: day.date,
                        count: day.count
                    }));
                    setContributions(mappedData);
                }
            } catch (error) {
                console.error("Error fetching GitHub contributions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    const getLevelColor = (level: number) => {
        const colors = [
            "bg-zinc-100 dark:bg-zinc-800/50",
            "bg-emerald-100 dark:bg-emerald-900/40",
            "bg-emerald-300 dark:bg-emerald-800/60",
            "bg-emerald-500 dark:bg-emerald-600/80",
            "bg-emerald-600 dark:bg-emerald-500"
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

                <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
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

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <GitCommit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Commits</p>
                            <p className="text-sm text-zinc-500 leading-tight mt-1">Pushed 12 commits to <span className="font-mono text-[10px]">Chitti-the-Robot</span></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                        <div className="mt-1 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <GitPullRequest className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Pull Requests</p>
                            <p className="text-sm text-zinc-500 leading-tight mt-1">Opened a PR in <span className="font-mono text-[10px]">HisabKitab</span></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-[1.02]">
                        <div className="mt-1 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                            <Star className="h-4 w-4 text-amber-600 dark:text-amber-400 fill-amber-600/20" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Stars</p>
                            <p className="text-sm text-zinc-500 leading-tight mt-1">Starred <span className="font-mono text-[10px]">next.js</span> and others</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 flex justify-around border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-1000">
                <div className="text-center">
                    <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">482</p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Total Contributions</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">14</p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Repositories</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">85</p>
                    <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mt-1">Stars</p>
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
