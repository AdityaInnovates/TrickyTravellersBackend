import { Router } from "express";
import { UserController } from "../controllers";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { UserValidation } from "../validations";

const router = Router();

router.get("/", UserController.get);
router.put(
  "/follow/:id",
  auth("follow"),
  validate(UserValidation.follow),
  UserController.follow
);
export default router;
