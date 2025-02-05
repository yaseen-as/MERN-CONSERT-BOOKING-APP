import { Router } from "express";
import { validate } from "../middleware/validate-zod.middleware";
import {
  createConcertSchema,
  updateConcertSchema,
} from "../schemas/concert.schema";
import jwtAuthMiddleware from "../middleware/jwtAuth.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import {
  createConcertController,
  deleteConcertByIdController,
  getAllConcertsController,
  getConcertByIdController,
  searchConcertController,
  updateConcertByIdController,
} from "../controllers/concert.controller";
import { UserRole } from "../types/user.type";
import { upload } from "../middleware/upload-multer.middleware";

const router = Router();

router.route("/search").get(searchConcertController);

router
  .route("/admin")
  .post(
    jwtAuthMiddleware,
    authorizeRole(UserRole.ADMIN),
    upload.single("image"),
    validate(createConcertSchema),
    createConcertController
  );
router
  .route("/admin/:id")
  .put(
    jwtAuthMiddleware,
    authorizeRole(UserRole.ADMIN),
    validate(updateConcertSchema),
    updateConcertByIdController
  );
router
  .route("/")
  .get(
    jwtAuthMiddleware,
    getAllConcertsController
  );
router
  .route("/:id")
  .get(
    jwtAuthMiddleware,
    getConcertByIdController
  );

router
  .route("/admin/:id")
  .delete(
    jwtAuthMiddleware,
    authorizeRole(UserRole.ADMIN),
    deleteConcertByIdController
  );

export default router;
