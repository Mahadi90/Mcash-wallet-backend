import { NextFunction, Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken'

import { verifyToken } from "../utils/jwt";
import { envConfig } from "../config/env";



export const checkAuth = (...authRoles : string[]) => async(req : Request, res : Response, next : NextFunction) => {
    const accessToken = req.headers.authorization
     
    if(!accessToken){
        throw new Error("You have not accessToken")
    }

    const verifiedToken = await verifyToken(accessToken, envConfig.jwtSecret) as JwtPayload

    if(!authRoles.includes(verifiedToken.userRole)){
        throw new Error("You are not authorized to view")
    }
    next()
}