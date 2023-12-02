import { useRef, useState, useContext } from 'react';
import Timer from './matchmakingTimer';
import { usePusherListeners } from '../../hooks/usePusherListeners';
import { GameContext } from '../../context/gameContext';

const PlayNowButton = () => {

  const {
    gameManager,
    opponentName,
  } = useContext(GameContext)

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);


  usePusherListeners()

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
      {isSearching && !opponentName && <Timer />}
    </>
  );
};

export default PlayNowButton;
