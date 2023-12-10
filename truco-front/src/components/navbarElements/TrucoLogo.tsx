import React, { useContext } from 'react';
import mate from '../../assets/mate.png';
import { Link } from 'react-router-dom';
import { GameContext } from '../../context/gameContext';

const TrucoLogo: React.FC = () => {
  const { closeSideBar } = useContext(GameContext)
  return (
    <Link to={"/"} className='w-full relative flex justify-center text-text'
      onClick={closeSideBar}>
      <img src={mate} alt='Logo' className='w-[115px] h-[115px] rotate-6' />
      <h1 className='absolute bottom-1/2 translate-y-3/4 w-full text-center font-bold text-4xl'>Truco.com</h1>
    </Link>
  );
};

export default TrucoLogo;
