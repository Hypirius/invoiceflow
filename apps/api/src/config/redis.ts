import { createClient, RedisClientType } from "redis";
import config from "./env";

const redisClient: RedisClientType = await createClient({
  url: config.REDIS_URL,
})
  .on("error", (err) => console.log("Redis Client Error", err)) // change this
  .connect();

function generateCacheKey(path: string, query?: Record<any, any>) {
  const baseUrl = path.replace(/[\/?]/g, ":");
  if (query) {
    const sortedQuery = Object.keys(query)
      .sort()
      .map((key) => `${key}=${query.key}`)
      .join("&");

    return baseUrl + sortedQuery;
  }

  return baseUrl;
}

export { redisClient, generateCacheKey };
