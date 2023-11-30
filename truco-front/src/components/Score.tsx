import React, { useState } from 'react';

const Score: React.FC = () => {
  const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);

    const handleScoreChange = (team, amount) => {
      if (team === 'A') {
        (teamAScore + amount >= 0) && setTeamAScore((prevScore) => prevScore + amount);
      } else if (team === 'B') {
        (teamAScore + amount >= 0) && setTeamBScore((prevScore) => prevScore + amount);
      }
    };

  return (
    <div className='w-[120px] h-[190px] rounded-xl bg-background text-white shadow-card flex justify-evenly rotate-6 absolute right-10'>
      <div className='flex flex-col justify-evenly'>
        <h2>You</h2>
        <p>{teamAScore}</p>
        <div>
          <button className='mr-2' onClick={() => handleScoreChange('A', 1)}>+</button>
          <button onClick={() => handleScoreChange('A', -1)}>-</button>
        </div>
      </div>
      <div className='flex flex-col justify-evenly'>
        <h2>He</h2>
        <p>{teamBScore}</p>
        <div >
          <button className='mr-2' onClick={() => handleScoreChange('B', 1)}>+</button>
          <button onClick={() => handleScoreChange('B', -1)}>-</button>
        </div>
      </div>
    </div>
  );
};


export default Score;
