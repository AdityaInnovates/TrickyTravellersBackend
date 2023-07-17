import docsRoute from "./docs.route";
import config from "../config/config";
import { Router } from "express";
import categoryRoute from "./category.route";
import blogRoute from "./blog.route";
const router = Router();

if (config.env === "development") {
  router.use("/docs", docsRoute);
}

router.use("/categories", categoryRoute);
router.use("/blogs", blogRoute);

export default router;
