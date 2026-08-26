import jwt from "jsonwebtoken";
import { env } from "../../../config/env.service.js";
import { badRequestError } from "../../responce/error.responce.js";
export const generateToken = (userId, host, role) => {
  let signature = "";
  switch (role) {
    case "user":
      signature = env.user_signature;
      break;
    case "admin":
      signature = env.admin_signature;
      break;
    default:
      return badRequestError({ message: "Invalid role" });
  }
  const AccessToken = jwt.sign({ id: userId }, signature, {
    issuer: host,
    expiresIn: "7d",
    audience: [role],
  });
  return { AccessToken };
};
