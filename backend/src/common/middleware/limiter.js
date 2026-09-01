import rateLimit from "express-rate-limit";
export const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const resendOtpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many OTP requests. Please wait 60 seconds before trying again.",
  },
});
