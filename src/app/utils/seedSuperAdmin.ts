import { envConfig } from "../config/env";
import { IAUTH, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from 'bcrypt'

export const seedSuperAdmin = async() => {
    try {
        const isExistSuperAdmin = await User.findOne({phone : envConfig.superAdminPhone})
        if(isExistSuperAdmin){
            console.log("Super admin already exist");
            return;
        }
        
       console.log("trying to create super admin.....");

        const hashedPassword = await bcrypt.hash(envConfig.superAdminPassword, Number(envConfig.bcryptSalt))

         const authProvider: IAUTH = {
            provider : "credentials",
            providerId : envConfig.superAdminPhone
         }

        const payload : Partial<IUser> = {
            name : "Super Admin",
            role : Role.SUPER_ADMIN,
            phone : envConfig.superAdminPhone,
            password : hashedPassword,
            auth : [authProvider],
            isVerified : true
        }

        const superAdmin =  await User.create(payload)

        console.log("Super admin created successfully");
        console.log(superAdmin);

    } catch (error) {
        console.log(error);
    }
}