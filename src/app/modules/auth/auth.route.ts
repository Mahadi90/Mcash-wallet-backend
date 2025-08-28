import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

router.use('/login', authController.credentialsLogin)
router.use('/refresh-token', authController.getNewAccessToken)

export const authRouter = router