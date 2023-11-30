import GameCards from "./cards/GameCards";
import Score from "./Score";
import TrucoActions from "./TrucoActions";

const opponentCards = [
    { number: 1, suit: 'basto', power: 1 },
    { number: 4, suit: 'basto', power: 1 },
    { number: 7, suit: 'basto', power: 1 },
]

const myCards = [
    { number: 1, suit: 'oro', power: 1 },
    { number: 4, suit: 'oro', power: 1 },
    { number: 7, suit: 'oro', power: 1 },
]

const GameBoard = () => {
    return (
        <div className="w-[715px] h-[715px] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
            <TrucoActions />
            <GameCards myCards={myCards} opponentCards={opponentCards} />
            <Score />
        </div>
    );
}

export default GameBoard;