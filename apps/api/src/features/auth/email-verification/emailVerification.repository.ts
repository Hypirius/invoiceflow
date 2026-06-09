import { redisClient, generateCacheKey } from "@/config/redis";
import { EmailRedisPayload } from "../types";

function getEmailCacheKey(email: string) {
  const prefixCacheKey = generateCacheKey("/email"); //change this
  return `${prefixCacheKey}:${email}`;
}

async function pushToCache(data: EmailRedisPayload) {
  const cacheKey = getEmailCacheKey(data.email);
  await redisClient.hSet(cacheKey, data as Record<any, any>);

  await redisClient.expire(cacheKey, data.expiresAt);
}

async function findInCache(email: string) {
  const cacheKey = getEmailCacheKey(email);
  return await redisClient.hGetAll(cacheKey);
}

export { pushToCache, findInCache, getEmailCacheKey };
