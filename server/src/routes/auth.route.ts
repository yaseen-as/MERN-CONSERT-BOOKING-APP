import {Router} from 'express'
import {login,register,logout,refreshToken} from "../controllers/auth.controller"
import { Validate } from '../middleware/validate-zod.middleware'
import {createUserSchema} from '../schemas/user.schema'
import jwtAuthMiddleware from '../middleware/jwtAuth.middleware'
// import {login,register,authStatus,logout,reset2FA,setup2FA,verify2FA} from "../controllers/auth.controller"

const router=Router()

router.route("/register").post(Validate(createUserSchema),register)
router.route("/login").post(login)
router.route("/token").post(refreshToken)
router.route("/logout").get(jwtAuthMiddleware,logout)

// router.route("/2fa/setup").post(setup2FA)
// router.route("/2fa/verify").post(verify2FA)
// router.route("/2fa/reset").post(reset2FA)

export default router