import jwt from "jsonwebtoken";
import {
  badRequestError,
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../../common/responce/error.responce.js";
import {
  compareHashingData,
  hashingData,
} from "../../common/utils/security/hasing.js";
import { makeOtp } from "../../common/utils/service/generateOtp.js";
import { sendMail } from "../../common/utils/service/sendEmail.js";
import {
  generateAuthTokens,
  generateToken,
  verifyRefreshToken,
} from "../../common/utils/token/token.js";
import { env } from "../../config/env.service.js";
import { UserModel } from "../../database/model/user.model.js";
import { del, get, set } from "../../database/redis/redis.service.js";
import { OAuth2Client } from "google-auth-library";

const OTP_TTL_SECONDS = 5 * 60;
const RESEND_COOLDOWN_SECONDS = 60;

const sendVerificationEmail = async (email, otp) => {
  await sendMail({
    to: email,
    subject: "Verify Your Email",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

        <h1 style="color: #ff6b35; margin-bottom: 10px;">
          🍕 Pizza App
        </h1>

        <h2 style="color: #333;">
          Verify Your Email
        </h2>

        <p style="color: #666; font-size: 16px;">
          Thank you for signing up! Use the verification code below to complete your registration.
        </p>

        <div style="
          display: inline-block;
          margin: 25px 0;
          padding: 15px 35px;
          background: #ff6b35;
          color: white;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          border-radius: 10px;
        ">
          ${otp}
        </div>

        <p style="color: #777; font-size: 14px;">
          This code will expire in <strong>5 minutes</strong>.
        </p>

        <p style="color: #999; font-size: 13px; margin-top: 30px;">
          If you didn't create an account, you can safely ignore this email.
        </p>

      </div>
    </div>
  `,
  });
};

const storeOtpForEmail = async (email) => {
  const otp = makeOtp();
  const hashedOtp = await hashingData(otp);
  await set({ key: `otp:${email}`, value: hashedOtp, ttl: OTP_TTL_SECONDS });
  return otp;
};

export const signUp = async (userData) => {
  const { fullName, userName, email, password } = userData;
  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    return conflictError({ message: "Email already exists" });
  }
  const isUserNameExist = await UserModel.findOne({ userName });
  if (isUserNameExist) {
    return conflictError({ message: "Username already exists" });
  }
  const hashedPassword = await hashingData(password);
  const newUser = await UserModel.create({
    fullName,
    userName,
    email,
    password: hashedPassword,
  });

  const otp = await storeOtpForEmail(newUser.email);
  await sendVerificationEmail(newUser.email, otp);

  return newUser;
};

export const verifyAccount = async (data) => {
  const { email, otp } = data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return notFoundError({
      message: "User not found",
    });
  }
  if (user.isVerified) {
    return badRequestError({ message: "user already verified" });
  }
  const storedOtp = await get(`otp:${email}`);
  if (!storedOtp) {
    return badRequestError({
      message: "OTP expired",
    });
  }
  const isValidOtp = await compareHashingData(otp, storedOtp);
  if (!isValidOtp) {
    return badRequestError({ message: "invalid otp" });
  }
  user.isVerified = true;
  await user.save();
  await del(`otp:${email}`);
  return user;
};

export const resendOtp = async (data) => {
  const identifier = data.email || data.userName;

  if (!identifier) {
    return badRequestError({
      message: "Email or username is required",
    });
  }

  const user = await UserModel.findOne({
    $or: [{ email: identifier }, { userName: identifier }],
  });

  if (!user) {
    return notFoundError({
      message: "User not found",
    });
  }

  if (user.isVerified) {
    return badRequestError({
      message: "User is already verified",
    });
  }

  const cooldownKey = `otp:resend:${user.email}`;
  const lastResendAt = Number(await get(cooldownKey));
  const now = Date.now();

  if (lastResendAt && lastResendAt > now) {
    const remainingSeconds = Math.ceil((lastResendAt - now) / 1000);
    return badRequestError({
      message: `Please wait ${remainingSeconds} seconds before requesting a new OTP`,
    });
  }

  const newOtp = await storeOtpForEmail(user.email);
  await set({
    key: cooldownKey,
    value: String(now + RESEND_COOLDOWN_SECONDS * 1000),
    ttl: RESEND_COOLDOWN_SECONDS,
  });

  await sendVerificationEmail(user.email, newOtp);

  return { email: user.email };
};

export const login = async (data, host) => {
  const { email, password } = data;
  const isExist = await UserModel.findOne({ email });
  if (!isExist) {
    return notFoundError({ message: "user not found" });
  }
  const isValid = await compareHashingData(password, isExist.password);
  if (!isValid) {
    return badRequestError({ message: "password is incorrect" });
  }
  if (!isExist.isVerified) {
    return badRequestError({ message: "account not verified" });
  }

  const { AccessToken, refreshToken } = generateAuthTokens(
    isExist._id,
    host,
    isExist.role,
  );

  return { isExist, AccessToken, refreshToken };
};

export const refreshAccessToken = async (refreshTokenValue, host) => {
  if (!refreshTokenValue) {
    return unauthorizedError({ message: "Refresh token is required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshTokenValue);

    if (decoded.type !== "refresh") {
      return unauthorizedError({ message: "Invalid refresh token" });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user || !user.isVerified) {
      return unauthorizedError({ message: "User not found or inactive" });
    }

    const { AccessToken } = generateToken(user._id, host, user.role);
    return { AccessToken };
  } catch (error) {
    return unauthorizedError({ message: "Invalid or expired refresh token" });
  }
};

export const signInWithGoogle = async (data, host) => {
  const { idToken } = data;

  const client = new OAuth2Client({
    clientId: env.client_id,
  });

  const ticket = await client.verifyIdToken({
    idToken,
    audience: env.client_id,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  const user = await UserModel.findOne({
    email: payload.email,
  });

  if (user) {
    const { AccessToken, refreshToken } = generateAuthTokens(
      user._id,
      host,
      user.role,
    );

    return { AccessToken, refreshToken };
  }

  const newUser = await UserModel.create({
    fullName: payload.name,
    email: payload.email,
    profilePic: payload.picture,
    provider: "google",
    isVerified: payload.email_verified,
  });

  if (!newUser) {
    return badRequestError({
      message: "can't add user",
    });
  }

  const { AccessToken, refreshToken } = generateAuthTokens(
    newUser._id,
    host,
    newUser.role,
  );

  return { AccessToken, refreshToken };
};
