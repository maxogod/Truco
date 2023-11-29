import GameCards from "./GameCards";
import Score from "./Score";
import TrucoActions from "./TrucoActions";

const GameBoard = () => {
    return (
        <div className="w-[715px] h-[715px] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
            <TrucoActions />
            <GameCards />
            <Score />
        </div>
    );
    }

export default GameBoard;