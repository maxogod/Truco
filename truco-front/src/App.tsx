import React from 'react';
import Card from './components/Card.tsx';




function App() {
  
  return (
    
    <><h1 className="text-yellow-500">Hi</h1><section>
      <h1>Carta Española</h1>
      <Card value = {1} suit = "basto"/>
      <Card value = {12} suit = "oro"/>
      <Card value = {5} suit = "espada"/>
      <Card value = {6} suit = "copa"/>
     
    </section></>
  )
}



export default App
