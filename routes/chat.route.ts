import { Router } from "express";
import { ChatController } from "../controllers";
import auth from "../middlewares/auth";

const router = Router();

router.get("/:id", auth("chat"), ChatController.getOrCreate);

export default router;
