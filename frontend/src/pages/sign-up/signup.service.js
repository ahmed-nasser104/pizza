import axios from "axios";
export const signapi = async (values) => {
  return await axios.post("http://localhost:3000/auth/sign", values);
};
