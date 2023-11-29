/*
import PusherUsageExample from "./components/PusherUsageExample"
import { useEffect, useState } from "react";
import connectChannel from "./utils/connectChannel";
import { getChannelName } from "./utils/pusherNames";
import Channel from "pusher-js/types/src/core/channels/channel";
*/
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import InGame from "./pages/InGame";
import Rules from "./pages/Rules";
import MainSideBar from "./components/MainSideBar";
import profile from './assets/User_cicrle_duotone.png';

function App() {
  /*
  const [channel, setChannel] = useState<Channel | null>(null);
    useEffect(() => {
      setChannel(connectChannel(getChannelName("test-channel")));
    }, []);
  */
  {/*<PusherUsageExample channel={channel}/>*/}
  return (
    <BrowserRouter>
      <div className='w-full h-[100vh] flex bg-background text-text'>
        <img src={profile} alt="" className='absolute w-[86px] h-[86px] top-7 right-6 cursor-pointer z-20'/>
        <MainSideBar/>

          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/play" element={<InGame/>}/>
            <Route path="/rules" element={<Rules/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}



export default App
