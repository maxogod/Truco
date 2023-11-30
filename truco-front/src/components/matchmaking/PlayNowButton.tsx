import { useRef, useState, useEffect } from 'react';
import GameManager from '../../gameLogic/GameManager';
import Timer from './matchmakingTimer';
import { GameAction } from '../../gameLogic/type/GameAction';
import { Card } from '../../gameLogic/Cards/Card';
import { usePusherListeners } from '../../hooks/usePusherListeners';

const PlayNowButton = () => {

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);

  const [opponentName, setOpponentName] = useState<string>("");
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [actions, setActions] = useState<GameAction[]>([])
  const [cards, setCards] = useState<Card[]>([])

  const gameManager = GameManager.getInstance()

  usePusherListeners(gameManager, setOpponentName, setCards, setActions, setIsMyTurn)

  const toggleMatchmaking = () => {
    if (isSearchingRef.current) {
      setIsSearching(false)
      isSearchingRef.current = false
      gameManager.leaveMatchmaking()
      return
    }

    setIsSearching(true)
    isSearchingRef.current = true

    setTimeout(() => {
      if (!isSearchingRef.current) return
      gameManager.joinMatchmaking()
    }, 4000)
  }

  return (
    <>
      <button onClick={toggleMatchmaking} disabled={opponentName !== ""} style={opponentName !== "" ? { backgroundColor: "gray" } : {}}
        className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'>
        <h2 className='font-medium text-2xl'>{isSearching ? "Cancel" : "Play Now"}</h2>
      </button>
      {isSearching && <Timer />}
    </>
  );
};

export default PlayNowButton;
