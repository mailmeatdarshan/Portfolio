"use client";
import React, { useState, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

interface ChessBoardWrapperProps {
    onStatusChange?: (status: string) => void;
}

export default function ChessBoardWrapper({ onStatusChange }: ChessBoardWrapperProps) {
    const game = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(game.fen());

    function onDrop({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) {
        if (!targetSquare) return false;
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });

            if (move === null) return false;

            setFen(game.fen());
            
            if (onStatusChange) {
                if (game.isCheckmate()) onStatusChange(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`);
                else if (game.isDraw()) onStatusChange("Draw!");
                else if (game.isCheck()) onStatusChange("Check!");
                else onStatusChange(`${game.turn() === 'w' ? 'White' : 'Black'}'s turn`);
            }
            
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="w-full h-full">
            <Chessboard 
                options={{
                    position: fen,
                    onPieceDrop: onDrop,
                    darkSquareStyle: { backgroundColor: '#b58863' },
                    lightSquareStyle: { backgroundColor: '#f0d9b5' },
                    animationDurationInMs: 200,
                    boardStyle: { width: '100%', height: '100%' }
                }}
            />
        </div>
    );
}
