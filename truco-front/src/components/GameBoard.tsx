import GameCards from "./GameCards";
import Score from "./Score";
import TrucoActions from "./TrucoActions";

import { useState } from "react";

const GameBoard = () => {
    /*
    const [deck, setDeck] = useState([]);
    const [playedCards, setPlayedCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [opponentCards, setOpponentCards] = useState([]);
    */

    return (
        <div className="w-[715px] h-[715px] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')]">
            <TrucoActions />
            <GameCards />
            <Score />
        </div>
    );
    }

export default GameBoard;