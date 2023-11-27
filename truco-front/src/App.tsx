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

function App() {
  /*
  const [channel, setChannel] = useState<Channel | null>(null);
    useEffect(() => {
      setChannel(connectChannel(getChannelName("test-channel")));
    }, []);
  */
  return (
    <div>
      {/*<PusherUsageExample channel={channel}/>*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/play" element={<InGame/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
