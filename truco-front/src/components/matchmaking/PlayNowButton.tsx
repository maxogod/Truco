import { useRef, useState, useContext, useEffect } from 'react';
import Timer from './matchmakingTimer';
import { usePusherListeners } from '../../hooks/usePusherListeners';
import { GameContext } from '../../context/gameContext';
import { UserContext } from '../../context/userContext';

const PlayNowButton = () => {

  const {
    gameManager,
    opponentName,
    closeSideBar,
  } = useContext(GameContext)

  const { user } = useContext(UserContext)

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);

  usePusherListeners(setGameEnded)

  useEffect(() => {
    if (gameEnded) {
      setIsSearching(false)
      setGameEnded(false)
      isSearchingRef.current = false
    }
  }, [gameEnded])

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
    }, 3000)
  }

  return (
    <>
      <button
        onClick={toggleMatchmaking}
        disabled={opponentName !== "" || !user}
        style={opponentName !== "" || !user ? { backgroundColor: "gray" } : {}}
        className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'>
        <h2 className='font-medium text-2xl'>{isSearching ? "Cancel" : "Play Now"}</h2>
      </button>
      {isSearching && !opponentName && <Timer />}
    </>
  );
};

export default PlayNowButton;
