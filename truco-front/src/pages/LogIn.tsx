import React from 'react';
import { Link } from 'react-router-dom';

const LogIn: React.FC = () => {
  // Add your component logic here

  return (
    // Add your JSX code here
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-4xl font-bold mt-14 text-center'>Play Truco Online on the #1 Site!</h1>
      <form className='w-[480px] h-[660px] flex flex-col justify-evenly items-center rounded-xl m-auto bg-secondary'>
        <h2 className='font-semibold text-4xl'>LOG IN</h2>
        <input type="text" placeholder='Username' className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4 mb-[-20px]'/>
        <input type="password" placeholder='Password' className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4'/>
        <button className='w-[40%] h-[60px] rounded-full bg-primary'>Sign In</button>
        <Link to="/signup " className='text-sm'>Haven´t signed up yet?</Link>
      </form>
    </div>
  );
};

export default LogIn;
