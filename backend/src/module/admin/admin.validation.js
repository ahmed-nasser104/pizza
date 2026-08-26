import Joi from "joi";
import mongoose from "mongoose";

export const createProductValidation = Joi.object({
  ProductName: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().max(1000).required(),
  price: Joi.number().min(1).required(),
  discount: Joi.number().min(0).max(100).default(0),
  Quantity: Joi.number().min(0).required(),
  isAvailable: Joi.boolean().default(true),
});

export const createCategoryValidation = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Category name must be a string",
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 3 characters",
    "string.max": "Category name must not exceed 30 characters",
    "any.required": "Category name is required",
  }),
  description: Joi.string().trim().max(200).allow("").optional().messages({
    "string.base": "Description must be a string",
    "string.max": "Description must not exceed 200 characters",
  }),

  isAvailable: Joi.boolean().optional().messages({
    "boolean.base": "isAvailable must be true or false",
  }),
});
