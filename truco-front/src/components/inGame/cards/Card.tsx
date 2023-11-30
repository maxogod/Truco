
export default function Card({ cardProps, onClick }:
  { cardProps: CardType, onClick?: (card: CardType) => void }) {
  return (
    <img
      src={`./src/assets/Cards/${cardProps.number}-${cardProps.suit.toLowerCase()}.png`}
      alt="Spanish card"
      className="w-[88px] shadow-card rounded-lg"
      onClick={() => onClick && onClick(cardProps)}
    />
  )
}
