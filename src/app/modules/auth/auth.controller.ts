/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatusCose from 'http-status-codes'
import { ITokens, setAuthCookies } from "../../utils/setCookie";



const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginInfo = await authService.credentialsLogin(req.body)

       setAuthCookies(res, loginInfo)

        res.status(httpStatusCose.OK).json({
            success: true,
            message: 'User logged in successfully',
            data: loginInfo
        })
    } catch (error: any) {
        res.status(httpStatusCose.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken
        const tokenInfo = await authService.getNewAccessToken(refreshToken as string)

        setAuthCookies(res, tokenInfo)

        res.status(httpStatusCose.OK).json({
            success: true,
            message: 'New access Token retrive successfully',
            data: tokenInfo
        })
    } catch (error: any) {
        res.status(httpStatusCose.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly : true,
            secure : false,
            sameSite : "lax"
        })
        res.clearCookie("refreshToken", {
            httpOnly : true,
            secure : false,
            sameSite : "lax"
        })

        res.status(httpStatusCose.OK).json({
            success: true,
            message: 'Logout successfull',
            data: null
        })
    } catch (error: any) {
        res.status(httpStatusCose.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

export const authController = {
    credentialsLogin,
    getNewAccessToken,
    logOut
}