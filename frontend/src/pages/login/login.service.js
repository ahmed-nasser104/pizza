import axios from "axios";

export const loginApi = async (data) => {
  return await axios.post("http://localhost:3000/auth/login", data);
};
