import { useState } from 'react';
import type { Card, Theme } from '../types';

const palette = ['#3b82f6','#10b981','#8b5cf6','#f59e0b','#ef4444','#06b6d4','#a3e635','#f472b6','#22d3ee','#f97316'];
const getThemeColor = (name: string) => { let hash=0; for(let i=0;i<name.length;i++){ hash=(hash*31+name.charCodeAt(i))>>>0;} return palette[hash%palette.length]; };
const labelize = (s: string) => s.replace(/[-_]/g,' ').replace(/\s+/g,' ').trim().replace(/\b\w/g, c=>c.toUpperCase());

interface KanbanCardProps {
  card: Card;
  onDragStart: (card: Card) => void;
  onUpdate: (card: Card) => void;
  onDelete: (cardId: string) => void;
  canEdit?: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  onDragStart,
  onUpdate,
  onDelete,
  canEdit = true,
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
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          padding: '16px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
          cursor: 'grab',
          transition: 'all 0.2s'
        }}
        onClick={() => !isEditing && setShowDetails(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Problem (Title) */}
        <h4 style={{ 
          fontWeight: '600', 
          color: '#0f172a', 
          fontSize: '14px', 
          marginBottom: '8px', 
          margin: '0 0 8px 0',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {card.problem}
        </h4>

        {/* Description (Subtitle) */}
        {card.description && (
          <p style={{ 
            fontSize: '12px', 
            color: '#64748b', 
            marginBottom: '12px', 
            margin: '0 0 12px 0',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {card.description}
          </p>
        )}

        {/* Theme Pill + Rating */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '500',
              backgroundColor: getThemeColor(card.theme),
              color: 'white'
            }}
          >
            {labelize(card.theme)}
          </span>
          {canEdit && (
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              <button onClick={(e)=>{ e.stopPropagation(); (window as any).__kanbanReorder?.(card.id,'up'); }} style={{ border:'1px solid #e2e8f0', background:'white', borderRadius:4, padding:'2px 6px', cursor:'pointer' }}>↑</button>
              <button onClick={(e)=>{ e.stopPropagation(); (window as any).__kanbanReorder?.(card.id,'down'); }} style={{ border:'1px solid #e2e8f0', background:'white', borderRadius:4, padding:'2px 6px', cursor:'pointer' }}>↓</button>
            </span>
          )}
          <span style={{ fontSize: '12px', color: '#0f172a' }}>
            {'★'.repeat(card.rating)}{'☆'.repeat(5 - card.rating)}
          </span>
        </div>

        {/* Links */}
        {card.docLink && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={card.docLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                fontSize: '12px', 
                color: '#2563eb', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16l4-4h6a2 2 0 0 0 2-2V2z"/>
              </svg>
              Doc
            </a>
          </div>
        )}
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
                {canEdit && (
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanCard;


