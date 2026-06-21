import generateRandomDigits from "@/utils/generateRandomDigits";
import config from "@/config/env";
import {
  emailOtpExpiryTime,
  subject,
} from "@/constants/emailVerificationDetails";
import validateSchema from "../utils/validateSchema";
import z from "zod";
import { EmailRedisPayload } from "../types";
import generateExpiryTime from "../../../utils/generateExpiryTime";
import { upsertToCache } from "./emailVerification.repository";
import sendEmail from "@/utils/sendEmail";

async function sendVerificationEmailService(
  email: string,
  userId: string | null = null,
  fullName: string,
) {
  validateSchema(z.email(), email);

  const otp = generateRandomDigits(100000, 999999);

  const emailPayload: EmailRedisPayload = {
    email,
    otp,
    userId,
    attempts: 0,
    invalid: false,
    expiresAt: generateExpiryTime(emailOtpExpiryTime),
  };

  await upsertToCache(emailPayload);

  const data = await sendEmail({
    from: config.EMAIL_FROM,
    to: email,
    subject,
    templateOptions: {
      id: config.EMAIL_TEMPLATE_ID,
      variables: {
        first_name: fullName?.split(" ")[0] || "there",
        company_name: "InvoiceFlow",
        company_address: "Dhaka, Bangladesh",
        otp_code: otp.toString(),
        time: "15", // In mins
      },
    },
  });

  return data;
}

export default sendVerificationEmailService;
