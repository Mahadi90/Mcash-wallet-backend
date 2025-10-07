import { Router } from "express";
import { walletController } from "./wallet.controller";
import { checkAuth } from "../../middlewares/validationRequest";
import { Role } from "../user/user.interface";


const router = Router()

router.post("/mobile-recharge",checkAuth(Role.USER, Role.AGENT), walletController.rechargeMobile);
router.post("/withdraw", checkAuth(Role.USER), walletController.withdrawMoney);
router.post('/send-money', checkAuth(Role.USER), walletController.sendMoney)
router.post("/cash-in", checkAuth(Role.AGENT), walletController.agentCashIn);
router.patch('/wallet-status', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), walletController.setWalletStatus)
router.get("/user/:userId",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), walletController.getWalletByUser);

export const walletRouter = router


