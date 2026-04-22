"use client";
import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { motion } from "framer-motion";
import { Trophy, RefreshCw } from "lucide-react";

export const ChessWidget = () => {
    // Use FEN string for state to ensure React detects changes perfectly
    const [fen, setFen] = useState("start");

    function onDrop(sourceSquare: string, targetSquare: string) {
        const game = new Chess(fen === "start" ? undefined : fen);
        
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to queen for simplicity
            });

            // If illegal move, chess.js returns null
            if (move === null) return false;

            // Update state with new FEN string
            setFen(game.fen());
            return true;
        } catch (e) {
            return false;
        }
    }

    function resetGame() {
        setFen("start");
    }

    // Helper to get status from current FEN
    const getStatus = () => {
        const game = new Chess(fen === "start" ? undefined : fen);
        if (game.isCheckmate()) return `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`;
        if (game.isDraw()) return "Draw!";
        if (game.isCheck()) return "Check!";
        return `${game.turn() === 'w' ? 'White' : 'Black'}'s turn`;
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <motion.div 
                className="bg-white dark:bg-zinc-900 rounded-[32px] p-6 shadow-layered border border-zinc-200 dark:border-zinc-800"
                whileHover={{ y: -5 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-500" /> Free Play
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">{getStatus()}</span>
                    </div>
                    <button 
                        onClick={resetGame}
                        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-all active:scale-90"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-inner border-4 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 aspect-square flex items-center justify-center">
                    <Chessboard 
                        position={fen} 
                        onPieceDrop={onDrop}
                        boardWidth={280}
                        customDarkSquareStyle={{ backgroundColor: 'rgb(113 113 122 / 0.2)' }}
                        customLightSquareStyle={{ backgroundColor: 'transparent' }}
                        animationDuration={200}
                    />
                </div>
                
                <div className="mt-4 flex justify-center">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400">
                        Analyzing like a Grandmaster
                    </span>
                </div>
            </motion.div>
        </div>
    );
};
