import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/validationRequest";
import { Role } from "./user.interface";

const router = Router()

router.get('/all-user', checkAuth(Role.ADMIN, Role.SUPER_ADMIN) ,userController.getAllUser)
router.post('/register' ,userController.createUser)
router.patch('/:id', checkAuth(...Object.values(Role)), userController.updateUser)


export const UserRoute = router  
