import { generateCacheKey, redisClient } from "@/config/redis";
import { InternalServerError } from "@/lib/errors/ErrorClasses";

function generateReqCacheKey(reqId: string) {
  const prefix = generateCacheKey("req");
  return `${prefix}:${reqId}`;
}

async function checkIdempotencyCache(reqId: string) {
  const key = generateReqCacheKey(reqId);
  return await redisClient.get(key); //cacheKey generation
}

async function fillIdempotencyCache(
  reqId: string,
  data: unknown,
  expiry: number,
) {
  const key = generateReqCacheKey(reqId);
  const result = await redisClient.set(key, JSON.stringify(data), {
    EX: expiry,
  });

  if (!result) {
    throw new InternalServerError();
  }
}

export { checkIdempotencyCache, fillIdempotencyCache };
