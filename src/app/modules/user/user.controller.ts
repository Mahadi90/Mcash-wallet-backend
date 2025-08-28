/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import httpStatusCode from 'http-status-codes'
import { verifyToken } from "../../utils/jwt";
import { envConfig } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async(req : Request, res : Response, next : NextFunction) => {
    try {
        console.log(req.body);
        const data = await userService.craeteUser(req.body)

        res.status(httpStatusCode.CREATED).json({
            success : true,
            message : 'User created successfully',
            data
        })
    } catch (error : any) {
          res.status(httpStatusCode.BAD_REQUEST).json({
            success : false,
            message : error.message,
            error
        })
    }
}

const updateUser = async(req : Request, res : Response, next : NextFunction)=> {
   try {
     const userId = req.params.id;
    const payload = req.body;
    const token = req.headers.authorization;
    const verifiedToken = await verifyToken(token as string, envConfig.jwtSecret) as JwtPayload

    const data = await userService.updateUser(userId, payload, verifiedToken)
   
    
        res.status(httpStatusCode.CREATED).json({
            success : true,
            message : 'User updated successfully',
            data
        })
   } catch (error : any) {
    res.status(httpStatusCode.BAD_REQUEST).json({
            success : false,
            message : error.message,
            error
        })
   }
}

const getAllUser = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const users = await userService.getAllUser()
        console.log(users);

        res.status(httpStatusCode.OK).json({
            success : true,
            message : 'User retrive successfully',
            data : users
        })
    } catch (error : any) {
          res.status(httpStatusCode.BAD_REQUEST).json({
            success : false,
            message : error.message,
            error
        })
    }
}

export const userController = {
    createUser,
    getAllUser,
    updateUser
}