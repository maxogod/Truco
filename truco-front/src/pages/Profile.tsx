import React from 'react';
import ProfileLogo from '../assets/User_cicrle_duotone.png';

const Profile: React.FC = () => {
  return (
    <>
      <button className='w-[170px] h-[60px] rounded-full bg-primary absolute top-10 right-40 z-20'>Log Out</button>
      <div className="w-[715px] h-[715px] m-auto flex flex-col relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
          <img src={ProfileLogo} alt="" className='w-[150px] h-[150px]'/>
          <div className='flex w-full justify-evenly'>
            <div className='text-center'>
              <h2 className='font-semibold text-3xl mb-2'>Matches</h2>
              <p className='text-3xl'>400</p>
            </div>
            <div className='text-center'>
              <h2 className='font-semibold text-3xl mb-2'>Rating</h2>
              <p className='text-3xl'>10</p>
            </div>
            <div className='text-center'>
              <h2 className='font-semibold text-3xl mb-2'>Ranking</h2>
              <p className='text-3xl'>1643</p>
            </div>
          </div>
          <div className='flex w-full justify-evenly'>
            <div className='text-center'>
              <h2 className='font-semibold text-3xl mb-2'>Wins</h2>
              <p className='text-3xl'>248</p>
            </div>
            <div className='text-center'>
              <h2 className='font-semibold text-3xl mb-2'>Losses</h2>
              <p className='text-3xl'>152</p>
            </div>
          </div>
      </div>
    </>
  );
};

export default Profile;
