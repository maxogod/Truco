import React from 'react';
import { GameContext } from '../../context/gameContext';
import { useContext } from 'react';

const Ratings: React.FC = () => {

  const { opponentName } = useContext(GameContext)

  return (
    <div>
      <p className='my-14'>You vs {`${opponentName}`}</p>
    </div>
  );
};

export default Ratings;
