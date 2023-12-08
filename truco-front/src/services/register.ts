import axios from "axios";

const register = async (username: string, password: string) => {

  const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/auth/register";

  const response = await axios.post(baseUrl,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response;
};

export { register };