import Router from "express";
import { validation } from "../../common/middleware/validation.js";
import { resendOtpSchema, signUpSchema } from "./auth.validation.js";
import {
  login,
  refreshAccessToken,
  resendOtp,
  signInWithGoogle,
  signUp,
  verifyAccount,
} from "./auth.service.js";
import { successResponce } from "../../common/responce/SuccessResponce.js";
import { resendOtpLimiter } from "../../common/middleware/limiter.js";
import { env } from "../../config/env.service.js";

const router = Router();

const refreshCookieOptions = {
  httpOnly: true,
  path: "/",
  secure: env.mood === "production",
  sameSite: env.mood === "production" ? "none" : "lax",
  maxAge: 365 * 24 * 60 * 60 * 1000,
};

router.post("/sign", validation(signUpSchema), async (req, res) => {
  const user = await signUp(req.body);
  successResponce({
    res,
    status: 201,
    message: "user created successfully",
    data: user,
  });
});

router.post("/verify", async (req, res) => {
  const user = await verifyAccount(req.body);
  successResponce({
    res,
    status: 200,
    message: "Account verified successfully",
    data: user,
  });
});

router.post(
  "/resend-otp",
  resendOtpLimiter,
  validation(resendOtpSchema),
  async (req, res) => {
    const user = await resendOtp(req.body);
    successResponce({
      res,
      status: 200,
      message: "OTP resent successfully",
      data: user,
    });
  },
);

router.post("/login", async (req, res) => {
  const host = req.get("host");
  const user = await login(req.body, host);
  if (user.refreshToken) {
    res.cookie("refreshToken", user.refreshToken, refreshCookieOptions);
  }

  const { refreshToken, ...safeUser } = user;
  successResponce({
    res,
    status: 200,
    message: "login successfully",
    data: safeUser,
  });
});

router.post("/login-with-google", async (req, res) => {
  const host = req.get("host");
  const user = await signInWithGoogle(req.body, host);
  if (user.refreshToken) {
    res.cookie("refreshToken", user.refreshToken, refreshCookieOptions);
  }

  const { refreshToken, ...safeUser } = user;
  successResponce({
    res,
    status: 200,
    message: "login successfully",
    data: safeUser,
  });
});

router.post("/refresh-token", async (req, res) => {
  const host = req.get("host");
  const refreshToken = req.cookies?.refreshToken;
  const user = await refreshAccessToken(refreshToken, host);

  if (user?.AccessToken) {
    successResponce({
      res,
      status: 200,
      message: "Access token refreshed successfully",
      data: { accessToken: user.AccessToken },
    });
    return;
  }

  successResponce({
    res,
    status: 401,
    message: user?.message || "Invalid refresh token",
    data: null,
  });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    path: "/",
    sameSite: env.mood === "production" ? "none" : "lax",
    secure: env.mood === "production",
  });

  successResponce({
    res,
    status: 200,
    message: "logout successfully",
    data: null,
  });
});

export default router;
