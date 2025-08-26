/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatusCose from 'http-status-codes'

const credentialsLogin = async(req : Request, res : Response, next : NextFunction) => {
    try {
     const loginInfo = await authService.credentialsLogin(req.body)

    res.status(httpStatusCose.OK).json({
            success : true,
            message : 'User logged in successfully',
            data : loginInfo
        })   
    } catch (error : any) {
         res.status(httpStatusCose.BAD_REQUEST).json({
            success : false,
            message : error.message,
        })
    }
}

export const authController = {
    credentialsLogin
}