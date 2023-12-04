import React, { useState } from 'react';
import send from '../assets/Send_hor_fill.png';
import { useEffect } from 'react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  let channel;
  useEffect(() => {
    channel.bind('message', (data) => {
      setMessages([...messages, data.message]);
    });
  }, [])
 
  const sendMessage = () => {
    channel.trigger('message', { message });
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className='w-[280px] h-[715px] border-2 border-primary bg-secondary rounded-3xl relative top-[136px] p-4 overflow-auto'>
      {messages.map((message, index) => (
        <p key={index} className='text-left text-gray-300'>
          {message}
        </p>
      ))}
      <div className='absolute bottom-4 right-1/2 translate-x-1/2 w-[80%]'>
        <input
          type="text"
          className='w-full h-[50px] border-2 border-primary bg-secondary rounded-3xl pl-4 pr-12'
          placeholder='Type a message'
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e)=> {if(e.key == "Enter"){sendMessage()}}}>
        </input>
        <img onClick={sendMessage} src={send} alt="" className='absolute w-[30px] h-[30px] top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'/>
      </div>
    </div>
  );
};

export default Chat;
