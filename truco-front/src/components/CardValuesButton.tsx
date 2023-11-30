import React from 'react';
import { Link } from 'react-router-dom';

const CardValuesButton: React.FC = () => {
  return (
    <Link to='/cardValues' 
      className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'
      onClick={() => console.log('Card Values!')}>
      <h2 className='text-xl'>Card Values</h2>
    </Link>
  );
};

export default CardValuesButton;
