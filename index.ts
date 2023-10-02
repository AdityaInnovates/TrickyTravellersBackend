import express from "express";
import config from "./config/config";
import mongoose from "mongoose";
import app from "./app";
import logger from "./config/logger";
import { v2 } from "cloudinary";
import { createServer, Server as Serve } from "http";
import { Server } from "socket.io";
import socket from "./sockets";
let server: Serve;
const users: any = [];
const socketApp = express();

const httpServer = createServer(socketApp);

const io = new Server(httpServer, { cors: { origin: "*" } });
v2.config(config.cloudinary);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

mongoose.connect(config.mongo.uri).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  httpServer.listen(5001, () => {
    logger.info(`Socket on port 5001`);
  });
});

socket(io, users);
const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
