import Users from '../models/user'
import {getRepository} from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import autchConfig from '../config/auth'
interface Request{
    email: string
    password: string
}

class AuthnticateUserService{
    public async executar({email, password}: Request):Promise<string>{
        const usersRepository = getRepository(Users)
        const user = await usersRepository.findOne({
            where: {email}
        })

        if(!user){
            throw new Error('Incorrect email/password combination')
        }

        const passwordMatchd = await compare(password, user.password)

        if(!passwordMatchd){
            throw new Error('Incorrect email/password combination')
        }

        const token = sign({  }, autchConfig.jwt.secret, {
            subject: user.id,
            expiresIn: autchConfig.jwt.expiresIn,
        })

        return token
    }
}

export default AuthnticateUserService