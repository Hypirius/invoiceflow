import { Request, Response } from "express";
import sendVerifyEmailService from "./sendEmailVerification.service";

async function sendVerificationEmailController(req: Request, res: Response) {
  await sendVerifyEmailService(req.body.email, req.body.userId || null);

  return res.status(204).end();
}

export default sendVerificationEmailController;
