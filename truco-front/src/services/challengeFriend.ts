import axios from "axios";

const challengeFriend = async (opponentName: string, challengerName: string,challengerRating:number) => {

    const baseUrl = import.meta.env.VITE_PUSHER_CHALLENGE_ENDPOINT

    const response = await axios.post(baseUrl,
        {
            opponentName,
            challengerName,
            challengerRating
        },
        {
            withCredentials: true,
        }
    );

    return response;
};

export { challengeFriend };
