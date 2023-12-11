import axios from "axios";

const acceptFriendRequest = async (username: string) => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/friends/acceptFriendRequest/" + username

    const response = await axios.get(baseUrl,
        {
            withCredentials: true,
        }
    );

    return response;
};

export { acceptFriendRequest };
