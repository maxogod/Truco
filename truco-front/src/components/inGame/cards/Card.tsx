import { Card } from "../../../gameLogic/Cards/Card";

export default function CardComponent({ cardProps, onClick }:
  { cardProps: Card, onClick?: (card: Card) => void }) {
  return (
    <img
      src={`./src/assets/Cards/${cardProps.number}-${cardProps.suit.toLowerCase()}.png`}
      alt="Spanish card"
      className="w-[88px] shadow-card rounded-lg cursor-pointer"
      onClick={() => onClick && onClick(cardProps)}
    />
  )
}
