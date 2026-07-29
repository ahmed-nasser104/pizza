import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      minlength: [3, "Category name must be at least 3 characters"],
      maxlength: [30, "Category name must not exceed 30 characters"],
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must not exceed 200 characters"],
      default: "",
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

export const CategoryModel = model("Category", categorySchema);
