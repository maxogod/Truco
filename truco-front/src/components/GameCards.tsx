import React from 'react';
import { useState } from 'react';

const GameCards: React.FC = () => {
  const [deck, setDeck] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [opponentCards, setOpponentCards] = useState([]);

  return (
    <div className='w-[60%] h-full bg-slate-600'>
      Game Cards
    </div>
  );
};

export default GameCards;
