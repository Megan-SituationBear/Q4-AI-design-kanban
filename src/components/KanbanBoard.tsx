import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { Card, ColumnId } from '../types';

interface KanbanBoardProps {
  cards: Card[];
  onMoveCard: (cardId: string, newColumn: string) => void;
  onAddCard: (card: Card) => void;
  onUpdateCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
}

const columns: { id: ColumnId; title: string }[] = [
  { id: 'backlog', title: 'Problems to Solve' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'dev-ux-input', title: 'Dev and UX Input' },
  { id: 'iterating', title: 'Iterating' },
  { id: 'user-testing', title: 'User Testing Needed' },
  { id: 'ready-handoff', title: 'Ready For Handoff' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  cards,
  onMoveCard,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
}) => {
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const handleDragStart = (card: Card) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggedCard) {
      onMoveCard(draggedCard.id, columnId);
      setDraggedCard(null);
    }
  };

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex gap-4 min-w-max">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            cards={cards.filter((card) => card.column === column.id)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddCard={onAddCard}
            onUpdateCard={onUpdateCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

