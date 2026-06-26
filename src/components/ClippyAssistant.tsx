/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const SECTION_MESSAGES: Record<string, string[]> = {
    home: [
        "Hey! I'm Clippy 📎 Welcome to Darshan's portfolio!",
        "Oh, look who's here! Ready to explore? 🚀",
        "I'm the captain of this ship now. Welcome! ⚓"
    ],
    "my-world": [
        "Welcome to Darshan's World! 🌍 Every word here is a step in his journey.",
        "This is where the magic happens. Or at least where the coffee is consumed. ☕",
        "Exploring 'My World'? Don't get lost in the lore! ✨"
    ],
    "what-i-love": [
        "This is what gets Darshan excited! Web dev, backend, and building cool systems! 💻",
        "He loves this stuff more than he loves sleep. Trust me. 😴",
        "Backend, Cloud, Tech... yeah, he's a certified geek. 🤓"
    ],
    masterplan: [
        "A Masterplan before 30? Darshan is manifesting on full throttle! 🚀",
        "He's got big plans. I'm just here to make sure he doesn't crash. 📉",
        "Manifesting intensifies... 🧘‍♂️"
    ],
    experience: [
        "Real-world experience — impressive, right? He's been busy! 💼",
        "He worked hard for these. Unlike you, just scrolling. Savage? Maybe. 😏",
        "Check out these professional milestones! 🏆"
    ],
    skills: [
        "Quite the technical arsenal he's got! From React to Cloud, he's got it covered. 🛠️",
        "If only he could use these skills to fix his sleep schedule. 💀",
        "That's a lot of logos. He actually knows how to use them too! ⚡"
    ],
    projects: [
        "Ooh, check out these projects! Go on, click one to see more! ✨",
        "Most of these were built with 2% battery and 100% passion. 🔋",
        "Behold! The artifacts of a developer's labor. 🏛️"
    ],
    contact: [
        "Wanna hire Darshan? Go on, send a message! 📧",
        "Thinking of emailing? I'll make sure he sees it. Maybe. 😈",
        "Want to know more about this dev? Click 'Know me better' in the About Me section above! 📖"
    ],
};

const PROJECT_CLICK_MESSAGES: Record<string, string[]> = {
    "MyBhavans": ["Bhavans college is amazing! I want to visit there once! 🏫", "Ah, MyBhavans. The pride and joy! 🌟"],
    "HisabKitab": ["Time to do your HisabKitab! Keep those finances in check. 💸", "Tracking money? Wish I had some to track. 📎"],
    "BhavansPracbuddy": ["Pracbuddy is a lifesaver for students. Genius! 📚", "Helping students pass? Truly a hero. 🦸‍♂️"],
    "Chitti-The Robot": ["Chitti! Speed 1 terahertz, memory 1 zigabyte. Iconic. 🤖", "I'm basically Chitti's younger, less robotic brother. 📎"],
    "Comfy": ["Everything looks so comfy here. Love the design! ✨", "So clean, so minimal. I'm jealous. 😍"],
    "ShriHariEnterprises": ["A robust business solution. Very professional! 💼", "Business time! Let's get serious. 📈"],
};

const LANDED_MESSAGES = [
    "Phew! Solid ground at last! 🌍 Reality is back.",
    "Back to Earth! I can feel my staples again! 📎",
    "Gravity restored. Stop floating, you're not a bird. 🐦"
];

const LIFTOFF_MESSAGES = [
    "And we have liftoff! 🚀 Hold on tight!",
    "Wheee! Zero gravity mode engaged! 🌌",
    "Space: The final frontier. Let's go! 🛸"
];

const RETURN_MESSAGES = [
    "I'm back! Did you miss me? 😉",
    "Missed me? I was just taking a quick break in the void.",
    "And I'm back in action! 📎 Welcome back to reality.",
    "The Terminal was too much for you, wasn't it? 😏"
];

const INTERACTIVE_MESSAGES = [
    "Hey! Stop poking me! 😂",
    "Did you just click me? I'm busy being cool. 😎",
    "At your service! What's on your mind? 📎",
    "Darshan is the real deal, I'm just the stylish assistant.",
    "Ouch! Careful with that cursor! 🖱️",
    "Can I help you find something? Or are you just here for my charm? 😉",
    "I've been in portfolios since '97. I'm a legend! 🏆",
    "Stop clicking! I'm trying to look important. 🧐",
    "You click, I speak. That's the deal. 🤝"
];

const MESSAGE_COOLDOWN_MS = 2500;
const WELCOME_DELAY_MS = 800;
const ANIMATION_INTERVAL_MS = 15000;

const purgeClippyDOM = () => {
    if (typeof document === 'undefined') return;
    const elements = document.querySelectorAll('.clippy, .clippy-balloon');
    elements.forEach(el => el.remove());
};

