import React, { useContext, useEffect } from 'react';
import GameBoard from '../components/inGame/GameBoard';
import Ratings from '../components/inGame/Ratings';
import Chat from '../components/inGame/Chat';
import Ingametimer from '../components/inGame/Ingametimer';
import { GameContext } from '../context/gameContext';
import { GameAction } from '../gameLogic/type/GameAction';
import { GameActionMessage } from '../gameLogic/type/GameActionMessage';
import { useNavigate } from 'react-router-dom';

const InGame: React.FC = () => {

  const {
    gameManager,
    opponentName,
    setCards,
    isMyTurn,
    cards,
    actions
  } = useContext(GameContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!opponentName) {
      navigate("/") // Send to main page if trying to enter /play screen without matchmaking
    }
  }, [])

  const playAction = (actionName: GameAction) => {
    let payload = {}
    if (actionName === GameAction.PLACE_CARD) {
      payload = { card: cards[0] }
      setCards(cards.slice(1))
    }
    gameManager.sendAction(new GameActionMessage(actionName, payload))
  }

  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

  return (
    <div className='w-full h-screen flex justify-evenly text-center relative'>
      <div className='w-[70%]'>
        <Ratings />
        <GameBoard />
        <Ingametimer />

        <div>
          {opponentName && <div>Match found! Opponent: {opponentName}</div>}
          {isMyTurn ? actions.map((action, index) => {
            return <button className={buttonStyle} key={index} onClick={() => playAction(action)}>{action}</button>
          }) : ""}
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default InGame;
