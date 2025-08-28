import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/validationRequest";
import { Role } from "./user.interface";

const router = Router()

router.post('/register' ,userController.createUser)

router.get('/all-user', checkAuth(Role.ADMIN, Role.SUPER_ADMIN) ,userController.getAllUser)

export const UserRoute = router  
