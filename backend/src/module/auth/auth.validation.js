import Joi from "joi";
export const signUpSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must not exceed 50 characters",
  }),

  userName: Joi.string().trim().alphanum().min(3).max(20).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username must contain only letters and numbers",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must not exceed 20 characters",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character",
    }),

  phone: Joi.string()
    .pattern(/^01[0125][0-9]{8}$/)
    .optional()
    .allow("")
    .messages({
      "string.pattern.base": "Invalid Egyptian phone number",
    }),
});
