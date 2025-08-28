
import { createUserToken, newAccessTokenWithRefreshToken } from "../../utils/userToken";
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
   const newAccessToken = await newAccessTokenWithRefreshToken(refreshToken)

   return {
    accessToken : newAccessToken
   }
}

export const authService = {
    credentialsLogin,
    getNewAccessToken
}