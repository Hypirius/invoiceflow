import { Router } from "express";
import authRouter from "./features/auth/auth.route";
import uploadImageController from "./features/upload-image/uploadImage.controller";
import protectedRouter from "./protectedroutes";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/upload-image", uploadImageController);
router.use(protectedRouter);

export default router;
