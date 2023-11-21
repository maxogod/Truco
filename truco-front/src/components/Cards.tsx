import React from 'react'

const Card = (props) => {
    return(
      <div>
        <p>{props.value}</p>
        <p>{props.symbol}</p>
      </div>
    )
  }

  export default Card