import React from 'react';
import { Link } from 'react-router-dom';

const PlayNowButton: React.FC = () => {
  return (
    <Link to='/play'
      className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'>
      <h2 className='font-medium text-2xl'>Play Now</h2>
    </Link>
  );
};

export default PlayNowButton;
