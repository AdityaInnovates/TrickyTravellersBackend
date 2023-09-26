import { Request, Response, Router } from "express";
import upload from "../middlewares/multer";
import auth from "../middlewares/auth";
import { ImageController } from "../controllers";

const router = Router();

router.post(
  "/",
  auth("image-upload"),
  upload.fields([{ name: "image", maxCount: 1 }]),
  ImageController.upload
);

export default router;
