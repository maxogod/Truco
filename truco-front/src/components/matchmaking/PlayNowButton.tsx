import { useRef, useState, useContext, useEffect } from 'react';
import Timer from './matchmakingTimer';
import { usePusherListeners } from '../../hooks/usePusherListeners';
import { GameContext } from '../../context/gameContext';
import React from 'react';




const PlayNowButton = () => {
  

  const {    
    gameManager,
    opponentName,
  } = useContext(GameContext)

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Play Now");
  const MATCHMAKING_TIME_OUT = 4000;


  usePusherListeners(setGameEnded)

  useEffect(() => {
    if (opponentName == ""){
      if (isSearching){
        setButtonText("Cancel");
      }
    
    if (gameEnded) {
      setGameEnded(false);
      setIsSearching(false)
      setButtonText("Play now");
      
    
  }}}, [isSearching, opponentName, gameEnded]);


  const toggleMatchmaking = () => {
    
    setIsSearching(true)
    isSearchingRef.current = true

    setTimeout(() => {
      if (!isSearchingRef.current) return
      gameManager.joinMatchmaking()
    }, MATCHMAKING_TIME_OUT)
  }

  return (
    <>
      <button onClick={toggleMatchmaking}  style={ isSearching  ? { backgroundColor: "gray" } : {}}
        className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'>
        <h2 className='font-medium text-2xl'>{buttonText}</h2>
      </button>
      {isSearching && !opponentName && <Timer />}
</>
);
};


export default PlayNowButton;
