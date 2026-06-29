"use client";

import React, { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useTheme } from "@/contexts/ThemeProvider";
import { Eye, RefreshCw } from "lucide-react";

export default function VisitorCounter() {
  const { isEarth } = useTheme();
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const docRef = doc(db, "stats", "views");

    // 1. Initialize and increment the view count
    const incrementViews = async () => {
      try {
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          // If document doesn't exist, initialize it to 560
          await setDoc(docRef, { count: 560 });
        }

        // Increment only once per browser session
        const hasVisited = sessionStorage.getItem("portfolio_visited_session");
        if (!hasVisited) {
          await updateDoc(docRef, {
            count: increment(1)
          });
          sessionStorage.setItem("portfolio_visited_session", "true");
        }
      } catch (err) {
        console.error("Error updating view counter:", err);
      }
    };

    incrementViews();

    // 2. Listen to real-time updates
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setViews(data.count || 560);
      } else {
        setViews(560);
      }
    }, (err) => {
      console.error("Error listening to view counter:", err);
      // Fallback
      setViews(560);
    });

    return () => unsubscribe();
  }, []);

  if (views === null) {
    return (
      <div className="flex justify-center mt-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs select-none transition-all duration-300 opacity-60 ${
          isEarth 
            ? "bg-amber-600/5 border-amber-600/20 text-amber-700 font-sans" 
            : "bg-white/[0.03] border-white/10 text-zinc-400 font-mono"
        }`}>
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-6">
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs select-none transition-all duration-300 ${
        isEarth 
          ? "bg-amber-600/5 border-amber-600/20 text-amber-700 font-sans shadow-sm" 
          : "bg-white/[0.03] border-white/10 text-zinc-400 font-mono shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
      }`}>
        <Eye className={`w-3.5 h-3.5 ${isEarth ? "text-amber-600" : "text-blue-400"}`} />
        <span className={`font-bold ${isEarth ? "text-amber-800" : "text-white"}`}>
          {views}
        </span>
        <span className="opacity-80">visitors</span>
      </div>
    </div>
  );
}
