import React from 'react';
import { Link } from 'react-router-dom';

const TrucoRulesButton: React.FC = () => {
  return (
    <Link to='/rules/trucoRules' 
      className='w-[13%] h-[50px] bg-primary rounded-lg flex justify-center items-center'
      onClick={() => console.log('TRUCO RULES!')}>
      <h2 className='text-xl'>TRUCO</h2>
    </Link>
  );
};

export default TrucoRulesButton;
