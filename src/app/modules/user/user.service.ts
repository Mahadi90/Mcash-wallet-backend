import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config/env";
import { IAUTH, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt'

const craeteUser = async (payload: Partial<IUser>) => {
    const { phone, password, ...rest } = payload;

    const isUserExist = await User.findOne({ phone })
    if(isUserExist){
        throw new Error('User already exist')
    }

    const hashedPass =await bcrypt.hash(password as string, parseInt(envConfig.bcryptSalt))

    const authProvider: IAUTH = {provider : 'credentials', providerId : phone as string}

    const user = await User.create({
        phone,
        password : hashedPass,
        auth : authProvider,
        ...rest
    })

    return user
}

const updateUser = async(userId : string, payload : Partial<IUser>, decodedToken : JwtPayload)=> {
    const isUserExist = await User.findById(userId)
    if(!isUserExist){
     throw new Error("User does not exist")
    }

    if(isUserExist.isBlocked || !isUserExist.isActive){
        throw new Error("You are not permitted to update")
    }

    if(payload.role){
        if(decodedToken.userRole === Role.USER || decodedToken.userRole === Role.AGENT){
            throw new Error("You are not permitted to update user role")
        }
    }

    if(payload.role === Role.SUPER_ADMIN && decodedToken.userRole === Role.ADMIN){
        throw new Error("You are not permitted to update super admin role")
    }
    
    if(payload.isActive || payload.isVerified || payload.isBlocked){
         if(decodedToken.userRole === Role.USER || decodedToken.userRole === Role.AGENT){
            throw new Error("You are not permitted to update this field")
        }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, payload, {new : true, runValidators : true})

    return updatedUser;
}



const getAllUser = async () => {

    const users = await User.find()

    return {
        users
    }
}

export const userService = {
    craeteUser,
    getAllUser,
    updateUser
}