export interface Card {
  id: string;
  problem: string;
  solution: string;
  figmaLink?: string;
  protoLink?: string;
  column: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export type ColumnId = 
  | 'backlog' 
  | 'in-progress' 
  | 'dev-ux-input' 
  | 'iterating' 
  | 'user-testing' 
  | 'ready-handoff';

