import React from 'react';
import TrucoLogo from './TrucoLogo';
import PlayNowButton from './PlayNowButton';
import FriendsList from './FriendsList';
import HowToPlayButton from './HowToPlayButton';

import LeaderBoardButton from '../components/LeaderBoardButton.tsx';


const MainSideBar: React.FC = () => {
  return (
    <div className='w-[300px] relative h-screen flex flex-col items-center justify-evenly bg-secondary'>
      <TrucoLogo/>
      <PlayNowButton/>
      <FriendsList/>
      <HowToPlayButton/>

      <LeaderBoardButton/>

    </div>
  );
};

export default MainSideBar;
