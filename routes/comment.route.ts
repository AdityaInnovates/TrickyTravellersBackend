import { Router } from "express";
import { CommentController } from "../controllers";

const router = Router();

router.get("/:id", CommentController.getComment);

export default router;
