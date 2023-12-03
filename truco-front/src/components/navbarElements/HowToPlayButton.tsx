import React from 'react';
import { Link } from 'react-router-dom';

const HowToPlayButton: React.FC = () => {
  return (

    <Link to="/roules" 
      className='w-[80%] h-[40px] bg-primary rounded-lg flex justify-center items-center' >
      <h2 className='text-lg'>How to play</h2>

    </Link>
  );
};

export default HowToPlayButton;
