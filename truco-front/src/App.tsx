import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import InGame from "./pages/InGame";
import Profile from "./pages/Profile";
import LeaderBoard from "./pages/LeaderBoard";
import Rules from "./pages/Rules";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NavBar from "./shared/NavBar";
import MainSideBar from "./shared/MainSideBar";

import GameLogicTest from "./components/examples/GameLogicTest";
import { GameContextProvider } from "./context/gameContext";

function App() {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <div className='w-full h-[100vh] flex bg-background text-text'>
          <NavBar />
          <MainSideBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/play" element={<InGame />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/roules" element={<Rules />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </GameContextProvider>
    </BrowserRouter>
  )

  // return (
  //   <BrowserRouter>
  //     <GameLogicTest />
  //   </BrowserRouter>
  // )
}



export default App
