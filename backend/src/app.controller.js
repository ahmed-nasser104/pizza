import { catchErrors } from "./common/responce/error.responce.js";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import express from "express";
import authRouter from "./module/auth/auth.controller.js";
import adminRouter from "./module/admin/admin.controller.js";
import cors from "cors";
import { redisConnection } from "./database/redis/redis.js";
import { fileURLToPath } from "url";
import path from "path";
export const boostrap = async () => {
  const app = express();
  databaseConnection();
  app.use(express.json());
  await redisConnection();
  const __fileName = fileURLToPath(import.meta.url);
  const __direName = path.dirname(__fileName);
  app.use("/uploads", express.static(path.join(__direName, "../uploads")));
  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use(catchErrors);
  app.listen(env.port_number, () =>
    console.log("Server is running on port " + env.port_number),
  );
};
