import React from 'react';
import send from '../assets/Send_hor_fill.png';

const Chat: React.FC = () => {
  return (
    <div className='w-[280px] h-[715px] mr-12 border-2 border-primary bg-secondary rounded-3xl relative'>
      <div className='absolute bottom-4 right-1/2 translate-x-1/2 w-[80%]'>
        <input
          type="text"
          className='w-full h-[50px] border-2 border-primary bg-secondary rounded-3xl pl-4 pr-12'>
        </input>
        <img src={send} alt="" className='absolute w-[30px] h-[30px] top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'/>
      </div>
    </div>  
  );
};

export default Chat;
