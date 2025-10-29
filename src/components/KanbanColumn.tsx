import { useState } from 'react';
import KanbanCard from './KanbanCard';
import type { Card } from '../types';

interface KanbanColumnProps {
  column: { id: string; title: string };
  cards: Card[];
  onDragStart: (card: Card) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (columnId: string) => void;
  onAddCard: (card: Card) => void;
  onUpdateCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  cards,
  onDragStart,
  onDragOver,
  onDrop,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
}) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');

  const handleAddCard = () => {
    if (newProblem.trim() && newSolution.trim()) {
      const newCard: Card = {
        id: Date.now().toString(),
        problem: newProblem,
        solution: newSolution,
        column: column.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddCard(newCard);
      setNewProblem('');
      setNewSolution('');
      setShowAddCard(false);
    }
  };

  return (
    <div className="w-80 flex-shrink-0">
      {/* Column Header */}
      <div className="bg-slate-50 rounded-t-lg px-4 py-3 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-900 text-sm">{column.title}</h3>
          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
            {cards.length}
          </span>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        className="bg-slate-50 min-h-[calc(100vh-200px)] p-3 rounded-b-lg"
        onDragOver={onDragOver}
        onDrop={() => onDrop(column.id)}
      >
        {/* Cards */}
        <div className="space-y-3">
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onDragStart={onDragStart}
              onUpdate={onUpdateCard}
              onDelete={onDeleteCard}
            />
          ))}
        </div>

        {/* Add Card Form */}
        {showAddCard ? (
          <div className="mt-3 bg-white rounded-lg p-4 border-2 border-blue-500 shadow-md">
            <input
              type="text"
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              placeholder="Problem to Solve"
              className="w-full px-3 py-2 border border-slate-200 rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="text"
              value={newSolution}
              onChange={(e) => setNewSolution(e.target.value)}
              placeholder="Proposed Solution"
              className="w-full px-3 py-2 border border-slate-200 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCard}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium shadow-sm hover:bg-indigo-600 hover:shadow-md transition-all cursor-pointer"
              >
                Add Card
              </button>
              <button
                onClick={() => {
                  setShowAddCard(false);
                  setNewProblem('');
                  setNewSolution('');
                }}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded text-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCard(true)}
            className="mt-3 w-full px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-400 transition-all text-sm cursor-pointer"
          >
            + Add Card
          </button>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;


