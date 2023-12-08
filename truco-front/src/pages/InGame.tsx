import React, { useContext, useEffect } from 'react';
import GameBoard from '../components/inGame/GameBoard';
import Ratings from '../components/inGame/Ratings';
import Chat from '../components/inGame/Chat';
import Ingametimer from '../components/inGame/Ingametimer';
import { GameContext } from '../context/gameContext';
import { useNavigate } from 'react-router-dom';

const InGame: React.FC = () => {

  const { opponentName } = useContext(GameContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!opponentName) {
      navigate("/") // Send to main page if trying to enter /play screen without matchmaking
    }
  }, [])

  return (
    <div className='w-full h-screen flex justify-evenly text-center relative'>
      <div className='w-[70%] p-4 flex flex-col justify-evenly'>
        <Ratings />
        <GameBoard />
        <Ingametimer />
      </div>
      <Chat />
    </div>
  );
};

export default InGame;
