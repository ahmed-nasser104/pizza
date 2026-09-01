import toast from "react-hot-toast";
import { addProduct } from "../../../service/productApi.js";
import toastError from "../../../utils/toast.error.js";

export const productHandler = async (values, onclose) => {
  const formData = new FormData();
  formData.append("ProductName", values.ProductName);
  formData.append("description", values.description);
  formData.append("price", values.price);
  formData.append("Quantity", values.Quantity);
  formData.append("isAvailable", values.isAvailable);
  formData.append("image", values.image);
  try {
    const response = await addProduct(formData, values.category);
    toast.success("Product added successfully 🎉");
    onclose();
  } catch (error) {
    toastError(error);
  }
};
