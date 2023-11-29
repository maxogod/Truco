import React, { useState, useEffect } from 'react';

const Ingametimer = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {

      if (seconds > 0) {
       setSeconds(seconds - 1)
      }
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [seconds]); // Dependency array ensures the effect runs everytime seconds changes

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Timer</h1>
      <p style={styles.timer}>Elapsed Time: {formatTime(seconds)}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    color: '#333',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
  },
  timer: {
    fontSize: '36px',
    color: '#4285f4',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default Ingametimer;