import CardType from '../@types/CardType.ts'
  
export const deck:CardType[] = [
  {suit:"espada", value: 1,power: 1}, 
  {suit:"basto", value: 1,power: 2},
  {suit:"espada", value: 7,power: 3},
  {suit:"oro", value: 7,power: 4},
  {suit:"espada", value: 3,power: 5},
  {suit:"basto", value: 3,power: 5},
  {suit:"oro", value: 3,power: 5},
  {suit:"copa", value: 3,power: 5},
  {suit:"espada", value: 2,power: 6},
  {suit:"basto", value: 2,power: 6},
  {suit:"oro", value: 2,power: 6},
  {suit:"copa", value: 2,power: 6},
  {suit:"oro", value: 1,power: 7},
  {suit:"copa", value: 1,power: 7},
  {suit:"espada", value: 12,power: 8},
  {suit:"basto", value: 12,power: 8},
  {suit:"oro", value: 12,power: 8},
  {suit:"copa", value: 12,power: 8},
  {suit:"espada", value: 11,power: 9},
  {suit:"basto", value: 11,power: 9},
  {suit:"oro", value: 11,power: 9},
  {suit:"copa", value: 11,power: 9},
  {suit:"espada", value: 10,power: 10},
  {suit:"basto", value: 10,power: 10},
  {suit:"oro", value: 10,power: 10},
  {suit:"copa", value: 10,power: 10},
  {suit:"basto", value: 7,power: 11},
  {suit:"copa", value: 7,power: 11},
  {suit:"espada", value: 6,power: 12},
  {suit:"basto", value: 6,power: 12},
  {suit:"oro", value: 6,power: 12},
  {suit:"copa", value: 6,power: 12},
  {suit:"espada", value: 5,power: 13},
  {suit:"basto", value: 5,power: 13},
  {suit:"oro", value: 5,power: 13},
  {suit:"copa", value: 5,power: 13},
  {suit:"espada", value: 4,power: 14},
  {suit:"basto", value: 4,power: 14},
  {suit:"oro", value: 4,power: 14}, 
  {suit:"copa", value: 4,power: 14}
  ];

export function getCards(deck: CardType[]) {

//Return the cards of tha hand the two players (6 cards)

const HANDSIZE = 3; 
const deckCopy:CardType[] = [...deck];
const hand:CardType[] = [];
for(let i = 0; i < (2*HANDSIZE); i++) {
    const randNum = Math.floor(Math.random()*deckCopy.length);
    const splicedItem = deckCopy.splice(randNum, 1)[0]
    hand.push(splicedItem);
  }
  return hand;
}



export function cardsForTurn(deck: CardType[]){
  //creates a nested array with all the cards for each turn
  const cardsForEachTurn:CardType[][] = new Array(getCards(deck));
 
  for(let i = 1; i < 20; i++){
    cardsForEachTurn[i] = getCards(deck);
  }
  return cardsForEachTurn;
}

export function spliceHands(hand:CardType[]){
  //divide the cards in two sets (one for each player)
const MIDPOINT = 3;
const firstHalf = hand.slice(0, MIDPOINT);
const secondHalf = hand.slice(-MIDPOINT);

const splicedHand:CardType[][] = [[...firstHalf],[...secondHalf]]

return splicedHand;
}

console.log(spliceHands(getCards(deck)))
