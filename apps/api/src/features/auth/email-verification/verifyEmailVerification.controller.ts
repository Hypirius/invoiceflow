import { Request, Response } from "express";
import verifyEmailVerificationService from "./verifyEmailVerification.service";

async function verifyEmailVerificationController(req: Request, res: Response) {
  await verifyEmailVerificationService(req.body.email, req.body.otp);

  res.status(204).end();
}

export default verifyEmailVerificationController;
