import { Router } from "express";
import type { Router as RouterType } from "express";
import signUpController from "./sign-up/signUp.controller";
import loginController from "./login/login.controller";
import sendVerificationEmailController from "./email-verification/sendEmailVerification.controller";
import verifyEmailVerificationController from "./email-verification/verifyEmailVerification.controller";
import accessTokenController from "./access-token/accessToken.controller";

const authRouter: RouterType = Router();

authRouter.post("/sign-up", signUpController);
authRouter.post("/login", loginController);

authRouter.post("/send-email", sendVerificationEmailController);
authRouter.post("/verify-email", verifyEmailVerificationController);

authRouter.post("/access-token", accessTokenController);

export default authRouter;
