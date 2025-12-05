import React from 'react';
import { Link } from 'react-router-dom';
import { Deck } from '../types';
import { Layers, Plus, ArrowRight } from 'lucide-react';

interface HomeProps {
  decks: Deck[];
  deleteDeck: (id: string) => void;
}

const gradientColors = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-indigo-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-green-500',
];

export const Home: React.FC<HomeProps> = ({ decks, deleteDeck }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Library</h2>
          <p className="text-gray-500 text-sm mt-1">
            {decks.length} {decks.length === 1 ? 'deck' : 'decks'} available
          </p>
        </div>
        <Link 
          to="/create" 
          className="hidden sm:flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Deck</span>
        </Link>
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No decks yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create your first flashcard deck to start learning or explore community decks.</p>
          <Link to="/create" className="inline-flex items-center space-x-2 text-blue-600 font-medium hover:underline">
            <span>Create a Deck</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck, idx) => (
            <div key={deck.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden flex flex-col h-full">
              {/* Decorative Header */}
              <div className={`h-24 bg-gradient-to-r ${gradientColors[idx % gradientColors.length]} p-4 flex flex-col justify-end`}>
                <h3 className="text-white font-bold text-lg truncate shadow-black drop-shadow-md">{deck.title}</h3>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                  {deck.description || 'No description provided.'}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                    {deck.cards.length} cards
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (confirm('Are you sure you want to delete this deck?')) {
                          deleteDeck(deck.id);
                        }
                      }}
                      className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
                    >
                      Delete
                    </button>
                    <Link 
                      to={`/study/${deck.id}`}
                      className="inline-flex items-center space-x-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
