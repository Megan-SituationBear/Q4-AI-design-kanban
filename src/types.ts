export type Theme = string; // dynamic themes

export type Role = 'admin' | 'viewer';

export interface Member {
  id: string;
  email: string;
  role: Role;
}

export interface Card {
  id: string;
  problem: string;
  description?: string;
  docLink?: string;
  column: string;
  theme: Theme;
  rating: 1 | 2 | 3 | 4 | 5; // how big a problem?
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


