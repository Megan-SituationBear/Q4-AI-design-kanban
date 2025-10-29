import { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TopNav from './components/TopNav';
import type { Card, Theme } from './types';
import './App.css';

const themes: Theme[] = ['onboarding', 'integrations', 'library', 'pricing', 'ai-input', 'layout'];

function App() {
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      problem: 'Users can\'t find the login button',
      solution: 'Move authentication to top-right corner with clear CTA',
      figmaLink: 'https://figma.com/example',
      protoLink: 'https://megan-situationbear.github.io/Mego-Proto-Experiments/',
      column: 'problems',
      themes: ['onboarding', 'layout'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      problem: 'Onboarding flow is too long',
      solution: 'Reduce steps from 5 to 3, combine name + interests',
      figmaLink: 'https://figma.com/example',
      protoLink: 'https://megan-situationbear.github.io/Mego-Proto-Experiments/',
      column: 'on-deck',
      themes: ['onboarding'],
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
    : cards.filter(card => 
        selectedThemes.some(theme => card.themes.includes(theme))
      );

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
      />
      <KanbanBoard
        cards={filteredCards}
        onMoveCard={handleMoveCard}
        onAddCard={handleAddCard}
        onUpdateCard={handleUpdateCard}
        onDeleteCard={handleDeleteCard}
      />
    </div>
  );
}

export default App;
