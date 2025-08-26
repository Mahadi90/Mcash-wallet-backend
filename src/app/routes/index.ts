
import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.route";

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
]

moduleRoutes.forEach(route => {
   router.use(route.path, route.route)
})