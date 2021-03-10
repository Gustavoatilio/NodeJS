import {request, response, Router} from 'express'
import {parseISO, isEqual} from 'date-fns'
import AppointmentmentsRepository from '../repositories/appointmentmentsRepository'
import CreateAppointService from '../services/CreateAppointmentService'
import {getCustomRepository} from 'typeorm'
import ensureAuthenticated from '../middlewares/middlewareAuthenticate'
const appointsRouter = Router()

appointsRouter.use(ensureAuthenticated)


appointsRouter.get('/', async (request, response)=>{
    const appointmentmentsRepository =  getCustomRepository(AppointmentmentsRepository)
    const appointment = await appointmentmentsRepository.find()
    console.log(request.user)
    return response.json(appointment)
})


appointsRouter.post('/', async (request, response)=>{
    try{
        const {provider_id, date} = request.body

    const parsedDate = parseISO(date)
   
    const createAppointService = new CreateAppointService()
    const appointment = await createAppointService.execute({date:parsedDate, provider_id})
    response.json(appointment)
    }catch(err){
        return response.status(400).json({error:err.message})
    }
})

export default appointsRouter