import React from 'react';
import Ratings from '../components/Ratings';



const Rules: React.FC = () => {
    return (
        <div className="w-full h-full text-center relative bg-[url('assets/mesa.jpg')]">    
         <h2 className='font-medium text-2xl'>HOW TO PLAY</h2>      
            <p className=" m-auto flex relative justify-evenly">Truco is a card game played between two players (or in pairs)
                 with a spanish deck (40 cards) wihout 8s, 9s or jokers. There are three ways of scoring points:           
            </p>
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li>Truco: the players compare three cards of the same suits.</li>
                <li>Envido: the players compare two cards of the same suits.</li>
                <li>Flor: the cards are compared individually.</li>
            </ul>

            <p className="h-[48px] m-auto flex relative justify-evenly">After the Flor and Envido, 
            the game is divided in three rounds.
             In each round, each player chooses one of the cards in their hand to compete against the card of the other player. The winner is the one who wins two rounds out of three. 

The player who first reaches 30 points(or 15 points depending the variant of the game) in total wins the match.

            </p>
            
     

        </div>
      
      );
    };

export default Rules;