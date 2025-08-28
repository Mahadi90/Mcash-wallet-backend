
import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { createUserToken } from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from 'bcrypt'


const credentialsLogin = async(payload: Partial<IUser>) => {
    const { phone, password } = payload;

    const isUserExist = await User.findOne({ phone })
    if (!isUserExist) {
        throw new Error('User does not exist')
    }

    const matchedPassword = await bcrypt.compare(password as string, isUserExist.password)
   
     if (!matchedPassword) {
        throw new Error('Password does not match')
    }

    const userToken = createUserToken(isUserExist)
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password : pass, ...rest} = isUserExist.toObject()

    return {
        accessToken : userToken.accessToken,
        refreshToken : userToken.refreshToken,
        user : rest
    }
}
const getNewAccessToken = async(refreshToken : string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, envConfig.JWT_REFRESH_SECRET) as JwtPayload

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

    const accessToken = generateToken(jwtPayload, envConfig.JWT_REFRESH_SECRET, envConfig.JWT_REFRESH_EXPIRES)

    return {
        accessToken,
    }
}

export const authService = {
    credentialsLogin,
    getNewAccessToken
}