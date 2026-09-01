import jwt from "jsonwebtoken";
import { env } from "../../../config/env.service.js";
import { badRequestError } from "../../responce/error.responce.js";

export const getAccessTokenSecret = (role) => {
  if (role === "admin" && env.admin_signature) {
    return env.admin_signature;
  }

  if (role === "user" && env.user_signature) {
    return env.user_signature;
  }

  if (env.access_token_secret) {
    return env.access_token_secret;
  }

  return env.user_signature || env.admin_signature;
};

export const generateToken = (userId, host, role) => {
  const signature = getAccessTokenSecret(role);

  if (!signature) {
    return badRequestError({ message: "Invalid role" });
  }

  const AccessToken = jwt.sign({ id: userId }, signature, {
    issuer: host,
    expiresIn: env.access_token_expires_in || "30m",
    audience: [role],
  });

  return { AccessToken };
};

export const generateRefreshToken = (userId, host, role) => {
  if (!env.refresh_token_secret) {
    return badRequestError({
      message: "Refresh token secret is not configured",
    });
  }

  const refreshToken = jwt.sign(
    { id: userId, type: "refresh" },
    env.refresh_token_secret,
    {
      issuer: host,
      expiresIn: env.refresh_token_expires_in || "1y",
      audience: [role, "refresh"],
    },
  );

  return { refreshToken };
};

export const generateAuthTokens = (userId, host, role) => {
  const { AccessToken } = generateToken(userId, host, role);
  const { refreshToken } = generateRefreshToken(userId, host, role);

  return { AccessToken, refreshToken };
};

export const verifyRefreshToken = (token) => {
  if (!env.refresh_token_secret) {
    throw new Error("Refresh token secret is not configured");
  }

  return jwt.verify(token, env.refresh_token_secret);
};
