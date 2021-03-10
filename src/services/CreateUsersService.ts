import Users from '../models/user'
import {getRepository} from 'typeorm'
import { hash } from 'bcryptjs'

interface CreateUsers{
    name: string,
    email: string,
    password: string
}

class UsersServices{
    public async executar({ name, email, password }:CreateUsers): Promise<Users>{
        const usersRepository = getRepository(Users)
        const checkUserExists = await usersRepository.findOne({
            where: {email},
        })
        
        if(checkUserExists){
            throw new Error('Email addres already used')
        }
        const hashPassword = await hash(password, 8)
        const user =  usersRepository.create({
            name,
            email,
            password: hashPassword
        })

        await usersRepository.save(user)
        
        return user
    }
}

export default UsersServices