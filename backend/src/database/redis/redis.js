import { createClient } from "redis";
import { env } from "../../config/env.service.js";

export const client = createClient({
  url: env.redis_url,
});
export const redisConnection = async () => {
  try {
    client.on("error", function (err) {
      throw err;
    });
    await client.connect();
    console.log("redis connected successfully");
  } catch (error) {
    console.log("❌ redis error " + error);
  }
};
