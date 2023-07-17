import { CategoryController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { CategoryValidation } from "../validations";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", auth("category-read"), CategoryController.get);
router.post("/", auth("category-create"), CategoryController.create);
router.delete(
  "/:id",
  validate(CategoryValidation.create),
  CategoryController.deleteDocument
);
router.put(
  "/:id",
  auth("category-update"),
  validate(CategoryValidation.create),
  CategoryController.update
);
router.get("/single/:id", auth("category-read"), CategoryController.getSingle);

export default router;
