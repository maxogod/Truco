import React from 'react';
import Card from './Card';

const GameCards: React.FC = () => {

  return (
    <div className='w-[60%] h-full flex justify-center items-center'>
      <Card value={1} suit='basto' />
      <Card value={7} suit='espada' />
      <Card value={3} suit='copa' />
    </div>
  );
};

export default GameCards;
