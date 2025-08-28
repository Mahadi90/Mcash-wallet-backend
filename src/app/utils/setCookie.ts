import { Response } from "express"

export interface ITokens {
    accessToken?: string,
    refreshToken?: string
}

export const setAuthCookies = (res : Response, tokenInfo : ITokens) => {
    if(tokenInfo.accessToken){
         res.cookie("accessToken", tokenInfo.accessToken , {
            httpOnly : true,
            secure : false
        }) 
    }

    if(tokenInfo.refreshToken){
         res.cookie("refreshToken", tokenInfo.refreshToken , {
            httpOnly : true,
            secure : false
        })
    }
}