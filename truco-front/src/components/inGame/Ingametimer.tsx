import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../context/gameContext';

const Ingametimer = () => {

  const { timerActive } = useContext(GameContext);

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {

    if (!timerActive) {
      setSeconds(60);
    }

    const intervalId = setInterval(() => {

      if (seconds > 0 && timerActive) {
        setSeconds(seconds - 1)
      }
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [seconds, timerActive]); // Dependency array ensures the effect runs everytime seconds changes

  const formatTime = (timeInSeconds:number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className='text-center mt-10'>
      <p
        style={seconds < 10 ? { color: '#f54e65' } : {}}
        className='text-primary font-bold text-3xl'>{formatTime(seconds)}</p>
    </div>
  );
};

export default Ingametimer;
