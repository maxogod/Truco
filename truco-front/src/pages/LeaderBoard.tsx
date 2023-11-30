import React from 'react';

const LeaderBoard: React.FC = () => {
  return (
    <div className='flex flex-col justify-evenly items-center w-full'>
      <h1 className='text-4xl font-bold'>Leader Board</h1>
      <div className="w-[85%] h-[80vh] p-8 flex relative justify-evenly items-start rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card overflow-auto">
        <div className='flex flex-col items-center text-2xl gap-2'>
          <h2 className='font-medium mb-4'>Username</h2>
          <p>Cofi</p>
          <p>Cofi</p>
          <p>Cofi</p>
          <p>Cofi</p>
          <p>Cofi</p>
        </div>
        <div className='flex flex-col items-center text-2xl gap-2'>
          <h2 className='font-medium mb-4'>Rating</h2>
          <p>1239</p>
          <p>1239</p>
          <p>1239</p>
          <p>1239</p>
          <p>1239</p>
        </div>
        <div className='flex flex-col items-center text-2xl gap-2'>
          <h2 className='font-medium mb-4'>Matches</h2>
          <p>234</p>
          <p>234</p>
          <p>234</p>
          <p>234</p>
          <p>234</p>
        </div>
        <div className='flex flex-col items-center text-2xl gap-2'>
          <h2 className='font-medium mb-4'>Ranking</h2>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
