import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../../common/responce/error.responce.js";
import {
  compareHashingData,
  hashingData,
} from "../../common/utils/security/hasing.js";
import { makeOtp } from "../../common/utils/service/generateOtp.js";
import { sendMail } from "../../common/utils/service/sendEmail.js";
import { generateToken } from "../../common/utils/token/token.js";
import { env } from "../../config/env.service.js";
import { UserModel } from "../../database/model/user.model.js";
import { del, get, set } from "../../database/redis/redis.service.js";
import { OAuth2Client } from "google-auth-library";
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
  const otp = makeOtp();
  const hashedOtp = await hashingData(otp);
  await set({ key: `otp:${newUser.email}`, value: hashedOtp, ttl: 60 * 5 });
  await sendMail({
    to: newUser.email,
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
  const { AccessToken } = generateToken(isExist._id, host, isExist.role);
  return { isExist, AccessToken };
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
    const { AccessToken } = generateToken(user._id, host, user.role);

    return AccessToken;
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

  const { AccessToken } = generateToken(newUser._id, host, newUser.role);

  return AccessToken;
};
