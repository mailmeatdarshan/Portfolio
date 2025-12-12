"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { socialLinks } from "@/data/portfolio";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Contact() {
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
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Name</label>
                                <Input placeholder="John Doe" className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Email</label>
                                <Input type="email" placeholder="john@example.com" className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Subject</label>
                            <Input placeholder="Project Inquiry" className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Message</label>
                            <Textarea placeholder="Tell me about your project..." className="min-h-[150px] bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600" />
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                            Send Message <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
