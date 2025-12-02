// FlashCard.tsx
import React from 'react';
import { Card } from './types';

interface FlashCardProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ card, isFlipped, onFlip }) => {
  return (
    <div
      className="w-full max-w-2xl h-96 cursor-pointer perspective-1000 mx-auto"
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onFlip();
      }}
    >
      <div
        className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d shadow-xl rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8">
          <span className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Front
          </span>
          <p className="text-3xl font-medium text-slate-800 leading-relaxed">{card.front}</p>
          <p className="absolute bottom-6 text-slate-400 text-sm animate-pulse">Click to flip</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-2xl rotate-y-180 flex flex-col items-center justify-center p-8 text-white">
          <span className="absolute top-4 left-4 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Answer
          </span>
          <p className="text-2xl font-medium leading-relaxed">{card.back}</p>
        </div>
      </div>
    </div>
  );
};


  
