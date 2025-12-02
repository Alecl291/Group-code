import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Deck } from '../types';
import { CardFlip } from '../components/CardFlip';
import { ChevronLeft, ChevronRight, RotateCcw, X, Check, Trophy } from 'lucide-react';

interface StudyProps {
  decks: Deck[];
}

export const Study: React.FC<StudyProps> = ({ decks }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = decks.find(d => d.id === deckId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(0); // For slide animation if we added it

  useEffect(() => {
    // Reset state when deck changes
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
  }, [deckId]);

  if (!deck) {
    return <div className="p-8 text-center">Deck not found</div>;
  }

  const handleNext = () => {
    if (currentIndex < deck.cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => c + 1), 150);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => c - 1), 150);
    }
  };

  const restart = () => {
    setCompleted(false);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Great Job!</h2>
        <p className="text-gray-500 max-w-md">
          You've reviewed all {deck.cards.length} cards in the <span className="font-semibold text-gray-800">{deck.title}</span> deck.
        </p>
        <div className="flex space-x-4">
          <button onClick={restart} className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span>Study Again</span>
          </button>
          <button onClick={() => navigate('/')} className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
            <span>Back to Library</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] justify-center">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-900 transition-colors flex items-center space-x-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Exit</span>
        </button>
        <div className="text-sm font-medium text-gray-400">
          {currentIndex + 1} / {deck.cards.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <CardFlip 
          card={deck.cards[currentIndex]} 
          isFlipped={isFlipped} 
          onFlip={() => setIsFlipped(!isFlipped)} 
        />
      </div>

      <div className="mt-8 flex items-center justify-between max-w-lg mx-auto w-full px-4">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="p-4 rounded-full bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex space-x-4">
          {/* Simple controls: Just flip or next. 
              Ideally spaced repetition has "Hard/Easy" but keeping it simple for now. 
          */}
           <button 
             onClick={() => setIsFlipped(!isFlipped)}
             className="px-6 py-3 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors"
           >
             {isFlipped ? 'Show Question' : 'Show Answer'}
           </button>
        </div>

        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-black text-white hover:bg-gray-800 transition-colors shadow-lg"
        >
          {currentIndex === deck.cards.length - 1 ? <Check className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};
