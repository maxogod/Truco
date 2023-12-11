import React, { useContext } from 'react';
import { GameContext } from '../../context/gameContext';
import { GameActionMessage } from '../../gameLogic/type/GameActionMessage';
import { GameAction } from '../../gameLogic/type/GameAction';

const actionNames: { [key: string]: string } = {
  "call-envido": "Envido",
  "call-envido-envido": "Envido",
  "call-real-envido": "Real Envido",
  "call-falta-envido": "Falta Envido",
  "call-envido-va-primero": "Envido",
  "call-truco": "Truco",
  "call-retruco": "Retruco",
  "call-vale4": "Vale 4",
  "quiero": "Quiero",
  "no-quiero": "No Quiero",
  "ir-al-mazo": "Mazo",
}

const TrucoActions: React.FC = () => {

  const { gameManager, isMyTurn, actions } = useContext(GameContext)

  const handleAction = (action: GameAction) => {
    gameManager.sendAction(new GameActionMessage(action, {}))
  }

  return (
    <div
      style={!isMyTurn ? { backgroundColor: "gray" } : {}}
      className='w-fit md:w-[150px] px-2 flex md:flex-col justify-center items-center gap-1 rounded-xl bg-primary absolute bottom-[-30px] md:bottom-[50%] md:translate-y-1/2 md:left-[-20px] text-white font-medium text-2xl z-20'>

      {actions.map((action: GameAction, index) => (
        action != GameAction.PLACE_CARD && <button
          onClick={() => handleAction(action)}
          className='hover:bg-[#83A0BE] w-full py-2 md:py-4 text-center rounded-xl text-base md:text-base'
          key={index}>
          {actionNames[action]}
        </button>
      ))}

      {
        !actions.length &&
        <button
          disabled={!isMyTurn}
          style={!isMyTurn ? { backgroundColor: "gray" } : {}}
          className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'>
          Mazo
        </button>
      }
    </div>
  );
};

export default TrucoActions;
