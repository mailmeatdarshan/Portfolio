declare module 'clippyjs/agents/clippy' {
    const ClippyLoaders: {
        agent: () => Promise<{ default: any }>;
        sound: () => Promise<{ default: any }>;
        map: () => Promise<{ default: string }>;
    };
    export default ClippyLoaders;
}
