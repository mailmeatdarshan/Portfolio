"use client";
import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeProvider";
import { usePathname } from "next/navigation";

const ClippyAssistant = dynamic(() => import("@/components/ClippyAssistant"), { 
    ssr: false 
});

export default function ClientClippy() {
    const { theme } = useTheme();
    const pathname = usePathname();
    
    // Explicitly define where Clippy is allowed
    const isAllowedMode = theme === "earth" || theme === "space" || 
                         theme === "transitioning-to-earth" || 
                         theme === "transitioning-to-space";
    
    const isMainPage = pathname === "/";
    
    // Only render the component if we are on the home page AND in Earth/Space modes
    if (!isMainPage || !isAllowedMode) {
        return null;
    }

    return <ClippyAssistant />;
}
