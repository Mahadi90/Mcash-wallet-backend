import { Router } from "express";
import { checkAuth } from "../../middlewares/validationRequest";
import { Role } from "../user/user.interface";
import { transactionController } from "./transaction.controller";

const router = Router()

router.get("/all-transaction", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), transactionController.getAllTransactions);
router.get("/my-transactions",checkAuth(Role.USER), transactionController.getMyTransactions);
router.get("/single-history/:id",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), transactionController.getUserTransactions);

export const transactionRouter = router