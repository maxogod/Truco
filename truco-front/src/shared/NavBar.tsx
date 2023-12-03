import React from 'react';

import profile from '../assets/User_cicrle_duotone.png';
import login from '../assets/login.png';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    // Add your JSX code for the component here
    <div className='absolute top-7 right-6 cursor-pointer z-20 flex flex-col items-center'>
      <Link to='/profile'>
        <img src={profile} alt="" className=' w-[86px] h-[86px]' />
      </Link>
      <Link to="/login">
        <img src={login} alt="" className='w-[50px] h-[50px] p-3 bg-[#6282a3da] rounded-full' />
      </Link>
    </div>
  );
};

export default NavBar;
