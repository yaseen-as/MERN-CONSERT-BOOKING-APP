import express,{Express} from 'express'
import cors from 'cors'
import { CORS_OPTIONS } from './constants'
import { errorHandler } from './middleware/errorHandler.middleware'
import passport from "./configs/passport.config"

const app:Express=express()

//security middlewares
app.use(cors(CORS_OPTIONS))
//middlewares

app.use(express.static('public'))
app.use(express.json())
app.use(passport.initialize());

//local routes 
import healthCheckRouter from './routes/healthCheck.route'
import authRouter from './routes/auth.route'
import userRouter from './routes/user.route'
import concertRouter from './routes/concert.route'
import bookingRouter from './routes/booking.route'

app.use('/api/v1/healthCheck',healthCheckRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/concert',concertRouter)
app.use('/api/v1/booking',bookingRouter)

//middlewares 
app.use(errorHandler)

export default app