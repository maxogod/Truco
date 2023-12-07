import { useRef, useState, useContext, useEffect } from 'react';
import Timer from './matchmakingTimer';
import { usePusherListeners } from '../../hooks/usePusherListeners';
import { GameContext } from '../../context/gameContext';
import React from 'react';
import GameStateManager from '../../gameLogic/GameStateManager';



const PlayNowButton = () => {

  const {    
    gameManager,
    opponentName,
  } = useContext(GameContext)

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Play Now");
  const [surrenderButtonText, setSurrenderButtonText] = useState<string>("");
  const [showSurrenderButton, setShowSurrenderButton] = useState<boolean>(false);


  usePusherListeners(setGameEnded)
  const gameStateManager = new GameStateManager();

  useEffect(() => {
    if (!isSearching && (opponentName == "")) {
      setShowSurrenderButton(false); 
      
      
    }
    if (isSearching && opponentName == "") {
      setButtonText("Cancel");
    }

    if (!(opponentName == "")){
      setSurrenderButtonText("Surrender");
      setIsSearching(false);
    }
    
    if (gameEnded) {
      setIsSearching(false)
      isSearchingRef.current = false
      setButtonText("Play now");
     
      
    }
    
  }, [isSearching, opponentName, gameEnded]);


  const toggleMatchmaking = () => {
    if(isSearching && !(opponentName == "")){
      setGameEnded(true);
      setIsSearching(false)
      isSearchingRef.current = false
      
    }
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

  const handleSurrenderButton = () => {
    setGameEnded(true);
    setIsSearching(false)
    isSearchingRef.current = false
    gameStateManager.givePoints(false, 15);
    setSurrenderButtonText("");

  };


  return (
    <>
      <button onClick={toggleMatchmaking}  style={!(opponentName == "") || isSearching ? { backgroundColor: "gray" } : {}}
        className='w-[80%] h-[50px] bg-primary rounded-lg flex justify-center items-center'>
        <h2 className='font-medium text-2xl'>{buttonText}</h2>
      </button>
      {isSearching && !opponentName && <Timer />}
       {/* Botón adicional */}
       {showSurrenderButton}  
        <button
          onClick={handleSurrenderButton}
          style={opponentName !== "" ? { backgroundColor: "#cc3333" } : {} }
          className='w-[80%] h-[50px] bg-secondary rounded-lg flex justify-center items-center mb-4 mt-4'
        >
          <h2 className='font-medium text-2xl'>{surrenderButtonText}</h2>
        </button>


</>
);
};


export default PlayNowButton;
