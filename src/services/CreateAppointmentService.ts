import Appointment from '../models/appointmentments'
import {startOfHour, parseISO, isEqual} from 'date-fns'
import AppointmentmentsRepository from '../repositories/appointmentmentsRepository'
import {getCustomRepository} from 'typeorm'

interface Request{
    provider_id: string
    date: Date
}

class CreateAppointService{
    public async execute({date, provider_id}: Request): Promise<Appointment>{
        const appointmentmentsRepository = getCustomRepository(AppointmentmentsRepository)
        const appointmentDate = startOfHour(date)
        const findApp = await appointmentmentsRepository.findByDate(appointmentDate)
        if(findApp){
            throw Error('Error')
            }

    
         const appointment = appointmentmentsRepository.create({provider_id, date: appointmentDate})
         await appointmentmentsRepository.save(appointment)
        return appointment
    }
}

export default CreateAppointService