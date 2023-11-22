import React from 'react'
 
const MAX_VALUE = 12;
const suits = ["swords", "cups", "clubs", "clubs"];
const values = []

for (let newValue = 1; newValue <= MAX_VALUE; newValue += 1) {
  values.push(newValue); 
}

const Card = (props) => {
    return(
      <div>
        <p>{props.value}</p>
        <p>{props.symbol}</p>
      </div>
    )
  }

  export default Card