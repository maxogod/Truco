

const MAX_Number = 12;


const suits = ['sword', 'club', 'gold', 'cup']
const numbers: number[] = []

interface Card {
  suit: string;
  number: number;
}



for (let newNumber: number = 1; newNumber <= MAX_Number; newNumber += 1) {
  numbers.push(newNumber); 
}



console.log(numbers)

const card = (number:number, suit: string) => {return {number, suit}};

const getDeck = () => {
    
  const deck: object[] = [];
    
   

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < numbers.length; x++) {
        
      const newCard = card(numbers[x], suits[i]);
      deck.push(newCard);
      }
    }
    
    return deck;
  };



  const cardEqual = (card:Card, otherCard:Card) => 
  {return (card.suit == otherCard.suit && card.number == otherCard.number)}

  console.log(cardEqual(card(1,"sword"),card(1,"sword")))
  
  const weights:object[] = [
  [card(1,"sword")], 
  [card(1,"club")], 
  [card(7,"sword")],
  [card(7,"gold")],
  [card(3,"sword"), card(3,"club"), card(3,"gold"), card(3,"cup")],
  [card(2,"sword"), card(2,"club"), card(2,"gold"), card(2,"cup")],
  [card(1, "club"), card(1, "gold")],
  [card(12,"sword"), card(12,"club"), card(12,"gold"), card(12,"cup")],
  [card(11,"sword"), card(11,"club"), card(11,"gold"), card(11,"cup")],
  [card(10,"sword"), card(10,"club"), card(10,"gold"), card(10,"cup")],
  [card(7, "cup"), card(7, "club")],
  [card(6,"sword"), card(6,"club"), card(6,"gold"), card(6,"cup")],
  [card(5,"sword"), card(5,"club"), card(5,"gold"), card(5,"cup")],
  [card(4,"sword"), card(4,"club"), card(4,"gold"), card(4,"cup")],
];

const weight = (card:Card) => weights.findIndex(deck => deck.some((someCard:Card) => cardEqual(card, someCard)))

console.log(weight(card(4,"gold")))



console.log(getDeck())
  
const shuffle = (deck: object[]) => { 
for (let i = deck.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [deck[i], deck[j]] = [deck[j], deck[i]]; 
  } 
  return deck; 
  }; 

  console.log(shuffle(getDeck()))
  
 