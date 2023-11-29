import { Channel, Members } from 'pusher-js';
// import TestEvent from '../Events/TestEvent';
import { getChannelName } from '../utils/pusherNames';
import pusherService, { pusherInit } from '../utils/pusherService';
import { useEffect, useRef, useState } from "react";
import GameManager from '../gameLogic/GameManager';

function GameLogicTest() {
    const [isSearching, setIsSearching] = useState<boolean>(false); 
    const gameManager = GameManager.getInstance()

    const username = "test-name" + Math.floor(Math.random() * 10000) // TODO - replace with the real username once we have users

    useEffect(() => {
        gameManager.initPusher(username)
    },[])
    
    const toggleMatchmaking = () => {
        setIsSearching(!isSearching)
        if(isSearching){
            gameManager.leaveMatchmaking()
        }else{
            gameManager.joinMatchmaking()
        }
    }

    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={toggleMatchmaking}>"{isSearching ? "Stop" : "Play"}"</button>
        </div>
    )
}

export default GameLogicTest