import { Router } from "express";
import { UserController } from "../controllers";
import validate from "../middlewares/validate";
import { UserValidation } from "../validations";
import auth from "../middlewares/auth";
import upload from "../middlewares/multer";

const router = Router();

router.post("/login", validate(UserValidation.login), UserController.login);
router.post(
  "/register",
  validate(UserValidation.register),
  UserController.register
);
router.post(
  "/change-password",
  auth("profile"),
  validate(UserValidation.change_password),
  UserController.change_password
);
router.post(
  "/update-profile",
  auth("profile"),
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  validate(UserValidation.update),
  UserController.update_profile
);

router.get("/verify", auth("verify"), UserController.verify);
export default router;
