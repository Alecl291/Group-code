export innterface Card {
  id: string;
  front: string;
  back: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Card[];
  createdAt: number;
  isCommunity?: boolean;
  color?: string;
  icon?: string;
}

export type CreateDeckInput {
  title: string;
  description: string;
  cards: Omit<Card, 'id'>[];
}
