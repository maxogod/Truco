import axios from "axios";

const sendFriendRequest = async (username: string) => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/friends/friendRequest/" + username

    const response = await axios.get(baseUrl,
        {
            withCredentials: true,
        }
    );

    return response;
};

export { sendFriendRequest };
