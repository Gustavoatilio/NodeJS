import { Router} from 'express'
import AuthnticateUserService from '../services/AuthenticateUserService'
const sessionRouter = Router()


sessionRouter.post('/', async (request, response)=>{
    try{
       const {email, password} = request.body
        const authnticateUserService = new AuthnticateUserService()

        const resposeAuth = await authnticateUserService.executar({email, password})
        return response.json(resposeAuth)
    }catch(err){
        return response.status(400).json({error:err.message})
    }
})

export default sessionRouter