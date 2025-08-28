import { envConfig } from "../../config/env";
import { IAUTH, IUser } from "./user.interface";
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
const getAllUser = async () => {

    const users = await User.find()

    return {
        users
    }
}

export const userService = {
    craeteUser,
    getAllUser
}