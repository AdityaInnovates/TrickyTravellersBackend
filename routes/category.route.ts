import { CategoryController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { CategoryValidation } from "../validations";

const router = Router();

router.get("/", CategoryController.get);
router.post("/", CategoryController.create);
router.delete(
  "/:id",
  validate(CategoryValidation.create),
  CategoryController.deleteDocument
);
router.put(
  "/:id",
  validate(CategoryValidation.create),
  CategoryController.update
);
router.get("/single/:id", CategoryController.getSingle);

export default router;
