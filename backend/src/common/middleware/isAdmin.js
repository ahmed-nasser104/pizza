import { unauthorizedError } from "../responce/error.responce.js";

export const isAdmin = (req, res, next) => {
  if (req.user.aud[0] !== "admin") {
    return unauthorizedError({
      message: "You are not authorized",
    });
  }

  next();
};
