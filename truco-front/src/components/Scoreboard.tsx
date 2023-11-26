import React, { useState } from 'react';

const Scoreboard = () => {
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
    <div style={styles.container}>
      <h1>Scoreboard</h1>
      <div style={styles.teamsContainer}>
        <div style={styles.team}>
          <h2>Team A</h2>
          <p>Score: {teamAScore}</p>
          <div style={styles.buttonsContainer}>
            <button onClick={() => handleScoreChange('A', 1)}>Increment</button>
            <button onClick={() => handleScoreChange('A', -1)}>Decrement</button>
          </div>
        </div>
        <div style={styles.team}>
          <h2>Team B</h2>
          <p>Score: {teamBScore}</p>
          <div style={styles.buttonsContainer}>
            <button onClick={() => handleScoreChange('B', 1)}>Increment</button>
            <button onClick={() => handleScoreChange('B', -1)}>Decrement</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  teamsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  team: {
    margin: '20px',
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '8px',
    width: '200px',
  },
  buttonsContainer: {
    marginTop: '10px',
  },
};

export default Scoreboard;
