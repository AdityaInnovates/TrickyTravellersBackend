import winston from "winston";
import config from "./config";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports:
    config.env === "development"
      ? [
          new winston.transports.Console({
            stderrLevels: ["error"],
          }),
        ]
      : [
          new winston.transports.Console({
            stderrLevels: ["error"],
          }),
          new winston.transports.File({
            filename: "logs/server.log",
          }),
        ],
});

export default logger;
