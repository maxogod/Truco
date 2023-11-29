import React, { useState } from 'react';

const Score: React.FC = () => {
  const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);

    const handleScoreChange = (team, amount) => {
      if (team === 'A') {
        setTeamAScore((prevScore) => prevScore + amount);
      } else if (team === 'B') {
        setTeamBScore((prevScore) => prevScore + amount);
      }
    };

  return (
    <div className='w-[250px] h-[190px] rounded-xl bg-background text-white shadow-card flex justify-center rotate-6 right-10'>
              <div className='flex flex-col justify-center'>
                <h2>You</h2>
                <p>Score: {teamAScore}</p>
                <div >
                  <button onClick={() => handleScoreChange('A', 1)}>Increment</button>
                  <button onClick={() => handleScoreChange('A', -1)}>Decrement</button>
                </div>
              </div>
              <div className='flex flex-col justify-center'>
                <h2>He</h2>
                <p>Score: {teamBScore}</p>
                <div >
                  <button onClick={() => handleScoreChange('B', 1)}>Increment</button>
                  <button onClick={() => handleScoreChange('B', -1)}>Decrement</button>
                </div>
              </div>
    </div>
  );
};


export default Score;
