import { IAUTH, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt'

const craeteUser = async (payload: Partial<IUser>) => {
    const { phone, password, ...rest } = payload;

    const isUserExist = await User.findOne({ phone })
    if(isUserExist){
        throw new Error('User already exist')
    }

    const hashedPass =await bcrypt.hash(password as string, 10)

    const authProvider: IAUTH = {provider : 'credentials', providerId : phone as string}

    const user = await User.create({
        phone,
        password : hashedPass,
        auth : authProvider,
        ...rest
    })

    return user
}

export const userService = {
    craeteUser
}