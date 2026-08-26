import { catchErrors } from "./common/responce/error.responce.js";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import express from "express";
import authRouter from "./module/auth/auth.controller.js";
import adminRouter from "./module/admin/admin.controller.js";
import userRouter from "./module/client/client.controller.js";
import cors from "cors";
import { redisConnection } from "./database/redis/redis.js";
import { fileURLToPath } from "url";
import path from "path";
import { globalRateLimit } from "./common/middleware/limiter.js";
export const boostrap = async () => {
  const app = express();
  // welcome to server
  app.get("/", (req, res) => {
    res.json("WELCOME TO SEEVER ");
  });

  // 1. Database
  await databaseConnection();
  await redisConnection();
  // 2. Global middlewares
  app.use(express.json());
  app.use(cors());
  // 3. Static files
  const __fileName = fileURLToPath(import.meta.url);
  const __direName = path.dirname(__fileName);
  app.use("/uploads", express.static(path.join(__direName, "../uploads")));
  // 4. Routes
  app.use("/auth", globalRateLimit, authRouter);
  app.use("/admin", globalRateLimit, adminRouter);
  app.use("/user", globalRateLimit, userRouter);

  // 5. Error handler - MUST be last
  app.use(catchErrors);

  // 6. Start server
  app.listen(env.port_number, () => {
    console.log("Server is running on port " + env.port_number);
  });
};
