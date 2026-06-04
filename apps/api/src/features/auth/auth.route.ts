import { Router } from "express";
import type { Router as RouterType } from "express";
import signUpController from "./sign-up/signUp.controller";

const authRouter: RouterType = Router();

authRouter.post("/sign-up", signUpController);

export default authRouter;
