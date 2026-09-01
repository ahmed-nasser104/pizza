import jwt from "jsonwebtoken";
import { unauthorizedError } from "../responce/error.responce.js";
import { compareHashingData } from "../utils/security/hasing.js";
import { UserModel } from "../../database/model/user.model.js";
import { getAccessTokenSecret } from "../utils/token/token.js";

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

  try {
    switch (flag) {
      case "Bearer": {
        const decoded = jwt.decode(token);
        if (!decoded) {
          return unauthorizedError({ message: "Invalid token" });
        }

        if (!decoded.aud || !decoded.aud.length) {
          return unauthorizedError({ message: "Invalid audience" });
        }

        const role = decoded.aud[0];
        const signature = getAccessTokenSecret(role);
        const decodedUser = jwt.verify(token, signature);
        req.user = decodedUser;
        next();
        return;
      }
      case "Basic": {
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
        return;
      }
      default:
        return unauthorizedError({
          message: "Invalid authorization type",
        });
    }
  } catch (error) {
    return unauthorizedError({ message: "Invalid token", extra: error });
  }
};
