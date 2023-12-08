import axios from "axios";

const addWin = async () => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/stats/addWin";

    const response = await axios.put(baseUrl,
        {}, // empty body
        {
            withCredentials: true,
        }
    );

    return response;
};

const addLoss = async () => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/stats/addLoss";

    const response = await axios.put(baseUrl,
        {}, // empty body
        {
            withCredentials: true,
        }
    );

    return response;
};

const updateRating = async (ratingDifferential: number) => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/stats/updateRating";

    const response = await axios.put(baseUrl,
        {
            ratingDifferential,
        },
        {
            withCredentials: true,
        }
    );

    return response;
};

export {
    addWin,
    addLoss,
    updateRating,
};
