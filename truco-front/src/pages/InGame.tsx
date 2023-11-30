import React from 'react';
import GameBoard from '../components/inGame/GameBoard';
import Ratings from '../components/inGame/Ratings';
import Chat from '../components/inGame/Chat';
import Ingametimer from '../components/inGame/Ingametimer';

const InGame: React.FC = () => {
  return (
    <div className='w-full h-screen flex justify-evenly text-center relative'>
      <div className='w-[70%]'>
        <Ratings />
        <GameBoard />
        <Ingametimer />
      </div>
      <Chat />
    </div>
  );
};

export default InGame;