const ClippyAssistant = () => {
    const pathname = usePathname();
    const agentRef = useRef<any>(null);
    const lastMessageTime = useRef<number>(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const activeSectionRef = useRef<string | null>(null);

    const getRandomMessage = (messages: string[]) => {
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const safeSpeak = useCallback((text: string, force = false) => {
        if (!agentRef.current) return;
        
        const now = Date.now();
        if (!force && now - lastMessageTime.current < MESSAGE_COOLDOWN_MS) return;
        
        lastMessageTime.current = now;
        
        try {
            agentRef.current.stop();
            agentRef.current.speak(text);
            agentRef.current.animate();
        } catch (e) {
            console.warn('[ClippyAssistant] Failed to speak:', e);
        }
    }, []);

    useEffect(() => {
        let mounted = true;
        purgeClippyDOM();

        async function init() {
            try {
                const { initAgent } = await import('clippyjs');
                const ClippyLoaders = (await import('clippyjs/agents/clippy')).default;
                if (!mounted) return;
                
                const noSoundLoaders = {
                    ...ClippyLoaders,
                    sound: () => Promise.resolve({ default: {} })
                };

                const agent = await initAgent(noSoundLoaders);
                if (!mounted) { 
                    agent.hide(true, () => {}); 
                    purgeClippyDOM();
                    return; 
                }

                agentRef.current = agent;
                agent.show(false);

                setTimeout(() => {
                    if (agent._el) {
                        const el = agent._el as HTMLElement;
                        el.style.position = 'fixed';
                        el.style.bottom = window.innerWidth < 768 ? '40px' : '150px';
                        el.style.right = window.innerWidth < 768 ? '20px' : '40px';
                        el.style.left = 'auto';
                        el.style.top = 'auto';
                        el.style.zIndex = '9999';
                        el.style.imageRendering = 'pixelated';
                        el.style.cursor = 'pointer';

                        el.addEventListener('click', () => {
                            safeSpeak(getRandomMessage(INTERACTIVE_MESSAGES), true);
                            agent.animate();
                        });
                    }
                }, 50);

                // ── Event Handlers ─────────────────────────────────────────
                const handlers: Record<string, (e?: any) => void> = {
                    'clippy-landed': () => safeSpeak(getRandomMessage(LANDED_MESSAGES), true),
                    'clippy-liftoff': () => safeSpeak(getRandomMessage(LIFTOFF_MESSAGES), true),
                    'clippy-project-click': (e) => {
                        const title = e.detail?.title;
                        const msgs = PROJECT_CLICK_MESSAGES[title] || ["Cool project, right?", "Darshan worked hard on this! ✨"];
                        safeSpeak(getRandomMessage(msgs), true);
                    },
                    'splash-finished': () => triggerWelcome()
                };

                Object.entries(handlers).forEach(([evt, handler]) => window.addEventListener(evt, handler));

                // ── Welcome Sequence ───────────────────────────────────────
                const triggerWelcome = () => {
                    if (!mounted || !agentRef.current) return;
                    const isSplashActive = !sessionStorage.getItem("hasSeenSplash");
                    if (isSplashActive) return;

                    setTimeout(() => {
                        if (!mounted || !agentRef.current) return;
                        const hasIntroduced = sessionStorage.getItem("clippyIntroduced");
                        if (!hasIntroduced) {
                            safeSpeak(getRandomMessage(SECTION_MESSAGES.home), true);
                            sessionStorage.setItem("clippyIntroduced", "true");
                        } else {
                            safeSpeak(getRandomMessage(RETURN_MESSAGES), true);
                        }
                    }, WELCOME_DELAY_MS);
                };

                triggerWelcome();

                // ── Section Observer ───────────────────────────────────────
                const sectionIds = ['home', 'my-world', 'what-i-love', 'masterplan', 'experience', 'skills', 'projects', 'contact'];
                observerRef.current = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const id = entry.target.id;
                                // Only speak if this is a NEW section we just entered
                                if (activeSectionRef.current !== id) {
                                    activeSectionRef.current = id;
                                    const msgs = SECTION_MESSAGES[id];
                                    if (msgs) {
                                        safeSpeak(getRandomMessage(msgs), true);
                                    }
                                }
                            }
                        });
                    },
                    { threshold: 0.25, rootMargin: "-10% 0px -10% 0px" }
                );

                sectionIds.forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) observerRef.current!.observe(el);
                });

                const animTimer = setInterval(() => {
                    if (!document.hidden) agentRef.current?.animate();
                }, ANIMATION_INTERVAL_MS);

                (agentRef.current as any)._finalCleanup = () => {
                    Object.entries(handlers).forEach(([evt, handler]) => window.removeEventListener(evt, handler));
                    clearInterval(animTimer);
                    agentRef.current?.stop();
                    if (agentRef.current?._balloon) {
                        try { agentRef.current._balloon.close(); } catch { }
                    }
                    agentRef.current?.hide(true, () => { purgeClippyDOM(); });
                    purgeClippyDOM();
                };

            } catch (err) {
                console.error('[ClippyAssistant] Init failed:', err);
                purgeClippyDOM();
            }
        }

        init();

        return () => {
            mounted = false;
            if (observerRef.current) observerRef.current.disconnect();
            if (agentRef.current) {
                (agentRef.current as any)._finalCleanup?.();
                agentRef.current = null;
            }
            purgeClippyDOM();
        };
    }, [safeSpeak, pathname]);

    return null;
}

export default ClippyAssistant;
