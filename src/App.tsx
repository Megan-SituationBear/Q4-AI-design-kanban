import { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TopNav from './components/TopNav';
import ShareModal from './components/ShareModal';
import type { Card, Theme, Member, Role } from './types';
import './App.css';

const themes: Theme[] = ['onboarding', 'integrations', 'library', 'pricing', 'ai-input', 'layout'];

function App() {
  const [shareOpen, setShareOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([
    { id: 'me', email: 'you@example.com', role: 'admin' },
  ]);
  const [currentRole, setCurrentRole] = useState<Role>('admin');
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      problem: 'Users can\'t find the login button',
      description: 'Primary action is hidden in overflow menu on desktop.',
      docLink: 'https://figma.com/example',
      column: 'problems',
      theme: 'layout',
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      problem: 'Onboarding flow is too long',
      description: 'Reduce steps; users drop at step 3 of 5.',
      docLink: 'https://megan-situationbear.github.io/Mego-Proto-Experiments/',
      column: 'on-deck',
      theme: 'onboarding',
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);

  const handleMoveCard = (cardId: string, newColumn: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? { ...card, column: newColumn, updatedAt: new Date() }
          : card
      )
    );
  };

  const handleAddCard = (card: Card) => {
    setCards(prevCards => [...prevCards, card]);
  };

  const handleUpdateCard = (updatedCard: Card) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const toggleTheme = (theme: Theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const filteredCards = selectedThemes.length === 0 
    ? cards 
    : cards.filter(card => selectedThemes.includes(card.theme));

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <TopNav 
        themes={themes}
        selectedThemes={selectedThemes}
        onToggleTheme={toggleTheme}
        onOpenShare={() => setShareOpen(true)}
      />
      <KanbanBoard
        cards={filteredCards}
        onMoveCard={handleMoveCard}
        onAddCard={handleAddCard}
        onUpdateCard={handleUpdateCard}
        onDeleteCard={handleDeleteCard}
        canEdit={currentRole === 'admin'}
      />
      <ShareModal 
        open={shareOpen}
        members={members}
        onClose={() => setShareOpen(false)}
        onSave={(m) => { setMembers(m); setShareOpen(false); }}
      />
    </div>
  );
}

export default App;
