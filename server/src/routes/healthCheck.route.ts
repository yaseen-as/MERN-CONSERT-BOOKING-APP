import express from 'express'
import healthCheck from '../controllers/healthCheck.controller'

const router=express.Router()

router.route("/").get(healthCheck)

export default router