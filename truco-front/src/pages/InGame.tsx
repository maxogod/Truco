import React from 'react';
import GameBoard from '../components/GameBoard';
import Ratings from '../components/Ratings';
import Chat from '../components/Chat';

const InGame: React.FC = () => {
  return (
    <div className='w-full h-full text-center relative'>
      <Ratings/>
      <div className='flex'>
        <GameBoard/>
        <Chat/>
      </div>
    </div>
  );
};

export default InGame;
