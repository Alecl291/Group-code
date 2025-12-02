// DeckCreate.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Deck, Card as CardType } from './types';
import { Wand2, Plus, Loader2, Save, Trash2 } from 'lucide-react';

interface DeckCreatorProps {
  onSave: (deck: Deck) => void;
  onCancel: () => void;
}

export const DeckCreator: React.FC<DeckCreatorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  // internal cards don't have ids until saved
  const [cards, setCards] = useState<{ front: string; back: string }[]>([
    { front: '', back: '' },
  ]);
  const [saving, setSaving] = useState(false);

  const handleAddCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCardChange = (index: number, side: 'front' | 'back', value: string) => {
    const next = cards.slice();
    next[index] = { ...next[index], [side]: value };
    setCards(next);
  };

  const handleSaveManual = () => {
    if (!title.trim()) {
      return alert('Please enter a title');
    }
    if (cards.some((c) => !c.front.trim() || !c.back.trim())) {
      return alert('Please fill out all cards');
    }

    setSaving(true);
   
    const deck: Deck = {
      id: uuidv4(),
      title: title.trim(),
      description: desc.trim(),
      cards: cards.map((c) => ({
        id: uuidv4(),
        front: c.front.trim(),
        back: c.back.trim(),
      })),
    };

  
    onSave(deck);
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <label className="block font-medium mb-1">Deck Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="e.g. Biology: Cell Structure"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Description (optional)</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Short description of the deck"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Cards</h3>
        {cards.map((c, i) => (
          <div key={i} className="mb-3 p-3 border rounded bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div className="text-sm text-slate-600">Card {i + 1}</div>
              <button
                onClick={() => handleRemoveCard(i)}
                className="text-red-500 hover:text-red-700"
                title="Remove card"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2">
              <input
                value={c.front}
                onChange={(e) => handleCardChange(i, 'front', e.target.value)}
                placeholder="Front (question/prompt)"
                className="w-full border rounded p-2"
              />
              <input
                value={c.back}
                onChange={(e) => handleCardChange(i, 'back', e.target.value)}
                placeholder="Back (answer)"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddCard}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-slate-50"
          >
            <Plus size={16} /> Add Card
          </button>

          <button
            onClick={handleSaveManual}
            className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={saving}
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Save Deck
          </button>

          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
