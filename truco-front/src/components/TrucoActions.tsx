import React from 'react';

const TrucoActions: React.FC = () => {
  return (
    <div className='w-[150px] h-[300px] flex flex-col justify-center items-center rounded-xl bg-primary absolute left-[-20px] text-white font-medium text-2xl'>
      {/*
        <TrucoButton />
        <EnvidoButton />
        <FlorButton />
        <MazoButton />
        */}
      <div className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'>Truco</div>
      <div className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'>Envido</div>
      <div className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'>Flor</div>
      <div className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'>Mazo</div>
    </div>
  );
};

export default TrucoActions;
