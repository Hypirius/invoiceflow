import { redisClient, generateCacheKey } from "@/config/redis";
import { EmailRedisPayload } from "../types";
import { IncorrectOtpError } from "../utils/ErrorClass";

function getEmailCacheKey(email: string) {
  const prefixCacheKey = generateCacheKey("/email"); //change this
  return `${prefixCacheKey}:${email}`;
}

async function upsertToCache(data: EmailRedisPayload) {
  const cacheKey = getEmailCacheKey(data.email);
  await redisClient.hSet(cacheKey, data as Record<any, any>);

  await redisClient.expire(cacheKey, data.expiresAt);
}

async function findInCache<T>(email: string) {
  const cacheKey = getEmailCacheKey(email);
  const result = (await redisClient.hGetAll(cacheKey)) as T;

  if (!result) {
    throw new IncorrectOtpError();
  }

  return result;
}

async function InvalidateOtp(email: string) {
  const cacheKey = getEmailCacheKey(email);
  const result = await redisClient.del(cacheKey);

  if (result === 0) {
    throw new IncorrectOtpError();
  }

  return result;
}

export { upsertToCache, findInCache, InvalidateOtp, getEmailCacheKey };
