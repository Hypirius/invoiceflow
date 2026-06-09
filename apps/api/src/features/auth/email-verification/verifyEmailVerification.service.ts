import { EmailRedisPayload } from "../types";
import { AttemptsExceededError, IncorrectOtpError } from "../utils/ErrorClass";
import {
  findInCache,
  InvalidateOtp,
  upsertToCache,
} from "./emailVerification.repository";

async function verifyEmailVerificationService(
  email: string,
  clientPassedOtp: number,
) {
  const redisResult = await findInCache<EmailRedisPayload>(email);

  if (redisResult.attempts > 10) {
    await InvalidateOtp(email);
    throw new AttemptsExceededError();
  }

  if (redisResult.otp !== clientPassedOtp) {
    redisResult.attempts += 1;
    await upsertToCache(redisResult);
    throw new IncorrectOtpError();
  }

  //  Hence, successful match:

  await InvalidateOtp(email);
  return { match: true };
}

export default verifyEmailVerificationService;
