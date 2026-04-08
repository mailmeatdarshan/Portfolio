"use client";
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Spotlight } from "./ui/spotlight";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { personalInfo } from "@/data/portfolio";
import { Button } from "./ui/button";
import { ArrowRight, Orbit, RotateCcw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PhysicsBody {
    body: Matter.Body;
    element: HTMLElement;
    initialX: number;
    initialY: number;
}

const CATEGORY_DEFAULT = 0x0001;
const CATEGORY_BUTTONS = 0x0002;

export default function GravityHero() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const interactionRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const requestRef = useRef<number | null>(null);
    const [isPhysicsEnabled, setIsPhysicsEnabled] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    
    const isEnabledRef = useRef(false);

    const nameFirstRef = useRef<HTMLSpanElement>(null);
    const nameLastRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const typewriterRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const bodiesRef = useRef<PhysicsBody[]>([]);

    const heroWords = [
        { text: "Transforming", className: "text-white" },
        { text: "Ideas", className: "text-white" },
        { text: "into", className: "text-white" },
        { text: "Digital", className: "text-blue-500" },
        { text: "Reality.", className: "text-blue-500" },
    ];

    useEffect(() => {
        if (isPhysicsEnabled) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isPhysicsEnabled]);

    const togglePhysics = (e?: React.MouseEvent | React.TouchEvent) => {
        if (e) {
            e.stopPropagation();
        }
        if (!engineRef.current) return;
        
        if (isEnabledRef.current) {
            setIsPhysicsEnabled(false);
            isEnabledRef.current = false;
            
            bodiesRef.current.forEach(({ element }) => {
                element.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                element.style.transform = 'translate3d(0, 0, 0) rotate(0rad)';
            });

            // Notify Clippy of Reset
            window.dispatchEvent(new CustomEvent('clippy-reset-gravity'));

            setTimeout(() => {
                bodiesRef.current.forEach(({ element }) => {
                    element.style.transition = '';
                });
            }, 1200);
        } else {
            bodiesRef.current.forEach(({ body, initialX, initialY }) => {
                Matter.Body.setPosition(body, { x: initialX, y: initialY });
                Matter.Body.setAngle(body, 0);
                Matter.Body.setVelocity(body, { 
                    x: (Math.random() - 0.5) * 0.5, 
                    y: -Math.random() * 1.0 - 0.5
                });
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
            });
            setIsPhysicsEnabled(true);
            isEnabledRef.current = true;
            setHasStarted(true);

            // Notify Clippy of Launch
            window.dispatchEvent(new CustomEvent('clippy-zero-gravity'));
        }
    };

    useEffect(() => {
        if (!sceneRef.current || !interactionRef.current) return;

        const Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            Events = Matter.Events,
            MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create();
        engineRef.current = engine;
        engine.gravity.y = 0;
        engine.gravity.scale = 0;

        const containerRect = sceneRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        const ground = Bodies.rectangle(width / 2, height + 100, width * 2, 200, { isStatic: true });
        const leftWall = Bodies.rectangle(-100, height / 2, 200, height * 2, { isStatic: true });
        const rightWall = Bodies.rectangle(width + 100, height / 2, 200, height * 2, { isStatic: true });
        const ceiling = Bodies.rectangle(width / 2, -100, width * 2, 200, { isStatic: true });

        World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        const mouse = Mouse.create(interactionRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            collisionFilter: {
                mask: CATEGORY_DEFAULT
            },
            constraint: {
                stiffness: 0.1,
                render: { visible: false }
            }
        });
        World.add(engine.world, mouseConstraint);

        const initPhysics = () => {
            if (!sceneRef.current) return;
            
            const elements = [
                { ref: nameFirstRef, id: 'name' },
                { ref: nameLastRef, id: 'name' },
                { ref: titleRef, id: 'title' },
                { ref: bioRef, id: 'bio' },
                { ref: typewriterRef, id: 'typewriter' },
                { ref: buttonsRef, id: 'buttons' }
            ];

            const container = sceneRef.current.getBoundingClientRect();

            elements.forEach(({ ref, id }) => {
                const el = ref.current;
                if (!el) return;
                
                const rect = el.getBoundingClientRect();
                const initialX = rect.left - container.left + rect.width / 2;
                const initialY = rect.top - container.top + rect.height / 2;

                const body = Bodies.rectangle(initialX, initialY, rect.width, rect.height, {
                    restitution: 0.7,
                    frictionAir: 0.03,
                    friction: 0.01,
                    chamfer: { radius: 10 },
                    collisionFilter: {
                        category: id === 'buttons' ? CATEGORY_BUTTONS : CATEGORY_DEFAULT
                    }
                });

                el.style.display = el.tagName === 'SPAN' ? 'inline-block' : el.style.display;
                el.style.willChange = 'transform';
                el.style.cursor = id === 'buttons' ? 'default' : 'grab';

                if (id !== 'buttons') {
                    el.addEventListener('mousedown', () => {
                        if (isEnabledRef.current) {
                            window.dispatchEvent(new CustomEvent('clippy-physics-interaction'));
                        }
                    });
                    // Touch support for interaction
                    el.addEventListener('touchstart', () => {
                        if (isEnabledRef.current) {
                            window.dispatchEvent(new CustomEvent('clippy-physics-interaction'));
                        }
                    }, { passive: true });
                }

                bodiesRef.current.push({ body, element: el, initialX, initialY });
                World.add(engine.world, body);
            });

            bodiesRef.current.forEach(({ body }) => {
                Matter.Body.setVelocity(body, { 
                    x: (Math.random() - 0.5) * 0.4, 
                    y: -Math.random() * 1.2 - 0.8 
                });
            });

            setHasStarted(true);
            setIsPhysicsEnabled(true);
            isEnabledRef.current = true;

            // Notify Clippy of Initial Launch
            window.dispatchEvent(new CustomEvent('clippy-zero-gravity'));
        };

        const timer = setTimeout(initPhysics, 6500);

        Events.on(engine, 'beforeUpdate', () => {
            if (isEnabledRef.current) {
                bodiesRef.current.forEach(({ body }) => {
                    Matter.Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.0002,
                        y: (Math.random() - 0.5) * 0.0002 - 0.0001
                    });

                    const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
                    if (speed < 0.2) {
                        Matter.Body.setVelocity(body, {
                            x: body.velocity.x + (Math.random() - 0.5) * 0.1,
                            y: body.velocity.y + (Math.random() - 0.5) * 0.1
                        });
                    }
                });
            }
        });

        const update = () => {
            if (engineRef.current && isEnabledRef.current) {
                Engine.update(engineRef.current);
                bodiesRef.current.forEach(({ body, element, initialX, initialY }) => {
                    const { x, y } = body.position;
                    const angle = body.angle;
                    const dx = x - initialX;
                    const dy = y - initialY;
                    element.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${angle}rad)`;
                });
            }
            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);

        return () => {
            clearTimeout(timer);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            World.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, []);

    useEffect(() => {
        const handleToggle = () => togglePhysics();
        window.addEventListener('clippy-toggle-gravity', handleToggle);
        return () => window.removeEventListener('clippy-toggle-gravity', handleToggle);
    }, [togglePhysics]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('clippy-gravity-state', { 
            detail: { isEnabled: isPhysicsEnabled } 
        }));
    }, [isPhysicsEnabled]);

    const nameParts = personalInfo.name.split(" ");

    return (
        <div 
            ref={sceneRef}
            className="h-screen w-full flex items-center justify-center bg-transparent antialiased relative overflow-hidden select-none"
        >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Interaction Layer for Matter.js */}
            <div 
                ref={interactionRef}
                className={cn(
                    "absolute inset-0 z-20",
                    isPhysicsEnabled ? "pointer-events-auto touch-none" : "pointer-events-none"
                )}
            />
            
            {hasStarted && (
                <button
                    onClick={(e) => togglePhysics(e)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="hidden md:flex absolute bottom-10 right-10 z-[70] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all duration-500 group items-center text-white/70 hover:text-white pointer-events-auto shadow-xl overflow-hidden w-14 hover:w-52 h-14 justify-center px-4"
                >
                    <div className="flex items-center justify-center gap-0 group-hover:gap-3 transition-all duration-500 w-full">
                        {isPhysicsEnabled ? (
                            <>
                                <RotateCcw className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform shrink-0" />
                                <span className="max-w-0 group-hover:max-w-xs overflow-hidden text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">Reset Layout</span>
                            </>
                        ) : (
                            <>
                                <Orbit className="w-6 h-6 group-hover:rotate-[180deg] transition-transform duration-700 shrink-0" />
                                <span className="max-w-0 group-hover:max-w-xs overflow-hidden text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">Start Floating</span>
                            </>
                        )}
                    </div>
                </button>
            )}
            
            <div 
                className={cn(
                    "p-4 max-w-7xl mx-auto relative z-10 w-full pt-0 flex flex-col items-center transition-all duration-700",
                    isPhysicsEnabled ? "opacity-100" : "opacity-100"
                )}
            >
                <h1 className="text-4xl md:text-7xl font-bold text-center pointer-events-none leading-tight">
                    <span 
                        ref={nameFirstRef} 
                        className="inline-block pointer-events-auto mr-2 md:mr-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        {nameParts[0]}
                    </span>
                    <span 
                        ref={nameLastRef} 
                        className="inline-block pointer-events-auto bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        {nameParts[1]}
                    </span>
                    <br />
                    <span 
                        ref={titleRef}
                        className="text-xl md:text-3xl font-normal text-neutral-300 inline-block pointer-events-auto mt-2"
                    >
                        {personalInfo.title}
                    </span>
                </h1>

                <div 
                    ref={bioRef}
                    className="mt-6 text-center text-neutral-300 max-w-lg mx-auto pointer-events-auto leading-relaxed"
                >
                    {personalInfo.bio}
                </div>

                <div 
                    ref={typewriterRef}
                    className="flex justify-center mt-8 pointer-events-auto min-h-[40px]"
                >
                    <TypewriterEffect words={heroWords} />
                </div>

                <div 
                    ref={buttonsRef}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10 pointer-events-auto"
                >
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full px-8">
                        <Link href="#projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-neutral-600 text-white hover:bg-neutral-800 hover:text-white bg-transparent">
                        <Link href="#contact">
                            Contact Me
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
