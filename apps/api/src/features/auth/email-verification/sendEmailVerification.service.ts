import generateRandomDigits from "@/utils/generateRandomDigits";
import config from "@/config/env";
import {
  emailOtpExpiryTime,
  subject,
} from "@/constants/emailVerificationDetails";
import validateSchema from "../utils/validateSchema";
import z from "zod";
import { EmailRedisPayload } from "../types";
import generateExpiryTime from "../utils/generateExpiryTime";
import { pushToCache } from "./emailVerification.repository";
import sendEmail from "@/utils/sendEmail";

async function sendVerificationEmailService(
  email: string,
  userId: string | null = null,
) {
  validateSchema(z.email(), email);

  const otp = generateRandomDigits(100000, 999999);

  const emailPayload: EmailRedisPayload = {
    email,
    otp,
    userId,
    attempts: 0,
    invalid: false,
    expiresAt: generateExpiryTime(emailOtpExpiryTime).getSeconds(),
  };

  await pushToCache(emailPayload);

  const data = await sendEmail({
    from: config.EMAIL_FROM,
    to: email,
    subject,
    templateOptions: {
      id: config.EMAIL_TEMPLATE_ID,
      variables: {
        COMPANY_NAME: "InvoiceFlow",
        COMPANY_ADDRESS: "Dhaka, Bangladesh",
        OTP_CODE: otp,
        TIME: 15, // In mins
      },
    },
  });

  return data;
}

export default sendVerificationEmailService;
