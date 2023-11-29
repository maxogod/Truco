import React from 'react';
import { Link } from 'react-router-dom';

const HowToPlayButton: React.FC = () => {
  return (
    <Link to='/rules' 
      className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'
      onClick={() => console.log('RULES!')}>
      <h2 className='text-xl'>How to play</h2>
    </Link>
  );
};

export default HowToPlayButton;
