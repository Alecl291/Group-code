// types.ts
export interface Card {
  id: string;
  front: string;
  back: string;
}

export interface Deck {
  id: string;
  title: string;
  description?: string;
  cards: Card[];
}

export interface GenerationParams {
  // kept for compatibility with other parts of your app
  difficulty?: 'easy' | 'medium' | 'hard';
  count?: number;
}
