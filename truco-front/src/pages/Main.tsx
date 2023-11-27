import React from 'react';
import ExampleGameBoard from '../components/ExampleGameBoard';

const Main: React.FC = () => {
  return (
      <div className='w-full h-full text-center relative'>
        <h1 className='text-4xl font-bold my-14'>Play Truco Online on the #1 Site!</h1>
        <ExampleGameBoard/>
      </div>
  );
};

export default Main;
