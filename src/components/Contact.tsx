"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { socialLinks } from "@/data/portfolio";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeProvider";

import { RoughCard } from "./ui/rough-card";

export default function Contact() {
    const { isEarth } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://formspree.io/f/xrbnwggb", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset(); 
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <h2
                className="text-4xl md:text-5xl font-bold text-center mb-10 transition-colors duration-1000"
                style={{ color: "var(--theme-text-heading)" }}
            >
                Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                <div className="flex flex-col justify-center space-y-8 relative z-10">
                    <div>
                        <h3
                            className="text-2xl font-bold mb-4 transition-colors duration-1000"
                            style={{ color: "var(--theme-text-heading)" }}
                        >
                            Let&apos;s Connect
                        </h3>
                        <p
                            className="transition-colors duration-1000"
                            style={{ color: "var(--theme-text-muted)" }}
                        >
                            I&apos;m always open to discussing new projects, creative ideas or
                            opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                className="flex items-center space-x-3 transition-colors duration-500"
                                style={{ color: "var(--theme-text-body)" }}
                            >
                                {link.icon === "Github" && <Github className="h-5 w-5" />}
                                {link.icon === "Linkedin" && <Linkedin className="h-5 w-5" />}
                                {link.icon === "Mail" && <Mail className="h-5 w-5" />}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <RoughCard
                    className="p-8 rounded-2xl relative z-10 shadow-none"
                    fillColor={isEarth ? "rgba(255,255,255,0.4)" : "rgba(23,23,23,0.3)"}
                    strokeColor={isEarth ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.05)"}
                    roughness={isEarth ? 2.2 : 0}
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium transition-colors duration-1000"
                                    style={{ color: "var(--theme-text-body)" }}
                                >
                                    Name
                                </label>
                                <Input 
                                    name="name" 
                                    required
                                    placeholder="Darshan Dubey" 
                                    className="transition-colors duration-1000"
                                    style={{
                                        background: "var(--theme-input-bg)",
                                        borderColor: "var(--theme-input-border)",
                                        color: "var(--theme-input-text)",
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium transition-colors duration-1000"
                                    style={{ color: "var(--theme-text-body)" }}
                                >
                                    Email
                                </label>
                                <Input 
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="darshan@example.com" 
                                    className="transition-colors duration-1000"
                                    style={{
                                        background: "var(--theme-input-bg)",
                                        borderColor: "var(--theme-input-border)",
                                        color: "var(--theme-input-text)",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium transition-colors duration-1000"
                                style={{ color: "var(--theme-text-body)" }}
                            >
                                Subject
                            </label>
                            <Input 
                                name="subject"
                                required
                                placeholder="Project Inquiry" 
                                className="transition-colors duration-1000"
                                style={{
                                    background: "var(--theme-input-bg)",
                                    borderColor: "var(--theme-input-border)",
                                    color: "var(--theme-input-text)",
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium transition-colors duration-1000"
                                style={{ color: "var(--theme-text-body)" }}
                            >
                                Message
                            </label>
                            <Textarea 
                                name="message"
                                required
                                placeholder="Tell me about your project..." 
                                className="min-h-[150px] transition-colors duration-1000"
                                style={{
                                    background: "var(--theme-input-bg)",
                                    borderColor: "var(--theme-input-border)",
                                    color: "var(--theme-input-text)",
                                }}
                            />
                        </div>
                        
                        <Button 
                            className={cn(
                                "w-full text-white transition-colors duration-1000",
                                isEarth
                                    ? "bg-amber-600 hover:bg-amber-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                            )}
                            size="lg"
                            disabled={isSubmitting} 
                        >
                            {isSubmitting ? "Sending..." : "Send Message"} 
                            {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                        </Button>

                        {status === "success" && (
                            <p className="text-green-500 text-center text-sm">Message sent successfully!</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </RoughCard>
            </div>
        </div>
    );
}