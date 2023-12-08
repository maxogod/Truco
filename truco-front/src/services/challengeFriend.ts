import axios from "axios";

const challengeFriend = async (opponentName: string, challengerName: string) => {

    const baseUrl = import.meta.env.VITE_PUSHER_CHALLENGE_ENDPOINT

    const response = await axios.post(baseUrl,
        {
            opponentName,
            challengerName
        },
        {
            withCredentials: true,
        }
    );

    console.log("response", response)
    return response;
};

export { challengeFriend };
