import { cn } from "@/lib/utils";

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
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "row-span-1 rounded-3xl group/bento transition-all duration-500 p-3 dark:bg-neutral-900/50 bg-white border border-neutral-200 dark:border-white/[0.05] justify-between flex flex-col gap-3 cursor-pointer overflow-hidden relative",
        isAnyHovered && !isHovered && "blur-[2px] opacity-40 scale-[0.98]",
        isHovered && "scale-[1.01] z-30 shadow-2xl ring-0 border-transparent",
        className
      )}
    >
      {header}
      <div className="hidden md:flex group-hover/bento:translate-x-2 transition duration-200 flex-col px-1 pb-1">
        {icon}
        <div className="font-sans font-bold text-neutral-800 dark:text-neutral-100 mb-1 mt-1">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-400 line-clamp-1">
          {description}
        </div>
      </div>
    </div>
  );
};
