import axios from "axios";
export const loginApi = async (data) => {
  return await axios.post("http://localhost:3000/auth/login", data);
};

export const loginWithGoogle = async (tokenId) => {
  return await axios.post(`http://localhost:3000/auth/login-with-google`, {
    idToken: tokenId,
  });
};
