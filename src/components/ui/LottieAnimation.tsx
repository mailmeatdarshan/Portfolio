"use client";

import React, { useEffect, useRef } from "react";

interface LottieAnimationProps {
    animationPath: string;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
    animationPath,
    className = "w-16 h-16 md:w-24 md:h-24",
    loop = true,
    autoplay = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;

        // Dynamically import lottie-web on the client side to avoid SSR issues
        import("lottie-web").then((lottieModule) => {
            if (!isMounted) return;
            const lottie = lottieModule.default;
            if (containerRef.current) {
                // Clear any existing contents just in case
                containerRef.current.innerHTML = "";
                const anim = lottie.loadAnimation({
                    container: containerRef.current,
                    renderer: "svg",
                    loop,
                    autoplay,
                    path: animationPath,
                });
                animRef.current = anim;

                // Stop if autoplay is initially false
                if (!autoplay) {
                    anim.goToAndStop(0, true);
                }
            }
        });

        return () => {
            isMounted = false;
            if (animRef.current) {
                animRef.current.destroy();
                animRef.current = null;
            }
        };
    }, [animationPath, loop]);

    // Reactively play or pause based on autoplay prop
    useEffect(() => {
        if (animRef.current) {
            if (autoplay) {
                animRef.current.play();
            } else {
                animRef.current.goToAndStop(0, true);
            }
        }
    }, [autoplay]);

    return <div ref={containerRef} className={className} />;
};
