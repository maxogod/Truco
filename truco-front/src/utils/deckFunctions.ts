import CardType from '../@types/CardType.ts'

const MAX_Number = 12;
const suits = ['espada', 'basto', 'oro', 'copa']
const numbers: number[] = []


for (let newNumber: number = 1; newNumber <= MAX_Number; newNumber += 1) {
  numbers.push(newNumber); 
}

const card = (value:number, suit: string) => {return {value, suit}};


const getDeck = () => {
    
    const deck: CardType[] = [];
      
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < numbers.length; x++) {
          
        const newCard = card(numbers[x], suits[i]);
        deck.push(newCard);
        }
      }
      
      return deck;
    };
  

  const cardEqual = (card:CardType, otherCard:CardType) => 
  {return (card.suit == otherCard.suit && card.value == otherCard.value)}

  console.log(cardEqual(card(1,"espada"),card(1,"espada")))
  
  const weights:CardType[][] = [
  [card(1,"espada")], 
  [card(1,"basto")], 
  [card(7,"espada")],
  [card(7,"oro")],
  [card(3,"espada"), card(3,"basto"), card(3,"oro"), card(3,"copa")],
  [card(2,"espada"), card(2,"basto"), card(2,"oro"), card(2,"copa")],
  [card(1, "basto"), card(1, "oro")],
  [card(12,"espada"), card(12,"basto"), card(12,"oro"), card(12,"copa")],
  [card(11,"espada"), card(11,"basto"), card(11,"oro"), card(11,"copa")],
  [card(10,"espada"), card(10,"basto"), card(10,"oro"), card(10,"copa")],
  [card(7, "copa"), card(7, "basto")],
  [card(6,"espada"), card(6,"basto"), card(6,"oro"), card(6,"copa")],
  [card(5,"espada"), card(5,"basto"), card(5,"oro"), card(5,"copa")],
  [card(4,"espada"), card(4,"basto"), card(4,"oro"), card(4,"copa")],
];

const weight = (card:CardType) => weights.findIndex(deck => deck.some((someCard:CardType) => cardEqual(card, someCard)))

console.log(weight(card(4,"oro")))



console.log(getDeck())
  
const shuffle = (deck: CardType[]) => { 
for (let i = deck.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [deck[i], deck[j]] = [deck[j], deck[i]]; 
  } 
  return deck; 
  }; 

const draw = (numberOfCardtoDraw: number, deck: CardType[]) => {
  const cardsDrawed:CardType[] = [];
  for(let i = 0; i < numberOfCardtoDraw; i++){
    cardsDrawed.push(deck.pop() as CardType);
  }
  return cardsDrawed;
  
}

const deck = shuffle(getDeck());
console.log(deck.length)

console.log(draw(1,deck));
console.log(deck.length)
console.log(draw(3,deck));
console.log(deck.length)
console.log(draw(2,deck));
console.log(deck.length)


console.log(shuffle(getDeck()))



