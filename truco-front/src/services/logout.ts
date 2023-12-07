import axios from "axios";

const logout = async () => {

  const baseUrl = import.meta.env.VITE_SERVER_URL + "/api/auth/logout";

  const response = await axios.get(baseUrl,
    {
      withCredentials: true,
    }
  );

  return response;
};

export { logout };