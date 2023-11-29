import React from 'react';

import cardsOrder from '../assets/cardscut.png';


const Rules: React.FC = () => {
  return (
    <div className='w-full flex justify-evenly px-8'>
      <div className='w-1/2'>
        <h1 className='font-bold text-3xl my-10 text-center'>Truco Rules</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, tempora harum a laboriosam deleniti impedit, similique itaque placeat magni tempore omnis officia ad? Amet libero cum, iusto dolorem aliquid doloribus? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eius molestiae delectus saepe qui quos accusantium iure voluptas minima suscipit neque ab sed facilis dicta voluptates, vero laborum, rerum omnis!</p>
      </div>
      <div className="w-1/2 h-[90vh] m-auto relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] overflow-auto shadow-card">
        <h1 className='font-bold text-3xl text-center m-4'>Cards from Best to Worst</h1>
        <img src={cardsOrder} alt="cardsOrder" className='h-[90%] m-auto'/>
      </div>
    </div>
  );
};

export default Rules;
