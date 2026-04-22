"use client";
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export const DistanceTracker = () => {
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        // Mocking distance calculation. In a real app, you'd use a geolocation API.
        // Let's just generate a random plausible distance between 500 and 15000 km
        const randomDist = Math.floor(Math.random() * 14500) + 500;
        const timer = setTimeout(() => setDistance(randomDist), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-700/50 cursor-default hover:scale-105 transition-transform">
            <MapPin className="h-4 w-4 text-green-600 dark:text-green-300" />
            <span className="text-green-700 dark:text-green-400">
                {distance ? `roughly ${distance.toLocaleString()}km away` : "calculating distance..."}
            </span>
        </span>
    );
};
