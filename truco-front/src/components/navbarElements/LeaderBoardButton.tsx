import React from 'react';
import { Link } from 'react-router-dom';

const LeaderBoardButton: React.FC = () => {
  return (
    <Link to="/leader-board"
      className='w-[80%] h-[40px] bg-primary rounded-lg flex justify-center items-center'>
      <h2 className='text-lg'>Leader Board</h2>
    </Link>
  );
};

export default LeaderBoardButton;
