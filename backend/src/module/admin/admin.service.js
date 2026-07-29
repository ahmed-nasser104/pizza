import {
  badRequestError,
  unauthorizedError,
} from "../../common/responce/error.responce.js";
import { env } from "../../config/env.service.js";
import { CategoryModel } from "../../database/model/category.model.js";
import { ProductModel } from "../../database/model/product.model.js";
import sharp from "sharp";
// categories

export const getAllCategoties = async () => {
  return await CategoryModel.find();
};

export const createCategory = async (data, image) => {
  const { name, description, isAvailable } = data;
  if (!image) {
    return badRequestError({ message: "Category image is required" });
  }
  const imagePath = `${env.server_url}/uploads/${image.filename}`;
  const category = await CategoryModel.create({
    name,
    description,
    isAvailable,
    image: imagePath,
  });
  return category;
};

//products
export const createProduct = async (user, data, categoryId, image) => {
  const { ProductName, description, price, discount, Quantity, isAvailable } =
    data;
  const imagePath = `${env.server_url}/uploads/${image.filename}`;
  const product = await ProductModel.create({
    ProductName,
    description,
    image: imagePath,
    price,
    discount,
    Quantity,
    isAvailable,
    category: categoryId,
  });
  return product;
};

export const getAllProducts = async () => {
  return await ProductModel.find().populate("category");
};
