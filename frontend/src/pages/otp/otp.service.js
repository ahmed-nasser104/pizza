import axios from "axios";
export const verifyAccount = async (data) => {
  return await axios.post("http://localhost:3000/auth/verify", data);
};
