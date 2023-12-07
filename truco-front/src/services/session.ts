import axios from "axios";

const getSession = async () => {

  const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/auth/session";

  const response = await axios.get(baseUrl,
    {
      withCredentials: true,
    }
  );

  return response;
};

export { getSession };