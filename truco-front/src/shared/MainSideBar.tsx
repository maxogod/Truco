import React, { useState } from 'react';
import TrucoLogo from '../components/navbarElements/TrucoLogo.tsx';
import PlayNowButton from '../components/matchmaking/PlayNowButton.tsx';
import FriendsList from '../components/navbarElements/FriendsList.tsx';
import HowToPlayButton from '../components/navbarElements/HowToPlayButton.tsx';
import LeaderBoardButton from '../components/navbarElements/LeaderBoardButton.tsx';
import Surrender from '../components/inGame/Surrender.tsx';

const MainSideBar: React.FC = () => {
  const [divStyle, setDivStyle] = useState({});

  const handleClick = () => {
    setDivStyle({ transform: 'translateX(-100%)' });
  };

  return (
    <div className='md:max-w-[300px] md:min-w-[240px] md:relative w-full absolute h-full flex flex-col items-center justify-evenly bg-secondary gap-4 z-40' style={divStyle}>
      <div 
        className='md:hidden'
        onClick={handleClick}>
        {"<"}
      </div>
      <TrucoLogo />
      <PlayNowButton />
      <Surrender />
      <FriendsList />
      <HowToPlayButton />
      <LeaderBoardButton />
    </div>
  );
};

export default MainSideBar;