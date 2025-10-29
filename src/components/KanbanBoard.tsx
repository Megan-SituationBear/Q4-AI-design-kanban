import { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import type { Card, ColumnId } from '../types';

interface KanbanBoardProps {
  cards: Card[];
  onMoveCard: (cardId: string, newColumn: string) => void;
  onAddCard: (card: Card) => void;
  onUpdateCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
  canEdit?: boolean;
  themes?: string[];
  onCreateTheme?: (name: string) => void;
  onReorderWithinColumn?: (cardId: string, direction: 'up' | 'down') => void;
}

const columns: { id: ColumnId; title: string }[] = [
  { id: 'problems', title: 'Problems' },
  { id: 'on-deck', title: 'On Deck' },
  { id: 'feedback-needed', title: 'Feedback Needed' },
  { id: 'ready', title: 'Ready' },
];

// Mobile-first column order (On Deck first)
const getColumnsForScreen = (isMobile: boolean) => {
  if (isMobile) {
    return [
      { id: 'on-deck', title: 'On Deck' },
      { id: 'problems', title: 'Problems' },
      { id: 'feedback-needed', title: 'Feedback Needed' },
      { id: 'ready', title: 'Ready' },
    ];
  }
  return columns;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  cards,
  onMoveCard,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  canEdit = true,
  themes = [],
  onCreateTheme,
  onReorderWithinColumn,
}) => {
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // expose reorder function globally for quick use from cards (avoids deep prop drilling into buttons)
  useEffect(() => {
    (window as any).__kanbanReorder = onReorderWithinColumn;
    return () => { if ((window as any).__kanbanReorder === onReorderWithinColumn) (window as any).__kanbanReorder = undefined; };
  }, [onReorderWithinColumn]);

  const displayColumns = getColumnsForScreen(isMobile);

  return (
    <div style={{ 
      flex: 1, 
      overflowX: 'auto', 
      padding: isMobile ? '12px' : '24px' 
    }}>
      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '12px' : '16px', 
        minWidth: 'max-content' 
      }}>
        {displayColumns.map((column) => (
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
            isMobile={isMobile}
            canEdit={canEdit}
            themes={themes}
            onCreateTheme={onCreateTheme}
            onReorderWithinColumn={onReorderWithinColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

