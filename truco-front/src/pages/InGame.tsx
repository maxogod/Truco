import React, { useContext, useEffect } from 'react';
import GameBoard from '../components/inGame/GameBoard';
import Ratings from '../components/inGame/Ratings';
import Chat from '../components/inGame/Chat';
import chatIcon from "../assets/chatIcon.png";
import Ingametimer from '../components/inGame/Ingametimer';
import { GameContext } from '../context/gameContext';
import { useNavigate } from 'react-router-dom';

const InGame: React.FC = () => {

  const { opponentName } = useContext(GameContext)
  const [chatIsOpen, setChatIsOpen] = React.useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!opponentName) {
      navigate("/") // Send to main page if trying to enter /play screen without matchmaking
    }
  }, [])

  const toggleChat = () => {
    setChatIsOpen(!chatIsOpen);
  }

  const seeOpenChat = {
    display: !chatIsOpen ? 'inline-block' : 'none',
  }
  return (
    <div className='w-full h-screen flex justify-evenly text-center relative'>
      <img className='absolute top-0 right-0 text-3xl m-4 w-8'
        style={seeOpenChat}
        onClick={toggleChat}
        src={chatIcon}/>
      <div className='w-full md:w-[70%] p-4 flex flex-col justify-evenly'>
        <Ratings />
        <GameBoard />
        <Ingametimer />
      </div>
      <Chat chatIsOpen={chatIsOpen} setIsOpen={setChatIsOpen} toggleChat={toggleChat} />
    </div>
  );
};

export default InGame;
