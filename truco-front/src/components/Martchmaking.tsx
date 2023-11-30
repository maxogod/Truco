import { Channel, Members } from 'pusher-js';
// import TestEvent from '../Events/TestEvent';
import { getChannelName } from '../utils/pusherNames';
import pusherService, { pusherInit } from '../utils/pusherService';
import { useEffect, useRef, useState } from "react";

function Matchmaking() {
    const [channel, setChannel] = useState<Channel | null>(null);
    const [myChannel, setMyChannel] = useState<Channel | null>(null);
    const [gameChannel, setGameChannel] = useState<Channel | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false); // necessary to reflect changes in the dom

    const isSearchingRef = useRef<boolean>(false); // necessary for the timeout to work properly in the toggleMatchmaking function

    const username = "test-name" + Math.floor(Math.random() * 1000) // TODO - replace with the real username once we have users

    const toggleMatchmaking = () => {
        if (isSearchingRef.current) {
            setIsSearching(false)
            isSearchingRef.current = false
            pusherService.disconnectChannel(getChannelName("matchmaking"), setChannel)
            pusherService.disconnectChannel(getChannelName(username), setMyChannel)
            return
        }

        setIsSearching(true)
        isSearchingRef.current = true
        pusherInit(username)

        setTimeout(() => {
            if (!isSearchingRef.current) return

            pusherService.connectChannel(getChannelName("matchmaking"), setChannel,
                (members: Members) => {
                    let otherMember: any = null;

                    if (members.count <= 1) return
                    members.each((member: any) => {
                        if (member.id === members.me.id || otherMember) return
                        otherMember = member
                    })

                    if (otherMember) {
                        pusherService.connectChannel(getChannelName(otherMember.info.name), setGameChannel, () => { setIsSearching(false); isSearchingRef.current = false })
                        pusherService.disconnectChannel(getChannelName("matchmaking"), setChannel)
                        pusherService.disconnectChannel(getChannelName(username), setMyChannel)
                    }
                })

            pusherService.connectChannel(getChannelName(username), setMyChannel)
        }, 4000)
    }

    useEffect(() => {
        myChannel?.bind("pusher:member_added", () => {
            setIsSearching(false)
            isSearchingRef.current = false
            pusherService.disconnectChannel(getChannelName("matchmaking"), setChannel)
            setGameChannel(myChannel)
        })
    }, [myChannel])

    useEffect(() => {
        // // TODO - test event has to be replaced by a real event
        // gameChannel?.bind(TestEvent.eventName, function (rawData: any) {
        //     const event = TestEvent.fromRaw(rawData);
        //     alert(event.getMessage() + " " + event.greetUser());
        // });
    }, [gameChannel])

    // const triggerEvent = () => {
    //     gameChannel?.trigger(TestEvent.eventName, new TestEvent("NiceGAME!", "Andres"));
    // }

    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={toggleMatchmaking}>{isSearching ? "Stop" : "Play"}</button>
            {isSearching && <p>Searching...</p>}
            {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={triggerEvent}>Trigger Event</button> */}
        </div>
    )
}

export default Matchmaking