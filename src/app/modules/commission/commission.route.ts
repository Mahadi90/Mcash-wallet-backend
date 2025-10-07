import { Router } from "express";
import { commissionController } from "./commission.controller";
import { checkAuth } from "../../middlewares/validationRequest";
import { Role } from "../user/user.interface";


const router = Router();

router.get("/my-commission", checkAuth(Role.AGENT), commissionController.getMyCommissionFromWallet);

export const commissionRouter = router;
