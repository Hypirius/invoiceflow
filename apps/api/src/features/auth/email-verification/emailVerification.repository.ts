import { redisClient, generateCacheKey } from "@/config/redis";
import { EmailRedisPayload } from "../types";
import { IncorrectOtpError, OtpNotExistsError } from "../utils/ErrorClass";

function getEmailCacheKey(email: string) {
  const prefixCacheKey = generateCacheKey("/email"); //change this
  return `${prefixCacheKey}:${email}`;
}

async function upsertToCache(data: EmailRedisPayload) {
  const cacheKey = getEmailCacheKey(data.email);
  await redisClient.set(cacheKey, JSON.stringify(data));

  await redisClient.expire(cacheKey, data.expiresAt);
}

async function findInCache(email: string) {
  const cacheKey = getEmailCacheKey(email);
  const result = (await redisClient.get(cacheKey)) as string;

  if (!result) {
    throw new OtpNotExistsError();
  }

  return JSON.parse(result) as EmailRedisPayload;
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
