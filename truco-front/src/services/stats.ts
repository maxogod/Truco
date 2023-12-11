import axios from "axios";

const addWin = async (myRating:number, opponentRating:number) => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/stats/addWin";

    const response = await axios.put(baseUrl,
        {
            myRating,
            opponentRating,
        },
        {
            withCredentials: true,
        }
    );

    return response;
};

const addLoss = async (myRating:number, opponentRating:number) => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/stats/addLoss";

    const response = await axios.put(baseUrl,
        {
            myRating,
            opponentRating,
        },
        {
            withCredentials: true,
        }
    );

    return response;
};

const getTopRating = async () => {

    const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/stats/top";

    const response = await axios.get(baseUrl,
        {
            withCredentials: true,
        }
    );

    return response;
};

export {
    addWin,
    addLoss,
    getTopRating
};
