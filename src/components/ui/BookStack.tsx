"use client";
import React, { useState, useCallback, useRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import Image from "next/image";
import { aboutTranslations } from "@/data/aboutTranslations";

// Dynamic import for react-pageflip to avoid SSR issues
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { 
    ssr: false,
    loading: () => <div className="w-full aspect-[4/3] bg-zinc-100 animate-pulse rounded-lg" />
}) as any;

interface Book {
    title: string;
    author: string;
    desc: string;
    cover: string;
    rating: number;
    color: string;
}

const BOOKS: Book[] = [
    { 
        title: "Ikigai", 
        author: "Héctor García", 
        desc: "The Japanese secret to a long and happy life. It guides you on how to find your own ikigai—the reason for getting out of bed in the morning.", 
        cover: "/images/books/ikigai.jpg",
        rating: 5,
        color: "#e0f2f1"
    },
    { 
        title: "1984", 
        author: "George Orwell", 
        desc: "A dystopian social science fiction novel and cautionary tale. It explores the themes of totalitarianism, mass surveillance, and repressive regimentation.", 
        cover: "/images/books/1984.jpg",
        rating: 5,
        color: "#ffebee"
    },
    { 
        title: "Man's Search for Meaning", 
        author: "Viktor Frankl", 
        desc: "Psychiatrist Viktor Frankl's memoir of his struggle for survival in Nazi concentration camps, and his description of logotherapy.", 
        cover: "/images/books/mans_search_for_meaning.jpg",
        rating: 5,
        color: "#e8eaf6"
    },
    { 
        title: "The Alchemist", 
        author: "Paulo Coelho", 
        desc: "A novel about a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.", 
        cover: "/images/books/the_alchemist.jpg",
        rating: 4,
        color: "#fffde7"
    },
    { 
        title: "Deep Work", 
        author: "Cal Newport", 
        desc: "Rules for focused success in a distracted world. It argues that the ability to focus without distraction is a superpower.", 
        cover: "/images/books/deepwork.jpg",
        rating: 5,
        color: "#f5f5f5"
    },
    { 
        title: "Can't Hurt Me", 
        author: "David Goggins", 
        desc: "David Goggins shares his astonishing life story and reveals that most of us tap into only 40% of our capabilities.", 
        cover: "/images/books/cant_hurt_me.jpg",
        rating: 5,
        color: "#f8f9fa"
    },
    { 
        title: "The Argumentative Indian", 
        author: "Amartya Sen", 
        desc: "A series of essays that discuss India's history and identity, focusing on the country's long tradition of public debate and intellectual pluralism.", 
        cover: "/images/books/argumentative.jpg",
        rating: 5,
        color: "#fff9db"
    },
    { 
        title: "Why I Am a Hindu", 
        author: "Shashi Tharoor", 
        desc: "Tharoor offers a profound re-examination of Hinduism, its history, and its potential in the modern world.", 
        cover: "/images/books/why_i_m_a_hindu.jpg",
        rating: 5,
        color: "#fff4e6"
    },
    { 
        title: "Hackers & Painters", 
        author: "Paul Graham", 
        desc: "A collection of essays by Paul Graham about computer programming, Silicon Valley culture, and the nature of innovation.", 
        cover: "/images/books/hackers_n_painters.jpg",
        rating: 5,
        color: "#f1f3f5"
    },
    { 
        title: "Nexus", 
        author: "Yuval Noah Harari", 
        desc: "Harari explores how information networks have made, and unmade, our world, from the Stone Age to the age of AI.", 
        cover: "/images/books/nexus.jpg",
        rating: 4,
        color: "#e7f5ff"
    },
];

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>((props, ref) => {
    return (
        <div 
            className={`bg-[#fdfcf0] overflow-hidden relative border-zinc-200 ${props.className}`} 
            ref={ref}
            style={{ 
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.05)",
            }}
        >
            <div className="h-full w-full relative flex flex-col">
                {props.children}
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                
                {/* Center Fold Shadow */}
                <div className={`absolute top-0 bottom-0 w-8 pointer-events-none z-20 ${
                    props.className?.includes("page-left") 
                        ? "right-0 bg-gradient-to-l from-black/10 to-transparent" 
                        : "left-0 bg-gradient-to-r from-black/10 to-transparent"
                }`} />
            </div>
        </div>
    );
});
Page.displayName = "Page";

interface PageFlipEvent {
    data: number;
}

