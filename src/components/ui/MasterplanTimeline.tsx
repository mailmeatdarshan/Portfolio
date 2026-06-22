"use client";

import React, { useState, useEffect, useId } from "react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";

const LOTTIE_MAP: Record<string, string> = {
    "🏡": "/House.json",
    "💰": "/Money.json",
    "🚀": "/rocket.json",
    "🔧": "/building_system.json",
    "✨": "/Design.json",
    "🏔️": "/mountain.json"
};
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/contexts/ThemeProvider";

const SWIPE_THRESHOLD = 40;
const VELOCITY_THRESHOLD = 200;

const EARTH_ROTATIONS = ["-1.5deg", "1deg", "-0.8deg", "1.2deg", "-0.5deg", "0.8deg"];

interface ThrownCard {
    item: { text: string; emoji: string };
    globalIdx: number;
    startX: number;
    startY: number;
    throwX: number;
    throwY: number;
    throwRotate: number;
    uid: string;
}

export const MasterplanTimeline: React.FC = () => {
    const { isEarth } = useTheme();
    const items = personalInfo.about.masterplan;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitPoint, setExitPoint] = useState<{ x: number; y: number; rotate: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isTopHovered, setIsTopHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [thrownCards, setThrownCards] = useState<ThrownCard[]>([]);
    const instanceId = useId();

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

            // Direction for the card exit (fast, out of frame)
            const throwX = vx * 2 + ox * 3;
            const throwY = vy * 2 + oy * 3;
            const throwDist = Math.sqrt(throwX ** 2 + throwY ** 2);
            const minDist = 800;
            const exitScale = throwDist < minDist ? minDist / Math.max(throwDist, 1) : 1;
            const exitX = throwX * exitScale;
            const exitY = isEarth ? Math.abs(throwY * exitScale) + 600 : throwY * exitScale;
            const throwRotate = vx / 8;

            // Drift direction from release point
            const driftX = (vx * 0.3) + (ox > 0 ? 120 : -120);
            const driftY = isEarth ? 400 : (vy * 0.3) + (oy > 0 ? 100 : -100);

            const currentItem = items[currentIndex];
            setThrownCards((prev) => [
                ...prev,
                {
                    item: currentItem,
                    globalIdx: currentIndex,
                    startX: ox,
                    startY: oy,
                    throwX: ox + driftX,
                    throwY: isEarth ? oy + driftY : oy + driftY,
                    throwRotate: throwRotate * 0.5,
                    uid: `${instanceId}-${currentIndex}-${Date.now()}`,
                },
            ]);

            // No exitPoint needed — ghost card handles visuals, stack card vanishes instantly
            setIsDragging(false);
            setIsTopHovered(false);
            setCurrentIndex((prev) => Math.min(prev + 1, items.length));
        } else {
            setIsDragging(false);
        }
    };

    const handleReset = () => {
        setThrownCards([]);
        setCurrentIndex(0);
        setExitPoint(null);
        setIsDragging(false);
        setIsTopHovered(false);
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
                    <div className="relative w-full max-w-md h-[280px] md:h-[300px]">
                        {/* Floating thrown cards layer — NOT clipped */}
                        <div className="absolute inset-0 pointer-events-none" style={{ overflow: "visible", zIndex: 1 }}>
                            {thrownCards.map((tc) => (
                                <motion.div
                                    key={tc.uid}
                                    className="absolute rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-[2px]"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        left: 0,
                                        top: 0,
                                    }}
                                    initial={{ x: tc.startX, y: tc.startY, rotate: tc.throwRotate, opacity: 0.75, scale: 1 }}
                                    animate={{
                                        x: [tc.startX, tc.throwX, tc.throwX * 1.6],
                                        y: [tc.startY, tc.throwY, tc.throwY * 1.8],
                                        rotate: [tc.throwRotate, tc.throwRotate + 25, tc.throwRotate + 60],
                                        opacity: [0.7, 0.45, 0],
                                        scale: [0.95, 0.75, 0.5],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "linear",
                                        times: [0, 0.3, 1],
                                    }}
                                >
                                    <div className="flex flex-col items-center justify-center h-full px-4 py-6 text-center">
                                        <div className="w-16 h-16 mb-2 mx-auto">
                                            {LOTTIE_MAP[tc.item.emoji] ? (
                                                <LottieAnimation
                                                    animationPath={LOTTIE_MAP[tc.item.emoji]}
                                                    className="w-full h-full"
                                                    autoplay={true}
                                                />
                                            ) : (
                                                <span className="text-3xl">{tc.item.emoji}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-white/40 max-w-[160px] line-clamp-2">{tc.item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Card Stack — clipped */}
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
                                                    hideContent={!isTop && !isDragging}
                                                >
                                                    <div className="flex flex-col items-center justify-center h-full px-8 md:px-12 py-10 text-center">
                                                        <motion.div
                                                            className="w-28 h-28 md:w-32 md:h-32 mb-5 mx-auto"
                                                            animate={isTop ? { y: [0, -5, 0] } : {}}
                                                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                        >
                                                            {LOTTIE_MAP[item.emoji] ? (
                                                                <LottieAnimation
                                                                    animationPath={LOTTIE_MAP[item.emoji]}
                                                                    className="w-full h-full"
                                                                    autoplay={isMobile || (isTop && isTopHovered)}
                                                                />
                                                            ) : (
                                                                <span className="text-5xl md:text-6xl">{item.emoji}</span>
                                                            )}
                                                        </motion.div>
                                                        <p className="text-lg md:text-xl text-white/90 font-semibold leading-relaxed max-w-xs">
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
                <div className="relative w-full max-w-md h-[280px] md:h-[300px]">
                    {/* Fallen cards layer — NOT clipped, gravity fall */}
                    <div className="absolute inset-0 pointer-events-none" style={{ overflow: "visible", zIndex: 1 }}>
                        {thrownCards.map((tc) => (
                            <motion.div
                                key={tc.uid}
                                className="absolute rounded-2xl bg-[#fefcf3] border border-amber-200/30 shadow-sm"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    left: 0,
                                    top: 0,
                                }}
                                initial={{ x: tc.startX, y: tc.startY, rotate: tc.throwRotate, opacity: 0.8, scale: 1 }}
                                animate={{
                                    x: [tc.startX, tc.throwX * 0.6, tc.throwX],
                                    y: [tc.startY, tc.startY + 200, tc.startY + 550],
                                    rotate: [tc.throwRotate, tc.throwRotate + 18, tc.throwRotate + 40],
                                    opacity: [0.75, 0.5, 0],
                                    scale: [0.95, 0.8, 0.6],
                                }}
                                transition={{
                                    duration: 2.2,
                                    ease: [0.45, 0, 1, 0.5],
                                    times: [0, 0.25, 1],
                                    y: { ease: [0.12, 0, 0.9, 0], duration: 2.2 },
                                }}
                            >
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                                    style={{
                                        backgroundImage:
                                            "repeating-linear-gradient(transparent, transparent 31px, rgba(59,130,246,0.04) 31px, rgba(59,130,246,0.04) 32px)",
                                        backgroundPosition: "0 16px",
                                    }}
                                />
                                <div className="flex flex-col items-center justify-center h-full px-4 py-6 text-center">
                                    <div className="w-16 h-16 mb-2 mx-auto">
                                        {LOTTIE_MAP[tc.item.emoji] ? (
                                            <LottieAnimation
                                                animationPath={LOTTIE_MAP[tc.item.emoji]}
                                                className="w-full h-full"
                                                autoplay={true}
                                            />
                                        ) : (
                                            <span className="text-3xl">{tc.item.emoji}</span>
                                        )}
                                    </div>
                                    <p
                                        className="text-xs text-stone-500 max-w-[160px] line-clamp-2"
                                        style={{ fontFamily: "var(--font-handwriting)" }}
                                    >
                                        {tc.item.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

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
                                                    <div className="w-28 h-28 md:w-32 md:h-32 mb-5 mx-auto">
                                                        {LOTTIE_MAP[item.emoji] ? (
                                                            <LottieAnimation
                                                                animationPath={LOTTIE_MAP[item.emoji]}
                                                                className="w-full h-full"
                                                                autoplay={isMobile || (isTop && isTopHovered)}
                                                            />
                                                        ) : (
                                                            <span className="text-5xl md:text-6xl">{item.emoji}</span>
                                                        )}
                                                    </div>
                                                    <p
                                                        className="text-lg md:text-xl text-stone-700 leading-relaxed max-w-xs"
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
    hideContent = false,
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
    hideContent?: boolean;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateZ = useTransform(x, [-200, 0, 200], [-16, 0, 16]);

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
                scale: 1 - stackIdx * 0.05,
                y: stackIdx * 14,
                rotateZ: stackRotation,
            }}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            drag={isTop}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {!hideContent && children}
        </motion.div>
    );
}
