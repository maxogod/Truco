import React from 'react';

interface ScoreProps {
  // Define the props for your component here
}

const Score: React.FC<ScoreProps> = (props) => {
  // Implement your component logic here

  return (
    <div className='w-[120px] h-[190px] rounded-xl bg-background text-white shadow-card flex justify-center rotate-6 absolute right-10'>
      <h3 className='my-4'>You | He</h3>
    </div>
  );
};

export default Score;