export const BookStack = ({ isEarth, lang }: { isEarth: boolean, lang: "en" | "hi" }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<any>(null);
    const [page, setPage] = useState(0);
    const t = aboutTranslations[lang];

    const onPage = useCallback((e: PageFlipEvent) => {
        setPage(e.data);
    }, []);

    const nextBtn = () => {
        if (bookRef.current) bookRef.current.pageFlip().flipNext();
    };

    const prevBtn = () => {
        if (bookRef.current) bookRef.current.pageFlip().flipPrev();
    };

    return (
        <motion.div 
            className={`w-full max-w-5xl mx-auto rounded-[32px] p-8 md:p-16 shadow-layered transition-all duration-1000 border ${
                isEarth 
                    ? "bg-white border-zinc-200" 
                    : "bg-[#1e293b] border-white/10"
            }`}
            whileHover={{ y: -5 }}
        >
            {/* Navigation Controls */}
            <div className="flex justify-end mb-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={prevBtn}
                        className={`p-3 rounded-full transition-all active:scale-90 ${
                            isEarth ? "hover:bg-zinc-100 text-zinc-500" : "hover:bg-white/5 text-zinc-400"
                        }`}
                        disabled={page === 0}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={nextBtn}
                        className={`p-3 rounded-full transition-all active:scale-90 ${
                            isEarth ? "hover:bg-zinc-100 text-zinc-500" : "hover:bg-white/5 text-zinc-400"
                        }`}
                        disabled={page === (BOOKS.length * 2 + 1)}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* FlipBook Container */}
            <div className="relative flex justify-center items-center py-8">
                <div className="shadow-2xl rounded-sm overflow-hidden border-r-4 border-zinc-300 dark:border-zinc-800 bg-[#fdfcf0]">
                    <HTMLFlipBook
                        width={450}
                        height={600}
                        size="stretch"
                        minWidth={300}
                        maxWidth={500}
                        minHeight={400}
                        maxHeight={700}
                        showCover={true}
                        onFlip={onPage}
                        ref={bookRef}
                        className="book-journal"
                        style={{ background: "#fdfcf0" }}
                        useMouseEvents={true}
                        flippingTime={1000}
                        autoSize={true}
                        maxShadowOpacity={0.5}
                        mobileScrollSupport={true}
                        clickEventForward={true}
                        swipeDistance={30}
                        showPageCorners={true}
                        disableFlipByClick={false}
                    >
                        {/* Front Cover */}
                        <Page className="journal-cover page-cover">
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-[#2c3e50] text-white">
                                <Bookmark className="w-16 h-16 text-amber-500 mb-8" />
                                <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 italic">The<br/>Reading<br/>Journal</h2>
                                <div className="w-24 h-1 bg-amber-500 mb-8" />
                                <p className="text-sm font-bold tracking-[0.3em] opacity-60 uppercase">Vol. 01</p>
                                <div className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
                                    DUBEY.G / PORTFOLIO
                                </div>
                            </div>
                        </Page>

                        {/* Book Pages */}
                        {BOOKS.flatMap((book, index) => [
                            // Left Page: Cover
                            <Page key={`${index}-left`} className="page-left">
                                <div className="h-full flex flex-col items-center justify-center p-8 bg-zinc-50/50">
                                    <div className="relative w-full aspect-[2/3] shadow-2xl rounded-sm overflow-hidden transform rotate-1 group/book bg-white">
                                        <Image 
                                            src={book.cover} 
                                            alt={book.title} 
                                            fill 
                                            className="object-contain z-10 p-2"
                                            priority={index === 0}
                                        />
                                        {/* Texture/Shadow */}
                                        <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-black/5 via-transparent to-white/5" />
                                        <div className="absolute inset-0 z-20 border-l-4 border-black/10" />
                                    </div>
                                    <div className="mt-8 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${i < book.rating ? "text-amber-500 fill-amber-500" : "text-zinc-300"}`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Page>,
                            
                            // Right Page: Description
                            <Page key={`${index}-right`} className="page-right">
                                <div className="h-full p-12 flex flex-col">
                                    <div className="mb-8">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2">{t.bento.books.current}</p>
                                        <h3 className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900 leading-none">
                                            {book.title}
                                        </h3>
                                        <div className="w-12 h-1 bg-zinc-900 mt-4" />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <p className="text-lg font-medium leading-relaxed text-zinc-700 italic">
                                            &quot;{book.desc}&quot;
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-zinc-200">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            <span>Author: {book.author}</span>
                                            <span>Pg. {index * 2 + 2}</span>
                                        </div>
                                    </div>
                                </div>
                            </Page>
                        ])}

                        {/* Back Cover */}
                        <Page className="journal-cover page-cover">
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-[#2c3e50] text-white">
                                <h3 className="text-2xl font-black tracking-tighter uppercase italic mb-4">To Be Continued...</h3>
                                <div className="w-12 h-0.5 bg-amber-500 opacity-50 mb-8" />
                                
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-2">{t.literary.currentlyReading}</p>
                                    <p className="text-lg font-black tracking-tight italic">{t.literary.currentBook}</p>
                                </div>

                                <p className="text-xs font-medium opacity-60 leading-relaxed max-w-[200px]">
                                    {lang === "en" 
                                        ? "Reading is a conversation. All books speak. But a good book listens as well." 
                                        : "Padhna ek batchit hai. Sab kitabein bolti hain. Par ek acchi kitab sunti bhi hai."}
                                </p>
                            </div>
                        </Page>
                    </HTMLFlipBook>
                </div>
            </div>

            {/* Footer Tip */}
            <div className="flex justify-center border-t border-zinc-100 dark:border-zinc-800 pt-8 mt-12">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400">
                    {t.bento.books.tap}
                </span>
            </div>
        </motion.div>
    );
};
