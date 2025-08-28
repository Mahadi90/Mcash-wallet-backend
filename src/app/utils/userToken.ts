import { envConfig } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

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