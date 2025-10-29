export type Theme = 
  | 'onboarding'
  | 'integrations'
  | 'library'
  | 'pricing'
  | 'ai-input'
  | 'layout';

export interface Card {
  id: string;
  problem: string;
  solution: string;
  figmaLink?: string;
  protoLink?: string;
  column: string;
  themes: Theme[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export type ColumnId = 
  | 'problems'
  | 'on-deck'
  | 'feedback-needed'
  | 'ready';


