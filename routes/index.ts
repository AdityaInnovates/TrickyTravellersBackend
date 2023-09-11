import docsRoute from "./docs.route";
import config from "../config/config";
import { Router } from "express";
import categoryRoute from "./category.route";
import authRoute from "./auth.route";
import blogRoute from "./blog.route";
import eventRoute from "./event.route";
import destinationRoute from "./destination.route";
import staysRoute from "./stays.route";
import userRoute from "./user.route";
import chatRoute from "./chat.route";
const router = Router();

if (config.env === "development") {
  router.use("/docs", docsRoute);
}

router.use("/categories", categoryRoute);
router.use("/blogs", blogRoute);
router.use("/auth", authRoute);
router.use("/events", eventRoute);
router.use("/destinations", destinationRoute);
router.use("/stays", staysRoute);
router.use("/users", userRoute);
router.use("/chats", chatRoute);
export default router;
