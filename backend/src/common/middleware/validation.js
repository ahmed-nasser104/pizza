import { badRequestError } from "../responce/error.responce.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return badRequestError({ extra: errors });
    }
    next();
  };
};
