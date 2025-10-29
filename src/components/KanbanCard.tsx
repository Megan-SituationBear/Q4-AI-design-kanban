import { useState } from 'react';
import { Card } from '../types';

interface KanbanCardProps {
  card: Card;
  onDragStart: (card: Card) => void;
  onUpdate: (card: Card) => void;
  onDelete: (cardId: string) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  onDragStart,
  onUpdate,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(card);

  const handleSave = () => {
    onUpdate(editedCard);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCard(card);
    setIsEditing(false);
  };

  return (
    <>
      <div
        draggable
        onDragStart={() => onDragStart(card)}
        className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
        onClick={() => !isEditing && setShowDetails(true)}
      >
        {/* Problem (Title) */}
        <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">
          {card.problem}
        </h4>

        {/* Solution (Subtitle) */}
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">
          {card.solution}
        </p>

        {/* Links */}
        <div className="flex gap-2">
          {card.figmaLink && (
            <a
              href={card.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-blue-600 hover:text-indigo-600 hover:underline flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12.5A3.5 3.5 0 1 1 8.5 9a3.5 3.5 0 0 1 3.5 3.5zm-3.5 7A3.5 3.5 0 1 1 12 16v3.5zm0-14A3.5 3.5 0 1 1 12 2v3.5zm7 3.5A3.5 3.5 0 1 1 12 5.5v3.5h3.5z"/>
              </svg>
              Figma
            </a>
          )}
          {card.protoLink && (
            <a
              href={card.protoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-blue-600 hover:text-indigo-600 hover:underline flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              Proto
            </a>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => !isEditing && setShowDetails(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Edit Card</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Problem to Solve
                  </label>
                  <input
                    type="text"
                    value={editedCard.problem}
                    onChange={(e) => setEditedCard({ ...editedCard, problem: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Proposed Solution
                  </label>
                  <textarea
                    value={editedCard.solution}
                    onChange={(e) => setEditedCard({ ...editedCard, solution: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Figma Link
                  </label>
                  <input
                    type="url"
                    value={editedCard.figmaLink || ''}
                    onChange={(e) => setEditedCard({ ...editedCard, figmaLink: e.target.value })}
                    placeholder="https://figma.com/..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Proto Link
                  </label>
                  <input
                    type="url"
                    value={editedCard.protoLink || ''}
                    onChange={(e) => setEditedCard({ ...editedCard, protoLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-600 hover:shadow-md transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {card.problem}
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Proposed Solution
                  </h4>
                  <p className="text-lg text-slate-700">
                    {card.solution}
                  </p>
                </div>

                {/* Links Section */}
                <div className="mb-6 flex gap-4">
                  {card.figmaLink && (
                    <a
                      href={card.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12.5A3.5 3.5 0 1 1 8.5 9a3.5 3.5 0 0 1 3.5 3.5zm-3.5 7A3.5 3.5 0 1 1 12 16v3.5zm0-14A3.5 3.5 0 1 1 12 2v3.5zm7 3.5A3.5 3.5 0 1 1 12 5.5v3.5h3.5z"/>
                      </svg>
                      View in Figma
                    </a>
                  )}
                  {card.protoLink && (
                    <a
                      href={card.protoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                      View Prototype
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-600 hover:shadow-md transition-all cursor-pointer"
                  >
                    Edit Card
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this card?')) {
                        onDelete(card.id);
                        setShowDetails(false);
                      }
                    }}
                    className="px-6 py-2.5 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanCard;

