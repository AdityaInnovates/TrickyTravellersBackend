import config from "./config/config";
import mongoose from "mongoose";
import app from "./app";
import logger from "./config/logger";
import { v2 } from "cloudinary";
v2.config(config.cloudinary);

mongoose.connect(config.mongo.uri).then(() => {
  logger.info("Connected to MongoDB");
});

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
