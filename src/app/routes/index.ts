
import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.route";
import { walletRouter } from "../modules/wallet/wallet.route";
import { transactionRouter } from "../modules/transaction/transaction.route";

export const router = Router()

const moduleRoutes = [
    {
        path : '/user',
        route : UserRoute
    },
    {
        path : '/auth',
        route : authRouter
    },
    {
        path : '/wallet',
        route : walletRouter
    },
    {
        path : '/transaction',
        route : transactionRouter
    },
]

moduleRoutes.forEach(route => {
   router.use(route.path, route.route)
})