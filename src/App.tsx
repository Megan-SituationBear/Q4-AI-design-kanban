import { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TopNav from './components/TopNav';
import { Card } from './types';
import './App.css';

function App() {
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      problem: 'Users can\'t find the login button',
      solution: 'Move authentication to top-right corner with clear CTA',
      figmaLink: 'https://figma.com/example',
      protoLink: 'https://megan-situationbear.github.io/Mego-Proto-Experiments/',
      column: 'backlog',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      problem: 'Onboarding flow is too long',
      solution: 'Reduce steps from 5 to 3, combine name + interests',
      figmaLink: 'https://figma.com/example',
      protoLink: 'https://megan-situationbear.github.io/Mego-Proto-Experiments/',
      column: 'in-progress',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

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

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <KanbanBoard
        cards={cards}
        onMoveCard={handleMoveCard}
        onAddCard={handleAddCard}
        onUpdateCard={handleUpdateCard}
        onDeleteCard={handleDeleteCard}
      />
    </div>
  );
}

export default App;
