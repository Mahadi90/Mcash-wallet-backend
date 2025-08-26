import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

    const jwtPayload = {
      user_id : isUserExist._id,
      userPhone : isUserExist.phone,
      userRole : isUserExist.role 
    }
    const accessToken = await jwt.sign(jwtPayload, 'secret', {
        expiresIn : "1d"
    })
    return {
        phone,
        accessToken
    }
}

export const authService = {
    credentialsLogin
}