import express from 'express'
import cors from 'cors'
import { CORS_OPTIONS } from './constants'
import { errorHandler } from './middleware/errorHandler.middleware'

const app=express()

//security middlewares
app.use(cors(CORS_OPTIONS))
//middlewares

app.use(express.static('public'))
app.use(express.json())


//local routes 
import healthCheckRouter from './routes/healthCheck.route'
app.use('/api/v1/healthCheck',healthCheckRouter)


// protected routes


//middlewares 
app.use(errorHandler)

export default app