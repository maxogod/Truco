import React from 'react';



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

            <p className=" m-auto flex relative justify-evenly">After the Flor and Envido, 
            the game is divided in three rounds.
             In each round, each player chooses one of the cards in their hand to compete against the card of the other player. The winner is the one who wins two rounds out of three. 

The player who first reaches 30 points(or 15 points depending the variant of the game) in total wins the match.

            </p>
            <h3 className='font-medium text-2xl'>TRUCO</h3>
            <p className=" m-auto flex relative justify-evenly"> The players can make a bet called "**Truco**" any time in the game. If **Truco** is called and accepted, the players lose the chance to call **Envido**, but the other player can call envido over the truco call invalidating it (although it can be called again after envido). If there is no bet one point goes to the winner of the round. The players can raise the bet only one time in this order:
            </p>
            
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li>Truco:  2 points.</li>
                <li>Retruco: 3 points.</li>
                <li>Vale 4: 4 points.</li>
            </ul>

            <p className="h-[48px] m-auto flex relative justify-evenly"> Players can accept, reject or raise the bet:
            </p>
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li>Accept:  the points in dispute go to the winner of the round.</li>
                <li>Reject: the player loses the round and the points go to the other player.</li>
                <li>Raise: the player can raise the bet.</li>
            </ul>
            <h3 className='font-medium text-2xl'>ENVIDO</h3>

            <p className="h-[48px] m-auto flex relative justify-evenly"> At the beginning of the round, a player in his turn can call for **envido** 
            then an option will apear for the other player to respond to this bet in any of these ways:
            </p>
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li> Quiero: accepts to take the bet.</li>
                <li> Envido: raise the bet by 2 points.</li>
                <li> Real envido: raise the bet by 3 points.</li>
                <li> No quiero: refuses to take the last bet. </li>
            </ul>
            <p className="h-[48px] m-auto flex relative justify-evenly"> 
            A player can make any of the envido bets first, for example a player could start with real envido. If any of this bets is rejected wihout a raise the winner obtains 1 point. Players can't call **real envido** or **falta envido** more than one time.
            If no one calls for envido, there is no score for it.   
            The cards are counted as follow:
            </p>
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li> same suit: the sum of the two cards + 20 (10,11 and 12 add no value).</li>
                <li> all different suits: the value of the highest card in the hand.</li>
            </ul>

            <p className="h-[48px] m-auto flex relative justify-evenly"> 

            the highest envido is worth 33 (7-6 of the same suit) and the lowest 0 (11-13 different suits; 10, 11 and 12 add no value).
The players compare the two cards they have chosen and whoever has the highest score wins the points of envido. If there is a tie the winner is the hand-player.
            </p>
            
            
 

    
     
        </div>
       
      );
    };

export default Rules;