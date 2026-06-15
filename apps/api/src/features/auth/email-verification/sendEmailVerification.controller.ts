import { Request, Response } from "express";
import sendVerifyEmailService from "./sendEmailVerification.service";

async function sendVerificationEmailController(req: Request, res: Response) {
  const { email, userId, fullName } = req.body;
  await sendVerifyEmailService(email, userId || null, fullName);

  return res.status(204).end();
}

export default sendVerificationEmailController;
