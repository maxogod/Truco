import { GameContextProvider } from "./context/gameContext";
import { UserContextProvider } from "./context/userContext";
import Router from "./Router";

function App() {

  return (
    <UserContextProvider>
      <GameContextProvider>
        <Router />
      </GameContextProvider>
    </UserContextProvider>
  )
}



export default App
