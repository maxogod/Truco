import { useRef, useState, useContext, useEffect } from 'react';
import Timer from './matchmakingTimer';
import { usePusherListeners } from '../../hooks/usePusherListeners';
import { GameContext } from '../../context/gameContext';

const PlayNowButton = () => {

  const {
    gameManager,
    opponentName,
  } = useContext(GameContext)

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Play Now");


  usePusherListeners(setGameEnded)

  useEffect(() => {
    if (isSearching && opponentName == "") {
      setButtonText("Cancel");
    }
    if(isSearching && !(opponentName == "")){
      setButtonText("Surrender");
    }
    
    if (gameEnded) {
      setIsSearching(false)
      isSearchingRef.current = false
      setButtonText("Play again?");
    }
    
  }, [isSearching, opponentName, gameEnded]);

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
        <h2 className='font-medium text-2xl'>{buttonText}</h2>
      </button>
      {isSearching && !opponentName && <Timer />}
    </>
  );
};

export default PlayNowButton;
