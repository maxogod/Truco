import React from 'react';

const HowToPlayButton: React.FC = () => {
  return (
    <button 
      className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'
      onClick={() => console.log('Play now!')}>
      <h2 className='text-xl'>How to play</h2>
    </button>
  );
};

export default HowToPlayButton;
