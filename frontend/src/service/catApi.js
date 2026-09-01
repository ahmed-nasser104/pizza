import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const addToCartApi = async (data, productId) => {
  return await axios.post(
    `http://localhost:3000/user/product/${productId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getCartApi = async () => {
  return await axios.get("http://localhost:3000/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItemApi = async (cartId) => {
  return await axios.delete(`http://localhost:3000/user/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
