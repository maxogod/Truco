import React from 'react';



const TrucoRules: React.FC = () => {
    return (
        <div className="w-full h-full text-center relative bg-[url('assets/mesa.jpg')]">    
         <h2 className='font-medium text-2xl'>TRUCO</h2>      
            <p className=" m-auto flex relative justify-evenly"> The players can make a bet called "**Truco**" any time in the game. If **Truco** is called and accepted, the players lose the chance to call **Envido**, but the other player can call envido over the truco call invalidating it (although it can be called again after envido). If there is no bet one point goes to the winner of the round. The players can raise the bet only one time in this order:
            </p>
            
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li>Truco:  2 points.</li>
                <li>Retruco: 3 points.</li>
                <li>Vale 4: 4 points.</li>
            </ul>

            <p className="h-[48px] m-auto flex relative justify-evenly">APlayers can accept, reject or raise the bet:
            </p>
            <ul className="list-disc list-inside m-auto relative justify-evenly">
                <li>Accept:  the points in dispute go to the winner of the round.</li>
                <li>Reject: the player loses the round and the points go to the other player.</li>
                <li>Raise: the player can raise the bet in this sequence.</li>
            </ul>
            <p className="h-[48px] m-auto flex relative justify-evenly"> 
            no bet <span>&#8594;</span> truco <span>&#8594;</span> retruco <span>&#8594;</span> quiero vale 4
            </p>
 

        </div>
      
      );
    };

export default TrucoRules;