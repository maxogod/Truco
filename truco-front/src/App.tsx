import React from 'react'

function Profile() {
  return (
    <img
      src="./src/assets/Cards/2-espada.png"
      alt="Katherine Johnson"
    />
  );
}


function App() {
  
  return (
    
    <><h1 className="text-yellow-500">Hi</h1><section>
      <h1>Amazing scientists</h1>
      <Profile/>
      <Profile/>
      <Profile/>
      <Profile/>
      
    </section></>
  )
}



export default App
