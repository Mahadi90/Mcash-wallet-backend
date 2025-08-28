import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";

export const createUserToken = (user : Partial<IUser>) => {
     const jwtPayload = {
      user_id : user._id,
      userPhone : user.phone,
      userRole : user.role 
    }
    const accessToken = generateToken(jwtPayload, envConfig.jwtSecret, envConfig.jwtExpires)

    const refreshToken = generateToken(jwtPayload, envConfig.JWT_REFRESH_SECRET, envConfig.JWT_REFRESH_EXPIRES)
    
    return {
        accessToken,
        refreshToken
    }
}

export const newAccessTokenWithRefreshToken =async(refreshToken : string) => {
 const verifiedRefreshToken = verifyToken(refreshToken, envConfig.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExist = await User.findOne({ phone : verifiedRefreshToken.userPhone })
    if (!isUserExist) {
        throw new Error('User does not exist')
    }

    if(!isUserExist.isActive || isUserExist.isBlocked){
        throw new Error('User blocked or inactive')
    }
     const jwtPayload = {
      user_id : isUserExist._id,
      userPhone : isUserExist.phone,
      userRole : isUserExist.role 
    }

    const accessToken =  generateToken(jwtPayload, envConfig.JWT_REFRESH_SECRET, envConfig.JWT_REFRESH_EXPIRES)

    return accessToken
}