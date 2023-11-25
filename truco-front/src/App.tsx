import PusherUsageExample from "./components/PusherUsageExample"
import { useEffect, useState } from "react";
import connectChannel from "./utils/connectChannel";
import { getChannelName } from "./utils/pusherNames";
import Channel from "pusher-js/types/src/core/channels/channel";
import Timer from "./components/Timer"

function App() {
  const [channel, setChannel] = useState<Channel | null>(null);
    useEffect(() => {
      setChannel(connectChannel(getChannelName("test-channel")));
    }, []);
  return (
    <div>
      <PusherUsageExample channel={channel}/>
      <Timer />
    </div>
  )
}

export default App
