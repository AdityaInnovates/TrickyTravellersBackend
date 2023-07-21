import docsRoute from "./docs.route";
import config from "../config/config";
import { Router } from "express";
import categoryRoute from "./category.route";
import authRoute from "./auth.route";
import blogRoute from "./blog.route";
import eventRoute from "./event.route";

const router = Router();

if (config.env === "development") {
  router.use("/docs", docsRoute);
}

router.use("/categories", categoryRoute);
router.use("/blogs", blogRoute);
router.use("/auth", authRoute);
router.use("/events", eventRoute);
export default router;
