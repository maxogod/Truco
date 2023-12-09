import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../../context/gameContext';

const HowToPlayButton: React.FC = () => {
  const {closeSideBar} = useContext(GameContext)
  return (
    <Link to="/rules"
      className='w-[80%] h-[40px] bg-primary rounded-lg flex justify-center items-center' 
      onClick={closeSideBar}>
      <h2 className='text-lg'>How to play</h2>
    </Link>
  );
};

export default HowToPlayButton;
