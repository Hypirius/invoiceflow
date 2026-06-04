import { Router } from "express";
import type { Router as RouterType } from "express";
import signUpController from "./sign-up/signUp.controller";
import loginController from "./login/login.controller";

const authRouter: RouterType = Router();

authRouter.post("/sign-up", signUpController);
authRouter.post("/login", loginController);

export default authRouter;
