import GameCards from "./cards/GameCards";
import Score from "./Score";
import TrucoActions from "./TrucoActions";

const GameBoard = () => {

    return (
        <div className="w-full h-[715px] flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
            <TrucoActions />
            <GameCards />
            <Score />
        </div>
    );
}

export default GameBoard;