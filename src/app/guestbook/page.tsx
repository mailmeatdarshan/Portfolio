"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { subscribeToEntries, GuestbookEntry } from "@/lib/guestbook";
import { addGuestbookEntryAction } from "./actions";

export default function GuestbookPage() {
  const { isEarth } = useTheme();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rateLimitTime, setRateLimitTime] = useState(0);

  // Load real-time guestbook entries
  useEffect(() => {
    const unsubscribe = subscribeToEntries((latestEntries) => {
      setEntries(latestEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check rate limit on mount and run timer
  useEffect(() => {
    const lastPostTime = localStorage.getItem("last_guestbook_post_time");
    if (lastPostTime) {
      const remaining = Math.max(0, 30 - Math.floor((Date.now() - parseInt(lastPostTime, 10)) / 1000));
      if (remaining > 0) {
        setRateLimitTime(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (rateLimitTime > 0) {
      const timer = setTimeout(() => setRateLimitTime(rateLimitTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitTime]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 280) {
      setMessage(val);
      setCharCount(val.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("Please provide your name.");
      return;
    }
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    if (rateLimitTime > 0) {
      setError(`Please wait ${rateLimitTime} seconds before posting again.`);
      return;
    }

    setSubmitting(true);

    try {
      const res = await addGuestbookEntryAction(name, handle, message);
      if (res.success) {
        setSuccess(true);
        setMessage("");
        setCharCount(0);
        
        // Rate limit for 30 seconds
        localStorage.setItem("last_guestbook_post_time", Date.now().toString());
        setRateLimitTime(30);
        
        // Auto-dismiss success message
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(res.error || "Failed to post message.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Avatar HSL Color Hashing
  const getAvatarColor = (nameStr: string) => {
    let hash = 0;
    const s = nameStr || "Anonymous";
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hues = [200, 220, 240, 260, 280, 300, 320, 340, 10, 35, 145, 165];
    const index = Math.abs(hash) % hues.length;
    return `hsl(${hues[index]}, 65%, 55%)`;
  };

  // Avatar Initials
  const getInitials = (nameStr: string) => {
    const parts = (nameStr || "A").trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0][0] || "A").toUpperCase();
  };

  // Relative Time Ago
  const timeAgo = (timestamp: number) => {
    if (!timestamp) return "Just now";
    const diff = Date.now() - timestamp;
    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (secs < 10) return "Just now";
    if (secs < 60) return `${secs}s ago`;
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  return (
    <div className={`min-h-screen py-16 px-4 md:px-8 transition-colors duration-1000 ${
      isEarth ? "bg-[#fbfbf9] text-stone-800" : "bg-[#030508] text-white"
    }`}>
      {/* Background patterns */}
      {isEarth ? (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,110,90,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,110,90,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      )}

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className={`flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 px-4 py-2 rounded-full border ${
                isEarth 
                  ? "bg-amber-600/5 border-amber-600/20 text-amber-700 hover:bg-amber-600/10 shadow-[2px_2px_0px_rgba(180,83,9,0.15)]" 
                  : "bg-blue-500/5 border-blue-500/20 text-blue-400 hover:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>
          
          <div className="flex-1 text-center md:mr-24">
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isEarth ? "font-handwriting" : "font-sans"}`}>
              Guestbook
            </h1>
          </div>
        </div>

        {/* Subheading description */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <p className={`text-sm md:text-[15px] leading-relaxed transition-colors duration-1000 ${
            isEarth ? "font-handwriting text-stone-600 text-lg" : "text-zinc-400 font-sans"
          }`}>
            Leave a message for me and other visitors. Whether it's{" "}
            <span className={`font-semibold transition-colors duration-1000 ${isEarth ? "text-amber-700" : "text-blue-400"}`}>
              feedback
            </span>
            , a{" "}
            <span className={`font-semibold transition-colors duration-1000 ${isEarth ? "text-emerald-700" : "text-yellow-400"}`}>
              question
            </span>
            , or just a{" "}
            <span className={`font-semibold transition-colors duration-1000 ${isEarth ? "text-orange-700" : "text-purple-400"}`}>
              simple hello
            </span>
            !
          </p>
        </div>

        {/* Guestbook Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 md:p-8 rounded-[2rem] border mb-12 transition-all duration-500 ${
            isEarth 
              ? "bg-white/80 border-amber-200/50 shadow-md" 
              : "bg-white/[0.02] border-white/5 backdrop-blur-md shadow-2xl"
          }`}
        >
          <h2 className={`text-lg md:text-xl font-bold mb-4 ${isEarth ? "font-handwriting text-stone-700" : "text-white"}`}>
            {isEarth ? "Write something sweet..." : "Add to the Cosmos"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-mono mb-1.5 uppercase ${isEarth ? "text-stone-500" : "text-zinc-500"}`}>
                  Your Name *
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 50))}
                  placeholder="e.g. Darshan Dubey"
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                    isEarth 
                      ? "bg-stone-50/50 border-stone-200 text-stone-800 focus:border-amber-500/50 focus:bg-white" 
                      : "bg-white/[0.02] border-white/10 text-white focus:border-blue-500/50 focus:bg-white/[0.05]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-mono mb-1.5 uppercase ${isEarth ? "text-stone-500" : "text-zinc-500"}`}>
                  Social Handle (Optional)
                </label>
                <input 
                  type="text" 
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. @mailmeatdarshan"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                    isEarth 
                      ? "bg-stone-50/50 border-stone-200 text-stone-800 focus:border-amber-500/50 focus:bg-white" 
                      : "bg-white/[0.02] border-white/10 text-white focus:border-blue-500/50 focus:bg-white/[0.05]"
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className={`text-xs font-mono uppercase ${isEarth ? "text-stone-500" : "text-zinc-500"}`}>
                  Message *
                </label>
                <span className={`text-[10px] font-mono ${
                  charCount >= 250 ? "text-red-500" : (isEarth ? "text-stone-400" : "text-zinc-500")
                }`}>
                  {charCount}/280
                </span>
              </div>
              <textarea 
                value={message}
                onChange={handleMessageChange}
                placeholder="Leave a message, feedback, or just say hi..."
                rows={4}
                required
                className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none resize-none ${
                  isEarth 
                    ? "bg-stone-50/50 border-stone-200 text-stone-800 focus:border-amber-500/50 focus:bg-white" 
                    : "bg-white/[0.02] border-white/10 text-white focus:border-blue-500/50 focus:bg-white/[0.05]"
                }`}
              />
            </div>

            {/* Error and Success Feedback messages */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-2 p-3 text-xs rounded-xl border ${
                    isEarth 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700" 
                      : "bg-green-500/10 border-green-500/20 text-green-400"
                  }`}
                >
                  <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse" />
                  <span>Successfully posted! Thank you for signing.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting || !name.trim() || !message.trim() || rateLimitTime > 0}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 active:scale-95 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none ${
                  isEarth 
                    ? "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg" 
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                }`}
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : rateLimitTime > 0 ? (
                  <span>Wait {rateLimitTime}s</span>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>Share Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Message Feed Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4 transition-colors duration-1000" style={{ borderColor: isEarth ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}>
            <h3 className={`text-md font-mono tracking-wider uppercase ${isEarth ? "text-stone-500" : "text-zinc-400"}`}>
              Recent Messages ({entries.length})
            </h3>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <RefreshCw className={`w-8 h-8 animate-spin ${isEarth ? "text-amber-500" : "text-blue-500"}`} />
            </div>
          ) : entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-10 rounded-[2rem] text-center border ${
                isEarth 
                  ? "bg-white/40 border-stone-200/50 text-stone-500" 
                  : "bg-white/[0.01] border-white/5 text-zinc-500"
              }`}
            >
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-yellow-500 animate-pulse" />
              <p className={`font-medium mb-1 ${isEarth ? "font-handwriting text-lg text-stone-600" : "text-white"}`}>
                No messages yet.
              </p>
              <p className="text-xs">Be the first to leave a message!</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {entries.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
                    className={`p-6 rounded-[1.8rem] border relative overflow-hidden transition-all duration-300 ${
                      isEarth 
                        ? "bg-white/90 border-amber-200/30 hover:border-amber-300/60 shadow-sm" 
                        : "bg-white/[0.015] border-white/5 hover:border-white/10 shadow-lg"
                    }`}
                  >
                    {/* Notebook line pattern for earth mode */}
                    {isEarth && (
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-red-400/10" />
                    )}

                    <div className="flex gap-4 items-start relative z-10">
                      {/* Initials Avatar */}
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner flex-shrink-0 select-none"
                        style={{ backgroundColor: getAvatarColor(entry.name) }}
                      >
                        {getInitials(entry.name)}
                      </div>

                      {/* Content block */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                            <span className={`text-sm font-bold truncate ${isEarth ? "font-sans text-stone-800" : "text-white"}`}>
                              {entry.name}
                            </span>
                            {entry.handle && (
                              <span className={`text-xs truncate font-mono ${isEarth ? "text-stone-400" : "text-zinc-500"}`}>
                                {entry.handle}
                              </span>
                            )}
                          </div>
                          
                          <span className={`text-[10px] font-mono flex-shrink-0 ${isEarth ? "text-stone-400" : "text-zinc-500"}`}>
                            {timeAgo(entry.createdAt)}
                          </span>
                        </div>

                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                          isEarth ? "font-handwriting text-[15px] text-stone-700 leading-relaxed" : "text-zinc-300"
                        }`}>
                          {entry.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        
        {/* Footer padding */}
        <div className="pb-16" />
      </div>
    </div>
  );
}
