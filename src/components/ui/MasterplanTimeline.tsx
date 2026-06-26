"use client";

import React, { useState, useEffect, useId } from "react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/contexts/ThemeProvider";

const LOTTIE_MAP: Record<string, string> = {
    "🏡": "/House.json",
    "💰": "/Money.json",
    "🚀": "/rocket.json",
    "🔧": "/building_system.json",
    "✨": "/Design.json",
    "🏔️": "/mountain.json"
};

const SWIPE_THRESHOLD = 40;
const VELOCITY_THRESHOLD = 200;

const EARTH_ROTATIONS = ["-1.5deg", "1deg", "-0.8deg", "1.2deg", "-0.5deg", "0.8deg"];

export const MasterplanTimeline: React.FC = () => {
    const { isEarth } = useTheme();
    const items = personalInfo.about.masterplan;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitPoint, setExitPoint] = useState<{ x: number; y: number; rotate: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isTopHovered, setIsTopHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const activeItems = items.slice(currentIndex);

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
        const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);

        if (dist > SWIPE_THRESHOLD || speed > VELOCITY_THRESHOLD) {
            const vx = info.velocity.x;
            const vy = info.velocity.y;
            const ox = info.offset.x;
            const oy = info.offset.y;

            // Drift direction based on release velocity
            const isRight = vx !== 0 ? vx > 0 : ox > 0;
            const driftX = (vx * 0.3) + (isRight ? 300 : -300);

            const isDown = vy !== 0 ? vy > 0 : oy > 0;
            const driftY = isEarth ? 600 : (vy * 0.3) + (isDown ? 250 : -250);

            const throwRotate = (vx / 6) + (isRight ? 35 : -35);

            setExitPoint({
                x: ox + driftX,
                y: oy + driftY,
                rotate: throwRotate,
            });

            setIsDragging(false);
            setIsTopHovered(false);
            setCurrentIndex((prev) => Math.min(prev + 1, items.length));
            setDragDistance(0);

            // Reset exitPoint after the exit animation completes to resume Lottie playback on the new top card
            setTimeout(() => {
                setExitPoint(null);
            }, isEarth ? 900 : 1200);
        } else {
            setIsDragging(false);
            setDragDistance(0);
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setExitPoint(null);
        setIsDragging(false);
        setIsTopHovered(false);
        setDragDistance(0);
    };

    // ─── Space Mode ───
    if (!isEarth) {
        return (
            <div className="space-y-8">
                <h3
                    className="text-3xl font-bold bg-clip-text text-transparent transition-all duration-1000"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, var(--theme-gradient-text-alt-from), var(--theme-gradient-text-alt-to))",
                    }}
                >
                    Masterplan Before 30
                </h3>

                <div className="flex flex-col items-center gap-6">
                    {/* Outer wrapper — overflow visible for floating cards */}
                    <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl h-[280px] md:h-[380px] lg:h-[420px]" style={{ overflow: "visible" }}>
                        {/* Card Stack */}
                        <div className="absolute inset-0" style={{ zIndex: 5 }}>
                            {currentIndex >= items.length ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                                >
                                    <div className="w-24 h-24 mx-auto mb-4">
                                        <LottieAnimation
                                            animationPath="/rocket.json"
                                            className="w-full h-full"
                                            autoplay={true}
                                        />
                                    </div>
                                    <p className="text-zinc-400 font-medium text-center px-6">
                                        All missions floating in space.
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="mt-2 px-5 py-2 rounded-full text-sm font-medium bg-white/[0.06] border border-white/[0.1] text-zinc-300 hover:bg-white/[0.1] hover:text-white transition-all duration-300"
                                    >
                                        Stack them up again
                                    </button>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {activeItems
                                        .slice(0, 3)
                                        .reverse()
                                        .map((item, reverseIdx) => {
                                            const stackIdx = Math.min(activeItems.length - 1, 2) - reverseIdx;
                                            const globalIdx = currentIndex + stackIdx;
                                            const isTop = stackIdx === 0;

                                            return (
                                                <ThrowCard
                                                    key={globalIdx}
                                                    stackIdx={stackIdx}
                                                    isTop={isTop}
                                                    exitPoint={isTop ? exitPoint : null}
                                                    onDragEnd={isTop ? handleDragEnd : undefined}
                                                    onDragStart={isTop ? () => setIsDragging(true) : undefined}
                                                    onMouseEnter={isTop ? () => setIsTopHovered(true) : undefined}
                                                    onMouseLeave={isTop ? () => setIsTopHovered(false) : undefined}
                                                    cardClassName="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                                                    dragDistance={dragDistance}
                                                    setDragDistance={setDragDistance}
                                                    isSpaceMode={true}
                                                >
                                                    <div className="flex flex-col items-center justify-center h-full px-8 md:px-12 py-10 text-center">
                                                        <motion.div
                                                            className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-5 mx-auto"
                                                            animate={isTop ? { y: [0, -5, 0] } : {}}
                                                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                        >
                                                            {LOTTIE_MAP[item.emoji] ? (
                                                                <LottieAnimation
                                                                    animationPath={LOTTIE_MAP[item.emoji]}
                                                                    className="w-full h-full"
                                                                    autoplay={isTop && !isDragging && !exitPoint && (isMobile || isTopHovered)}
                                                                />
                                                            ) : (
                                                                <span className="text-5xl md:text-6xl">{item.emoji}</span>
                                                            )}
                                                        </motion.div>
                                                        <p className="text-lg md:text-2xl lg:text-3xl text-white/90 font-bold leading-relaxed max-w-xl">
                                                            {item.text}
                                                        </p>
                                                        <span className="mt-5 font-mono text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
                                                            Mission {String(globalIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                                        </span>
                                                    </div>
                                                </ThrowCard>
                                            );
                                        })}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>

                    {currentIndex < items.length && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-zinc-600 text-xs font-mono tracking-wider"
                        >
                            DRAG & THROW
                        </motion.p>
                    )}

                    <div className="flex gap-2">
                        {items.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx < currentIndex
                                        ? "bg-white/40 w-1.5"
                                        : idx === currentIndex
                                        ? "bg-white w-5"
                                        : "bg-white/10 w-1.5"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ─── Earth Mode ───
    return (
        <div className="space-y-8">
            <h3
                className="text-3xl font-bold bg-clip-text text-transparent transition-all duration-1000"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, var(--theme-gradient-text-alt-from), var(--theme-gradient-text-alt-to))",
                }}
            >
                Masterplan Before 30
            </h3>

            <div className="flex flex-col items-center gap-6">
                <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl h-[280px] md:h-[380px] lg:h-[420px]" style={{ overflow: "visible" }}>
                    {/* Card Stack */}
                    <div className="absolute inset-0" style={{ zIndex: 5 }}>
                        {currentIndex >= items.length ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/70 border border-amber-200/40 shadow-md"
                            >
                                <div className="w-24 h-24 mx-auto mb-4">
                                    <LottieAnimation
                                        animationPath="/mountain.json"
                                        className="w-full h-full"
                                        autoplay={true}
                                    />
                                </div>
                                <p
                                    className="text-stone-600 text-center px-6 text-lg"
                                    style={{ fontFamily: "var(--font-handwriting)" }}
                                >
                                    all goals scattered!
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="mt-2 px-5 py-2 rounded-full text-sm bg-amber-100 border border-amber-300/50 text-amber-700 hover:bg-amber-200 transition-all duration-300"
                                    style={{ fontFamily: "var(--font-handwriting)" }}
                                >
                                    stack them up again
                                </button>
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {activeItems
                                    .slice(0, 3)
                                    .reverse()
                                    .map((item, reverseIdx) => {
                                        const stackIdx = Math.min(activeItems.length - 1, 2) - reverseIdx;
                                        const globalIdx = currentIndex + stackIdx;
                                        const isTop = stackIdx === 0;

                                        return (
                                            <ThrowCard
                                                key={globalIdx}
                                                stackIdx={stackIdx}
                                                isTop={isTop}
                                                exitPoint={isTop ? exitPoint : null}
                                                onDragEnd={isTop ? handleDragEnd : undefined}
                                                onDragStart={isTop ? () => setIsDragging(true) : undefined}
                                                onMouseEnter={isTop ? () => setIsTopHovered(true) : undefined}
                                                onMouseLeave={isTop ? () => setIsTopHovered(false) : undefined}
                                                cardClassName="rounded-2xl bg-[#fefcf3] border border-amber-200/40 shadow-md"
                                                stackRotation={isTop ? 0 : parseFloat(EARTH_ROTATIONS[globalIdx % EARTH_ROTATIONS.length])}
                                                dragDistance={dragDistance}
                                                setDragDistance={setDragDistance}
                                                isSpaceMode={false}
                                            >
                                                <div
                                                    className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                                                    style={{
                                                        backgroundImage:
                                                            "repeating-linear-gradient(transparent, transparent 31px, rgba(59,130,246,0.05) 31px, rgba(59,130,246,0.05) 32px)",
                                                        backgroundPosition: "0 16px",
                                                    }}
                                                />
                                                <div className="flex flex-col items-center justify-center h-full px-8 md:px-12 py-10 text-center relative">
                                                    <div className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-5 mx-auto">
                                                        {LOTTIE_MAP[item.emoji] ? (
                                                            <LottieAnimation
                                                                animationPath={LOTTIE_MAP[item.emoji]}
                                                                className="w-full h-full"
                                                                autoplay={isTop && !isDragging && !exitPoint && (isMobile || isTopHovered)}
                                                            />
                                                        ) : (
                                                            <span className="text-5xl md:text-6xl">{item.emoji}</span>
                                                        )}
                                                    </div>
                                                    <p
                                                        className="text-lg md:text-2xl lg:text-3xl text-stone-700 leading-relaxed max-w-xl"
                                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                                    >
                                                        {item.text}
                                                    </p>
                                                    <span
                                                        className="mt-4 text-xs text-amber-500/70"
                                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                                    >
                                                        goal {globalIdx + 1} of {items.length}
                                                    </span>
                                                </div>
                                            </ThrowCard>
                                        );
                                    })}
                            </AnimatePresence>
                        )}
                    </div>
                </div>

                {currentIndex < items.length && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-stone-400 text-sm"
                        style={{ fontFamily: "var(--font-handwriting)" }}
                    >
                        drag & throw
                    </motion.p>
                )}

                <div className="flex gap-2">
                    {items.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx < currentIndex
                                    ? "bg-amber-500/40 w-1.5"
                                    : idx === currentIndex
                                    ? "bg-amber-500 w-5"
                                    : "bg-amber-300/20 w-1.5"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Throwable Card Component ───
function ThrowCard({
    children,
    stackIdx,
    isTop,
    exitPoint,
    onDragEnd,
    onDragStart,
    onMouseEnter,
    onMouseLeave,
    cardClassName,
    stackRotation = 0,
    dragDistance,
    setDragDistance,
    isSpaceMode,
}: {
    children: React.ReactNode;
    stackIdx: number;
    isTop: boolean;
    exitPoint: { x: number; y: number; rotate: number } | null;
    onDragEnd?: (_: unknown, info: PanInfo) => void;
    onDragStart?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    cardClassName: string;
    stackRotation?: number;
    dragDistance: number;
    setDragDistance?: (val: number) => void;
    isSpaceMode: boolean;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateZ = useTransform(x, [-200, 0, 200], [-16, 0, 16]);

    // Drag progress from 0 to 1
    const dragProgress = Math.min(dragDistance / 120, 1);

    // Dynamic targets for state transition interpolation
    const scaleTarget = isTop ? 1.0 : (1 - stackIdx * 0.05) + dragProgress * 0.05;
    const yTarget = isTop ? 0 : (stackIdx * 14) - dragProgress * 14;
    const blurTarget = isTop ? 0 : Math.max(0, (stackIdx * 8) - dragProgress * 8);

    const opacityRange = isSpaceMode
        ? [
            stackIdx === 0 ? 1 : stackIdx === 1 ? 0.02 : 0.0,
            stackIdx <= 1 ? 1 : 0.02
          ]
        : [
            stackIdx === 0 ? 1 : stackIdx === 1 ? 0.85 : 0.7,
            stackIdx <= 1 ? 1 : 0.85
          ];

    const opacityTarget = isTop
        ? 1.0
        : opacityRange[0] + dragProgress * (opacityRange[1] - opacityRange[0]);

    const rotateTarget = isTop ? 0 : stackRotation - dragProgress * (stackRotation * 0.5);

    // Exit values
    const exitX = exitPoint ? exitPoint.x : 0;
    const exitY = exitPoint ? exitPoint.y : 0;
    const exitRotate = exitPoint ? exitPoint.rotate : 0;

    return (
        <motion.div
            className={`absolute inset-0 select-none touch-none overflow-hidden ${cardClassName}`}
            style={{
                zIndex: 10 - stackIdx,
                cursor: isTop ? "grab" : "default",
                x: isTop ? x : undefined,
                y: isTop ? y : undefined,
                rotateZ: isTop ? rotateZ : undefined,
            }}
            initial={false}
            animate={{
                scale: scaleTarget,
                y: isTop ? undefined : yTarget,
                filter: `blur(${blurTarget}px)`,
                opacity: opacityTarget,
                rotateZ: isTop ? undefined : rotateTarget,
            }}
            whileDrag={isTop ? { scale: 1.05, cursor: "grabbing" } : undefined}
            exit={{
                x: exitX,
                y: exitY,
                rotateZ: exitRotate,
                opacity: 0,
                scale: isSpaceMode ? 0.5 : 0.6,
                transition: { duration: isSpaceMode ? 1.2 : 0.9, ease: isSpaceMode ? "easeOut" : "easeIn" }
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            drag={isTop}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragStart={onDragStart}
            onDrag={isTop ? (_, info) => {
                const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
                setDragDistance?.(dist);
            } : undefined}
            onDragEnd={onDragEnd}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </motion.div>
    );
}
