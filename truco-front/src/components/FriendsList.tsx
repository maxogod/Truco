import React from 'react';
import Add from '../assets/Add_round_fill.png'

const FriendsList: React.FC = () => {
  return (
    <div className='w-[80%] h-[460px] relative p-6 border-2 border-primary rounded-lg'>
      <h3 className='font-semibold text-2xl'>Friends</h3>
      <img src={Add} alt='AddFriend' className='w-[44px] h-[44px] absolute right-6 top-5 cursor-pointer'/>
      <div className='w-full mt-10 flex flex-col gap-3'>
        <p>CoFi</p>
        <p>Pedro</p>
        <p>Lucas</p>
        <p>João</p>
      </div>
    </div>
  );
};

export default FriendsList;
