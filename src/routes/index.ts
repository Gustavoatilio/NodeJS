import {Router} from 'express'
import appointsRouter from './appointments.routes'
import usersRouter from './users.route'
import sessionRouter from './session.routs'

const routes = Router()

routes.use('/appointmentments', appointsRouter)
routes.use('/users',usersRouter)
routes.use('/session',sessionRouter)

export default routes