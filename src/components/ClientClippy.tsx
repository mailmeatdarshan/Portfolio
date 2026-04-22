"use client";
import dynamic from "next/dynamic";

const ClippyAssistant = dynamic(() => import("@/components/ClippyAssistant"), { 
    ssr: false 
});

export default function ClientClippy() {
    return <ClippyAssistant />;
}
