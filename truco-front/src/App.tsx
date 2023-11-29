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
import MainSideBar from "./components/MainSideBar";
import profile from './assets/User_cicrle_duotone.png';
import GameLogicTest from "./components/GameLogicTest";

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
      <GameLogicTest/>
    </BrowserRouter>
  )
}



export default App
