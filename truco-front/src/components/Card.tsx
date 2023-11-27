import React from "react";

export default function Card({ value, suit }:
  { value: number, suit: string }) {
  return (
    <img
      src= {`./src/assets/Cards/${value}-${suit}.png`}
      alt="Spanish card"
    />
  )
}



