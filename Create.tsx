import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { CreateDeckInput } from '../types';

interface CreateProps {
  onSave: (deck: CreateDeckInput) => void;
}

export const Create: React.FC<CreateProps> = ({ onSave }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<{ id: string; front: string; back: string }[]>([
    { id: uuidv4(), front: '', back: '' },
    { id: uuidv4(), front: '', back: '' },
  ]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || cards.some(c => !c.front.trim() || !c.back.trim())) {
      alert("Please fill in all fields.");
      return;
    }
    
    onSave({
      title,
      description,
      cards: cards.map(({ front, back }) => ({ front, back }))
    });
    navigate('/');
  };

  const addCard = () => {
    setCards([...cards, { id: uuidv4(), front: '', back: '' }]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const updateCard = (id: string, field: 'front' | 'back', value: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create New Deck</h2>
        <p className="text-gray-500">Manually add your cards below to create a custom study set.</p>
      </div>

      <form onSubmit={handleManualSubmit} className="space-y-6">
        <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              placeholder="e.g., Biology 101"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              placeholder="Brief overview..."
            />
          </div>
        </div>

        <div className="space-y-4">
          {cards.map((card, index) => (
            <div key={card.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative group transition-all hover:shadow-md">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => removeCard(card.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                  disabled={cards.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Card {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Front (Question)</label>
                  <textarea
                    value={card.front}
                    onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-24"
                    placeholder="Enter term..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Back (Answer)</label>
                  <textarea
                    value={card.back}
                    onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-24"
                    placeholder="Enter definition..."
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-4 z-10 flex flex-col sm:flex-row gap-4 bg-gray-50/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50">
          <button
            type="button"
            onClick={addCard}
            className="flex-1 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center space-x-2 bg-white"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Card</span>
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Deck</span>
          </button>
        </div>
      </form>
    </div>
  );
};
