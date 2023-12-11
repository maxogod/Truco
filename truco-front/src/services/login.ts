import axios from "axios";

const login = async (username: string, password: string) => {

  const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/auth/login";

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

export { login };
