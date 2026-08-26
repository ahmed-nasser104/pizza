import {
  badRequestError,
  unauthorizedError,
} from "../../common/responce/error.responce.js";
import { env } from "../../config/env.service.js";
import { CategoryModel } from "../../database/model/category.model.js";
import { ProductModel } from "../../database/model/product.model.js";
import sharp from "sharp";
import { UserModel } from "../../database/model/user.model.js";
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

export const editCargetoies = async (data, categoryId, image) => {
  const { name, description, isAvailable } = data;

  const updateData = {
    name,
    description,
    isAvailable,
  };
  if (image) {
    updateData.image = `${env.server_url}/uploads/${image.filename}`;
  }
  const editedCategory = await CategoryModel.updateOne(
    { _id: categoryId },
    updateData,
  );

  return editedCategory;
};

export const deleteCategory = async (categoryId) => {
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    return notFoundError({
      message: "Category not found",
    });
  }
  await CategoryModel.findByIdAndDelete(categoryId);
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

export const editProducts = async (data, productId, image) => {
  const { ProductName, description, price, discount, Quantity, isAvailable } =
    data;

  const updateData = {
    ProductName,
    description,
    price,
    discount,
    Quantity,
    isAvailable,
  };
  if (image) {
    updateData.image = `${env.server_url}/uploads/${image.filename}`;
  }
  const editedProducts = await ProductModel.updateOne(
    { _id: productId },
    updateData,
  );

  return editedProducts;
};

export const deleteProduct = async (productId) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    return notFoundError({
      message: "Product not found",
    });
  }
  await ProductModel.deleteOne({ _id: productId });
  return product;
};

//users
export const getAllUsers = async () => {
  return await UserModel.find().select("-password");
};

export const deleteUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return notFoundError({
      message: "User not found",
    });
  }
  await UserModel.deleteOne({ _id: userId });
  return user;
};
