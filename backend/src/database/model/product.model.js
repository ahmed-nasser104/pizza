import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    ProductName: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description must not exceed 1000 characters"],
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    Quantity: {
      type: Number,
      min: 0,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model("Product", productSchema);
