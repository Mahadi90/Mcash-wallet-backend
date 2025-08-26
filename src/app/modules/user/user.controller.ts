/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import httpStatusCose from 'http-status-codes'

const createUser = async(req : Request, res : Response, next : NextFunction) => {
    try {
        console.log(req.body);
        const data = await userService.craeteUser(req.body)

        res.status(httpStatusCose.CREATED).json({
            success : true,
            message : 'User created successfully',
            data
        })
    } catch (error : any) {
          res.status(httpStatusCose.BAD_REQUEST).json({
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

        res.status(httpStatusCose.OK).json({
            success : true,
            message : 'User retrive successfully',
            data : users
        })
    } catch (error : any) {
          res.status(httpStatusCose.BAD_REQUEST).json({
            success : false,
            message : error.message,
            error
        })
    }
}

export const userController = {
    createUser,
    getAllUser
}