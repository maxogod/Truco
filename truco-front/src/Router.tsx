import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainSideBar from "./shared/MainSideBar"
import Main from "./pages/Main"
import InGame from "./pages/InGame"
import Profile from "./pages/Profile"
import LeaderBoard from "./pages/LeaderBoard"
import Rules from "./pages/Rules"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"

import { Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./context/userContext"
import { useContext} from "react"
import { CgSpinner } from "react-icons/cg"
import mate from './assets/mate.png'
import FriendRequestPopUp from "./components/friendRequestPopUp"
import { GameContext } from "./context/gameContext"


const Router = () => {

    const { loadingSession, sendFriendRequest } = useContext(UserContext)
    const { sideBarOpen, setSideBarOpen } = useContext(GameContext)
    const toggleSideBar = () => {setSideBarOpen(!sideBarOpen)}

    return (
        <BrowserRouter>
            {
                !loadingSession &&
                <div className='w-full h-[100vh] flex bg-background text-text'>
                    <div className="absolute top-0 left-0 p-4 text-4xl font-bold z-50 cursor-pointer" onClick={toggleSideBar}>{sideBarOpen? "<" : ">"}</div>
                    {sideBarOpen && <MainSideBar />}
                    {sendFriendRequest && <FriendRequestPopUp />}
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
            }
            {
                loadingSession &&
                <div className='w-screen h-screen flex bg-background text-text justify-center items-center'>
                    <div className='w-screen relative flex justify-center text-text'>
                        <img src={mate} alt='Logo' className='w-[115px] h-[115px] rotate-6' />
                        <h1 className='absolute bottom-1/2 translate-y-3/4 w-full text-center font-bold text-4xl'>Truco.com</h1>
                        <CgSpinner className='animate-spin absolute w-[150px] h-[150px] opacity-40' />
                    </div>
                </div>
            }
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover={false} theme="dark" transition={Flip}/>
        </BrowserRouter>
    )
}

export default Router