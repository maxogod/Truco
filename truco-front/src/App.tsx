import { GameContextProvider } from "./context/gameContext";
import { UserContextProvider } from "./context/userContext";
import Router from "./Router";

function App() {

  return (
    <UserContextProvider>
      <GameContextProvider>
        <Router />
        <div className='w-full h-[100vh] flex bg-background text-text'>
          <NavBar />
          <MainSideBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/play" element={<InGame />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </GameContextProvider>
    </UserContextProvider>
  )
}



export default App
