import { NextFunction, Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken'

import { verifyToken } from "../utils/jwt";
import { envConfig } from "../config/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const checkAuth = (...authRoles : string[]) => async(req : AuthRequest, res : Response, next : NextFunction) => {
    const accessToken = req.headers.authorization
     
    if(!accessToken){
        throw new Error("You have not accessToken")
    }

    const verifiedToken = await verifyToken(accessToken, envConfig.jwtSecret) as JwtPayload

      req.user = {
      id: verifiedToken.user_id,     
      role: verifiedToken.userRole,  
    };

    
    if(!authRoles.includes(verifiedToken.userRole)){
        throw new Error("You are not authorized")
    }
    next()
}