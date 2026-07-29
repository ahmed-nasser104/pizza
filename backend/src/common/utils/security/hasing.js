import bcrypt from "bcrypt";
import { env } from "../../../config/env.service.js";
export const hashingData = async (data) => {
  const hashedData = await bcrypt.hash(data, Number(env.salt_rounds));
  return hashedData;
};

export const compareHashingData = async (plan, cypherPlane) => {
  const isVerified = await bcrypt.compare(plan, cypherPlane);
  return isVerified;
};
