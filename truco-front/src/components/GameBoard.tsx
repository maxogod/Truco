import React from "react";
import GameCards from "./GameCards";
import Score from "./Score";
import TrucoActions from "./TrucoActions";

const GameBoard = () => {
    /*Feature
Motivation
A game board will be useful to the players in order to have a better experience playing the game and it'll make it easier to play.

Implementation
there will be:

four buttons which include the actions in the game:
-- Envido
-- Truco
-- Flor
-- Mazo

table and both player's cards on opposite sides of the table (the opponent's cards should be face down)

the score in a notepad on the table

played cards will appear face up, showing the winning card on top
*/


    return (
        <div className="w-[715px] h-[715px] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')]">
            <TrucoActions />
            <GameCards />
            <Score />
        </div>
    );
    }

export default GameBoard;