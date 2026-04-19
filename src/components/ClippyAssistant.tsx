'use client';

import { useEffect, useRef, useCallback } from 'react';

const SECTION_MESSAGES: Record<string, string> = {
    hero: "Hey! I'm Clippy 📎 Welcome to Darshan's portfolio!",
    about: "Getting to know the man behind the code!",
    experience: "Real-world experience — impressive, right?",
    skills: "Quite the technical arsenal he's got!",
    projects: "Ooh, check out these projects!",
    contact: "Wanna hire Darshan? Go on, send a message!",
};

const IDLE_MESSAGES = [
    "Ohh look, everything’s floating! 🚀",
    "I don’t bite. The UI might, though.",
    "Psst... scroll down, there's more cool stuff!",
    "Need help navigating? Just scroll around!",
    "You've been staring at this portfolio for a while 👀",
    "Scrolling won't make you hire faster 😏",
    "Don't be shy — the contact section is below!",
    "You still here? Hire already! 💼",
    "I'm running out of things to say... unlike Darshan's skills list.",
    "At this point we're basically friends. Just hire him.",
];

const CLICK_MESSAGES = [
    "Oh! Hey there, curious one 👋",
    "Hehe, that tickles! 😄",
    "Yes, I'm real. The paperclip is REAL.",
    "You seem… distracted 😏",
    "I'm not the main feature here… or am I? 🤔",
    "You came here to hire or to click me?",
    "Imagine clicking me instead of hiring this dev 💀",
    "I'll tell the developer you're not serious.",
    "Okay you clearly have too much free time.",
    "That's it. I'm adding you to the 'not serious' list 📋",
    "Fine. Click away. I'll just stand here. Judging. 📎",
    "...you know the contact form is RIGHT THERE, right?",
    "I'm literally begging you. Go check out the projects section.",
    "I was made to help, not to be abused like this 😭",
    "I'm not even getting paid for this... 💸",
];

const DRAG_MESSAGES = [
    "Did you just... move me? Rude. 😤",
    "Oh sure, just drag me around like I'm furniture.",
    "I have feelings you know. Paperclip feelings. 📎",
    "Instead of redecorating, maybe check out the projects?",
    "You're spending more time on me than on the portfolio 💀",
    "Okay interior designer, the contact section is still there.",
    "New location, same you — still not hiring 😏",
    "I'll go wherever you put me. But I won't be happy about it.",
];

const GRAVITY_MESSAGES = [
    "Ohh look they all are floating!",
    "Wait, where did the gravity go?",
    "Gravity has left the chat.",
    "Wheee! Everything is weightless! 🎈",
];

const RESET_MESSAGES = [
    "Took you long enough.",
    "Oh good, reality is back. I was getting concerned.",
    "Back to normal… like you were ever normal.",
    "Nature is healing… from you.",
];

const INTERACTION_MESSAGES = [
    "Careful! You'll break the laws of physics… oh wait. Bold of me to assume you studied them 💀",
    "Stop throwing the developer around! 😤",
    "This says a lot about you. I won’t say what.",
    "Is this your way of 'moving' things forward? 😏",
    "I knew this portfolio was out of this world, but this is excessive.",
    "This is either delightful or deeply concerning.",
    "You really enjoy throwing things, don't you? Therapy might help.",
    "If you spent this much effort on your job, you'd be CEO by now.",
    "Darshan worked hard on this, and you're just... tossing it. Rude.",
    "He trusted you… and this is what you do?",
    "This is either genius… or a bug. I’m choosing genius.",
    "Does throwing 'Full Stack Developer' make you feel powerful? ⚡",
];

const MESSAGE_COOLDOWN_MS = 5000;
const IDLE_FIRST_MS = 12000;   
const IDLE_REPEAT_MS = 18000;  
const ANIMATION_INTERVAL_MS = 20000;
const WELCOME_DELAY_MS = 1500;
const DRAG_THRESHOLD_PX = 20;  

