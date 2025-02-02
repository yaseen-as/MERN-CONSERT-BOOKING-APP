import { Router } from "express";
import { Validate } from "../middleware/validate-zod.middleware";
import  {updateUserSchema}  from "../schemas/user.schema";
import jwtAuthMiddleware from "../middleware/jwtAuth.middleware";
import authorizeRole from '../middleware/authorizeRole.middleware';
import {
  updateUserController,
  deleteUserByIdController,
  deleteUserController,
  getAllUsersController,
  getUserController,
} from "../controllers/user.controller";
import { UserRole } from "../types/user.type";

const router = Router();

router
  .route("/me")
  .put(jwtAuthMiddleware, Validate(updateUserSchema), updateUserController);
router.route("/me").get(jwtAuthMiddleware, getUserController);
router.route("/me").delete(jwtAuthMiddleware, deleteUserController);
// RBAC
router.route("/admin/:id").delete(jwtAuthMiddleware,authorizeRole(UserRole.ADMIN),deleteUserByIdController);
router.route("/admin").get(jwtAuthMiddleware,authorizeRole(UserRole.ADMIN),getAllUsersController);

export default router;
