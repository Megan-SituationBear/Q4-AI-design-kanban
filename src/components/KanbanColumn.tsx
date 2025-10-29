import { useState } from 'react';
import KanbanCard from './KanbanCard';
import type { Card, Theme } from '../types';

const themes: Theme[] = ['onboarding', 'integrations', 'library', 'pricing', 'ai-input', 'layout'];

const themeColors: Record<Theme, string> = {
  'onboarding': '#3b82f6',
  'integrations': '#10b981',
  'library': '#8b5cf6',
  'pricing': '#f59e0b',
  'ai-input': '#ef4444',
  'layout': '#06b6d4'
};

const themeLabels: Record<Theme, string> = {
  'onboarding': 'Onboarding',
  'integrations': 'Integrations',
  'library': 'Library',
  'pricing': 'Pricing',
  'ai-input': 'AI Input',
  'layout': 'Layout'
};

interface KanbanColumnProps {
  column: { id: string; title: string };
  cards: Card[];
  onDragStart: (card: Card) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (columnId: string) => void;
  onAddCard: (card: Card) => void;
  onUpdateCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
  isMobile?: boolean;
  canEdit?: boolean;
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
  isMobile = false,
  canEdit = true,
}) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newProblem, setNewProblem] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDocLink, setNewDocLink] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(3);

  const handleAddCard = () => {
    if (newProblem.trim() && selectedTheme) {
      const newCard: Card = {
        id: Date.now().toString(),
        problem: newProblem,
        description: newDescription,
        docLink: newDocLink || undefined,
        column: column.id,
        theme: selectedTheme,
        rating,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddCard(newCard);
      setNewProblem('');
      setNewDescription('');
      setNewDocLink('');
      setSelectedTheme(null);
      setRating(3);
      setShowAddCard(false);
    }
  };

  const chooseTheme = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div style={{ 
      width: isMobile ? '280px' : '300px', 
      flexShrink: 0, 
      minHeight: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 200px)' 
    }}>
      {/* Column Header */}
      <div style={{ 
        backgroundColor: '#f8fafc', 
        borderTopLeftRadius: '8px', 
        borderTopRightRadius: '8px', 
        padding: '12px 16px', 
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px', margin: 0 }}>
          {column.title}
        </h3>
        <span style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          backgroundColor: 'white', 
          padding: '4px 8px', 
          borderRadius: '12px'
        }}>
          {cards.length}
        </span>
      </div>

      {/* Drop Zone */}
      <div
        style={{ 
          backgroundColor: '#f8fafc', 
          minHeight: 'calc(100vh - 200px)', 
          padding: '12px', 
          borderBottomLeftRadius: '8px', 
          borderBottomRightRadius: '8px'
        }}
        onDragOver={onDragOver}
        onDrop={() => onDrop(column.id)}
      >
        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onDragStart={onDragStart}
              onUpdate={onUpdateCard}
              onDelete={onDeleteCard}
              canEdit={canEdit}
            />
          ))}
        </div>

        {/* Add Card Form */}
        {showAddCard && canEdit ? (
          <div style={{ 
            marginTop: '12px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '16px', 
            border: '2px solid #3b82f6', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* 1) Theme */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#0f172a', marginBottom: '6px' }}>
                Theme
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {themes.map(theme => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => chooseTheme(theme)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      backgroundColor: selectedTheme === theme ? themeColors[theme] : '#f8fafc',
                      color: selectedTheme === theme ? 'white' : '#334155'
                    }}
                  >
                    {themeLabels[theme]}
                  </button>
                ))}
              </div>
            </div>

            {/* 2) Problem */}
            <input
              type="text"
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              placeholder="Problem to Solve"
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '4px', 
                marginBottom: '10px', 
                fontSize: '14px',
                outline: 'none'
              }}
              autoFocus
            />
            
            {/* 3) How big a problem? (rating) */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                How big a problem?
              </label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n as 1 | 2 | 3 | 4 | 5)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: n <= rating ? '#eab308' : '#cbd5e1'
                    }}
                    aria-label={`Set rating ${n}`}
                  >
                    {n <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4) Description */}
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe the context, users, and impact..."
              rows={4}
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '4px', 
                marginBottom: '10px', 
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical'
              }}
            />

            {/* 5) Link to relevant doc */}
            <input
              type="url"
              value={newDocLink}
              onChange={(e) => setNewDocLink(e.target.value)}
              placeholder="https://... (Figma, doc, ticket)"
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '4px', 
                marginBottom: '12px', 
                fontSize: '14px',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleAddCard}
                style={{ 
                  flex: 1, 
                  padding: '6px 12px', 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Add Card
              </button>
              <button
                onClick={() => {
                  setShowAddCard(false);
                  setNewProblem('');
                  setNewSolution('');
                }}
                style={{ 
                  padding: '6px 12px', 
                  border: '1px solid #cbd5e1', 
                  color: '#374151', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCard(true)}
            style={{ 
              marginTop: '12px', 
              width: '100%', 
              padding: '8px 12px', 
              color: '#64748b', 
              backgroundColor: 'transparent',
              borderRadius: '8px', 
              border: '2px dashed #cbd5e1', 
              fontSize: '14px', 
              cursor: 'pointer'
            }}
          >
            + Add Card
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default KanbanColumn;


