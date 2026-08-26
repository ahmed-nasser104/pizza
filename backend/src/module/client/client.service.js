import { notFoundError } from "../../common/responce/error.responce.js";
import { CartModel } from "../../database/model/cart.model.js";
import { ProductModel } from "../../database/model/product.model.js";
import { UserModel } from "../../database/model/user.model.js";

export const getUserProfile = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return notFoundError({
      message: "User not found",
    });
  }
  return user;
};
export const getProducts = async () => {
  return await ProductModel.find().populate("category");
};

export const getUserCart = async (userId) => {
  return await CartModel.findOne({ user: userId })
    .populate("user")
    .populate("items.product");
};

export const getProductById = async (productId) => {
  const product = await ProductModel.findById(productId).populate("category");
  if (!product) {
    return notFoundError({
      message: "Product not found",
    });
  }
  return product;
};

export const deleteCartItem = async (userId, productId) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        items: {
          product: productId,
        },
      },
    },
    { new: true },
  );

  if (!cart) {
    return notFoundError({
      message: "Cart not found",
    });
  }

  return cart;
};

export const addToCart = async (data, userId, productId) => {
  const { quantity } = data;
  const product = await ProductModel.findById(productId);
  if (!product) {
    return notFoundError({
      message: "Product not found",
    });
  }
  // Add product to cart logic here
  const cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    const newCart = await CartModel.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity: quantity || 1,
        },
      ],
      totalPrice: product.price * (quantity || 1),
    });
    return newCart;
  }
  const existProduct = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  if (existProduct) {
    existProduct.quantity += quantity || 1;
    cart.totalPrice += product.price * (quantity || 1);
  } else {
    cart.items.push({
      product: productId,
      quantity: quantity || 1,
    });
    cart.totalPrice += product.price * (quantity || 1);
  }
  await cart.save();
  return cart;
};
