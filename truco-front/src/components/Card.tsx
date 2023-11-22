import React from 'react'
 
const MAX_VALUE = 12;

const suits = ['gold', 'cup', 'sword', 'club']
const values: number[] = []

for (let newValue: number = 1; newValue <= MAX_VALUE; newValue += 1) {
  values.push(newValue); 
}

console.log(values)

const Card = (props) => {
    return(
      <div>
        <p>{props.value}</p>
        <p>{props.symbol}</p>
      </div>
    )
  }

   const getDeck = () => {
    
    const deck: object[] = [];
  
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        const card = { Value: values[x], Suit: suits[i] };
        deck.push(card);
      }
    }
    
    return deck;
  };
  
  console.log(getDeck())
  
  
  export default Card