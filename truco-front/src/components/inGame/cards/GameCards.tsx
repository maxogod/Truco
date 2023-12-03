import { useContext } from 'react';
import CardComponent from './Card';
import { GameContext } from '../../../context/gameContext';
import { GameActionMessage } from '../../../gameLogic/type/GameActionMessage';
import { GameAction } from '../../../gameLogic/type/GameAction';
import { Card, Suit } from '../../../gameLogic/Cards/Card';

const GameCards = () => {

  const { gameManager, cards, opponentCardsNumber, cardsOnBoard } = useContext(GameContext)

  const playCard = (card: Card) => {
    gameManager.sendAction(new GameActionMessage(GameAction.PLACE_CARD, { card }))
  }

  return (
    <div className='w-[60%] h-full relative flex justify-center items-center'>

      <div className='w-full h-fit flex justify-center absolute bottom-10'>
        {cards.map((card, index) => (
          <CardComponent
            cardProps={card}
            key={"myCards" + index}
            onClick={playCard} />
        ))}
      </div>

      <div id='opponent-cards' className='w-full h-fit flex justify-center absolute top-10'>
        {Array.from(Array(opponentCardsNumber).keys()).map((_, index) => (
          <CardComponent
            cardProps={{ number: 1, suit: Suit.Espada, power: 0 }}
            key={"oponentCards" + index} />
        ))}
      </div>

      <div className='absolute pl-10 w-full'>
        <div className='w-full h-fit flex gap-7 justify-start'>
          {cardsOnBoard.map((card, index) => (
            index % 2 === 0 &&
            <CardComponent
              cardProps={card}
              key={"cardsOnBoard" + index} />
          ))}
        </div>
      </div>

      <div className='absolute pl-14 pt-14 w-full'>
        <div className='w-full h-fit flex gap-7 justify-start'>
          {cardsOnBoard.map((card, index) => (
            index % 2 !== 0 &&
            <CardComponent
              cardProps={card}
              key={"cardsOnBoard" + index} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default GameCards;
