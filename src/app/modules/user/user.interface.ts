import { Types } from "mongoose";

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    AGENT = 'AGENT',
}

export interface IAUTH {
    provider : string,
    providerId : string
}

export interface IUser {
    name : string,
    email? : string,
    phone : string,
    password : string,
    img? : string,
    address? : string,
    isActive? : boolean,
    isBlocked? : boolean,
    isVerified? : boolean,
    role? : Role,
    auth : [IAUTH],
    walletId? : Types.ObjectId
}