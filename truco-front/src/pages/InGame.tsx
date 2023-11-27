import React from 'react';
import GameBoard from '../components/GameBoard';
import Ratings from '../components/Ratings';
import Chat from '../components/Chat';

const InGame: React.FC = () => {
  return (
    <div className='w-full h-screen flex justify-evenly text-center relative'>
      <div className='w-[70%]'>
        <Ratings/>
        <GameBoard/>
      </div>
        <Chat/>
    </div>
  );
};

export default InGame;
