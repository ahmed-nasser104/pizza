import { client } from "./redis.js";
export const set = ({ key, value, ttl }) => {
  return client.set(key, value, { EX: ttl });
};

export const get = (key) => {
  return client.get(key);
};

export const del = (key) => {
  return client.del(key);
};

export const mget = (...keys) => {
  return client.MGET(keys);
};
