import React from 'react';
import TrucoLogo from '../components/navbarElements/TrucoLogo.tsx';
import PlayNowButton from '../components/matchmaking/PlayNowButton.tsx';
import FriendsList from '../components/navbarElements/FriendsList.tsx';
import HowToPlayButton from '../components/navbarElements/HowToPlayButton.tsx';
import LeaderBoardButton from '../components/navbarElements/LeaderBoardButton.tsx';
import GameLogicTest from '../components/examples/GameLogicTest.tsx';

const MainSideBar: React.FC = () => {
  return (
    <div className='w-[300px] relative h-screen flex flex-col items-center justify-evenly bg-secondary'>
      <TrucoLogo />
      <PlayNowButton />
      {/* <GameLogicTest /> */}
      <FriendsList />
      <HowToPlayButton />
      <LeaderBoardButton />
    </div>
  );
};

export default MainSideBar;
