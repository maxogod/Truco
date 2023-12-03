import React from 'react';
import { GameContext } from '../../context/gameContext';
import { useContext } from 'react';

const Ratings: React.FC = () => {

  const { opponentName } = useContext(GameContext)

  return (
    <div>
      <p className='my-14'>You (435) vs {`${opponentName}`} (478)</p>
    </div>
  );
};

export default Ratings;
