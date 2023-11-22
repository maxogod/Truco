import React from 'react'
 
const MAX_VALUE = 12;
const MAX_ID = 48;

const suits = ['gold', 'cup', 'sword', 'club']
const values: number[] = []
const ids: number[] = []

for (let newValue: number = 1; newValue <= MAX_VALUE; newValue += 1) {
  values.push(newValue); 
}

for (let newId: number = 1; newId <= MAX_ID; newId += 1) {
    ids.push(newId); 
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
    
    let j = 0;

    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        
        const card = { Id: ids[j], Value: values[x], Suit: suits[i] };
        deck.push(card);
        j += 1;
      }
    }
    
    return deck;
  };
  
  console.log(getDeck())
  
  const shuffle = (deck: object[]) => { 
    for (let i = deck.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [deck[i], deck[j]] = [deck[j], deck[i]]; 
    } 
    return deck; 
  }; 

  console.log(shuffle(getDeck()))
  
 export default Card