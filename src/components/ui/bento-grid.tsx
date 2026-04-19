import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeProvider";
import { RoughCard } from "./rough-card";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[18rem] md:auto-rows-[24rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  isHovered,
  isAnyHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  layoutId,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  isHovered?: boolean;
  isAnyHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  layoutId?: string;
}) => {
  const { isEarth } = useTheme();

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "row-span-1 group/bento transition-all duration-500 cursor-pointer relative",
        isAnyHovered && !isHovered && "blur-[2px] opacity-40 scale-[0.98]",
        isHovered && "scale-[1.01] z-30 shadow-2xl",
        className
      )}
    >
      <RoughCard
        className="w-full h-full p-3 flex flex-col justify-between"
        fillColor={isEarth ? "rgba(255,255,255,0.4)" : "rgba(23,23,23,0.5)"}
        strokeColor={isEarth ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)"}
        roughness={isEarth ? 2 : 0}
      >
        {header}
        <div className="hidden md:flex group-hover/bento:translate-x-2 transition duration-200 flex-col px-1 pb-1 mt-2">
            {icon}
            <div className="font-sans font-bold text-neutral-800 dark:text-neutral-100 mb-1 mt-1">
            {title}
            </div>
            <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-400 line-clamp-1">
            {description}
            </div>
        </div>
      </RoughCard>
    </motion.div>
  );
};
