import { Router } from "express";
import { UserController } from "../controllers";
import validate from "../middlewares/validate";
import { UserValidation } from "../validations";

const router = Router();

router.post("/login", validate(UserValidation.login), UserController.login);
router.post(
  "/register",
  validate(UserValidation.register),
  UserController.register
);

export default router;
