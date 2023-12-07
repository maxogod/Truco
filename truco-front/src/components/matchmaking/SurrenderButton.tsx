import { useRef, useState, useContext, useEffect } from 'react';
import { usePusherListeners } from '../../hooks/usePusherListeners';
import { GameContext } from '../../context/gameContext';
import React from 'react';
import GameStateManager from '../../gameLogic/GameStateManager';




const SurrenderButton = () => {
  

  const {    
    opponentName,
  } = useContext(GameContext)

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const isSearchingRef = useRef<boolean>(false);
  const [surrenderButtonText, setSurrenderButtonText] = useState<string>("");
  const [showSurrenderButton, setShowSurrenderButton] = useState<boolean>(false);
  const WINNER_POINTS = 15;
  const OPPONENT = false;


  usePusherListeners(setGameEnded)
  const gameStateManager = new GameStateManager();

  useEffect(() => {
    if (opponentName == ""){
      if (!isSearching){
        setShowSurrenderButton(false); 
      }
    }
    else{
      setSurrenderButtonText("Surrender");
    }
    
    
    if (gameEnded) {
       setGameEnded(false);
    }
    
  }, [isSearching, opponentName, gameEnded]);

  const handleSurrenderButton = () => {
    setGameEnded(true);
    setIsSearching(false)
    isSearchingRef.current = false
    gameStateManager.givePoints(OPPONENT, WINNER_POINTS);
    setSurrenderButtonText("");
  };


  return (
    <>
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


export default SurrenderButton;
