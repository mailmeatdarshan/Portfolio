"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { socialLinks } from "@/data/portfolio";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Contact() {

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
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-10">
                Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                        <p className="text-neutral-400">
                            I'm always open to discussing new projects, creative ideas or
                            opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors"
                            >
                                {link.icon === "Github" && <Github className="h-5 w-5" />}
                                {link.icon === "Linkedin" && <Linkedin className="h-5 w-5" />}
                                {link.icon === "Mail" && <Mail className="h-5 w-5" />}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Name</label>
                                <Input 
                                    name="name" 
                                    required
                                    placeholder="Darshan Dubey" 
                                    className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Email</label>
                                <Input 
                                    name="email"
                                    type="email" 
                                    required
                                    placeholder="darshan@example.com" 
                                    className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Subject</label>
                            <Input 
                                name="subject"
                                required
                                placeholder="Project Inquiry" 
                                className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Message</label>
                            <Textarea 
                                name="message"
                                required
                                placeholder="Tell me about your project..." 
                                className="min-h-[150px] bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" 
                            />
                        </div>
                        
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
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
                </div>
            </div>
        </div>
    );
}