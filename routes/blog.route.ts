import { BlogController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { BlogValidation } from "../validations";
import upload from "../middlewares/multer";
import auth from "../middlewares/auth";
const router = Router();

router.get("/", BlogController.get);
router.post(
  "/",
  auth("blog-update"),
  upload.fields([
    { name: "extra_image", maxCount: 1 },
    { name: "featured", maxCount: 1 },
  ]),

  validate(BlogValidation.create),
  BlogController.create
);
router.delete(
  "/:id",
  auth("blog-delete"),

  BlogController.deleteDocument
);
router.put(
  "/:id",
  auth("blog-update"),
  validate(BlogValidation.update),
  upload.fields([
    { name: "extra_image", maxCount: 1 },
    { name: "featured", maxCount: 1 },
  ]),
  BlogController.update
);
router.get("/single/:id", BlogController.getSingle);

export default router;
