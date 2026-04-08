"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    category?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[180px] max-w-full relative rounded-2xl border border-neutral-800 px-8 py-6 md:w-[220px] bg-neutral-900/50 hover:bg-neutral-800/80 transition-all duration-300 group overflow-hidden"
            key={item.name}
          >
            {/* Background Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-20 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                 <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  {item.category}
                </span>
              </div>
              <span className="text-xl leading-[1.6] text-white font-bold text-center tracking-tight">
                {item.name}
              </span>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </li>
        ))}
      </ul>
    </div>
  );
};
