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
}) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);

  const handleAddCard = () => {
    if (newProblem.trim() && newSolution.trim()) {
      const newCard: Card = {
        id: Date.now().toString(),
        problem: newProblem,
        solution: newSolution,
        column: column.id,
        themes: selectedThemes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddCard(newCard);
      setNewProblem('');
      setNewSolution('');
      setSelectedThemes([]);
      setShowAddCard(false);
    }
  };

  const toggleTheme = (theme: Theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
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
            />
          ))}
        </div>

        {/* Add Card Form */}
        {showAddCard ? (
          <div style={{ 
            marginTop: '12px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '16px', 
            border: '2px solid #3b82f6', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
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
                marginBottom: '8px', 
                fontSize: '14px',
                outline: 'none'
              }}
              autoFocus
            />
            <input
              type="text"
              value={newSolution}
              onChange={(e) => setNewSolution(e.target.value)}
              placeholder="Proposed Solution"
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
            
            {/* Theme Selection */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '6px' 
              }}>
                Themes:
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {themes.map(theme => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => toggleTheme(theme)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '10px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      backgroundColor: selectedThemes.includes(theme) 
                        ? themeColors[theme] 
                        : '#f1f5f9',
                      color: selectedThemes.includes(theme) 
                        ? 'white' 
                        : '#64748b',
                      transition: 'all 0.2s'
                    }}
                  >
                    {themeLabels[theme]}
                  </button>
                ))}
              </div>
            </div>
            
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
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;


