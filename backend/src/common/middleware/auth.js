import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";
import { unauthorizedError } from "../responce/error.responce.js";
import { compareHashingData } from "../utils/security/hasing.js";
import { UserModel } from "../../database/model/user.model.js";
export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return unauthorizedError({ message: "Authorization header is required" });
  }
  const [flag, token] = authorization.split(" ");
  if (!flag || !token) {
    return unauthorizedError({
      message: "Invalid authorization format",
    });
  }
  let signature = "";
  try {
    switch (flag) {
      case "Bearer":
        const decoded = jwt.decode(token);
        if (!decoded) {
          return unauthorizedError({ message: "Invalid token" });
        }
        if (!decoded.aud || !decoded.aud.length) {
          return unauthorizedError({ message: "Invalid audience" });
        }
        switch (decoded.aud[0]) {
          case "admin":
            signature = env.admin_signature;
            break;
          case "user":
            signature = env.user_signature;
            break;
          default:
            return unauthorizedError({ message: "Invalid audience" });
        }
        const decodedUser = jwt.verify(token, signature);
        req.user = decodedUser;
        next();
        break;
      case "Basic":
        const basicToken = Buffer.from(token, "base64").toString();
        const [email, password] = basicToken.split(":");
        if (!email || !password) {
          return unauthorizedError({
            message: "Invalid basic credentials",
          });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
          return unauthorizedError({
            message: "Invalid email or password",
          });
        }
        const isMatch = await compareHashingData(password, user.password);
        if (!isMatch) {
          return unauthorizedError({
            message: "Invalid email or password",
          });
        }
        req.user = user;
        next();
        break;
      default:
        return unauthorizedError({
          message: "Invalid authorization type",
        });
    }
  } catch (error) {
    return unauthorizedError({ message: "Invalid token", extra: error });
  }
};
