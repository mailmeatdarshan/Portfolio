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
        "row-span-1 group/bento transition-all duration-1000 cursor-pointer relative rounded-3xl",
        isAnyHovered && !isHovered && "blur-[2px] opacity-40 scale-[0.98]",
        isHovered && "scale-[1.01] z-30 shadow-2xl",
        className
      )}
    >
      <RoughCard
        className="w-full h-full p-3 flex flex-col gap-3 justify-between rounded-3xl"
        fillColor={isEarth ? "rgba(255,255,255,0.45)" : "rgba(23,23,23,0.55)"}
        strokeColor={isEarth ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)"}
        roughness={isEarth ? 2.2 : 0}
      >
        {header}
        <div className="hidden md:flex group-hover/bento:translate-x-2 transition duration-200 flex-col px-1 pb-1">
          {icon}
          <div className="font-sans font-bold mb-1 mt-1 transition-colors duration-1000" style={{ color: "var(--theme-text-heading)" }}>
            {title}
          </div>
          <div className="font-sans font-normal text-xs line-clamp-1 transition-colors duration-1000" style={{ color: "var(--theme-text-muted)" }}>
            {description}
          </div>
        </div>
      </RoughCard>
    </motion.div>
  );
};
