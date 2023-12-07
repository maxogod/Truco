import { useContext } from "react";
import { GameContext } from "../../context/gameContext";
import { GameAction } from "../../gameLogic/type/GameAction";
import { GameActionMessage } from "../../gameLogic/type/GameActionMessage";

const Surrender = () => {

    const { opponentName, gameManager } = useContext(GameContext)

    const handleSurrender = () => {
        gameManager.sendAction(new GameActionMessage(GameAction.SURRENDER, {}))
    }

    return (
        opponentName && <button
            className="w-[80%] h-[50px] bg-red-500 rounded-lg flex justify-center items-center"
            onClick={handleSurrender}>
            <h2 className='font-medium text-2xl'>Surrender</h2>
        </button>
    );
}

export default Surrender;