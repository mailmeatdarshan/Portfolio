'use client';

import { useEffect, useRef, useCallback } from 'react';

// ─── Section Messages ─────────────────────────────────────────────
const SECTION_MESSAGES: Record<string, string> = {
    hero: "Hey! I'm Clippy 📎 Welcome to Darshan's portfolio!",
    about: "Getting to know the man behind the code!",
    experience: "Real-world experience — impressive, right?",
    skills: "Quite the technical arsenal he's got!",
    projects: "Ooh, check out these projects!",
    contact: "Wanna hire Darshan? Go on, send a message!",
};

// ─── Idle Messages (escalating sass) ──────────────────────────────
const IDLE_MESSAGES = [
    "Psst... scroll down, there's more cool stuff!",
    "Need help navigating? Just scroll around!",
    "You've been staring at this portfolio for a while 👀",
    "Scrolling won't make you hire faster 😏",
    "Don't be shy — the contact section is below!",
    "You still here? Hire already! 💼",
    "I'm running out of things to say... unlike Darshan's skills list.",
    "At this point we're basically friends. Just hire him.",
];

// ─── Click Messages (escalating roast) ────────────────────────────
// Ordered: curious → suspicious → mild roasting
const CLICK_MESSAGES = [
    // Phase 1: Friendly & curious
    "Oh! Hey there, curious one 👋",
    "Hehe, that tickles! 😄",
    "Yes, I'm real. The paperclip is REAL.",
    // Phase 2: Getting suspicious
    "You seem… distracted 😏",
    "I'm not the main feature here… or am I? 🤔",
    "You came here to hire or to click me?",
    // Phase 3: Mild roasting
    "Imagine clicking me instead of hiring this dev 💀",
    "I'll tell the developer you're not serious.",
    "Okay you clearly have too much free time.",
    "That's it. I'm adding you to the 'not serious' list 📋",
    // Phase 4: Giving up
    "Fine. Click away. I'll just stand here. Judging. 📎",
    "...you know the contact form is RIGHT THERE, right?",
    "I'm literally begging you. Go check out the projects section.",
];

// ─── Timing Constants ─────────────────────────────────────────────
const MESSAGE_COOLDOWN_MS = 8000;
const IDLE_TIMEOUT_MS = 30000;
const IDLE_COOLDOWN_MS = 45000;      // Idle msgs every 45s (more frequent for fun)
const ANIMATION_INTERVAL_MS = 18000;
const WELCOME_DELAY_MS = 3000;

export default function ClippyAssistant() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agentRef = useRef<any>(null);
    const spokenSections = useRef<Set<string>>(new Set());
    const lastMessageTime = useRef<number>(0);
    const lastIdleTime = useRef<number>(0);
    const idleMessageIndex = useRef<number>(0);
    const clickCount = useRef<number>(0);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // ─── Safe speak with cooldown ─────────────────────────────────
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

    // ─── Handle Clippy clicks (escalating roast) ──────────────────
    const handleClippyClick = useCallback(() => {
        if (!agentRef.current) return;

        const idx = Math.min(clickCount.current, CLICK_MESSAGES.length - 1);
        const msg = CLICK_MESSAGES[idx];
        clickCount.current++;

        // Force-speak on click (override cooldown) with animation
        safeSpeak(msg, true);
        agentRef.current.animate();
    }, [safeSpeak]);

    // ─── Reset idle timer on activity ─────────────────────────────
    const resetIdleTimer = useCallback(() => {
        if (idleTimer.current) clearTimeout(idleTimer.current);

        idleTimer.current = setTimeout(() => {
            const now = Date.now();
            if (now - lastIdleTime.current < IDLE_COOLDOWN_MS) return;
            lastIdleTime.current = now;

            // Cycle through idle messages in order for escalation
            const idx = idleMessageIndex.current % IDLE_MESSAGES.length;
            idleMessageIndex.current++;

            safeSpeakRef.current(IDLE_MESSAGES[idx]);
            if (agentRef.current) agentRef.current.animate();
        }, IDLE_TIMEOUT_MS);
    }, []);

    // ─── Main effect: load Clippy & set up listeners ──────────────
    useEffect(() => {
        let mounted = true;

        async function loadClippy() {
            try {
                const { initAgent } = await import('clippyjs');
                const ClippyLoaders = (await import('clippyjs/agents/clippy')).default;

                if (!mounted) return;

                const agent = await initAgent(ClippyLoaders);

                if (!mounted) {
                    agent.hide(true, () => {});
                    return;
                }

                agentRef.current = agent;
                agent.show(false);

                // ── Welcome message after short delay ──
                setTimeout(() => {
                    if (!mounted || !agentRef.current) return;
                    safeSpeak(SECTION_MESSAGES.hero);
                    spokenSections.current.add('hero');
                }, WELCOME_DELAY_MS);

                // ── Listen for clicks on the Clippy element ──
                const clippyEl = document.querySelector('.clippy');
                if (clippyEl) {
                    clippyEl.addEventListener('click', handleClippyClick);
                }

                // ── Section scroll observation ──
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
                    { threshold: 0.3 }
                );

                sectionIds.forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) observerRef.current!.observe(el);
                });

                // ── Random idle animations ──
                animationTimer.current = setInterval(() => {
                    if (agentRef.current) agentRef.current.animate();
                }, ANIMATION_INTERVAL_MS);

            } catch (err) {
                console.error('[ClippyAssistant] Failed to load Clippy:', err);
            }
        }

        loadClippy();

        
        const activityEvents = ['scroll', 'mousemove', 'click', 'keydown', 'touchstart'];
        const onActivity = () => resetIdleTimer();
        activityEvents.forEach((evt) => window.addEventListener(evt, onActivity, { passive: true }));
        resetIdleTimer();

        
        return () => {
            mounted = false;
            if (observerRef.current) observerRef.current.disconnect();
            if (idleTimer.current) clearTimeout(idleTimer.current);
            if (animationTimer.current) clearInterval(animationTimer.current);
            activityEvents.forEach((evt) => window.removeEventListener(evt, onActivity));

            const clippyEl = document.querySelector('.clippy');
            if (clippyEl) {
                clippyEl.removeEventListener('click', handleClippyClick);
            }

            if (agentRef.current) {
                agentRef.current.hide(true, () => {});
                agentRef.current = null;
            }
        };
    }, [safeSpeak, resetIdleTimer, handleClippyClick]);

    return null;
}
