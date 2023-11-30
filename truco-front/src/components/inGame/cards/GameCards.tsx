import { useState } from 'react';
import Card from './Card';

const GameCards = ({ myCards, opponentCards }:
  { myCards: CardType[], opponentCards: CardType[] }) => {

  const [cardsOnBoard, setCardsOnBoard] = useState<CardType[]>([])

  const playCard = (card: CardType) => {
    setCardsOnBoard([...cardsOnBoard, card])
  }

  return (
    <div className='w-[60%] h-full relative flex justify-center items-center'>

      <div className='w-full h-fit flex justify-center absolute bottom-10'>
        {myCards.map((card, index) => (
          <Card
            cardProps={card}
            key={"myCards" + index}
            onClick={playCard} />
        ))}
      </div>

      <div className='w-full h-fit flex justify-center absolute top-10'>
        {opponentCards.map((card, index) => (
          <Card
            cardProps={card}
            key={"oponentCards" + index} />
        ))}
      </div>

      <div className='absolute pl-10 w-full'>
        <div className='w-full h-fit flex gap-7 justify-start'>
          {cardsOnBoard.map((card, index) => (
            index % 2 === 0 &&
            <Card
              cardProps={card}
              key={"cardsOnBoard" + index} />
          ))}
        </div>
      </div>

      <div className='absolute pl-14 pt-14 w-full'>
        <div className='w-full h-fit flex gap-7 justify-start'>
          {cardsOnBoard.map((card, index) => (
            index % 2 !== 0 &&
            <Card
              cardProps={card}
              key={"cardsOnBoard" + index} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default GameCards;
