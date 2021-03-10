import {request, response, Router} from 'express'
import UsersService from '../services/CreateUsersService'

const usersRouter = Router()


usersRouter.post('/', async (request, response)=>{
    try{
        const {name, email, password} = request.body
        const createUser = new UsersService()
        const user = await createUser.executar({
            name,
            email,
            password,
        })
        
        return response.json(user)
    }catch(err){
        return response.status(400).json({error:err.message})
    }
})

export default usersRouter