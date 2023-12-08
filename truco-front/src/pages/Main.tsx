import React from 'react';
import ExampleGameBoard from '../components/ExampleGameBoard';

const Main: React.FC = () => {
  return (
    <div className='w-full h-screen text-center relative'>
      <h1 className='text-xl md:text-4xl font-bold my-6 pl-10 md:pl-0'>Play Truco Online on the <span className='text-primary'>#1</span> Site!</h1>
      <ExampleGameBoard />
    </div>
  );
};

export default Main;
