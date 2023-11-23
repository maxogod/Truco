import Channel from 'pusher-js/types/src/core/channels/channel';
import TestEvent from '../Events/TestEvent';
import { getChannelName } from '../utils/pusherNames';
import { useEffect } from 'react';

function PusherUsageExample(params: { channel: Channel | null; }) {
    const channel = params.channel;
    useEffect(() => {
        channel?.bind(TestEvent.eventName, function (rawData:any) {
            const event  = TestEvent.fromRaw(rawData);
            alert(event.getMessage() +" "+ event.greetUser());
        });
    }, [channel])
    const triggerEvent = () => {
        channel?.trigger(TestEvent.eventName, new TestEvent("Nice!","Andres"));
    }
    return (
        <div>
            <h1>Pusher Usage Example</h1>
            <p>
                This component is just a simple example of how to use Pusher in a React component.
            </p>
            <p>
                The component is listening to a Pusher channel called <code>{getChannelName("test-channel")}</code> and an event called <code>{TestEvent.eventName}</code>.
            </p>
            <p>
                The component is also sending a message to the same channel and event.
            </p>
            <p>
                To test this, open this page in two different browsers or tabs and click the button below.(REMEMBER TO HAVE THE BACKEND SERVER RUNNING)
            </p>
            <p>
                click this button to trigger the event: <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={triggerEvent}>Trigger Event</button>
            </p>
        </div>
    )
}

export default PusherUsageExample
