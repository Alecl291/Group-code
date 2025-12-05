// App.tsx
import React, { useState } from 'react';
import { DeckCreator } from './DeckCreate';
import { Deck, Card } from './types';
import { FlashCard } from './FlashCard';

export const App: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [flipIndex, setFlipIndex] = useState<number | null>(null);

  const handleSaveDeck = (deck: Deck) => {
    setDecks((d) => [deck, ...d]);
    setActiveDeck(deck);
    setFlipIndex(null);
  };

  const handleCancel = () => {
    // simple behavior: do nothing for now
  };

  const handleFlip = (index: number) => {
    setFlipIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QuizieMe</h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Create Deck</h2>
          <DeckCreator onSave={handleSaveDeck} onCancel={handleCancel} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Your Decks</h2>
          {decks.length === 0 && <div className="text-slate-500">No decks yet</div>}
          <ul className="space-y-3">
            {decks.map((deck) => (
              <li key={deck.id} className="p-3 border rounded bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{deck.title}</div>
                    <div className="text-sm text-slate-500">{deck.description}</div>
                    <div className="text-xs text-slate-400 mt-1">{deck.cards.length} cards</div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setActiveDeck(deck);
                        setFlipIndex(null);
                      }}
                      className="px-3 py-1 border rounded"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {activeDeck && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Study: {activeDeck.title}</h2>
          <div>
            {activeDeck.cards.length === 0 && <div>No cards</div>}
            {activeDeck.cards.map((c, i) => (
              <div key={c.id} className="mb-4">
                <FlashCard
                  card={c as Card}
                  isFlipped={flipIndex === i}
                  onFlip={() => handleFlip(i)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
