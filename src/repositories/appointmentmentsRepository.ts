import Appointment from '../models/appointmentments'
import {EntityRepository, Repository} from 'typeorm'

@EntityRepository(Appointment)
class AppointmentmentsRepository extends Repository<Appointment>{
    private appointments: Appointment[]

        

    public async findByDate(date : Date): Promise<Appointment | null> {
        
        const findApp = await this.findOne({
            where: {date},
        })
        return findApp || null
    }

   
}

export default AppointmentmentsRepository