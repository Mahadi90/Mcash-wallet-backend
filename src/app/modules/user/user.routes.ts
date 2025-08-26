import { Router } from "express";
import { userController } from "./user.controller";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Role } from "./user.interface";

const router = Router()

router.post('/register', userController.createUser)

router.get('/all-user', async(req : Request, res : Response, next : NextFunction) => {
    const accessToken = req.headers.authorization
     
    if(!accessToken){
        throw new Error("You have not accessToken")
    }

    const varifiedToken = await jwt.verify(accessToken  as string , 'secret')

    if((varifiedToken as JwtPayload).userRole !== Role.ADMIN){
        throw new Error("You are not authorized to view")
    }
    next()
} ,userController.getAllUser)

export const UserRoute = router  
