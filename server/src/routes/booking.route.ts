import { Router } from "express";
import jwtAuthMiddleware from "../middleware/jwtAuth.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import {
  createBookingController,
  getUserBookingsController,
  getUserBookingsByUserIdController,
} from "../controllers/booking.controller";
import { UserRole } from "../types/user.type";
import { validate } from "../middleware/validate-zod.middleware";
import { createBookingSchema } from "../schemas/booking.schema";

const router = Router();

router
  .route("/")
  .post(
    jwtAuthMiddleware,
    validate(createBookingSchema),
    createBookingController
  );
router.route("/").get(jwtAuthMiddleware, getUserBookingsController);
router
  .route("/admin/:id")
  .get(
    jwtAuthMiddleware,
    authorizeRole(UserRole.ADMIN),
    getUserBookingsByUserIdController
  );

export default router;
