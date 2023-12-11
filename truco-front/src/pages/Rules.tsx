import React, { useContext } from 'react';
import cardsOrder from '../assets/cardscut.png';
import { GameContext } from '../context/gameContext';


const Rules: React.FC = () => {
  const {sideBarOpen} = useContext(GameContext)
  const seeRulesOnSmallScreen = (sideBarOpen && window.innerWidth < 768) ? {display: 'none'} : {display: 'flex'}
  return (
    <div className='h-fit md:h-full w-full flex flex-col md:flex-row justify-evenly items-start px-8 overflow-auto ' style={seeRulesOnSmallScreen}>
      <div className='w-full md:w-1/2 flex-1 overflow-y-scroll pb-10'>
        <h1 className='font-bold text-3xl my-10 text-center'>Truco Rules</h1>
        <h2 className='font-medium text-2xl my-2'>HOW TO PLAY</h2>
        <p>Truco is a card game played between two players (or in pairs)
          with a spanish deck (40 cards) wihout 8s, 9s or jokers. There are two ways of scoring points:
        </p>
        <ul className="list-disc list-inside mx-8 relative justify-evenly">
          <li> <b>Truco</b>: the players compare three cards of the same suits.</li>
          <li> <b>Envido</b>: the players compare two cards of the same suits.</li>
        </ul>
        <p>After the Envido,
          the game is divided in three rounds.
          In each round, each player chooses one of the cards in their hand to compete against the card of the other player. The winner is the one who wins two rounds out of three.
          The player who first reaches 30 points (or 15 points depending the variant of the game) in total wins the match.
        </p>
        <hr className="h-px my-1 bg-gray-200 border-0 white:bg-gray-700"></hr>
        <h3 className='font-medium text-2xl my-2'>TRUCO</h3>
        <p> The players can make a bet called Truco any time in the game. If Truco is called and accepted, the players lose the chance to call Envido, but the other player can call envido over the truco call invalidating it (although it can be called again after envido). If there is no bet one point goes to the winner of the round. The players can raise the bet only one time in this order:
        </p>
        <ul className="list-disc list-inside mx-8 relative justify-evenly">
          <li> <b>Truco</b>:  2 points.</li>
          <li> <b>Retruco</b>: 3 points.</li>
          <li> <b>Vale 4</b>: 4 points.</li>
        </ul>

        <p> Players can accept, reject or raise the bet:
        </p>
        <ul className="list-disc list-inside mx-8 relative justify-evenly">
          <li> <b>Accept</b>:  the points in dispute go to the winner of the round.</li>
          <li> <b>Reject</b>: the player loses the round and the points go to the other player.</li>
          <li> <b>Raise</b>: the player can raise the bet.</li>
        </ul>
        <hr className="h-px my-1 bg-gray-200 border-0 white:bg-gray-700"></hr>
        <h3 className='font-medium text-2xl my-2'>ENVIDO</h3>

        <p> At the beginning of the round, a player in his turn can call for envido
          then an option will apear for the other player to respond to this bet in any of these ways:
        </p>
        <ul className="list-disc list-inside mx-8 relative justify-evenly">
          <li> <b>Quiero</b>: accepts to take the bet.</li>
          <li> <b>Envido</b>: raise the bet by 2 points.</li>
          <li> <b>Real envido</b>: raise the bet by 3 points.</li>
          <li> <b>Falta envido</b>: if accepted the one who wins, wins the game.</li>
          <li> <b>No quiero</b>: refuses to take the last bet. </li>
        </ul>
        <p>
          A player can make any of the envido bets first, for example a player could start with real envido. If any of this bets is rejected wihout a raise the winner obtains 1 point. Players can't call real envido or falta envido more than one time.
          If no one calls for envido, there is no score for it.
          The cards are counted as follow:
        </p>
        <ul className="list-disc list-inside mx-8 relative justify-evenly">
          <li> <b>same suit</b>: the sum of the two cards + 20 (10,11 and 12 add no value).</li>
          <li> <b>all different suits</b>: the value of the highest card in the hand.</li>
        </ul>

        <p> the highest envido is worth 33 (7-6 of the same suit) and the lowest 0 (11-13 different suits; 10, 11 and 12 add no value).
          The players compare the two cards they have chosen and whoever has the highest score wins the points of envido. If there is a tie the winner is the hand-player.
        </p>

      </div>
      <div className="w-full md:w-1/2 h-fit md:h-full relative md:sticky md:top-1 justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
        <h1 className='font-bold text-3xl text-center m-4'>Cards from Best to Worst</h1>
        <img src={cardsOrder} alt="cardsOrder" className='h-fit md:h-[90%] m-auto' />
      </div>
    </div>
  );
};

export default Rules;

