import nodemailer from "nodemailer";
import { env } from "../../../config/env.service.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: env.email,
    pass: env.email_password,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `ahmed nasser ${env.email}`,
    to,
    subject,
    html,
  });
};
