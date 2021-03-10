import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import autchConfig from '../config/auth'

interface TokenPayload{
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction):void{
    const autHearder = request.headers.authorization

    if(!autHearder){
        throw new Error('JWT token is missing')
    }

    const [,token] = autHearder.split(' ')

    try{

    const decod = verify(token, autchConfig.jwt.secret)
    const { sub } = decod as TokenPayload
    request.user = {
        id: sub,
    }
    return next()
    }catch(err){
        throw new Error("Invalid JWT token")
    }


}