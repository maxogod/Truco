import React, { useContext } from 'react';
import { GameContext } from '../../context/gameContext';

const Score: React.FC = () => {

  const { myPoints, opponentPoints } = useContext(GameContext)

  return (
    <div className='w-[120px] h-[190px] rounded-xl bg-background text-white shadow-card flex justify-evenly rotate-6 absolute right-10'>
      <div className='flex flex-col justify-evenly'>
        <h2>You</h2>
        <p>{myPoints}</p>
      </div>
      <div className='flex flex-col justify-evenly'>
        <h2>He</h2>
        <p>{opponentPoints}</p>
      </div>
    </div>
  );
};


export default Score;
