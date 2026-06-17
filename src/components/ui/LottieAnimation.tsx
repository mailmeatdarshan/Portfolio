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

    useEffect(() => {
        let isMounted = true;
        let anim: any = null;

        // Dynamically import lottie-web on the client side to avoid SSR issues
        import("lottie-web").then((lottieModule) => {
            if (!isMounted) return;
            const lottie = lottieModule.default;
            if (containerRef.current) {
                // Clear any existing contents just in case
                containerRef.current.innerHTML = "";
                anim = lottie.loadAnimation({
                    container: containerRef.current,
                    renderer: "svg",
                    loop,
                    autoplay,
                    path: animationPath,
                });
            }
        });

        return () => {
            isMounted = false;
            if (anim) {
                anim.destroy();
            }
        };
    }, [animationPath, loop, autoplay]);

    return <div ref={containerRef} className={className} />;
};