export default function ClippyAssistant() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agentRef = useRef<any>(null);
    const spokenSections = useRef<Set<string>>(new Set());
    const lastMessageTime = useRef<number>(0);
    const idleMessageIndex = useRef<number>(0);
    const clickCount = useRef<number>(0);
    const dragCount = useRef<number>(0);
    const gravityMsgIndex = useRef<number>(0);
    const resetMsgIndex = useRef<number>(0);
    
    const idleFirstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const idleRepeatInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const animationTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const safeSpeakRef = useRef<(text: string, force?: boolean) => void>(() => {});

    const safeSpeak = useCallback((text: string, force = false) => {
        const now = Date.now();
        if (!force && now - lastMessageTime.current < MESSAGE_COOLDOWN_MS) return;
        if (!agentRef.current) return;
        lastMessageTime.current = now;
        agentRef.current.speak(text);
    }, []);

    useEffect(() => {
        safeSpeakRef.current = safeSpeak;
    }, [safeSpeak]);

    // ── Idle loop ──────────────────────────────────────────────────
    const stopIdleLoop = useCallback(() => {
        if (idleFirstTimer.current) { clearTimeout(idleFirstTimer.current); idleFirstTimer.current = null; }
        if (idleRepeatInterval.current) { clearInterval(idleRepeatInterval.current); idleRepeatInterval.current = null; }
    }, []);

    const fireIdleMessage = useCallback(() => {
        const msg = IDLE_MESSAGES[idleMessageIndex.current % IDLE_MESSAGES.length];
        idleMessageIndex.current++;
        safeSpeakRef.current(msg);
        if (agentRef.current) agentRef.current.animate();
    }, []);

    const startIdleLoop = useCallback(() => {
        stopIdleLoop();
        idleFirstTimer.current = setTimeout(() => {
            fireIdleMessage();
            idleRepeatInterval.current = setInterval(() => {
                fireIdleMessage();
            }, IDLE_REPEAT_MS);
        }, IDLE_FIRST_MS);
    }, [stopIdleLoop, fireIdleMessage]);

    const handleActivity = useCallback(() => {
        startIdleLoop();
    }, [startIdleLoop]);

    // ── Click handler ──────────────────────────────────────────────
    const handleClippyClick = useCallback(() => {
        if (!agentRef.current) return;
        const idx = Math.min(clickCount.current, CLICK_MESSAGES.length - 1);
        clickCount.current++;
        safeSpeak(CLICK_MESSAGES[idx], true);
        agentRef.current.animate();
    }, [safeSpeak]);

    const handleClippyClickRef = useRef(handleClippyClick);
    useEffect(() => { handleClippyClickRef.current = handleClippyClick; }, [handleClippyClick]);

    useEffect(() => {
        let mounted = true;

        async function loadClippy() {
            try {
                const { initAgent } = await import('clippyjs');
                const ClippyLoaders = (await import('clippyjs/agents/clippy')).default;

                if (!mounted) return;
                
                // Create a copy of the loaders but override sound to return empty to disable audio
                const noSoundLoaders = {
                    ...ClippyLoaders,
                    sound: () => Promise.resolve({ default: {} })
                };

                const agent = await initAgent(noSoundLoaders);
                if (!mounted) { agent.hide(true, () => {}); return; }

                agentRef.current = agent;
                agent.show(false);

                // Forcing position after showing with a small delay
                setTimeout(() => {
                    if (agent._el) {
                        const el = agent._el as HTMLElement;
                        el.style.position = 'fixed';
                        el.style.bottom = window.innerWidth < 768 ? '40px' : '150px';
                        el.style.right = window.innerWidth < 768 ? '20px' : '40px';
                        el.style.left = 'auto';
                        el.style.top = 'auto';
                        el.style.zIndex = '9999';
                        
                        // Improve image clarity
                        el.style.imageRendering = 'pixelated';
                        // Apply to overlays as well
                        const overlays = el.querySelectorAll('div');
                        overlays.forEach(overlay => {
                            (overlay as HTMLElement).style.imageRendering = 'pixelated';
                        });
                    }
                }, 500);

                if (agent._el) {
                    agent._el.addEventListener('mousedown', () => {
                        handleClippyClickRef.current();
                    }, true);
                }

                // ── Drag detection ─────────────────────────────────────────
                if (agent._el) {
                    let dragStartX = 0;
                    let dragStartY = 0;
                    let isDragging = false;
                    let hasFiredDragMessage = false;

                    const onDragStart = (e: MouseEvent) => {
                        dragStartX = e.clientX;
                        dragStartY = e.clientY;
                        isDragging = true;
                        hasFiredDragMessage = false;
                    };

                    const onDragEnd = (e: MouseEvent) => {
                        if (!isDragging) return;
                        isDragging = false;
                        const dx = e.clientX - dragStartX;
                        const dy = e.clientY - dragStartY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > DRAG_THRESHOLD_PX && !hasFiredDragMessage) {
                            hasFiredDragMessage = true;
                            const idx = dragCount.current % DRAG_MESSAGES.length;
                            dragCount.current++;
                            safeSpeakRef.current(DRAG_MESSAGES[idx], true);
                            if (agentRef.current) agentRef.current.animate();
                        }
                    };

                    agent._el.addEventListener('mousedown', onDragStart);
                    window.addEventListener('mouseup', onDragEnd);

                    (agent._el as HTMLElement & { _dragCleanup?: () => void })._dragCleanup = () => {
                        agent._el.removeEventListener('mousedown', onDragStart);
                        window.removeEventListener('mouseup', onDragEnd);
                    };
                }

                // ── Custom Events for Gravity ──────────────────────────────
                const onZeroGravity = () => {
                    const msg = GRAVITY_MESSAGES[gravityMsgIndex.current % GRAVITY_MESSAGES.length];
                    gravityMsgIndex.current++;
                    safeSpeakRef.current(msg, true);
                    if (agentRef.current) agentRef.current.animate();
                };

                const onResetGravity = () => {
                    const msg = RESET_MESSAGES[resetMsgIndex.current % RESET_MESSAGES.length];
                    resetMsgIndex.current++;
                    safeSpeakRef.current(msg, true);
                    if (agentRef.current) agentRef.current.animate();
                };

                const onPhysicsInteraction = () => {
                    const msg = INTERACTION_MESSAGES[Math.floor(Math.random() * INTERACTION_MESSAGES.length)];
                    safeSpeakRef.current(msg);
                    if (agentRef.current) agentRef.current.animate();
                };

                window.addEventListener('clippy-zero-gravity', onZeroGravity);
                window.addEventListener('clippy-reset-gravity', onResetGravity);
                window.addEventListener('clippy-physics-interaction', onPhysicsInteraction);

                // ── Splash Screen Integration ──────────────────────────────
                const onSplashStarted = () => {
                    if (agentRef.current) agentRef.current.hide(true);
                };

                const onSplashFinished = () => {
                    if (agentRef.current) agentRef.current.show(false);
                };

                window.addEventListener('splash-started', onSplashStarted);
                window.addEventListener('splash-finished', onSplashFinished);

                (agentRef.current as any)._splashCleanup = () => {
                    window.removeEventListener('splash-started', onSplashStarted);
                    window.removeEventListener('splash-finished', onSplashFinished);
                };

                setTimeout(() => {
                    if (!mounted || !agentRef.current) return;
                    // Only speak if not in splash
                    if (!sessionStorage.getItem("hasSeenSplash")) return;
                    safeSpeak(SECTION_MESSAGES.hero);
                    spokenSections.current.add('hero');
                }, WELCOME_DELAY_MS);

                const sectionIds = ['about', 'experience', 'skills', 'projects', 'contact'];
                observerRef.current = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!entry.isIntersecting) return;
                            const id = entry.target.id;
                            if (spokenSections.current.has(id)) return;
                            if (!SECTION_MESSAGES[id]) return;
                            spokenSections.current.add(id);
                            safeSpeakRef.current(SECTION_MESSAGES[id]);
                            if (agentRef.current) agentRef.current.animate();
                        });
                    },
                    { threshold: 0.5 }
                );

                sectionIds.forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) observerRef.current!.observe(el);
                });

                animationTimer.current = setInterval(() => {
                    if (agentRef.current) agentRef.current.animate();
                }, ANIMATION_INTERVAL_MS);

                // Cleanup nested events
                (agentRef.current as any)._customCleanup = () => {
                    window.removeEventListener('clippy-zero-gravity', onZeroGravity);
                    window.removeEventListener('clippy-reset-gravity', onResetGravity);
                    window.removeEventListener('clippy-physics-interaction', onPhysicsInteraction);
                };

            } catch (err) {
                console.error('[ClippyAssistant] Failed to load Clippy:', err);
            }
        }

        loadClippy();

        const activityEvents = ['scroll', 'mousemove', 'click', 'keydown', 'touchstart'];
        activityEvents.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));
        startIdleLoop();

        return () => {
            mounted = false;
            stopIdleLoop();
            if (observerRef.current) observerRef.current.disconnect();
            if (animationTimer.current) clearInterval(animationTimer.current);
            activityEvents.forEach((evt) => window.removeEventListener(evt, handleActivity));
            if (agentRef.current) {
                (agentRef.current as any)._customCleanup?.();
                (agentRef.current._el as any)?._dragCleanup?.();
                agentRef.current.hide(true, () => {});
                agentRef.current = null;
            }
        };
    }, [safeSpeak, startIdleLoop, stopIdleLoop, handleActivity]);

    return null;
}