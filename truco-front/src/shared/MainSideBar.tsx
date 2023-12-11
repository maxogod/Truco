import React from 'react';
import TrucoLogo from '../components/navbarElements/TrucoLogo.tsx';
import PlayNowButton from '../components/matchmaking/PlayNowButton.tsx';
import FriendsList from '../components/navbarElements/FriendsList.tsx';
import HowToPlayButton from '../components/navbarElements/HowToPlayButton.tsx';
import LeaderBoardButton from '../components/navbarElements/LeaderBoardButton.tsx';
import Surrender from '../components/inGame/Surrender.tsx';
import NavBar from './NavBar.tsx';

const MainSideBar: React.FC = () => {

  return (
    <div className='md:max-w-[300px] md:min-w-[240px] md:relative w-full absolute h-screen flex flex-col items-center justify-evenly bg-secondary gap-4 z-40'>
      <NavBar />
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