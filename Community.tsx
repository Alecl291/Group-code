import React, { useState } from 'react';
import { CreateDeckInput } from '../types';
import { Search, Download, Globe, BookOpen, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommunityProps {
  onImport: (deck: CreateDeckInput) => void;
}

const COMMUNITY_DECKS: (CreateDeckInput & { id: string })[] = [
  {
    id: 'comm_1',
    title: 'Spanish Basics',
    description: 'Essential vocabulary for beginners. Learn common greetings and phrases.',
    cards: [
      { front: 'Hola', back: 'Hello' },
      { front: 'Adiós', back: 'Goodbye' },
      { front: 'Gracias', back: 'Thank you' },
      { front: 'Por favor', back: 'Please' },
      { front: '¿Cómo estás?', back: 'How are you?' },
      { front: 'Buenos días', back: 'Good morning' },
      { front: 'Buenas noches', back: 'Good night' }
    ]
  },
  {
    id: 'comm_2',
    title: 'Periodic Table Elements',
    description: 'Learn the symbols and atomic numbers of the first 10 elements.',
    cards: [
      { front: 'H', back: 'Hydrogen (1)' },
      { front: 'He', back: 'Helium (2)' },
      { front: 'Li', back: 'Lithium (3)' },
      { front: 'Be', back: 'Beryllium (4)' },
      { front: 'B', back: 'Boron (5)' },
      { front: 'C', back: 'Carbon (6)' },
      { front: 'N', back: 'Nitrogen (7)' },
      { front: 'O', back: 'Oxygen (8)' },
      { front: 'F', back: 'Fluorine (9)' },
      { front: 'Ne', back: 'Neon (10)' }
    ]
  },
  {
    id: 'comm_3',
    title: 'World Capitals',
    description: 'Test your geography knowledge with these capital cities.',
    cards: [
      { front: 'France', back: 'Paris' },
      { front: 'Japan', back: 'Tokyo' },
      { front: 'United Kingdom', back: 'London' },
      { front: 'Germany', back: 'Berlin' },
      { front: 'Brazil', back: 'Brasília' },
      { front: 'Australia', back: 'Canberra' },
      { front: 'Canada', back: 'Ottawa' }
    ]
  },
  {
    id: 'comm_4',
    title: 'JavaScript Concepts',
    description: 'Core concepts for JS developers including closures and async/await.',
    cards: [
      { front: 'Closure', back: 'A function combined with its lexical environment.' },
      { front: 'Promise', back: 'An object representing the eventual completion or failure of an asynchronous operation.' },
      { front: 'Event Loop', back: 'The mechanism that handles asynchronous callbacks in JavaScript.' },
      { front: 'this', back: 'Refers to the object that is executing the current function.' },
      { front: 'Hoisting', back: 'JavaScript\'s behavior of moving declarations to the top.' }
    ]
  },
  {
    id: 'comm_5',
    title: 'Art History',
    description: 'Famous painters and movements from the Renaissance to Modern Art.',
    cards: [
      { front: 'Leonardo da Vinci', back: 'Mona Lisa, The Last Supper' },
      { front: 'Vincent van Gogh', back: 'Starry Night, Sunflowers' },
      { front: 'Pablo Picasso', back: 'Guernica, Cubism founder' },
      { front: 'Claude Monet', back: 'Water Lilies, Impressionism' },
      { front: 'Salvador Dalí', back: 'The Persistence of Memory, Surrealism' }
    ]
  },
  {
    id: 'comm_6',
    title: 'Human Anatomy',
    description: 'Basic bones and major organs of the human body.',
    cards: [
      { front: 'Femur', back: 'The thigh bone, longest bone in the body.' },
      { front: 'Cranium', back: 'The skull, protects the brain.' },
      { front: 'Heart', back: 'Muscular organ that pumps blood.' },
      { front: 'Lungs', back: 'Organs responsible for respiration.' },
      { front: 'Liver', back: 'Detoxifies chemicals and metabolizes drugs.' }
    ]
  }
];

export const Community: React.FC<CommunityProps> = ({ onImport }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleImport = (deck: typeof COMMUNITY_DECKS[0]) => {

    onImport({
      title: deck.title,
      description: deck.description,
      cards: deck.cards.map(c => ({ ...c }))
    });
    navigate('/');
  };

  const filteredDecks = COMMUNITY_DECKS.filter(deck => 
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Community Decks</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          Discover flashcard decks created by the community. 
          Browse our curated collection and add them to your library.
        </p>

        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
            placeholder="Search decks (e.g. 'Science', 'Spanish')..."
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          <span>Available Decks</span>
        </h3>
        
        {filteredDecks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No decks found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDecks.map((deck) => (
              <div
                key={deck.id}
                className="flex flex-col text-left bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group h-full"
              >
                <div className="flex justify-between items-start w-full mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <button 
                    onClick={() => handleImport(deck)}
                    className="flex items-center space-x-1 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>Import</span>
                  </button>
                </div>
                
                <h4 className="font-bold text-gray-900 mb-1">{deck.title}</h4>
                <p className="text-sm text-gray-500 mb-4 flex-1">{deck.description}</p>
                
                <div className="pt-4 border-t border-gray-50 flex items-center text-xs text-gray-400 font-medium">
                  {deck.cards.length} cards
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
