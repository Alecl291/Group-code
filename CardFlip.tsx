import React, { useState } from 'react';
import { Card } from '../types';
import { motion } from 'framer-motion';

interface CardFlipProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export const CardFlip: React.FC<CardFlipProps> = ({ card, isFlipped, onFlip }) => {
  return (
    <div 
      className="relative w-full aspect-[4/3] md:aspect-[16/9] cursor-pointer perspective-1000 group"
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d shadow-xl rounded-2xl"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full bg-white rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden border border-gray-100">
            <span className="absolute top-4 left-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Question</span>
            <p className="text-2xl md:text-3xl font-medium text-center text-gray-800 leading-relaxed">
              {card.front}
            </p>
            <div className="absolute bottom-4 text-gray-400 text-sm font-medium">Tap to flip</div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full bg-blue-50 rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 border border-blue-100">
            <span className="absolute top-4 left-4 text-xs font-bold text-blue-400 uppercase tracking-wider">Answer</span>
            <p className="text-2xl md:text-3xl font-medium text-center text-blue-900 leading-relaxed">
              {card.back}
            </p>
            <div className="absolute bottom-4 text-blue-400 text-sm font-medium">Tap to flip back</div>
        </div>
      </motion.div>
    </div>
  );
};
